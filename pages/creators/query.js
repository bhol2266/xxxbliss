import PaginationQuery from '../../components/PaginationQuery';
import Header from '../../components/Pornstar_Channels/Header';
import Videos from "../../components/Videos";
import { scrapeVideos } from '../../config/spangbang';

function CreatorsQuery({ video_collection, pages, query, keyword, currentPage, filteredObjsArray, code }) {

  const currentPageNumberURL = currentPage

  return (

    <>

      <div>

        <Header keyword={keyword} pageNumber={currentPageNumberURL} filteredObjsArrayProps={filteredObjsArray} code={code} />
        <Videos data={video_collection} />



        {/* PAGINATION */}
        <PaginationQuery data={{ keyword: keyword, pathname: `/creators/query/`, currentPageNumberURL: currentPageNumberURL, pages: pages, filteredObjsArray: filteredObjsArray, code: code }} />

      </div>


    </>
  )
}

export default CreatorsQuery




export async function getServerSideProps(context) {
  const { creatorName, page, creatorCode } = context.query;



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

    const obj = await scrapeVideos(`https://spankbang.party/${creatorCode}/creator/${creatorName.replace(' ', '+').toLowerCase()}/${page}/?${completeSearch}`)
    finalDataArray = obj.finalDataArray
    pages = obj.pages
    pages[0] = page;
    console.log(`https://spankbang.party/${creatorCode}/creator/${creatorName.replace(' ', '+').toLowerCase()}/${page}/?${completeSearch}`);
  }
  else {

    const obj = await scrapeVideos(`https://spankbang.party/${creatorCode}/creator/${creatorName.replace(' ', '+').toLowerCase()}/${page}/?o=all`)
    finalDataArray = obj.finalDataArray
    pages = obj.pages
    pages[0] = page;

    console.log(`https://spankbang.party/${creatorCode}/channel/${creatorName.replace(' ', '+').toLowerCase()}/${page}/?o=all`);


  }

  return {
    props: {
      video_collection: finalDataArray,
      pages: pages,
      query: filteredObjsArray,
      keyword: creatorName,
      currentPage: page,
      filteredObjsArray: filteredObjsArray,
      code: creatorCode
    }
  }


}

