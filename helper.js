const { v4: uuidv4 } = require('uuid');

// function filter(data){

//     let news = [];
//     for(let i of data)
//     {
//         if(!i.source.name || !i.author || !i.title || !i.description || !i.url || !i.urlToImage || !i.publishedAt || !i.content)
//             continue;

//         i.id = uuidv4();
//         news.push(i);
//     }

//     return news;
// }

function addId(data){
    let news = []
    for(let i of data){
        i.id = uuidv4()
        news.push(i)
    }
        
    return news
}

async function fetchNews(category,language){
    try{
        const apiKey = '7272b799e271993e0d8b758c674440f9'
        const url = `https://gnews.io/api/v4/top-headlines?`+
                    `category=${category}`+
                    `&lang=${language}`+
                    `&max=25`+
                    `&nullable=None`+
                    `&expand=content`+
                    `&apikey=${apiKey}`;
          
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    // return filter(data.articles);
    return addId(data.articles)
    }
    catch(e){
        console.log(e.message);
    }
}

async function fetchSummary(news) {
    try {
        const response = await fetch('http://127.0.0.1:5000/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(news)
        });

        const data = await response.json();
        return data.summary
        //console.log('Received summary from Flask server:', data.summary);
    } catch (error) {
        console.error('Error communicating with Flask server:', error.message);
    }
}

async function searchNews(q, country, from, to){

    try{
        let url = 'https://gnews.io/api/v4/search?';
        const apiKey = '38c90b5b5e3644c33f55e5ede8f2cc02';

        if (q) url += `q=${encodeURIComponent(q)}`;
        url += `&lang=en`;
        url += `&max=25`;
        if (country !== 'NULL') url += `&country=${country}`;
        url += `&nullable=None`;
        if (from) url += `&from=${from}`;
        if (to) url += `&to=${to}`;
        url += `&sortby=publishedAt`;
        url += `&expand=content`;
        url += `&apikey=${apiKey}`;
        console.log(url)

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data)
        return addId(data.articles)
    }
    catch(e){
        console.log(e.message)
    }
    
}

module.exports = { fetchNews, fetchSummary, searchNews }