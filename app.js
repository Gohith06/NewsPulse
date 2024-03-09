const express = require("express");
const path = require("path");
const fetchNews = require("./helper");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"))
app.set("views", path.join(__dirname,"/views"));
app.use(express.urlencoded({extended: true}));

app.get('/', async(req,res) => {
    //res.send("<h1>HOME</h1>");
    res.render('home');
});

app.get('/business', async(req,res) => {

    const data = await fetchNews("business", "en")
    console.log('business')
    console.log(data)
    res.send("<h1>Business</h1>");

});

app.get('/entertainment', async(req,res) => {

    const data = await fetchNews("entertainment", "en")
    console.log('entertainment')
    console.log(data)
    res.send("<h1>Entertainment</h1>");

});

app.get('/general', async(req,res) => {

    const data = await fetchNews("general", "en")
    console.log('general')
    console.log(data)
    res.send("<h1>General</h1>");

});

app.get('/health', async(req,res) => {

    const data = await fetchNews("health", "en")
    console.log('health')
    console.log(data)
    res.send("<h1>Health</h1>");

});

app.get('/science', async(req,res) => {

    const data = await fetchNews("science", "en")
    console.log('science')
    console.log(data)
    res.send("<h1>Science</h1>");

});

app.get('/sports', async(req,res) => {

    const data = await fetchNews("sports", "en")
    console.log('sports')
    console.log(data)
    res.send("<h1>Sports</h1>");

});

app.get('/technology', async(req,res) => {

    const data = await fetchNews("technology", "en")
    console.log('technology')
    console.log(data)
    res.send("<h1>Technology</h1>");

});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});