import Head from 'next/head';
import { useRouter } from "next/router";
import PaginationQuery from '../../components/PaginationQuery';
import Sidebar from "../../components/Sidebar";
import Videos from "../../components/Videos";
import Header from '../../components/searchPage/Header';
import { scrapeVideos } from '../../config/spangbang';

function Category({ video_collection, pages, query, keyword, currentPage, filteredObjsArray }) {



  const router = useRouter();
  const currentPageNumberURL = currentPage

  function capitalizeFirstLetter(string) {
    
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (

    <div className="">

      <div>

        <Header keyword={keyword} pageNumber={currentPageNumberURL} filteredObjsArrayProps={filteredObjsArray} />
        <div className="flex">
          {/* <Sidebar /> */}
          <Videos data={video_collection} />


        </div>


        {/* PAGINATION */}
        <PaginationQuery data={{ keyword: keyword, pathname: `/category/query/`, currentPageNumberURL: currentPageNumberURL, pages: pages, filteredObjsArray: filteredObjsArray }} />


      </div>


    </div>
  )
}

export default Category




export async function getServerSideProps(context) {
  const { category, page } = context.query;
  var finalDataArray = []
  var pages = []


  const { o, q, d, p, } = context.query;

  var filteredObjsArray = []
  var completeSearch = ''
  if (o) {
    filteredObjsArray.push(`o=${o}`)
  } 
  if (q) {
    filteredObjsArray.push(`q=${q}`)

  }
  if (d) {
    filteredObjsArray.push(`d=${d}`)
  }
  if (p) {
    filteredObjsArray.push(`p=${p}`)
  }

  if (page > 1) {
    for (let index = 0; index < filteredObjsArray.length; index++) {
      filteredObjsArray[index].replace('o=', '');

    }
  }

  if (filteredObjsArray.length === 1) {
    completeSearch = filteredObjsArray[0]
  }
  if (filteredObjsArray.length === 2) {
    completeSearch = `${filteredObjsArray[0]}&${filteredObjsArray[1]}`
  }
  if (filteredObjsArray.length === 3) {
    completeSearch = `${filteredObjsArray[0]}&${filteredObjsArray[1]}&${filteredObjsArray[2]}`
  }
  if (filteredObjsArray.length === 4) {
    completeSearch = `${filteredObjsArray[0]}&${filteredObjsArray[1]}&${filteredObjsArray[2]}&${filteredObjsArray[3]}`
  }




  if (filteredObjsArray.length > 0) {

    const obj = await scrapeVideos(`https://spankbang.party/s/${category}/${page}/?${completeSearch}`)
    finalDataArray = obj.finalDataArray
    pages = obj.pages
    console.log(`https://spankbang.party/s/${category}/${page}/?${completeSearch}`);
  }
  else {

    const obj = await scrapeVideos(`https://spankbang.party/s/${category}/${page}/?o=all`)
    finalDataArray = obj.finalDataArray
    pages = obj.pages
    console.log(`https://spankbang.party/s/${category}/${page}/?o=all`);

  }

  return {
    props: {
      video_collection: finalDataArray,
      pages: pages,
      query: filteredObjsArray,
      keyword: category,
      currentPage: page,
      filteredObjsArray: filteredObjsArray
    }
  }


}



