window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    if (email) {
        document.getElementById('user-email').textContent = email;
    }

    startCountdown(60);

    document.getElementById('code-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const codeInput = document.getElementById('code').value.trim();

        if (codeInput.length !== 4 || !/^\d{4}$/.test(codeInput)) {
            showError('Iltimos, 4 xonali raqamni kiriting');
            return;
        }

        try {
            const response = await fetch('/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: codeInput })
            });

            const result = await response.json();

            if (result.success) {
                // Tasdiqlanganidan so'ng bosh sahifaga yo'naltirish
                window.location.href = '/?verified=1';
            } else {
                showError('Kod noto\'g\'ri. Qayta urinib ko\'ring');
            }
        } catch (err) {
            showError("Server bilan bog'lanishda muammo");
        }
    });
});

function showError(message) {
    const resendText = document.getElementById('resend-text');
    resendText.textContent = message;
    resendText.classList.remove('hidden');
}

let countdownInterval;

function startCountdown(seconds) {
    const timerElement = document.getElementById('timer');
    const resendText = document.getElementById('resend-text');

    resendText.classList.add('hidden');
    timerElement.classList.remove('bx', 'bx-refresh');
    timerElement.textContent = seconds + "s";

    let timeLeft = seconds;

    countdownInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            timerElement.innerHTML = "<i class='bx bx-refresh big-refresh'></i>";
            resendText.classList.remove('hidden');

            timerElement.addEventListener('click', restartTimer);
        }
    }, 1000);
}

function restartTimer() {
    document.getElementById('timer').removeEventListener('click', restartTimer);
    startCountdown(60);
}
