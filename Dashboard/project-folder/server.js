const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const session = require('express-session');

const app = express();
const PORT = 3600;

mongoose.connect('mongodb://127.0.0.1:27017/Dern-Suport', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB bilan bog'landi ✅"))
    .catch((err) => console.log('MongoDB xatosi ❌:', err));


const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    phone: String,
    password: String,
    confirmPassword: String,
    accountType: String,
    company: String,
    policy: String
});

const adminSchema = new mongoose.Schema({
    fullname: String,
    password: String,
    confirmPassword: String
});

const orderSchema = new mongoose.Schema({
    phone: String,
    message: String,
    serviceType: String,
    status: { type: String, default: 'Kutilmoqda' },
    createdAt: { type: Date, default: Date.now },
    fullname: String
});

const Order = mongoose.model('order', orderSchema);
const Admin = mongoose.model('admin-data', adminSchema);
const User = mongoose.model('users-data', userSchema);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'muhammadazizxabibullayev@gmail.com',
        pass: 'pdthlkepzevdauij'
    },
    port: 587,
    secure: false,
});

const verifyCodeSchema = new mongoose.Schema({
    email: String,
    verifyCode: String,
    createdAt: { type: Date, default: Date.now, expires: 300 }
});

const VerifyCode = mongoose.model('verify-codes', verifyCodeSchema);

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/registration/verify', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'verify.html'));
});

app.get('/user-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user-login.html'));
});

app.get('/admin-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin-login.html'));
});

app.get('/admin-register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin-register.html'));
});

app.get('/master-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'master-login.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/term-conditions', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'term-conditions.html'));
});

app.get('/privacy-policy', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'privacy-policy.html'));
});

app.get('/user-panel', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/user-login');
    }
    res.sendFile(path.join(__dirname, 'views', 'user-panel.html'));
});

app.get('/admin-panel', (req, res) => {
    if (!req.session.adminId) {
        return res.redirect('/admin-login');
    }
    res.sendFile(path.join(__dirname, 'views', 'admin-panel.html'));
});

app.post('/admin-login', async (req, res) => {
    const { fullname, password } = req.body;

    try {
        const admin = await Admin.findOne({ fullname });

        if (!admin) {
            return res.status(401).send("Bunday admin mavjud emas!");
        }

        if (admin.password !== password) {
            return res.status(401).send("Parol noto'g'ri!");
        }

        req.session.adminId = admin._id;

        res.redirect('/admin-panel');
    } catch (err) {
        console.error(err);
        res.status(500).send("Serverda xatolik yuz berdi");
    }
});

app.post('/admin-register', async (req, res) => {
    const { fullname, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send("Parollar mos emas");
    }

    try {
        const newAdmin = new Admin({ fullname, password, confirmPassword });
        await newAdmin.save();

        res.redirect('/?admin=1');
    } catch (err) {
        console.error("Admin saqlashda xatolik:", err);
        res.status(500).send("Serverda xatolik yuz berdi");
    }
});

app.post('/user-login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            // Foydalanuvchi topilmadi
            return res.status(401).send("Bunday foydalanuvchi mavjud emas!");
        }

        if (user.password !== password) {
            // Parol noto'g'ri
            return res.status(401).send("Parol noto'g'ri!");
        }

        // Kirish muvaffaqiyatli, sessiyaga foydalanuvchi ma'lumotini saqlash mumkin
        req.session.userId = user._id;

        // /user-panel ga yo'naltirish
        return res.redirect('/user-panel');
    } catch (err) {
        console.error(err);
        res.status(500).send("Serverda xatolik yuz berdi");
    }
});

app.post('/register', async (req, res) => {
    const { fullname, email, phone, password, accountType, confirmPassword, company, policy } = req.body;

    try {
        const newUser = new User({ fullname, email, phone, password, accountType, confirmPassword, company, policy });
        await newUser.save();

        // Generate 4-digit verification code
        const code = Math.floor(1000 + Math.random() * 9000).toString();

        const newVerifyCode = new VerifyCode({ email, verifyCode: code });
        await newVerifyCode.save();

        // Send verification email
        const mailOptions = {
            from: 'muhammadazizxabibullayev@gmail.com',
            to: email,
            subject: 'Dern Support - Email tasdiqlash kodi',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Email Tasdiqlash</h2>
                    <p>Hurmatli ${fullname},</p>
                    <p>Sizning tasdiqlash kodingiz: <strong style="font-size: 24px;">${code}</strong></p>
                    <p>Bu kod 5 daqiqa davomida amal qiladi.</p>
                    <p>Agar siz ro'yxatdan o'tishni so'ramagan bo'lsangiz, ushbu xabarni e'tiborsiz qoldiring.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Verify code for ${email}: ${code}`);

        res.status(200).json({ message: 'User registered', email });
    } catch (err) {
        console.error('Saqlashda xatolik:', err);
        res.status(500).send('Xatolik yuz berdi');
    }
});

app.post('/verify-code', async (req, res) => {
    const { email, code } = req.body;

    try {
        const found = await VerifyCode.findOne({ email, verifyCode: code });

        if (found) {
            await VerifyCode.deleteOne({ _id: found._id });
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Serverda xatolik' });
    }
});

app.post('/submit-support', async (req, res) => {
    const { phone, message, serviceType } = req.body;

    try {
        const user = await User.findOne({ phone: phone });
        if (!user) {
            return res.status(400).json({ success: false, message: "Foydalanuvchi topilmadi" });
        }

        const newOrder = new Order({
            phone,
            message,
            serviceType,
            fullname: user.fullname,  // Foydalanuvchi ismini saqlash
            status: 'Kutilmoqda'
        });

        await newOrder.save();
        res.status(200).json({ success: true, message: "So'rov muvaffaqiyatli yuborildi" });
    } catch (err) {
        console.error('Buyurtmani saqlashda xatolik:', err);
        res.status(500).json({ success: false, message: 'Serverda xatolik yuz berdi' });
    }
});

// Admin panel uchun buyurtmalarni olish
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (err) {
        console.error('Buyurtmalarni olishda xatolik:', err);
        res.status(500).json({ success: false, message: 'Serverda xatolik yuz berdi' });
    }
});

// Buyurtma tafsilotlarini olish
app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Buyurtma topilmadi' });
        }
        res.json({ success: true, order });
    } catch (err) {
        console.error('Buyurtma tafsilotlarini olishda xatolik:', err);
        res.status(500).json({ success: false, message: 'Serverda xatolik yuz berdi' });
    }
});

// Buyurtmani o'chirish
app.delete('/api/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        await Order.findByIdAndDelete(orderId);
        res.json({ success: true, message: "Buyurtma muvaffaqiyatli o'chirildi" });
    } catch (err) {
        console.error("Buyurtmani o'chirishda xatolik:", err);
        res.status(500).json({ success: false, message: 'Serverda xatolik yuz berdi' });
    }
});

mongoose.connect('mongodb+srv://muhammadaziz:mypasswordNQpxM66YpRs1Jndt@muhammadaziz.9iinnzz.mongodb.net/Dern-Suport?retryWrites=true&w=majority&appName=Muhammadaziz', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { 
  useNewUrlParser: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} da ishlayapti ✅`);
});
