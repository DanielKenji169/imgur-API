const axios = require('axios').default;

let i = 0
posts = 0
var listaPosts = [];
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
                const csvWriter = createCsvWriter({
                    path: 'file.csv',
                    header: [
                        { id: 'title', title: 'TITLE' },
                        { id: 'score', title: 'SCORE'},
                        { id: 'ups', title: 'UPS' },
                        { id: 'views', title: 'VIEWS' },
                        { id: 'comment_count', title: 'COMMENTS' },
                        { id: 'favorite_count', title: 'FAVORITE COUNT'},
                        { id: 'link', title: 'LINK' }
                        
                    ]
                });

async function getRequest() {
    try {
        await axios.get('https://api.imgur.com/3/gallery/t/anime/top/all/' + i + '/', {
            headers: {
                Authorization: 'Client-ID 203fcb5b264cfce'
            }        
        })
            .then(function (response) {              
                for (u = 0; u < response.data.data.items.length; u++) {
                    if (posts < 499) {
                        listaPosts.push(response.data.data.items[u])
                        posts++
                    }
                }
            })

    } catch (error) {
        console.error(error)
    }
}

async function loopPost() {
    for (z = 0; z < 10; z++) {
        await getRequest()
            .then(() => {
                i++
                console.log
            })
    }
    await writeList();
    console.log('...Done')
}

async function writeList(){    
    csvWriter.writeRecords(listaPosts)};
     
loopPost();