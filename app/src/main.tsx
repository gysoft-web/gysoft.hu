import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
        <ToastContainer
            autoClose={3000}
            theme="colored"
            closeOnClick
            closeButton={false}
            position="bottom-left"
        />
    </React.StrictMode>,
);
