import { useRouter } from "next/router";
import Sidebar from '../../components/Sidebar';
import Videos from "../../components/Videos";
import Header from '../../components/searchPage/Header';
import Head from 'next/head';
import { BeatLoader } from 'react-spinners';
import Pagination from '../../components/Pagination';
import { scrapeVideos } from '../../config/spangbang';

function HomepageVideos({ video_collection, pages }) {
    const router = useRouter();
    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'#232b2b'} />
            </div>
        )
    }


    const { homepageVideos } = router.query;
    const currentPageNumberURL = '1';

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <Head>
                <title>{`${capitalizeFirstLetter(homepageVideos)} Porn Videos`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content={`${capitalizeFirstLetter(homepageVideos)} Porn Videos!`} />
                <meta property="og:title" content={`${capitalizeFirstLetter(homepageVideos)} Porn Videos`} />
                <meta property="og:description" content={`${capitalizeFirstLetter(homepageVideos)} Porn Videos!`} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content={`${capitalizeFirstLetter(homepageVideos)} Porn Videos`} />
                <meta name="twitter:description" content={`${capitalizeFirstLetter(homepageVideos)} Porn Videos!`} />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href={`https://www.XXXBliss.com/${homepageVideos}/`} />

            </Head>
            <Header keyword={homepageVideos} pageNumber={currentPageNumberURL} />
            <div className="flex">
                {/* <Sidebar /> */}
                <Videos data={video_collection} />
            </div>

            {/* PAGINATION */}
            <Pagination data={{ url: `/${homepageVideos}`, currentPageNumberURL: currentPageNumberURL, pages: pages, }} />
        </>
    );
}

export default HomepageVideos;


export async function getStaticPaths() {
    return {

        paths: [
            { params: { homepageVideos: 'trending' } },
        ],
        fallback: true // false or 'blocking'
    };
}

export async function getStaticProps(context) {
    const { homepageVideos } = context.params;

    let href = "";

    // for  "featured"  will go to channels page from HomepageTitle component

    switch (homepageVideos) {
        case 'trending':
            href = `https://spankbang.party/trending_videos/`;
            break;
        case 'upcoming':
            href = `https://spankbang.party/upcoming/`;
            break;
        case 'popular':
            href = `https://spankbang.party/most_popular/?period=week`;
            break;
        case 'random':
            href = `https://spankbang.party/trending_videos/`;
            break;
        default:
            href = `https://spankbang.party/new_videos/`;
            break;
    }

    const parcelData = { url: href };
    const API_URL = `${process.env.BACKEND_URL}getVideos`;
    console.log(`${process.env.BACKEND_URL}getVideos`);

    const rawResponse = await fetch(API_URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(parcelData),
    });

    const { finalDataArray, pages } = await rawResponse.json();

    console.log('====================================');
    console.log(`${process.env.BACKEND_URL}getVideos`);
    console.log('====================================');

    return {
        props: {
            video_collection: finalDataArray,
            pages: pages
        }
    };
}
