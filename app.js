const express = require('express');
const fs = require('fs');
const pug = require('pug');
const mongoose = require('mongoose');

//-------------Connecting to mongoDB----------------
mongoose.connect('mongodb://localhost:27017/Transparent_forms_detail', { useNewUrlParser: true, useUnifiedTopology: true });



//Checking for MongoDB proper connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('mongoDB database connected')
});


//--------------To traverse DOM in nodejs-----------


const jsdom = require("jsdom"); 
const { JSDOM } = jsdom;
global.document = new JSDOM('127.0.0.1:8000').window.document;

//-------creating express app---------

const app = express();

//-------declaring host and port---------

const hostname = '127.0.0.1';
const port = 8000;



//--------PUG INTEGRATION ----------
app.set('view engine', 'pug');


//------Handling get request of / -------
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' })
})

//------Handling get request of /home -------
app.get('/home', (req, res) => {
    res.render('home', { title: 'Home' })
})

//------Handling get request of /login -------
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', display__message: 'Please Login' })
})

//------Handling get request of /signup -------
app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign up', display__message: 'Please Signup' })
})

//------Handling get request of /contact -------
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact', display__message: 'Enter Details' })
})



app.use(express.urlencoded());



//--------------LOGIN PAGE-----------------


//Creating login Schema 
const LoginSchema = new mongoose.Schema({
    mail: String,
    password: String,
    phone: String
});

//Creating model of loginSchema
const Login = mongoose.model('Login_details', LoginSchema);



//----Handling post req of form submission from login page----

app.post('/login', (req, res) => {
    const body = req.body;
    console.log('Login details : ' + body.mail, body.password, body.phone);

    if (body.mail.length <= 1 || body.password.length <= 1 || body.phone.length <= 1) {

        res.render('login', { title: 'Login', display__message: 'Enter Correct Details To Login' });
    }
    else {

        setTimeout(function Redirect_home_from_loginPage() {
            res.render('home', { title: 'Home', display__message: 'Form Submitted' });
        }, 2000)


        //creating document
        const loginObj = new Login({
            mail: body.mail,
            password: body.password,
            phone: body.phone
        });

        //Saving Object
        loginObj.save(function (err, loginObj) {
            if (err) return console.error(err);
            console.log('Data Saved at Login_Details')
        });

    }

})
// Login.find((err, Logins) => {
//     if (err) return console.error(err);
//     console.log(Logins);
// })




//--------------SIGNUP PAGE-----------------


//Creating signup Schema 
const SignupSchema = new mongoose.Schema({
    mail: String,
    mail: String,
    password: String,
    phone: String
});

//Creating model of loginSchema
const Signup = mongoose.model('Signup_details', SignupSchema);



//Handling post req of form submission from signup page 
app.post('/signup', (req, res) => {
    const body = req.body;
    console.log('Signup Details : ' + body.name, body.mail, body.password, body.phone);
    if (body.name.length <= 1, body.mail.length <= 1 || body.password.length <= 1 || body.phone.length <= 1) {

        res.render('signup', { title: 'Sign Up', display__message: 'Fill Up All Fields To SignUp' });
    }
    else {
        setTimeout(function Redirect_home_from_signupPage() {
            res.render('home', { title: 'Home', display__message: 'Form Submitted' });
        }, 2000)


        //creating document
        const signinObj = new Signup({
            name: body.name,
            mail: body.mail,
            password: body.password,
            phone: body.phone
        });

        //Saving Object
        signinObj.save(function (err, signinObj) {
            if (err) return console.error(err);
            console.log('Data Saved at Signup_details')
        });

    }

})
// Signup.find( (err, Signups) => {
//     if (err) return console.error(err);
//     console.log(Signups);
//   })


//--------------CONTACT PAGE-----------------


//Creating contact Schema 
const ContactSchema = new mongoose.Schema({
    name: String,
    mail: String,
    password: String,
    phone: String
});

//Creating model of loginSchema
const Contact = mongoose.model('Contact_details', ContactSchema);




//Handling post req of form submission from Contact page 
app.post('/contact', (req, res) => {
    const body = req.body;
    console.log('Contact Details : ' + body.name, body.mail, body.password, body.phone);
    if (body.name.length <= 1, body.mail.length <= 1 || body.password.length <= 1 || body.phone.length <= 1) {

        res.render('contact', { title: 'Contact', display__message: 'Cant submit empty contact form' });
    }
    else {
        setTimeout(function Redirect_home_from_contactPage() {
            res.render('home', { title: 'Home', display__message: 'Form Submitted' });
        }, 2000)



        //creating document
        const contactObj = new Contact({
            name: body.name,
            mail: body.mail,
            password: body.password,
            phone: body.phone
        });

        //Saving Object
        contactObj.save(function (err, contactObj) {
            if (err) return console.error(err);
            console.log('Data Saved at Contact_details')
        });

    }

})

// Contact.find( (err, Contacts) => {
//     if (err) return console.error(err);
//     console.log(Contacts);
//   })




try {
    app.listen(port, hostname, () => {
        console.log(`I am running at  http://${hostname}:${port}`);
    })
} catch (error) {
    console.log("Host could not be connected")
}
