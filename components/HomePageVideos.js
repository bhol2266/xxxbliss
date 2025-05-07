import VideoThumbnail from "./VideoThumbnail";


function HomePageVideos({ data }) {

    return (

        <div className={`grid grid-cols-2 sm:grid-cols-2 p-1 md:pl-3 md:grid-cols-3 lg:grid-cols-4 overflow-hidden	 md:space-x-2 
        `}>
            {data.slice(0, 4).map(video => {

                return (
                    <VideoThumbnail key={video.id} details={video} />

                )
            })}
        </div>

    )
}

export default HomePageVideos
