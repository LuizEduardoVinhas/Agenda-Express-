require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const helmet = require('helmet')
const csrf = require('csurf')

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('Conectei á base de dados.')
        app.emit('pronto')
    })
    .catch(e => console.log('Error ao conectar ao banco de dados', e));

const session = require('express-session')
const connectMongo = require('connect-mongo');
const MongoStore = connectMongo.default || connectMongo;
const flash = require('connect-flash')

const sessionOptions = session({
    secret: 'abc123',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})
app.use(sessionOptions)
app.use(flash())

app.use(helmet())

const routes = require('./routes');
const path = require('path')
const { middlewareGlobal,checkCsrfError,csrfMiddleware } = require('./src/middlewares/middlewaresGlobal')

app.use(express.urlencoded({ extended: true }));
app.use(csrf())
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('servidor executando na porta 3000')
    });
});