const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');
const path = require('path');
const session = require('express-session');
const Handlebars = require("handlebars");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const fileUpload = require('express-fileupload');
const fs = require('fs');

dotenv.config({ path: './config/config.env' });

const app = express();

if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

app.engine('.hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars), defaultLayout: '',
    extname: '.hbs',
    helpers: { eq: (param1, param2) => { return param1 === param2; }, call: (obj, f, v) => { return obj[f](v); } },
    partialsDir: path.join(__dirname, 'views', 'partials')
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

let checkUser = (req, res, next) => {
    let paths = ['/registration', '/validation', '/login',
        '/registration/registration', '/validation/validation', '/login/login'];

    if (paths.includes(req.path) || req.session.loggedIn)
        return next();
    res.redirect('/login');
};

app.all('*', checkUser);
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/registration', require('./routes/registration'));
app.use('/validation', require('./routes/validation'));
app.use('/new_post', require('./routes/new_post'));
app.use('/new_reply', require('./routes/new_reply'));
app.use('/new_comment', require('./routes/new_comment'));
app.use('/vote', require('./routes/vote'));
app.use('/reply_vote', require('./routes/reply_vote'));
app.use('/add_folder', require('./routes/add_folder'));
app.use('/edit_post', require('./routes/edit_post'));
app.use('/edit_reply', require('./routes/edit_reply'));
app.use('/edit_comment', require('./routes/edit_comment'));
app.use('/delete_post', require('./routes/delete_post'));
app.use('/delete_reply', require('./routes/delete_reply'));
app.use('/delete_comment', require('./routes/delete_comment'));
app.use('/add_document', require('./routes/add_document'));
app.use('/delete_document', require('./routes/delete_document'));
app.use('/edit_description', require('./routes/edit_description'));
app.use('/new_notifications', require('./routes/new_notifications'));
app.use('/new_module', require('./routes/new_module'));
app.use('/remove_prof', require('./routes/remove_prof'));
app.use('/add_prof', require('./routes/add_prof'));
app.use('/unsusbscribe', require('./routes/unsubscribe'));




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
