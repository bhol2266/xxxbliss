import React from 'react'
import * as cheerio from 'cheerio';
import { useState, useRef, } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import Head from 'next/head'
import PopunderAds from '../../components/Ads/Popunder';
import { SearchIcon } from '@heroicons/react/outline';

function Search({ tags }) {


    const searchInputref = useRef('')
    const router = useRouter()

    const [searchKey, setsearchKey] = useState('')
    const [tagsArray, settagsArray] = useState(tags)


    function similarity(s1, s2) {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength == 0) {
            return 1.0;
        }
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    function editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    const searchTag = (e) => {


        if (e.target.value.length <= 1) {
            settagsArray(tags)
            return
        }

        var filteredTagArray = tags.filter(keyword => {
            if (keyword.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())) {
                console.log(e.target.value.length);
                return keyword
            }
        })

        settagsArray(filteredTagArray)

    }


    return (
        <div className="basicMargin mt-3">

            <Head>
                <title>Search Porn Videos, Discover Free XXX Movies Online | CumCraze</title>
                <meta name="description"
                    content="CumCraze is known as one of the most advanced porn video search engines, offering a wide variety of full-length hardcore sex movies, short XXX video clips, and high-quality adult tube scenes. Whatever type of porn video you desire, you can count on CumCraze to deliver exactly what you're looking for!" />
                G
                <meta property="og:title" content="Search Porn Videos, Discover Free XXX Movies Online | CumCraze" />
                <meta property="og:description" content="CumCraze is known as one of the most advanced porn video search engines, offering a wide variety of full-length hardcore sex movies, short XXX video clips, and high-quality adult tube scenes. Whatever type of porn video you desire, you can count on CumCraze to deliver exactly what you're looking for!" />
                <meta name="twitter:title" content="Search Porn Videos, Discover Free XXX Movies Online | CumCraze" />
                <meta name="twitter:description" content="CumCraze is known as one of the most advanced porn video search engines, offering a wide variety of full-length hardcore sex movies, short XXX video clips, and high-quality adult tube scenes. Whatever type of porn video you desire, you can count on CumCraze to deliver exactly what you're looking for!" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href={`https://www.cumcraze.com/search`} />

            </Head>

            <PopunderAds />

            <div className={` mt-4  transition ease-in-out delay-150 `}>
                <div className='flex my-1  md:w-3/5 md:mx-auto p-2 px-3  border-[1px] border-gray-200 space-x-2 md:space-x-4 xl:px-[50px] rounded-[15px]'  >
                    <SearchIcon className='h-6 w-6 text-gray-400' />
                    <input className='focus:outline-none flex-grow  font-inter rounded-lg ' type='text' onChange={searchTag} placeholder='Search your keyword'></input>
                </div>
            </div>


            <div className='flex items-center space-x-2 mt-4'>
                <img alt='tag' src='/login/label.png' className='h-[25px] w-[25px]' />
                <h1 className='text-lg font-bold md:text-2xl font-poppins'> Popular Search Tags</h1>
            </div>

            <div className='my-2 flex flex-wrap'>
                {tagsArray.map(keyword => {
                    return (
                        <Link key={keyword} href={`/search/${keyword.trim().replace(/ /g, "+")}`}>
                            <div className='text-sm border-[1px] border-[#9499A8] text-semiblack px-2 py-1 rounded-lg my-1 mx-1.5  hover:bg-semiblack font-poppins hover:text-white md:text-lg'>
                                <h2 className='text-center'>{keyword}</h2>
                            </div>
                        </Link>
                    )
                })}
            </div>




        </div>
    )
}

export default Search



export async function getStaticProps() {


    const parcelData = { url: `https://spankbang.party/tags` };
    const API_URL = `${process.env.BACKEND_URL}getTrendingSearchTags`;
    const rawResponse = await fetch(API_URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(parcelData),
    });

    const { tags } = await rawResponse.json();




    return {
        props: {
            tags: tags
        }
    }


}

