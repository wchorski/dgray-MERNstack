
if(!process.env.NODE_ENV) {
  require('dotenv').config();
  console.log('***** dotenv: ' + process.env.NODE_ENV);
} else {
  console.log('**** dotenv: ' + process.env.NODE_ENV);
}

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3001;


// Connect to MongoDB
connectDB();
app.set("trust proxy", 1);
// app.set('trust proxy', (ip) => {
//   if (ip === '127.0.0.1' || ip === '192.168.0.100') return true // trusted IPs
//   else return false
// })

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));


// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());
app.set('json spaces', 2) //? prettyfiy json in browser

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/',          require('./routes/root'));
app.use('/root',          require('./routes/root'));
app.use('/register',  require('./routes/register'));
app.use('/auth',      require('./routes/auth'));
app.use('/refresh',   require('./routes/refresh'));
app.use('/logout',    require('./routes/logout'));

app.use(verifyJWT);
app.use('/posts',    require('./routes/posts'));
app.use('/employees',  require('./routes/api/employees'));
app.use('/users',      require('./routes/api/users'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('-- Connected to MongoDB --');
    app.listen(PORT, () => console.log(`-- Server running on port ${PORT} --`));
});

// * default login if no users are found in db
const defaultAdmin = require('./config/defaultAdmin')
defaultAdmin()
// * default posts if no posts are found in db
const defaultPosts = require('./config/defaultPosts')
defaultPosts()
