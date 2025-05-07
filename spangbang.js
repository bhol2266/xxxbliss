import fetchdata from 'node-fetch';
import * as cheerio from 'cheerio';
import extractUrls from "extract-urls";
import fs from 'fs';



var finalDataArray = []
var pages = []

const scrape = async (url) => {

    var thumbnailArray = []
    var TitleArray = []
    var durationArray = []
    var likedPercentArray = []
    var viewsArray = []
    var previewVideoArray = []
    var hrefArray = []


    const response = await fetchdata(url)
    const body = await response.text();
    const $ = cheerio.load(body)





    $('.video-list.video-rotate.video-list-with-ads .video-item picture img').each((i, el) => {

        const data = $(el).attr("data-src")
        thumbnailArray.push(data)


    })

    $('.video-list.video-rotate.video-list-with-ads .video-item picture img').each((i, el) => {

        const data = $(el).attr("alt")
        TitleArray.push(data)


    })
    $('.video-list.video-rotate.video-list-with-ads .video-item .l').each((i, el) => {

        const data = $(el).text()
        durationArray.push(data)
    })



    $('.video-list.video-rotate.video-list-with-ads .video-item .stats').each((i, el) => {

        const views = $(el).children().eq(1).text()

        const likedPercent = $(el).children().eq(2).text()
        if (views.includes('%')) {
            likedPercentArray.push(views)
            viewsArray.push(likedPercent)

        } else {
            viewsArray.push(views)
            likedPercentArray.push(likedPercent)
        }
    })


    $('.video-list.video-rotate.video-list-with-ads .video-item picture img').each((i, el) => {

        const data = $(el).attr("data-preview")
        previewVideoArray.push(data)
    })



    $('.video-list.video-rotate.video-list-with-ads .video-item').each((i, el) => {

        const data = $(el).children().eq(1).attr("href")
        if (data) {
            hrefArray.push(`https://spankbang.party${data}`)
        }


    })
    $('.pagination ul li').each((i, el) => {


        const data = $(el).text()
        pages.push(data)


    })






    for (let index = 0; index < thumbnailArray.length; index++) {

        if (hrefArray[index] != undefined && previewVideoArray[index] != undefined && !thumbnailArray[index].includes("//assets.sb-cd.com")) {

            finalDataArray.push({
                thumbnailArray: thumbnailArray[index],
                TitleArray: TitleArray[index],
                durationArray: durationArray[index],
                likedPercentArray: likedPercentArray[index],
                viewsArray: viewsArray[index],
                previewVideoArray: previewVideoArray[index],
                hrefArray: hrefArray[index],

            })
        }
    }


    if (finalDataArray.length < 2) {
        console.log('!!! ALERT !!!');
        fs.writeFileSync('Home.html', body)
    }
}

const categories = [
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/1.jpg',
        Title: 'Amateur'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/2.jpg',
        Title: 'Anal'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/3.jpg',
        Title: 'Asian'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/4.jpg',
        Title: 'Babe'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/5.jpg',
        Title: 'BBW'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/48.jpg',
        Title: 'Big Ass'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/6.jpg',
        Title: 'Big Dick'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/7.jpg',
        Title: 'Big Tits'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/41.jpg',
        Title: 'Blonde'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/8.jpg',
        Title: 'Blowjob'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/9.jpg',
        Title: 'Bondage'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/49.jpg',
        Title: 'Brunette'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/50.jpg',
        Title: 'Cam'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/38.jpg',
        Title: 'Compilation'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/10.jpg',
        Title: 'Creampie'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/11.jpg',
        Title: 'Cumshot'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/12.jpg',
        Title: 'Deep Throat'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/13.jpg',
        Title: 'DP'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/14.jpg',
        Title: 'Ebony'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/17.jpg',
        Title: 'Fetish'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/18.jpg',
        Title: 'Fisting'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/37.jpg',
        Title: 'Gay'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/19.jpg',
        Title: 'Groupsex'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/20.jpg',
        Title: 'Handjob'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/21.jpg',
        Title: 'Hardcore'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/39.jpg',
        Title: 'Hentai'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/15.jpg',
        Title: 'Homemade'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/46.jpg',
        Title: 'Indian'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/22.jpg',
        Title: 'Interracial'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/47.jpg',
        Title: 'Japanese'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/23.jpg',
        Title: 'Latina'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/24.jpg',
        Title: 'Lesbian'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/25.jpg',
        Title: 'Massage'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/26.jpg',
        Title: 'Masturbation'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/27.jpg',
        Title: 'Mature'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/28.jpg',
        Title: 'MILF'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/30.jpg',
        Title: 'POV'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/40.jpg',
        Title: 'Redhead'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/32.jpg',
        Title: 'Shemale'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/43.jpg',
        Title: 'Small Tits'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/33.jpg',
        Title: 'Solo'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/34.jpg',
        Title: 'Squirt'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/42.jpg',
        Title: 'Striptease'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/35.jpg',
        Title: 'Teen'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/44.jpg',
        Title: 'Threesome'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/36.jpg',
        Title: 'Toy'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/45.jpg',
        Title: 'Vintage'
    },
    {
        thumbnailImage: 'https://spankbang.party//static/desktop/Images/categories/ids/51.jpg',
        Title: 'VR'
    }
]

for (let index = 0; index < categories.length; index++) {

    await scrape(`https://spankbang.party/category/${categories[index].Title}`)
    if (finalDataArray.length > 2) {
        console.log(`Completed Page-${index + 1} : ${categories[index].Title} `);
    }
    fs.writeFileSync(`JsonData/category/${categories[index].Title.toLowerCase()}.json`, JSON.stringify({ data: finalDataArray, pages: pages }))
    finalDataArray = []
    pages=[]

}



