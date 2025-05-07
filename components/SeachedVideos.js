import VideoThumbnail from "./VideoThumbnail"
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { useContext } from 'react'
import videosContext from '../context/videos/videosContext'
import { BeatLoader } from 'react-spinners'




function SearchVideos() {


    //Scroll to top
    const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

    //Use Context
    const context = useContext(videosContext);
    const { videos, spinnerLoading,setdisclaimerShow } = context;
    const data = videos;
    
    useEffect(() => {
        if (localStorage.getItem("disclaimerShow") === "false") {
            console.log(localStorage.getItem("disclaimerShow"));
            setdisclaimerShow(false)
        }
    }, [])
    

  

    // Pagination Functions 
    const [pageNumber, setpageNumber] = useState(0);
    const videos_perPage = 20;
    const pageVisited = pageNumber * videos_perPage;
    const pageCount = Math.ceil(data.videos.length / videos_perPage);

    const changePage = ({ selected }) => {
        setpageNumber(selected)
        scrollTop();
    }



    const displayVideos = data.videos.slice(pageVisited, videos_perPage + pageVisited).map(video => {

        return (
            <VideoThumbnail key={video.id} details={video} />

        )
    })


    return (
        <div className="w-full">



            {spinnerLoading &&
                <div className="flex justify-center mx-auto mt-10 ">
                    <BeatLoader loading size={25} color={'#232b2b'} />
                </div>
            }
            <div className="grid   grid-cols-2  gap-x-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-1 sm:pl-4 sm:pr-4 ">

                {!spinnerLoading && displayVideos}
            </div>



            {!spinnerLoading &&

                <div className="w-4/5 mx-auto p-2 bg-red-500 text-white ">
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={"next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={'flex justify-around items-center'}
                        previousLinkClassName={'bg-red-800  hover:bg-red-900 text-white text-sm p-2 pl-4 pr-4 m-1 rounded'}
                        nextLinkClassName={'bg-red-800  hover:bg-red-900 text-white text-sm p-2 pl-4 pr-4 m-1 rounded'}
                        disabledClassName={'paginationDisabled'}
                        activeClassName={' font-bold  rounded p-1 pl-2 pr-2 text-black'}
                    />
                </div>
            }

        </div>
    )
}

export default SearchVideos
