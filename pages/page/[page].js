import { useRouter } from "next/router";

import Videos from "../../components/Videos";
import Head from 'next/head'
import { BeatLoader } from 'react-spinners';
import Pagination from "../../components/Pagination";
import Header from "../../components/searchPage/Header";

function Index({ finalDataArray, pages }) {

    const router = useRouter();
    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'#232b2b'} />
            </div>
        )
    }

    const { page } = router.query
    const currentPageNumberURL = page

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (
        <>
            <Head>
                <title>Free Porn Videos and 4K Sex Movies - Chutlunds</title>
                <meta name="description" content="Chutlunds is the hottest free porn site in the world! Cum like never before and explore millions of fresh and free porn videos! Get lit on Chutlunds!" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="msvalidate.01" content="8A6530C78E46DD0011117B2ECB618480" />
                <meta property="og:title" content="Free Porn Videos and 4K Sex Movies - Chutlunds" />
                <meta property="og:description" content="Chutlunds is the hottest free porn site in the world! Cum like never before and explore millions of fresh and free porn videos! Get lit on Chutlunds!" />
                <link rel="canonical" href={`https://www.chutlunds.com/`} />

            </Head>

       

            <Header keyword={"trending"} pageNumber={page} />
            <Videos data={finalDataArray} />


            {/* PAGINATION */}
            <Pagination data={{ url: `/`, currentPageNumberURL: currentPageNumberURL, pages: pages }} />


        </>
    )
}

export default Index

export async function getStaticPaths() {


    return {

        paths: [
            { params: { page: '2' } },
        ],
        fallback: true // false or 'blocking'
    };
}

export async function getStaticProps(context) {
    const { page } = context.params;

    let url = `https://spankbang.party/trending_videos/${page}/`;

    const parcelData = { url: url };

    const API_URL = `${process.env.BACKEND_URL}getVideos`;

    const rawResponse = await fetch(API_URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(parcelData),
    });
    const ress = await rawResponse.json();



    return {
        props: {
            finalDataArray: ress.finalDataArray,
            pages: ress.pages

        },
    };
}


