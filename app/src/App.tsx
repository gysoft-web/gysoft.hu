import { useEffect, useState } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { apiClient } from './api/apiClient';
import { toast } from 'react-toastify';
import { afterToday, DateRangePicker } from 'rsuite';
import 'rsuite/DateRangePicker/styles/index.css';
import { Bar, BarChart, Cell, Legend } from 'recharts';

type StatisticsData = { status: FormStatus | 'all'; count: number };

const App: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [query, setQuery] = useState<string>('');
    const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
    const [status, setStatus] = useState<FormStatus | 'all'>('all');
    const [applications, setApplications] = useState<Application[]>([]);
    const [acceptedApplications, setAcceptedApplications] = useState<Application[]>([]);
    const [rejectedApplications, setRejectedApplications] = useState<Application[]>([]);
    const [pendingApplications, setPendingApplications] = useState<Application[]>([]);
    const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const isHungarian = i18n.language === 'hu';

    const toggleLanguage = () => {
        changeLanguage(isHungarian ? 'en' : 'hu');
    };

    const toggleTheme = () => {
        const htmlElement = document.documentElement;
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
    };

    const getDateString = (date: string) => {
        const dateObj = new Date(date);
        return `${dateObj.toLocaleDateString()} | ${dateObj.toLocaleTimeString()}`;
    };

    const acceptApplication = (app: Application) => {
        setApplications((prevApps) =>
            prevApps.map((a) => (a.id === app.id ? { ...a, status: 'accepted' } : a)),
        );
    };

    const rejectApplication = (app: Application) => {
        setApplications((prevApps) =>
            prevApps.map((a) => (a.id === app.id ? { ...a, status: 'rejected' } : a)),
        );
    };

    const confirmChanges = () => {
        applications.forEach((app) => {
            if (
                acceptedApplications.some((a) => a.id === app.id) ||
                rejectedApplications.some((a) => a.id === app.id)
            ) {
                app.status = acceptedApplications.some((a) => a.id === app.id)
                    ? 'accepted'
                    : 'rejected';
            }
        });
        let error = false;
        applications.forEach((app) => {
            apiClient
                .patch(`/apply-form/${app.id}/status`, { status: app.status })
                .catch((error) => {
                    console.error('Error saving changes:', error);
                    toast.error(t('app.changesSaveFailed'));
                    error = true;
                });
        });
        if (!error) {
            toast.success(t('app.changesSaved'));
        }
    };

    const getBaseData = () => {
        apiClient
            .get('/apply-form')
            .then((response) => {
                toast.success(t('app.dataLoaded'));
                setApplications(response.data);
            })
            .catch((error) => {
                console.error('Error fetching applications:', error);
                toast.error(t('app.dataLoadFailed'));
            });
    };

    const searchApplications = (query: string) => {
        const lowerQuery = query.toLowerCase();
        const statusApplication = applications
            .filter((app) => app.status === status || status === 'all')
            .filter((app) => {
                if (!dateRange) return true;
                const appDate = new Date(app.created);
                return (
                    appDate >= dateRange[0] &&
                    appDate <= new Date(dateRange[1].setHours(23, 59, 59, 999))
                );
            })
            .filter(
                (app) =>
                    app.name.toLowerCase().includes(lowerQuery) ||
                    app.email.toLowerCase().includes(lowerQuery),
            );
        setFilteredApplications(statusApplication);
    };

    const revertChanges = () => getBaseData();

    const statisticsDate = (): StatisticsData[] => {
        return [
            {
                status: 'all',
                count: applications.length,
            },
            {
                status: 'approved',
                count: acceptedApplications.length,
            },
            {
                status: 'rejected',
                count: rejectedApplications.length,
            },
            {
                status: 'pending',
                count: pendingApplications.length,
            },
        ];
    };

    useEffect(() => {
        searchApplications(query);
    }, [query, applications, status, dateRange]);

    useEffect(() => {
        setAcceptedApplications(applications.filter((app) => app.status === 'accepted'));
        setRejectedApplications(applications.filter((app) => app.status === 'rejected'));
        setPendingApplications(applications.filter((app) => app.status === 'pending'));
        setFilteredApplications(applications);
    }, [applications]);

    useEffect(() => {
        getBaseData();
    }, []);

    const COLORS = ['#8884d8', '#82ca9d', '#ff6b6b', '#ffc658'];

    return (
        <main className="App">
            <header>{t('app.title')}</header>
            <main className="Content">
                <section className="Controls">
                    <div>
                        <input
                            type="text"
                            name="search"
                            placeholder={t('app.searchPlaceholder')}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <select
                            name="status"
                            id="status"
                            onChange={(e) => setStatus(e.target.value as FormStatus | 'all')}
                        >
                            <option value="all">{t('app.allApplications')}</option>
                            <option value="pending">{t('app.pending')}</option>
                            <option value="accepted">{t('app.accepted')}</option>
                            <option value="rejected">{t('app.rejected')}</option>
                        </select>
                    </div>
                    <div>
                        <DateRangePicker
                            shouldDisableDate={afterToday()}
                            showOneCalendar
                            character="|"
                            cleanable
                            format="yyyy-MM-dd"
                            onChange={(dates) => setDateRange(dates)}
                        />
                    </div>
                </section>
                <section className="Applications">
                    <table>
                        <thead>
                            <tr>
                                <th>{t('app.name')}</th>
                                <th>{t('app.email')}</th>
                                <th>{t('app.status')}</th>
                                <th>{t('app.created')}</th>
                                <th colSpan={2}>{t('app.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplications.map((app) => (
                                <tr key={app.id} className={`Application ${app.status}`}>
                                    <th>{app.name}</th>
                                    <td>{app.email}</td>
                                    <td>{t(`app.${app.status}`)}</td>
                                    <td>{getDateString(app.created)}</td>
                                    <td>
                                        {app.status !== 'accepted' && (
                                            <button
                                                className="Btn"
                                                onClick={() => acceptApplication(app)}
                                            >
                                                {t('app.accept')}
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        {app.status !== 'rejected' && (
                                            <button
                                                className="Btn"
                                                onClick={() => rejectApplication(app)}
                                            >
                                                {t('app.reject')}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="Btn Send" onClick={confirmChanges}>
                        {t('app.send')}
                    </button>
                    <button className="Btn Send" onClick={revertChanges}>
                        {t('app.revert')}
                    </button>
                </section>
            </main>
            <aside className="Sidebar">
                <section className="Statistics">
                    <h2>{t('app.statistics')}</h2>
                    <div>
                        <span>{t('app.totalApplications')}</span>:{applications?.length ?? 0}
                    </div>
                    <div>
                        <span>{t('app.pendingApplications')}</span>:{pendingApplications.length}
                    </div>
                    <div>
                        <span>{t('app.acceptedApplications')}</span>:{acceptedApplications.length}
                    </div>
                    <div>
                        <span>{t('app.rejectedApplications')}</span>:{rejectedApplications.length}
                    </div>
                    <BarChart
                        style={{
                            width: '100%',
                            height: '100%',
                            maxWidth: '300px',
                            maxHeight: '300px',
                        }}
                        data={statisticsDate()}
                    >
                        <Bar dataKey="count">
                            {statisticsDate().map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </section>
                <section className="Settings">
                    <h2>{t('app.settings')}</h2>
                    <section className="Language">
                        <h3>{t('app.language')}</h3>
                        <div className="language-toggle Toggle">
                            <span>EN</span>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={isHungarian}
                                    onChange={toggleLanguage}
                                />
                                <span className="slider"></span>
                            </label>
                            <span>HU</span>
                        </div>
                    </section>
                    <section className="Theme">
                        <h3>{t('app.theme')}</h3>
                        <div className="theme-toggle Toggle">
                            <span>{t('app.light')}</span>
                            <label className="toggle-switch">
                                <input type="checkbox" onChange={toggleTheme} />
                                <span className="slider"></span>
                            </label>
                            <span>{t('app.dark')}</span>
                        </div>
                    </section>
                    <section className="Feedback">
                        <h3>{t('app.feedback')}</h3>
                        <p>
                            <button
                                className="Btn"
                                onClick={() =>
                                    (window.location.href = 'mailto:wiattila8+dev@gmail.com')
                                }
                            >
                                {t('app.sendFeedback')}
                            </button>
                        </p>
                    </section>
                </section>
            </aside>
        </main>
    );
};

export default App;
