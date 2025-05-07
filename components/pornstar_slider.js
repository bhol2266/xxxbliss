import React from 'react';
import Link from 'next/link';
import pornstarsJSON from "@/JsonData/pornstarlist/alldata.json";

function Pornstar_slider({ trendingPornstars }) {

    // Function to normalize channel names
    const normalizeName = (name) => name.trim().toLowerCase().replace(/ /g, "+");

    // Get normalized channel names from trendingPornstars
    const trendingPornstarsNames = trendingPornstars.map(pornstarObj => normalizeName(pornstarObj.pornstarName));

    // Filter pornstarsJSON based on normalized trendingPornstarsNames
    const filteredPornstars = pornstarsJSON
        .filter(pornstar => trendingPornstarsNames.includes(normalizeName(pornstar.Name)))
        .sort((a, b) =>
            trendingPornstarsNames.indexOf(normalizeName(a.Name)) -
            trendingPornstarsNames.indexOf(normalizeName(b.Name))
        );



    return (
        <div className='flex items-start space-x-1 text-color overflow-x-scroll scrollbar-hide md:hidden mb-6'>
            {filteredPornstars.map(pornstarObj => {

                const code = pornstarObj.href.substring(1, pornstarObj.href.indexOf('/pornstar'))
                const normalizedPornstarName = normalizeName(pornstarObj.Name);
                return (
                    <Link href={`/pornstar/${code}/${normalizedPornstarName}`} key={pornstarObj.thumbnail}>
                        <div className='flex flex-col justify-center items-center mx-1'>
                            <div className='w-[90px]'>
                                <img
                                    className='shadow-md object-contain rounded-[5px] '
                                    src={pornstarObj.thumbnail}
                                    loading="lazy"
                                    alt={pornstarObj.Name}
                                />
                            </div>
                            <h2 className='text-xs text-center font-poppins text-gray-600 font-semibold mt-1 whitespace-nowrap'>
                                {pornstarObj.Name.toUpperCase()}
                            </h2>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default Pornstar_slider;
