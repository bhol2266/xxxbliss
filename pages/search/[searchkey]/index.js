import Head from 'next/head';
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import Pagination from '../../../components/Pagination';
import Videos from "../../../components/Videos";
import Header from '../../../components/searchPage/Header';
import { updatekeywords } from "../../../config/firebase/lib";
import { scrapeVideos } from '../../../config/spangbang';


function Search({ video_collection, pages }) {



  const router = useRouter();
  const { searchkey } = router.query

  const currentPageNumberURL = '1';

  useEffect(() => {

    if (searchkey) {
      updatekeywords(searchkey.trim());
    }
  }, [searchkey]);


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (router.isFallback || !searchkey) {
    return (
      <div className="flex justify-center mx-auto mt-10 ">
        <BeatLoader loading size={25} color={'#232b2b'} />
      </div>
    );
  }


  return (
    <>
      <Head>
        <title>{`${capitalizeFirstLetter(searchkey.replace('+', " ").replace("+", " "))} Porn Videos - XXXBliss`}</title>
        <meta name="description" content={`Watch ${capitalizeFirstLetter(searchkey.replace('+', " ").replace("+", " "))} porn videos. Explore tons of XXX movies with sex scenes in on XXXBliss!`} />
        <meta property="og:title" content={`${capitalizeFirstLetter(searchkey.replace('+', " ").replace("+", " "))} Porn Videos - XXXBliss | ${currentPageNumberURL}`} />
        <meta property="og:description" content={`Watch ${capitalizeFirstLetter(searchkey.replace('+', " ").replace("+", " "))} porn videos. Explore tons of XXX movies with sex scenes in on XXXBliss!`} />
        <meta name="twitter:title" content={`${capitalizeFirstLetter(searchkey.replace('+', " ").replace("+", " "))} Porn Videos - XXXBliss | ${currentPageNumberURL}`} />
        <meta name="twitter:description" content={`Watch ${capitalizeFirstLetter(searchkey.replace('+', " ").replace("+", " "))} porn videos. Explore tons of XXX movies with sex scenes in on XXXBliss!`} />
        
        {/* Additional meta tags */}
        <link rel="canonical" href={`https://www.XXXBliss.com/search/${searchkey}`} />
      </Head>


      <Header keyword={searchkey.replace("+", " ")} pageNumber={currentPageNumberURL} />
      <Videos data={video_collection} />
      <Pagination data={{ url: `/search/${searchkey.toLowerCase().trim()}`, currentPageNumberURL: currentPageNumberURL, pages: pages }} />
    </>
  );
}

export default Search;


// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { searchkey: 'bbc' } },
//     ],
//     fallback: true // 'blocking' or 'true'
//   };
// }

export async function getServerSideProps(context) {
  const { searchkey } = context.params;

  if (searchkey == "bbc") {

    const parcelData = { url: `https://spankbang.party/s/${searchkey.toLowerCase().trim()}/?o=all` };
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
        pages: pages,
      }
    };
  } else {

    const obj = await scrapeVideos(`https://spankbang.party/s/${searchkey.toLowerCase().trim()}/?o=all`)
    var finalDataArray = obj.finalDataArray
    var pages = obj.pages

    return {
      props: {
        video_collection: finalDataArray,
        pages: pages
      }
    }
  }


}
