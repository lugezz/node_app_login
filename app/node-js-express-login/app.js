const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();

const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
    database: 'nodejs_login'
};

const sessionStore = new MySQLStore(options);

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

app.listen(3000, (req, res) => {
    console.log('Server is running at port 3000');
    }
);

app.get('/', (req, res) => {
    req.username = 'admin';
    req.password = 'admin';
    req.role = 'admin';
    req.session.count = req.session.count ? ++req.session.count : 1;
    res.send(`Welcome to Node.js Express Login Tutorial - Count: ${req.session.count} for ${req.username}`);
}
);