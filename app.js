const express = require("express");
const path = require("path");
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

    try{
        const category = "business";
        const language = "en";
        const response = await fetch(`https://newsapi.org/v2/top-headlines?`+
                                     `category=${category}`+
                                     `&language=${language}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${'f292bd2f3c60471da918a1bd1ada24ee'}`  
        }
    });

    const data = await response.json();
    //console.log(data);
    const articles = data.articles;
    console.log(category)
    console.log(articles);  

    res.send("<h1>Business</h1>");
    }
    catch(e){
        console.log(e.message);
    }

});

app.get('/entertainment', async(req,res) => {

    try{
        const category = "entertainment";
        const language = "en";
        const response = await fetch(`https://newsapi.org/v2/top-headlines?`+
                                     `category=${category}`+
                                     `&language=${language}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${'f292bd2f3c60471da918a1bd1ada24ee'}`  
        }
    });

    const data = await response.json();
    //console.log(data);
    const articles = data.articles;
    console.log(category)
    console.log(articles);  

    res.send("<h1>Entertainment</h1>");
    }
    catch(e){
        console.log(e.message);
    }

});

app.get('/general', async(req,res) => {

    try{
        const category = "general";
        const language = "en";
        const response = await fetch(`https://newsapi.org/v2/top-headlines?`+
                                     `category=${category}`+
                                     `&language=${language}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${'f292bd2f3c60471da918a1bd1ada24ee'}`  
        }
    });

    const data = await response.json();
    //console.log(data);
    const articles = data.articles;
    console.log(category)
    console.log(articles);  

    res.send("<h1>General</h1>");
    }
    catch(e){
        console.log(e.message);
    }

});

app.get('/health', async(req,res) => {

    try{
        const category = "health";
        const language = "en";
        const response = await fetch(`https://newsapi.org/v2/top-headlines?`+
                                     `category=${category}`+
                                     `&language=${language}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${'f292bd2f3c60471da918a1bd1ada24ee'}`  
        }
    });

    const data = await response.json();
    //console.log(data);
    const articles = data.articles;
    console.log(category)
    console.log(articles);  

    res.send("<h1>Health</h1>");
    }
    catch(e){
        console.log(e.message);
    }

});

app.get('/science', async(req,res) => {

    try{
        const category = "science";
        const language = "en";
        const response = await fetch(`https://newsapi.org/v2/top-headlines?`+
                                     `category=${category}`+
                                     `&language=${language}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${'f292bd2f3c60471da918a1bd1ada24ee'}`  
        }
    });

    const data = await response.json();
    //console.log(data);
    const articles = data.articles;
    console.log(category)
    console.log(articles);  

    res.send("<h1>Science</h1>");
    }
    catch(e){
        console.log(e.message);
    }

});

app.get('/sports', async(req,res) => {

    try{
        const category = "sports";
        const language = "en";
        const response = await fetch(`https://newsapi.org/v2/top-headlines?`+
                                     `category=${category}`+
                                     `&language=${language}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${'f292bd2f3c60471da918a1bd1ada24ee'}`  
        }
    });

    const data = await response.json();
    //console.log(data);
    const articles = data.articles;
    console.log(category)
    console.log(articles);  

    res.send("<h1>Sports</h1>");
    }
    catch(e){
        console.log(e.message);
    }

});

app.get('/technology', async(req,res) => {

    try{
        const category = "technology";
        const language = "en";
        const response = await fetch(`https://newsapi.org/v2/top-headlines?`+
                                     `category=${category}`+
                                     `&language=${language}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${'f292bd2f3c60471da918a1bd1ada24ee'}`  
        }
    });

    const data = await response.json();
    //console.log(data);
    const articles = data.articles;
    console.log(category)
    console.log(articles);  

    res.send("<h1>Technology</h1>");
    }
    catch(e){
        console.log(e.message);
    }

});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});