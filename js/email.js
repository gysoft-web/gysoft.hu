document.getElementById('submit').addEventListener('click', async () => {
    const nev = document.getElementById('nev').value;
    const email = document.getElementById('email').value;

    const data = { nev, email };

    const res = await fetch('http://localhost:', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (res.ok) {
        alert('Üzenet elküldve!');
    } else {
        alert('Hiba történt!');
    }
});
