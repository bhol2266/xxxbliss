import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import Videos from "../../components/Videos";
import Header from '../../components/searchPage/Header'
import { BeatLoader } from 'react-spinners'
import { useContext, useState } from 'react';
import videosContext from '../../context/videos/videosContext';
import Router from 'next/router'
import Head from 'next/head'
import PaginationQuery from '../../components/PaginationQuery';
import { scrapeVideos } from '../../config/spangbang';

function Category({ video_collection, pages, query, keyword, currentPage, filteredObjsArray }) {



  const router = useRouter();
  const currentPageNumberURL = currentPage

  function capitalizeFirstLetter(string) {
    
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (

    <>

      <div>

        <Header keyword={keyword.replace("+", " ")} pageNumber={currentPageNumberURL} filteredObjsArrayProps={filteredObjsArray} />
        <div className="flex">
          {/* <Sidebar /> */}
          <Videos data={video_collection} />

        </div>


        {/* PAGINATION */}
        <PaginationQuery data={{ keyword: keyword, pathname: `/search/query/`, currentPageNumberURL: currentPageNumberURL, pages: pages, filteredObjsArray: filteredObjsArray }} />
      </div>


    </>
  )
}

export default Category




export async function getServerSideProps(context) {
  var { searchkey, category, page } = context.query;
  var finalDataArray = []
  var pages = []

  if (typeof category != 'undefined') {
    searchkey = category
  }



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

    const obj = await scrapeVideos(`https://spankbang.party/s/${searchkey}/${page}/?${completeSearch}`)
    finalDataArray = obj.finalDataArray
    pages = obj.pages
    console.log(`https://spankbang.party/s/${searchkey}/${page}/?${completeSearch}`);
  }
  else {

    const obj = await scrapeVideos(`https://spankbang.party/s/${searchkey}/${page}/?o=all`)
    finalDataArray = obj.finalDataArray
    pages = obj.pages
    console.log(`https://spankbang.party/s/${searchkey}/${page}/?o=all`);

  }

  return {
    props: {
      video_collection: finalDataArray,
      pages: pages,
      query: filteredObjsArray,
      keyword: searchkey,
      currentPage: page,
      filteredObjsArray: filteredObjsArray
    }
  }


}

