const express = require("express");
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require("path");
const session = require('express-session')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const {fetchNews, fetchSummary, searchNews} = require("./helper");

const app = express();

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static("public"))
app.set("views", path.join(__dirname,"/views"));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: "senbundle",
    resave: true,
    saveUninitialized: true
}));

const mongo_connect_uri = "mongodb+srv://gohith06:77c8UcdhE8k2UMfW@sign-ups.m6u5sic.mongodb.net/NewsPulse?retryWrites=true&w=majority&appName=Sign-ups";

mongoose.set('strictQuery', true);
mongoose.connect(mongo_connect_uri)
.then( () => {
  console.log("Connection established with mongodb!!");
})
.catch( (err) => {
  console.log("Error in establishing connection with mongodb");
  console.log(err);
});

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}

let newsData = []
let newsToUpdate = null;

app.get('/', async(req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    //console.log(req.body)
    const user = new User({ username, password })
    //console.log(user)
    await user.save();
    //req.session.user_id = user._id;
    const flag = "reg"
    res.render('login', {flag})
})

app.get('/login', (req, res) => {
    const flag = "login"
    res.render('login', {flag})
})

app.post('/login', async(req, res) => {
    const { password, username } = req.body;
    const validUser = await User.findAndValidate(username, password);
    if(validUser){
        req.session.user_id = validUser._id;
        res.redirect('/general')
    }
    else{
        const flag = "invalid"
        console.log("Invalid credentials")
        res.render('login', {flag})
    }
})

app.post('/logout', (req, res) => {
    req.session.user_id = null
    res.redirect('/login')
})

app.get('/business', requireLogin, async(req,res) => {

    const category = "BUSINESS"
    newsData = await fetchNews("business", "en")
    const flag = newsData.length === 0? false: true;
    // console.log('business')
    // console.log(newsData)
    res.render('cards', {newsData, category, flag});
    //res.send("<h1>Business</h1>");

});


// app.get('/business/:id', requireLogin, async(req, res) => {
//     const nid = req.params.id;
//     const foundNews = newsData.find(item => item.id === nid);
//     // console.log(nid)
//     // console.log(foundNews.content)
    
//     const currentIndex = newsData.findIndex(item => item.id === nid);

//     const prevIndex = currentIndex > 0 ? currentIndex - 1 : null;
//     const nextIndex = currentIndex < newsData.length - 1 ? currentIndex + 1 : null;

//     const prevPost = prevIndex !== null ? newsData[prevIndex] : null;
//     const nextPost = nextIndex !== null ? newsData[nextIndex] : null;

//     const newsToSummarize = {data: foundNews.content , percentage: 0.5}
//     const summarizedNews = await fetchSummary(newsToSummarize)
//     //console.log(summarizedNews)
    
//     res.render('readmore', { foundNews, summarizedNews, prevPost, nextPost }); 
// })

app.get('/entertainment', requireLogin, async(req,res) => {

    const category = "ENTERTAINMENT"
    newsData = await fetchNews("entertainment", "en")
    const flag = newsData.length === 0? false: true;
    console.log('entertainmentNews')
    console.log(newsData)
    res.render('cards', {newsData, category, flag});
    //res.send("<h1>Entertainment</h1>");

});

// app.get('/entertainment/:id', requireLogin, async(req, res) => {
//     const nid = req.params.id;
//     console.log(nid)
//     const foundNews  = newsData.find(item => item.id === nid)
//     console.log(foundNews.content)
//     const newsToSummarize = {data: foundNews.content , percentage: 0.5}
//     const summarizedNews = await fetchSummary(newsToSummarize)
//     console.log(summarizedNews)
//     res.render('readmore', {foundNews, summarizedNews})
// })

app.get('/general', requireLogin, async(req,res) => {

    const category = "GENERAL"
    newsData = await fetchNews("general", "en")
    const flag = newsData.length === 0? false: true;
    console.log('general')
    console.log(newsData)
    res.render('cards', {newsData, category, flag});
    //res.send("<h1>General</h1>");

});

// app.get('/general/:id', requireLogin, async(req, res) => {
//     const nid = req.params.id;
//     console.log(nid)
//     const foundNews  = newsData.find(item => item.id === nid)
//     console.log(foundNews.content)
//     const newsToSummarize = {data: foundNews.content , percentage: 0.5}
//     const summarizedNews = await fetchSummary(newsToSummarize)
//     console.log(summarizedNews)
//     res.render('readmore', {foundNews, summarizedNews})
// })

app.get('/health', requireLogin, async(req,res) => {

    const category = "HEALTH"
    newsData = await fetchNews("health", "en")
    const flag = newsData.length === 0? false: true;
    console.log('health')
    console.log(newsData)
    res.render('cards', {newsData, category, flag});
    //res.send("<h1>Health</h1>");

});

// app.get('/health/:id', requireLogin, async(req, res) => {
//     const nid = req.params.id;
//     console.log(nid)
//     const foundNews  = newsData.find(item => item.id === nid)
//     console.log(foundNews.content)
//     const newsToSummarize = {data: foundNews.content , percentage: 0.5}
//     const summarizedNews = await fetchSummary(newsToSummarize)
//     console.log(summarizedNews)
//     res.render('readmore', {foundNews, summarizedNews})
// })

app.get('/science',requireLogin, async(req,res) => {

    const category = "SCIENCE"
    newsData = await fetchNews("science", "en")
    const flag = newsData.length === 0? false: true;
    console.log('science')
    console.log(newsData)
    res.render('cards', {newsData, category, flag});
    //res.send("<h1>Science</h1>");

});

// app.get('/science/:id', requireLogin, async(req, res) => {
//     const nid = req.params.id;
//     console.log(nid)
//     const foundNews  = newsData.find(item => item.id === nid)
//     console.log(foundNews.content)
//     const newsToSummarize = {data: foundNews.content , percentage: 0.5}
//     const summarizedNews = await fetchSummary(newsToSummarize)
//     console.log(summarizedNews)
//     res.render('readmore', {foundNews, summarizedNews})
// })

app.get('/sports', requireLogin, async(req,res) => {

    const category = "SPORTS"
    newsData = await fetchNews("sports", "en")
    const flag = newsData.length === 0? false: true;
    console.log('sports')
    console.log(newsData)
    res.render('cards', {newsData, category, flag});
    //res.send("<h1>Sports</h1>");

});

// app.get('/sports/:id', requireLogin, async(req, res) => {
//     const nid = req.params.id;
//     console.log(nid)
//     const foundNews  = newsData.find(item => item.id === nid)
//     console.log(foundNews.content)
//     const newsToSummarize = {data: foundNews.content , percentage: 0.5}
//     const summarizedNews = await fetchSummary(newsToSummarize)
//     console.log(summarizedNews)
//     res.render('readmore', {foundNews, summarizedNews})
// })

app.get('/technology', requireLogin, async(req,res) => {

    const category = "TECHNOLOGY"
    newsData = await fetchNews("technology", "en")
    const flag = newsData.length === 0? false: true;
    console.log('technology')
    console.log(newsData)
    res.render('cards', {newsData, category, flag});
    //res.send("<h1>Technology</h1>");

});

// app.get('/technology/:id', requireLogin, async(req, res) => {
//     const nid = req.params.id;
//     console.log(nid)
//     const foundNews = newsData.find(item => item.id === nid)
//     console.log(foundNews.content)
//     const newsToSummarize = {data: foundNews.content , percentage: 0.5}
//     const summarizedNews = await fetchSummary(newsToSummarize)
//     console.log(summarizedNews)
//     res.render('readmore', {foundNews, summarizedNews})
// })

app.post('/search', requireLogin, async(req, res) => {
    const {q, country, from, to} = req.body

    console.log(q)
    console.log(country)
    console.log(from)
    console.log(to)

    //let category = q.replace(/,/g, "");
    let category = q.split(" ");
    
    for (let i = 0; i < category.length; i++) {
        category[i] = category[i].charAt(0).toUpperCase() + category[i].slice(1);
    }
    //category = category.split(",")
    //category = category.join(" ")
    category = category.toString()
    category = category.split(",").join(" ")
    
    newsData = await searchNews(q, country, from, to)
    const flag = newsData.length === 0? false: true;
    console.log(newsData)
    res.render('cards', {newsData, category, flag});
})

app.get('/summary/:id', requireLogin, async(req, res) => {
    const nid = req.params.id;
    //const category = req.params.category;
    const foundNews = newsData.find(item => item.id === nid);
     console.log(nid)
     console.log("Original_text: "+foundNews.content)
    newsToUpdate = foundNews.content
    const currentIndex = newsData.findIndex(item => item.id === nid);

    const prevIndex = currentIndex > 0 ? currentIndex - 1 : null;
    const nextIndex = currentIndex < newsData.length - 1 ? currentIndex + 1 : null;

    const prevPost = prevIndex !== null ? newsData[prevIndex] : null;
    const nextPost = nextIndex !== null ? newsData[nextIndex] : null;

    const newsToSummarize = {data: foundNews.content , percentage: 0.5}
    const summarizedNews = await fetchSummary(newsToSummarize)
    console.log("Summarized_text: "+summarizedNews)
    
    res.render('readmore', { foundNews, summarizedNews, prevPost, nextPost });
})

app.post('/updatesummary', async (req, res) => {
    try {
        const { percentage } = req.body;
        //console.log("---------------------"+newsToUpdate, percentage+"-------------------------------")
        // Assuming you have a function to fetch summary
        const newsToSummarize = {data: newsToUpdate, percentage: percentage}
        const summarizedNews = await fetchSummary(newsToSummarize);
        console.log(summarizedNews)
        // Sending the updated summary back to the client
        res.json({ summarizedNews });
    } catch (error) {
        console.error('Error updating summary:', error);
        res.status(500).json({ error: 'An error occurred while updating summary' });
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

// app.get('/:category/:id', async(req, res) => {
//     const nid = req.params.id;
//     const category = req.params.category;
//     console.log(nid)
//     console.log(category)
//     const foundNews  = newsData.find(item => item.id === nid)
//     console.log(foundNews.content)
//     const newsToSummarize = {data: foundNews.content , percentage: 0.5}
//     const summarizedNews = await fetchSummary(newsToSummarize)
//     console.log(summarizedNews)
//     res.render('readmore', {foundNews, summarizedNews})
// })