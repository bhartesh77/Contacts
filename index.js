const express = require('express');
const path = require('path');
const { nextTick } = require('process');
const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded()); //middleware
app.use(express.static('assets')); //static

// //middleware1
// app.use(function(req,res,next) {
//     req.myName="bhartesh";
//     console.log('middleware 1 is called');
//     next();
// });
// //middleware2
// app.use(function(req,res,next) {
//     console.log('My name from m1 is', req.myName);
//     console.log('middleware 2 is called');
//     next();
// })

var contactList = [
    {
        name: "bhartesh",
        phone: "1234567890"
    },
    {
        name: "light yagami",
        phone: "1289687580"
    },
    {
        name: "L",
        phone: "1363986183"
    }
]


app.get('/', function(req,res){ //controller
    // console.log('from the get route controller', req.myName);
    return res.render('home', {
        title: "Contacts List",
        contacts_list: contactList
    });
});

app.get('/practice', function(req,res) {
    return res.render('practice', {
        title: "ejs" 
    });
});

app.post('/create-contact', function(req,res) {
    // return res.redirect('/practice');

    contactList.push({
        name: req.body.name,
        phone: req.body.phone
    });

    return res.redirect('/');
});

app.get('/delete-contact', function(req,res) {
    let contact = req.query.phone;

    let contactIndex = contactList.findIndex(val => val.phone == contact);

    if(contactIndex != -1) {
        contactList.splice(contactIndex,1);
    }

    return res.redirect('back');
});

app.listen(port, function(err) {
    if(err) {
        console.log("Error in running the server",err);
        return;
    }
    console.log("Server is up and running on port: ", port);
    return;
});