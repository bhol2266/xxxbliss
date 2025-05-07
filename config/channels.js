import * as cheerio from 'cheerio';
import { Scrape_Video_Item } from './Scrape_Video_Item';


export const scrapeChannelpage = async (url) => {

    var finalDataArray = []
    var trendingChannels = []
    var newChannels = []
    var pages = []



    const response = await fetch(url)
    const body = await response.text();
    const $ = cheerio.load(body)

    const firstUl = $('#channels ul').first();
    firstUl.find('li a:nth-child(2)').each((index, element) => {
        trendingChannels.push($(element).text())
    });

    const secondUl = $('#channels ul').eq(1);
    secondUl.find('li a:nth-child(2)').each((index, element) => {
        newChannels.push($(element).text())
    });


    finalDataArray= Scrape_Video_Item($)



    $('.paginate-bar .status').each((i, el) => {
        const data = $(el).text().replace("page", '')
        pages = data.split('/')
    })

    if (pages.length === 0) {
        //This is for pornstar page bacause the pornstar page is not updated to new 
        let tempArray = []
        $('.pagination ul li').each((i, el) => {
            const data = $(el).text()
            tempArray.push(data)

        })
        if (tempArray.length !== 0) {
            pages.push(tempArray[1])
            pages.push(tempArray[tempArray.length - 2])
        }
    }




    return { finalDataArray, pages, newChannels, trendingChannels };
}


