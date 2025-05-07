import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { FaEye, FaVideo } from "react-icons/fa";

import Head from 'next/head'
import PopunderAds from '@/components/Ads/Popunder';
import channels from "../../../JsonData/Channels.json"
import Pagination from '../../../components/Pagination';

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function Index({ finalDataArray, pages }) {

    const router = useRouter();
    const { page } = router.query;


    const customiseUrl = (channel_href) => {

        const creatorCode = channel_href.substring(1, channel_href.indexOf("/creator"))
        const creatorName = channel_href.substring(channel_href.indexOf("/creator/") + 9, channel_href.length - 1)
        return `/creators/${creatorCode}/${creatorName}`
    }


    return (

        <div className="">
            <div className='basicMargin'>

                <Head>

                    <title>Hot Porn Creators and Exclusive Adult Videos - Cumcraze</title>
                    <meta name="description" content="The Hottest Japanese Porn Movies Divided By Channels! Discover on JAV HD the Best XXX JAV Channels & Free Sex Scenes: JAVHD, CARIBBEANCOM, JAVHUB, JAPANHDV" />
                    <meta name="keywords" content="porn, xxx, streaming porn, HD porn, HD adult videos, HD pussy videos, sex movies, Cumcraze" />
                    <meta property="og:title" content="Hot Porn Creators and Exclusive Adult Videos - Cumcraze" />
                    <meta property="og:description" content="The Hottest Japanese Porn Movies Divided By Channels! Discover on JAV HD the Best XXX JAV Channels & Free Sex Scenes: JAVHD, CARIBBEANCOM, JAVHUB, JAPANHDV" />
                    <meta name="twitter:title" content="Hot Porn Creators and Exclusive Adult Videos - Cumcraze" />
                    <meta name="twitter:description" content="The Hottest Japanese Porn Movies Divided By Channels! Discover on JAV HD the Best XXX JAV Channels & Free Sex Scenes: JAVHD, CARIBBEANCOM, JAVHUB, JAPANHDV" />
                    <link rel="canonical" href={`https://www.Cumcraze.com/creators`} />


                </Head>



                <PopunderAds />


                <div className='flex items-center md:pr-10 pt-2 my-1  md:my-2 pl-1'>
                    <p className=' mt-4 mb-2 lg:mb-4 2xl:my-6 text-left lg:text-left text-2xl lg:text-3xl font-Dmsans text-theme font-poppins font-medium w-fit border-b-[3px] border-[#FFBB00]'>All Creators</p>

                    <p className='text-md md:text-xl  pl-1 pr-1  flex-grow font-inter  text-right text-gray-900 '>{`Page-${page}`}</p>
                </div>




                <div className={`grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-5  2xl:grid-cols-6 py-3  gap-3 md:gap-5 lg:gap-4`}>
                    {finalDataArray.map(obj => {

                        const href = customiseUrl(obj.creatorHref)
                        return (
                            <Link key={obj.creatorName} href={href}>
                                <div className="relative hover:scale-105 transform transition duration-150 rounded">
                                    <div className='relative'>

                                        <img
                                            className="object-cover aspect-[9/11] w-full rounded-[15px] border-[1px] border-gray-200"
                                            alt={obj.creatorName}
                                            src={obj.creatorImage}
                                            loading="lazy"
                                        />
                                        <span className="flex items-center gap-1 text-[12px] m-1.5 font-inter text-white  bg-black/50 rounded-[5px] px-2 py-[1px] absolute bottom-0 left-0 ">
                                            <FaEye className="text-white text-[14px]" /> {obj.creatorViews}
                                        </span>
                                        <span className="flex items-center gap-1 text-[12px] m-1.5 font-inter text-white  bg-black/50 rounded-[5px] px-2 py-[1px] absolute bottom-0 right-0 ">
                                            <FaVideo className="text-white text-[14px]" /> {obj.creatorVideos}
                                        </span>
                                    </div>
                                    <h2 className="mt-1 font-inter rounded-b  text-[14px] sm:text-[16px] font-semibold  2xl:text-[18px] px-1 pb-3 lg:pb-4 w-full text-center text-theme">
                                        {obj.creatorName}
                                    </h2>


                                </div>
                            </Link>


                        )
                    })}

                </div>




            </div>

            <Pagination data={{ url: `/creators`, currentPageNumberURL: page, pages: pages }} />

        </div>
    )
}


export default Index

// export async function getStaticPaths() {


//     return {
//         paths: [{ params: { page: '2' } }],
//         fallback: true // false or 'blocking'
//     };
// }


export async function getServerSideProps(context) {

    const { page } = context.params;
    const parcelData = { url: `https://spankbang.party/creators`, page: page };
    const API_URL = `${process.env.BACKEND_URL}getCreators`;
    const rawResponse = await fetch(API_URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(parcelData),
    });


    const { finalDataArray, pages } = await rawResponse.json();
    return {
        props: {
            finalDataArray: finalDataArray,
            pages: pages
        }
    }
}




