import Head from 'next/head';
import { useRouter } from "next/router";
import { BeatLoader } from 'react-spinners';
import Pagination from "../../../components/Pagination";
import Sidebar from "../../../components/Sidebar";
import Videos from "../../../components/Videos";
import Header from '../../../components/searchPage/Header';
import { scrapeVideos } from "../../../config/spangbang";



function Category({ video_collection, pages }) {


  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="flex justify-center mx-auto mt-10 ">
        <BeatLoader loading size={25} color={'#232b2b'} />
      </div>
    )
  }

  const { category } = router.query
  const currentPageNumberURL = '1'

  function capitalizeFirstLetter(string) {
    
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>

<Head>
        <title>{capitalizeFirstLetter(category)} sex videos | Cumcraze</title>
        <meta name="description" content={`Watch free collection of ${capitalizeFirstLetter(category)} sex videos, ${category} porn videos, latest ${category} videos in high quality only on Cumcraze.`} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta property="og:title" content={`${capitalizeFirstLetter(category)} sex videos | Cumcraze`} />
        <meta property="og:description" content={`Watch free collection of ${capitalizeFirstLetter(category)} sex videos, ${category} porn videos, latest ${category} videos in high quality only on Cumcraze.`} />
        <meta name="twitter:title" content={`${capitalizeFirstLetter(category)} sex videos | Cumcraze`} />
        <meta name="twitter:description" content={`Watch free collection of ${capitalizeFirstLetter(category)} sex videos, ${category} porn videos, latest ${category} videos in high quality only on Cumcraze.`} />
        <link rel="canonical" href={`https://www.Cumcraze.com/category/${category}`} />
      </Head>



      <Header keyword={category} pageNumber={currentPageNumberURL} />
      <div className="flex">
        {/* <Sidebar /> */}
        <Videos data={video_collection} />

      </div>



      {/* PAGINATION */}
      <Pagination data={{ url: `/category/${category}`, currentPageNumberURL: currentPageNumberURL, pages: pages, }} />

    </>
  )
}

export default Category

export async function getStaticPaths() {


  return {
    paths: [{ params: { category: 'creampie' } }],
    fallback: true // false or 'blocking'
  };
}



export async function getStaticProps(context) {



  const { category } = context.params;


  const parcelData = { url: `https://spankbang.party/s/${category}/?o=all` };

  const API_URL = `${process.env.BACKEND_URL}getVideos`;

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
      video_collection: finalDataArray,
      pages: pages
    }
  }


}


