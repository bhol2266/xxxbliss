import fetchdata from 'node-fetch';
import * as cheerio from 'cheerio';
import extractUrls from "extract-urls";
import fs from 'fs';
import { log } from 'console';



var finalDataArray = []

const scrape = async (url) => {

    var thumbnailArray = []
    var TitleArray = []
    var numberofVideos = []
    var viewsArray = []
    var HrefArray = []


    const response = await fetchdata(url)
    const body = await response.text();
    const $ = cheerio.load(body)



    $('.results li a img').each((i, el) => {

        const data = $(el).attr("src")
        thumbnailArray.push(data)


    })

    $('.title').each((i, el) => {

        const data = $(el).text()
        TitleArray.push(data)
    })

    $('.views').each((i, el) => {

        const data = $(el).text()
        viewsArray.push(data)
    })



    $('.results li a span:nth-child(3)').each((i, el) => {

        const data = $(el).text()
        numberofVideos.push(data)
    })



    $('.results .image').each((i, el) => {

        const data = $(el).attr("href")
        HrefArray.push(data)


    })





    for (let index = 0; index < thumbnailArray.length; index++) {

        finalDataArray.push({
            Name: TitleArray[index],
            thumbnail: ` https:${thumbnailArray[index]}`,
            numberofVideos: numberofVideos[index],
            views: viewsArray[index],
            href: HrefArray[index],


        })

    }

}



for (let page = 1; page <= 109; page++) {

    await scrape(`https://spankbang.party/pornstars/${page}`)

    fs.writeFileSync(`JsonData/pornstars/page${page}.json`, JSON.stringify(finalDataArray))
    finalDataArray = []

    console.log(`Completed Page-${page} !`);

}



