const express = require('express');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser')

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb://localhost:27017/Coursee'; 

//middelwares
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(express.static('./public'));
app.use('/uploads', express.static('./uploads'))

app.use(expressSession({
  secret: 'Something that I am not going to tell anyone!',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}))

const sessionMessage = require('./middlewares/expressSession')
app.use(sessionMessage)

//connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

//custom middlewares
const {verifyToken, verifyRoles} = require('./middlewares/verifyJWT')
const checkUser = require('./middlewares/checkUser')

//routes
app.use('/', checkUser, require('./routes/indexRoutes'))
app.use('/', require('./routes/authRoutes'))
app.use('/dashboard', verifyToken, verifyRoles(['instructor', 'student']), require('./routes/dashboardRoutes'))
app.use('/upload', verifyToken, verifyRoles(['instructor']), require('./routes/uploadRoute'))
app.use('/courses', verifyToken, require('./routes/coursesRoutes'))
app.use('/course', verifyToken, require('./routes/courseRoutes'))
app.use('/logout', verifyToken, require('./routes/logoutRoute'))
app.use('/course/checkout', verifyToken, verifyRoles(['student']), require('./routes/checkoutRoutes'))
app.use('/edit', verifyToken, verifyRoles(['instructor']), require('./routes/editRoutes'))
app.use('/watch', verifyToken, verifyRoles(['student']), require('./routes/watchRoutes'))

app.listen(PORT, () => console.log(`Server is running at port ${PORT}....`))