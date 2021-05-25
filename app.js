const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); const exphbs = require('express-handlebars');
const connectDB = require('./config/db');
const path = require('path');
const session = require('express-session');
const Handlebars = require("handlebars");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const fileUpload = require('express-fileupload');

dotenv.config({ path: './config/config.env' });

const app = express();

if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

app.engine('.hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars), defaultLayout: '',
    extname: '.hbs',
    helpers: { eq: (param1, param2) => { return param1 === param2; }, call: (obj, f, v) => { return obj[f](v); } }
}));

app.set('view engine', '.hbs');


app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: false }));

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(fileUpload());
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }));

app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/registration', require('./routes/registration'));
app.use('/validation', require('./routes/validation'));
app.use('/new_post', require('./routes/new_post'));
app.use('/new_reply', require('./routes/new_reply'));
app.use('/new_comment', require('./routes/new_comment'));
app.use('/vote', require('./routes/vote'));




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
