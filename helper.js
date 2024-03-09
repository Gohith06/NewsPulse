async function fetchNews(category,language){
    try{
        const url = `https://newsapi.org/v2/top-headlines?`+
                    `category=${category}`+
                    `&language=${language}`;

        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${'f292bd2f3c60471da918a1bd1ada24ee'}`  
        }
    });

    const data = await response.json();
    return data.articles;
    }
    catch(e){
        console.log(e.message);
    }
}

module.exports = fetchNews;