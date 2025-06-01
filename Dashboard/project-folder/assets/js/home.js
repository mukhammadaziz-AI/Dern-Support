const buttons = document.querySelectorAll('.form-types button');
const loginBtn = document.querySelector('.login');
const modal = document.getElementById('login-modal');
const closeBtn = document.querySelector('.close-modal');

// Button active toggle
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Modal ochish/yopish
loginBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Ro'yxatdan o'tish muvaffaqiyati (foydalanuvchi va admin uchun)
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const verified = params.get('verified');
    const admin = params.get('admin');

    const messageDiv = document.getElementById('success-message');

    if (verified === '1') {
        messageDiv.innerHTML = "<i class='bx bx-check'></i> Siz muvaffaqiyatli ro'yxatdan o'tdingiz";
        messageDiv.style.display = 'block';
    }

    if (admin === '1') {
        messageDiv.innerHTML = "<i class='bx bx-check'></i> Admin muvaffaqiyatli ro'yxatdan o'tdi";
        messageDiv.style.display = 'block';
    }

    if (verified === '1' || admin === '1') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
            window.history.replaceState({}, document.title, "/");
        }, 5000);
    }
});

// Profil dropdown
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

window.addEventListener('click', function (e) {
    if (!e.target.closest('.profile-wrapper')) {
        document.getElementById('dropdown').style.display = 'none';
    }
});


// Support form submission
const supportForm = document.querySelector('.support-form form');
const phoneInput = supportForm.querySelector('input[type="text"]');
const messageTextarea = supportForm.querySelector('textarea');

supportForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const activeButton = document.querySelector('.form-types button.active');
    if (!activeButton) {
        alert("Iltimos, xizmat turini tanlang");
        return;
    }

    const serviceType = activeButton.textContent.trim();
    const phone = phoneInput.value.trim();
    const message = messageTextarea.value.trim();

    if (!phone || !message) {
        alert("Iltimos, barcha maydonlarni to'ldiring");
        return;
    }

    const formData = {
        phone,
        message,
        serviceType
    };

    try {
        const response = await fetch('/submit-support', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            // Form muvaffaqiyatli yuborildi
            const messageDiv = document.getElementById('success-message');
            messageDiv.innerHTML = "<i class='bx bx-check'></i> Sizning so'rovingiz qabul qilindi!";
            messageDiv.style.display = 'block';
            supportForm.reset();

            // Sahifani tepaga silliq scroll qilish
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // 5 soniyadan keyin xabarni yashirish
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        } else {
            alert(data.message || 'Xatolik yuz berdi');
        }
    } catch (error) {
        console.error('Xatolik:', error);
        alert('Serverga ulanishda xatolik yuz berdi');
    }
});

