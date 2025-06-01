function toggleCompany(show) {
    const businessForm = document.getElementById('business-form');
    if (show) {
        businessForm.classList.remove('hidden');
    } else {
        businessForm.classList.add('hidden');
    }
}

function toggleCompany(show) {
    document.getElementById('business-form').classList.toggle('hidden', !show);
}

let countdownInterval;

document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    
    try {
        const response = await fetch('/register', {
            method: 'POST',
            body: new URLSearchParams(formData)
        });

        if (response.ok) {
            const data = await response.json();
            window.location.href = `/registration/verify?email=${encodeURIComponent(data.email)}`;
        } else {
            alert('Ro‘yxatdan o‘tishda xatolik yuz berdi');
        }
    } catch (err) {
        alert('Server bilan bog‘lanishda muammo');
    }
});
