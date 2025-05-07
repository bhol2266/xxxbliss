import fetchdata from 'node-fetch';
import fs from "fs"
import * as cheerio from 'cheerio';


var tags = []



const scrape = async (url, index) => {

    var tags = []
    const response = await fetchdata(url)
    const body = await response.text();
    const $ = cheerio.load(body)



    $('#tags li a').each((i, el) => {
        const data = $(el).text()
        tags.push(data)
    })

    var sortedArray = tags.filter(function (item, index, inputArray) {
        return inputArray.indexOf(item) == index;
    });




    fs.writeFileSync(`JsonData/tags/${abcdArray[index]}.json`, JSON.stringify(sortedArray))
    tags = []

}


const abcdArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

for (let index = 0; index < abcdArray.length; index++) {

    await scrape(`https://www.xnxx.com/tags/${abcdArray[index]}`, index)
    console.log("Page: " + abcdArray[index], tags.length);

}
