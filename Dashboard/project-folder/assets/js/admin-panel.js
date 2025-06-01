const body = document.querySelector('body');
const sidebar = body.querySelector('.sidebar');
const toggle = body.querySelector('.toggle');
const searchBtn = body.querySelector('.search-box');
const modeSwitch = body.querySelector('.toggle-switch');
const modeText = body.querySelector('.mode-text');
// const requestsContent = document.getElementById('requestsContent');

toggle.addEventListener('click', () => {
    sidebar.classList.toggle('close');
});

modeSwitch.addEventListener('click', () => {
    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
        modeText.innerText = 'Kun rejimi';
    } else {
        modeText.innerText = 'Tun rejimi';
    }
});

const logoutLink = document.querySelector(".logout a");
const logoutModal = document.getElementById("logoutModal");

logoutLink.addEventListener("click", e => {
    e.preventDefault();
    logoutModal.style.display = "flex";
});

function closeModal() {
    logoutModal.style.display = "none";
}

function confirmLogout() {
    window.location.href = "logout.php";
}

window.onload = () => {
    logoutModal.style.display = "none";
};

// Mahsulotlar sahifasini boshqarish
const productsLink = document.getElementById('productsLink');
const dashboardContent = document.getElementById('dashboardContent');
const productsContent = document.getElementById('productsContent');
const addProductContent = document.getElementById('addProductContent');
const editProductContent = document.getElementById('editProductContent');

// Barcha contentlarni yashirish uchun funksiya
function hideAllContent() {
    const contents = [
        dashboardContent,
        productsContent,
        addProductContent,
        editProductContent,
        requestsContent,
        statisticsContent,
        announcementDetailsContent,
        usersContent
    ];

    contents.forEach(content => {
        if (content) content.style.display = 'none';
    });
}

// Show dashboard page
function showDashboardPage() {
    hideAllContent();
    dashboardContent.style.display = 'block';

    // Active holatni o'zgartirish
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('.nav-link:first-child').classList.add('active');
}

// Show products page
function showProductsPage() {
    hideAllContent();
    productsContent.style.display = 'block';

    // Active holatni o'zgartirish
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById('productsLink').parentElement.classList.add('active');
}

// Show add product page
function showAddProductPage() {
    hideAllContent();
    addProductContent.style.display = 'block';
}

// Show edit product page
function showEditProductPage() {
    hideAllContent();
    editProductContent.style.display = 'block';
}

// Asosiy sahifaga qaytish
document.querySelector('.nav-link:first-child a').addEventListener('click', function (e) {
    e.preventDefault();
    showDashboardPage();
});

// Mahsulotlar sahifasiga o'tish
productsLink.addEventListener('click', function (e) {
    e.preventDefault();
    showProductsPage();
});

// Mahsulot qo'shish sahifasini ko'rsatish
const addProductBtn = document.querySelector('.products-actions .btn-primary');
addProductBtn.addEventListener('click', showAddProductPage);

// Edit button functionality in products list
document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        showEditProductPage();
    });
});

// Back button functionality
document.querySelectorAll('.back-button').forEach(btn => {
    btn.addEventListener('click', function () {
        showProductsPage();
    });
});

// Delete product functionality
document.querySelector('.btn-danger').addEventListener('click', function () {
    if (confirm('Mahsulotni o\'chirishni xohlaysizmi?')) {
        showProductsPage();
    }
});

// Search functionality
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        const productCategory = card.querySelector('.product-category').textContent.toLowerCase();

        if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Rasm yuklash preview
const fileInput = document.getElementById('productImages');
fileInput.addEventListener('change', function () {
    const label = this.nextElementSibling;
    if (this.files.length > 0) {
        label.querySelector('span').textContent = `${this.files.length} ta rasm tanlandi`;
    } else {
        label.querySelector('span').textContent = 'Rasmlarni yuklash';
    }
});

// Filter buttons dropdown functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Here you would implement the dropdown menu functionality
        // For now, we'll just add a visual feedback
        this.classList.toggle('active');
    });
});

// Edit link functionality in product details
document.querySelectorAll('.edit-link').forEach(link => {
    link.addEventListener('click', function () {
        const detailCard = this.closest('.detail-card');
        const label = detailCard.querySelector('.detail-label').textContent;
        const value = detailCard.querySelector('.detail-value').textContent;

        // Here you would implement the edit functionality for each field
        // For now, we'll just log the action
        console.log(`Editing ${label} with current value: ${value}`);
    });
});


// Get requests content element
const requestsContent = document.getElementById('requestsContent');

// Show requests page
function showRequestsPage() {
    hideAllContent();
    requestsContent.style.display = 'block';

    // Active holatni o'zgartirish
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('.nav-link:nth-child(4)').classList.add('active');
}

// Requests page link click handler
document.querySelector('.nav-link:nth-child(4) a').addEventListener('click', function (e) {
    e.preventDefault();
    showRequestsPage();
});

// View request details button click handler
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const requestCard = this.closest('.request-card');
        // Here you would implement the view details functionality
        console.log('Viewing request details');
    });
});

// Search functionality for requests
const requestSearchInput = document.querySelector('#requestsContent .search-box input');
requestSearchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const requestCards = document.querySelectorAll('.request-card');

    requestCards.forEach(card => {
        const title = card.querySelector('.request-title h3').textContent.toLowerCase();
        const meta = card.querySelector('.request-meta').textContent.toLowerCase();

        if (title.includes(searchTerm) || meta.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// E'lon tafsilotlari sahifasini ko'rsatish
function showAnnouncementDetails() {
    hideAllContent();
    announcementDetailsContent.style.display = 'block';
}

// Tafsilotlarni ko'rish tugmasini bosganda
const detailsBtns = document.querySelectorAll('.details-btn');
const announcementDetailsContent = document.getElementById('announcementDetailsContent');

detailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        showAnnouncementDetails();
    });
});

// Mahsulot qo'shish funksionalligini boshqarish
const productSelect = document.querySelector('.product-select select');
const selectedProducts = document.querySelector('.selected-products');
const mahsulotQoshishBtn = document.querySelector('.mahsulot-qoshish');

// Mahsulot qo'shish
mahsulotQoshishBtn.addEventListener('click', () => {
    const selectedProduct = productSelect.value;
    if (selectedProduct) {
        const productName = productSelect.options[productSelect.selectedIndex].text;
        addProductToList(productName);
        productSelect.value = '';
    }
});

// Mahsulotni ro'yxatga qo'shish
function addProductToList(productName) {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.innerHTML = `
        <span>${productName}</span>
        <input type="number" value="1" min="1">
        <button class="remove-product">
            <i class='bx bx-x'></i>
        </button>
    `;

    // O'chirish tugmasini ishga tushirish
    const removeBtn = productItem.querySelector('.remove-product');
    removeBtn.addEventListener('click', () => {
        productItem.remove();
    });

    selectedProducts.appendChild(productItem);
}

// Qabul qilish va rad etish tugmalarini boshqarish
const acceptBtn = document.querySelector('.qabul-qilish');
const rejectBtn = document.querySelector('.rad-etish');

acceptBtn.addEventListener('click', () => {
    // Buyurtmani qabul qilish logikasi
    console.log('Buyurtma qabul qilindi');
    showRequestsPage();
});

rejectBtn.addEventListener('click', () => {
    // Buyurtmani rad etish logikasi
    console.log('Buyurtma rad etildi');
    showRequestsPage();
});

// Bajarilish darajasi va holat taqsimoti grafiklarini yaratish
let completionRateChart;
let statusDistributionChart;

function updateSubCharts() {
    // Bajarilish darajasi grafigi
    const completionCtx = document.getElementById('completionRateChart');

    if (completionRateChart) {
        completionRateChart.destroy();
    }

    completionRateChart = new Chart(completionCtx, {
        type: 'line',
        data: {
            labels: ['Sha', 'Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum'],
            datasets: [
                {
                    label: 'Bajarilgan buyurtmalar',
                    data: [0, 0, 0, 0, 0.2, 1, 2],
                    borderColor: 'rgba(40, 199, 111, 1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Jami buyurtmalar',
                    data: [0, 0, 0, 0, 0.5, 1.5, 2],
                    borderColor: 'rgba(0, 120, 255, 1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });

    // Holat taqsimoti grafigi
    const statusCtx = document.getElementById('statusDistributionChart');

    if (statusDistributionChart) {
        statusDistributionChart.destroy();
    }

    statusDistributionChart = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: ['Bajarilgan', 'Jarayonda'],
            datasets: [{
                data: [50, 50],
                backgroundColor: [
                    'rgba(40, 199, 111, 0.8)',
                    'rgba(0, 120, 255, 0.8)'
                ],
                borderColor: [
                    'rgba(40, 199, 111, 1)',
                    'rgba(0, 120, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Statistika sahifasini ko'rsatish funksiyasini yangilash
function showStatisticsPage() {
    hideAllContent();
    statisticsContent.style.display = 'block';

    // Active holatni o'zgartirish
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('.nav-link:nth-child(6)').classList.add('active');

    // Grafiklarni yangilash
    updateChart();
    updateSubCharts();
}

// Statistika sahifasiga o'tish
document.querySelector('.nav-link:nth-child(6) a').addEventListener('click', function (e) {
    e.preventDefault();
    showStatisticsPage();
});

// Chart.js grafigi
let ordersChart;
let currentPeriod = 'weekly';
let currentTab = 'orders';

// Grafik ma'lumotlari
const chartData = {
    weekly: {
        orders: {
            labels: ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'],
            datasets: [
                {
                    label: 'Jami buyurtmalar',
                    data: [2, 1, 0, 3, 1, 2, 0],
                    backgroundColor: 'rgba(0, 120, 255, 0.8)',
                    borderColor: 'rgba(0, 120, 255, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Bajarilgan',
                    data: [1, 1, 0, 2, 1, 1, 0],
                    backgroundColor: 'rgba(40, 199, 111, 0.8)',
                    borderColor: 'rgba(40, 199, 111, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Rad etilgan',
                    data: [0, 0, 0, 1, 0, 0, 0],
                    backgroundColor: 'rgba(220, 53, 69, 0.8)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    borderWidth: 2
                }
            ]
        },
        products: {
            labels: ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'],
            datasets: [{
                label: 'Sotilgan mahsulotlar',
                data: [1, 2, 0, 1, 3, 2, 1],
                backgroundColor: 'rgba(0, 120, 255, 0.8)',
                borderColor: 'rgba(0, 120, 255, 1)',
                borderWidth: 2
            }]
        },
        users: {
            labels: ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'],
            datasets: [{
                label: 'Yangi foydalanuvchilar',
                data: [2, 1, 1, 0, 3, 1, 2],
                backgroundColor: 'rgba(0, 120, 255, 0.8)',
                borderColor: 'rgba(0, 120, 255, 1)',
                borderWidth: 2
            }]
        }
    },
    monthly: {
        orders: {
            labels: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'],
            datasets: [
                {
                    label: 'Jami buyurtmalar',
                    data: [10, 15, 8, 12, 20, 18, 15, 22, 25, 18, 12, 10],
                    backgroundColor: 'rgba(0, 120, 255, 0.8)',
                    borderColor: 'rgba(0, 120, 255, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Bajarilgan',
                    data: [8, 12, 6, 10, 15, 15, 12, 18, 20, 15, 10, 8],
                    backgroundColor: 'rgba(40, 199, 111, 0.8)',
                    borderColor: 'rgba(40, 199, 111, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Rad etilgan',
                    data: [2, 3, 2, 2, 5, 3, 3, 4, 5, 3, 2, 2],
                    backgroundColor: 'rgba(220, 53, 69, 0.8)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    borderWidth: 2
                }
            ]
        },
        products: {
            labels: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'],
            datasets: [{
                label: 'Sotilgan mahsulotlar',
                data: [15, 20, 18, 25, 30, 28, 22, 35, 40, 32, 25, 20],
                backgroundColor: 'rgba(0, 120, 255, 0.8)',
                borderColor: 'rgba(0, 120, 255, 1)',
                borderWidth: 2
            }]
        },
        users: {
            labels: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'],
            datasets: [{
                label: 'Yangi foydalanuvchilar',
                data: [5, 8, 6, 10, 12, 15, 10, 18, 20, 15, 12, 8],
                backgroundColor: 'rgba(0, 120, 255, 0.8)',
                borderColor: 'rgba(0, 120, 255, 1)',
                borderWidth: 2
            }]
        }
    },
    yearly: {
        orders: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [
                {
                    label: 'Jami buyurtmalar',
                    data: [150, 220, 180, 250, 300, 180],
                    backgroundColor: 'rgba(0, 120, 255, 0.8)',
                    borderColor: 'rgba(0, 120, 255, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Bajarilgan',
                    data: [120, 180, 150, 200, 250, 150],
                    backgroundColor: 'rgba(40, 199, 111, 0.8)',
                    borderColor: 'rgba(40, 199, 111, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Rad etilgan',
                    data: [30, 40, 30, 50, 50, 30],
                    backgroundColor: 'rgba(220, 53, 69, 0.8)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    borderWidth: 2
                }
            ]
        },
        products: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Sotilgan mahsulotlar',
                data: [200, 300, 250, 400, 450, 300],
                backgroundColor: 'rgba(0, 120, 255, 0.8)',
                borderColor: 'rgba(0, 120, 255, 1)',
                borderWidth: 2
            }]
        },
        users: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Yangi foydalanuvchilar',
                data: [50, 80, 70, 100, 120, 80],
                backgroundColor: 'rgba(0, 120, 255, 0.8)',
                borderColor: 'rgba(0, 120, 255, 1)',
                borderWidth: 2
            }]
        }
    }
};

// Grafikni yangilash
function updateChart() {
    const ctx = document.getElementById('ordersChart');

    if (ordersChart) {
        ordersChart.destroy();
    }

    ordersChart = new Chart(ctx, {
        type: 'bar',
        data: chartData[currentPeriod][currentTab],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

// Vaqt filtrlarini boshqarish
document.querySelectorAll('.chart-filters button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.chart-filters button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentPeriod = btn.textContent.toLowerCase() === 'haftalik' ? 'weekly' :
            btn.textContent.toLowerCase() === 'oylik' ? 'monthly' : 'yearly';
        updateChart();
    });
});

// Tab'larni boshqarish
document.querySelectorAll('.chart-tabs button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.chart-tabs button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentTab = btn.textContent.toLowerCase() === 'buyurtmalar' ? 'orders' :
            btn.textContent.toLowerCase() === 'mahsulotlar' ? 'products' : 'users';
        updateChart();
    });
});

// Foydalanuvchilar sahifasini ko'rsatish
function showUsersPage() {
    hideAllContent();
    usersContent.style.display = 'block';

    // Active holatni o'zgartirish
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('.nav-link:nth-child(5)').classList.add('active');
}

// Foydalanuvchilar sahifasiga o'tish
document.querySelector('.nav-link:nth-child(5) a').addEventListener('click', function (e) {
    e.preventDefault();
    showUsersPage();
});

// Foydalanuvchilarni qidirish
const userSearchInput = document.querySelector('#usersContent .search-box input');
if (userSearchInput) {
    userSearchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#usersContent tbody tr');

        rows.forEach(row => {
            const name = row.querySelector('td:first-child').textContent.toLowerCase();
            const contact = row.querySelector('.contact-info').textContent.toLowerCase();
            const role = row.querySelector('.role-badge').textContent.toLowerCase();

            if (name.includes(searchTerm) ||
                contact.includes(searchTerm) ||
                role.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Foydalanuvchilarni saralash
document.querySelectorAll('#usersContent .filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const filterType = this.querySelector('span').textContent;
        const tbody = document.querySelector('#usersContent tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        if (filterType.includes('A-Z')) {
            rows.sort((a, b) => {
                const nameA = a.querySelector('td:first-child').textContent.toLowerCase();
                const nameB = b.querySelector('td:first-child').textContent.toLowerCase();
                return nameA.localeCompare(nameB);
            });

            // Jadvaldan barcha qatorlarni o'chirish
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }

            // Saralangan qatorlarni qayta qo'shish
            rows.forEach(row => tbody.appendChild(row));
        }
    });
});

// Tahrirlash va o'chirish tugmalari
document.querySelectorAll('#usersContent .edit-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const row = this.closest('tr');
        const userName = row.querySelector('td:first-child').textContent;
        const userEmail = row.querySelector('.contact-info span:first-child').textContent;
        const userPhone = row.querySelector('.contact-info span:last-child').textContent;
        const userRole = row.querySelector('.role-badge').textContent;

        console.log('Editing user:', { userName, userEmail, userPhone, userRole });
        // TODO: Tahrirlash modalni ochish
    });
});

document.querySelectorAll('#usersContent .delete-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const row = this.closest('tr');
        const userName = row.querySelector('td:first-child').textContent;

        if (confirm(`${userName}ni o'chirishni xohlaysizmi?`)) {
            row.remove();
        }
    });
});

// Yangi foydalanuvchi qo'shish
document.getElementById('addUserBtn')?.addEventListener('click', function () {
    console.log('Adding new user');
    // TODO: Yangi foydalanuvchi qo'shish modalni ochish
});

// Buyurtmalarni yuklash
async function loadOrders() {
    try {
        const response = await fetch('/api/orders');
        const data = await response.json();

        if (data.success) {
            const ordersContainer = document.querySelector('.announcements-grid');
            ordersContainer.innerHTML = ''; // Mavjud buyurtmalarni tozalash

            data.orders.forEach(order => {
                const date = new Date(order.createdAt).toISOString().split('T')[0];

                const nameParts = order.fullname.split(' ');
                const initial = nameParts[0].charAt(0);
                const lastName = nameParts[nameParts.length - 1];
                const authorName = `${initial}. ${lastName}`;

                const card = `
                    <div class="announcement-card">
                        <div class="announcement-title">
                            <h3>Buyurtma: ${order.serviceType} - </h3>
                            <span class="status-badge">${order.status}</span>
                            <span class="customer-name">${order.fullname}</span>
                        </div>
                        <div class="announcement-details">
                            <p class="issue">${order.message}</p>
                            <p class="author">${authorName}</p>
                            <p class="date">
                                <i class='bx bx-calendar'></i>
                                ${date}
                            </p>
                        </div>
                        <div class="card-actions">
                            <button class="details-btn" onclick="showOrderDetails('${order._id}')">
                                <i class='bx bx-show'></i>
                                Tafsilotlarni ko'rish
                            </button>
                            <button class="delete-btn" onclick="deleteOrder('${order._id}')">
                                <i class='bx bx-trash'></i>
                            </button>
                        </div>
                    </div>
                `;
                ordersContainer.innerHTML += card;
            });
        }
    } catch (error) {
        console.error('Buyurtmalarni yuklashda xatolik:', error);
    }
}

// Buyurtma tafsilotlarini ko'rsatish
function showOrderDetails(orderId) {
    // Bu funksiyani keyinroq to'ldiramiz
    console.log('Order details:', orderId);
}

// Buyurtmani o'chirish
async function deleteOrder(orderId) {
    if (confirm("Haqiqatan ham bu buyurtmani o'chirmoqchimisiz?")) {
        // Bu funksiyani keyinroq to'ldiramiz
        console.log('Delete order:', orderId);
    }
}

// Sahifa yuklanganda buyurtmalarni yuklash
document.addEventListener('DOMContentLoaded', loadOrders);

// Har 30 soniyada buyurtmalarni yangilash
setInterval(loadOrders, 30000);

let currentOrderId = null;

function displayOrders(orders) {
    const ordersContainer = document.querySelector('.announcements-grid');
    ordersContainer.innerHTML = '';

    orders.forEach(order => {
        const abbreviatedName = getAbbreviatedName(order.fullName);
        const date = new Date(order.createdAt).toLocaleDateString();

        const orderCard = document.createElement('div');
        orderCard.className = 'announcement-card';
        orderCard.innerHTML = `
               <div class="announcement-header">
                   <h3>${order.serviceType}</h3>
                   <span class="status">${order.status}</span>
               </div>
               <div class="announcement-body">
                   <p><strong>Mijoz:</strong> ${order.fullName}</p>
                   <p><strong>Telefon:</strong> ${order.phoneNumber}</p>
                   <p><strong>Muammo:</strong> ${order.problem}</p>
                   <p><strong>Sana:</strong> ${date}</p>
               </div>
               <div class="announcement-footer">
                   <button onclick="showDeleteModal('${order._id}')" class="delete-btn">O'chirish</button>
               </div>
           `;
        ordersContainer.appendChild(orderCard);
    });
}

// O'chirish modal funksiyalari
function showDeleteModal(orderId) {
    currentOrderId = orderId;
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'block';
}

function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'none';
    currentOrderId = null;
}

async function confirmDelete() {
    if (!currentOrderId) return;

    try {
        const response = await fetch(`/api/orders/${currentOrderId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            closeDeleteModal();
            await fetchOrders();
        } else {
            console.error("Buyurtmani o'chirishda xatolik yuz berdi");
        }
    } catch (error) {
        console.error("O'chirishda xatolik:", error);
    }
}

// Modal oynani yopish uchun tashqi click
window.onclick = function (event) {
    const deleteModal = document.getElementById('deleteModal');
    const logoutModal = document.getElementById('logoutModal');

    if (event.target === deleteModal) {
        closeDeleteModal();
    }
    if (event.target === logoutModal) {
        closeModal();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();
    // Har 30 sekundda yangilash
    setInterval(fetchOrders, 30000);
});

