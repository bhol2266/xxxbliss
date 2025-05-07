import React from 'react';
import Link from 'next/link';

function Creators_slider({ trendingCreators }) {



    return (
        <div className='flex items-start space-x-1 text-color overflow-x-scroll scrollbar-hide md:hidden my-4 '>
            {trendingCreators.map(creatorObj => {


                const creatorCode = creatorObj.href.substring(1, creatorObj.href.indexOf("/creators"))
                const creatorName = creatorObj.href.substring(creatorObj.href.indexOf("/creators/") + 10, creatorObj.href.length - 1)



                return (
                    <Link href={`/creators/${creatorCode}/${creatorName}`} key={creatorObj.imageUrl}>
                        <div className='flex flex-col justify-center items-center mx-1'>
                            <div className='w-[90px]'>
                                <img
                                    className='shadow-md rounded-full object-cover aspect-square'
                                    src={creatorObj.imageUrl}
                                    loading="lazy"
                                    alt={creatorObj.creatorName}
                                />
                            </div>
                            <h2 className='text-xs text-center font-poppins text-gray-600 font-semibold mt-1 whitespace-nowrap'>
                                {creatorObj.creatorName.toUpperCase()}
                            </h2>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default Creators_slider;