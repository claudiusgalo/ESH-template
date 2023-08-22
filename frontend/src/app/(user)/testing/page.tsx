'use client';
import { usePostQuery } from '@/app/graphql/gql/graphql';
import { createUrqlClient } from '@/app/utils/createUrqlClient';
import { IndividualListing } from '@/components/IndividualListing';
import { IndividualListingTest } from '@/components_prefabs/individualListingTest';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useState } from 'react';

// width 56.25
// height 31.25

const test = () => {
  // Define the query and how the variables should be fetched.
  const [{ data, fetching }] = usePostQuery({
    variables: {
      id: 221,
    },
  });

  //This code needs to move with the new component
  const [isHovering, setIsHovering] = useState(false);
  // ... (existing code)

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  console.log('This is the data from the usePostQuery', data);

  return (
    <div className="flex">
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <IndividualListingTest p={data!.post} />
      )}
      //Testing
      <div className=" min-h-fit min-w-max max-w-[200px] aspect-[2/3] container flex-col justify-items-center p-1 m-1 bg-red-500 overflow-clip">
        <div
          className="h-[83%] relative container flex flex-col place-content-center items-center bg-blue-500"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            // alt={p.title}
            //  srcSet={`https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:40/resize=height:320,width:240/no_metadata/compress/L37NnqVRNeeIUgE2pOzA 1x,
            //       https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:20/resize=height:640,width:480/no_metadata/compress/L37NnqVRNeeIUgE2pOzA 2x`}

            sizes="(min-width: 481px) 240px, 185px"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="object-cover w-full h-full"
            // The above Tailwind CSS class "object-cover" ensures the image maintains its aspect ratio and covers the entire container div.
          />
          {/* //2:3 would be 240 x 360 //240 x 320 is 3:4 */}
          {/* <span className="w-[200px] h-[300px] bg-black-55">howdy</span> */}
          {isHovering && (
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between p-2">
              <button className="prev-button bg-white-55 text-gray-900 rounded-full p-1">
                &lt;
              </button>
              <button className="next-button bg-white-55 text-gray-900 rounded-full p-1">
                &gt;
              </button>
            </div>
          )}
          {/* //Could add a free shipping tag */}
        </div>
        <div className="h-[17%] container flex flex-col items-center  bg-green-54 ">
          <div className="h-[25%] container flex flex-row justify-between items-center border-b-2 border-pink-58 bg-white-57">
            <span className="text-xs font-mono font-menlo font-extralight">
              username
            </span>
            <span className="text-xs font-mono font-menlo font-extralight font">
              7 hours ago
            </span>
          </div>
          <div className="h-[25%] container flex flex-row justify-between items-center bg-white-57">
            <span className="text-xs font-mono font-menlo font-bold">
              DESIGNER
            </span>
            <span className="text-sm font-mono font-menlo font-bold">M</span>
          </div>
          <div className="h-[25%] container flex flex-row justify-between items-center bg-white-57">
            <span className="text-xs font-mono font-menlo font-thin">
              supreme x stone
            </span>
            <span>Text</span>
          </div>
          <div className="h-[25%] container flex flex-row justify-between items-center bg-white-57">
            <span className="text-xs font-mono font-menlo font-bold">$512</span>
            <span>send offer</span>
            <span>Text</span>
          </div>
        </div>
      </div>
      //Smaller Testing Version
      <div className=" min-h-fit min-w-max max-w-[180px] aspect-[2/3] items-center place-content-center container flex-col justify-items-center p-1 bg-red-500 overflow-clip">
        <div
          className="h-[83%] relative container flex flex-col place-content-center items-center bg-blue-500"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            // alt={p.title}
            //  srcSet={`https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:40/resize=height:320,width:240/no_metadata/compress/L37NnqVRNeeIUgE2pOzA 1x,
            //       https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:20/resize=height:640,width:480/no_metadata/compress/L37NnqVRNeeIUgE2pOzA 2x`}
            // src={`https://www.jems.com/wp-content/uploads/2015/12/47629-Keith-Wesley-120x160.gif`}
            sizes="(min-width: 481px) 240px, 185px"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="object-cover w-full h-full"
            // The above Tailwind CSS class "object-cover" ensures the image maintains its aspect ratio and covers the entire container div.
          />
          {/* //2:3 would be 240 x 360 //240 x 320 is 3:4 */}
          {/* <span className="w-[200px] h-[300px] bg-black-55">howdy</span> */}
          {isHovering && (
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between p-2">
              <button className="prev-button bg-white-55 text-gray-900 rounded-full p-1">
                &lt;
              </button>
              <button className="next-button bg-white-55 text-gray-900 rounded-full p-1">
                &gt;
              </button>
            </div>
          )}
          {/* //Could add a free shipping tag */}
        </div>
        <div className="h-[17%]  container flex flex-col items-center  bg-green-54 ">
          <div className="h-[25%] container flex flex-row justify-between items-center border-b-2 border-pink-58 bg-white-57">
            <span className="text-xs font-mono font-menlo font-extralight">
              username
            </span>
            <span className="text-xs font-mono font-menlo font-extralight font">
              7 hours ago
            </span>
          </div>
          <div className="h-[25%] container flex flex-row justify-between items-center bg-white-57">
            <span className="text-xs font-mono font-menlo font-bold">
              DESIGNER
            </span>
            <span className="text-sm font-mono font-menlo font-bold">M</span>
          </div>
          <div className="h-[25%] container flex flex-row justify-between items-center bg-white-57">
            <span className="text-xs font-mono font-menlo font-thin">
              supreme x stone
            </span>
            <span>Text</span>
          </div>
          <div className="h-[25%] container flex flex-row justify-between items-center bg-white-57">
            <span className="text-xs font-mono font-menlo font-bold">$512</span>
            <span>send offer</span>
            <span>Text</span>
          </div>
        </div>
      </div>
      //XXS Testing
      <div className=" min-h-fit min-w-max max-w-[120px] aspect-[2/3] items-center place-content-center container flex-col justify-items-center p-1 bg-red-500 overflow-clip">
        <div
          className="h-[83%] relative container flex flex-col place-content-center items-center bg-blue-500"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            // alt={p.title}
            //  srcSet={`https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:40/resize=height:320,width:240/no_metadata/compress/L37NnqVRNeeIUgE2pOzA 1x,
            //       https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:20/resize=height:640,width:480/no_metadata/compress/L37NnqVRNeeIUgE2pOzA 2x`}
            src={`https://www.jems.com/wp-content/uploads/2015/12/47629-Keith-Wesley-120x160.gif`}
            sizes="(min-width: 481px) 240px, 185px"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="object-cover w-full h-full"
            // The above Tailwind CSS class "object-cover" ensures the image maintains its aspect ratio and covers the entire container div.
          />
          {/* //2:3 would be 240 x 360 //240 x 320 is 3:4 */}
          {/* <span className="w-[200px] h-[300px] bg-black-55">howdy</span> */}
          {isHovering && (
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between p-2">
              <button className="prev-button bg-white-55 text-gray-900 rounded-full p-1">
                &lt;
              </button>
              <button className="next-button bg-white-55 text-gray-900 rounded-full p-1">
                &gt;
              </button>
            </div>
          )}
          {/* //Could add a free shipping tag */}
        </div>
        <div className="h-[17%]  container flex flex-col items-center  bg-green-54 ">
          <div className="h-[25%] container flex flex-row justify-between items-center border-b-2 border-pink-58 bg-white-57">
            <span className="text-xxs font-mono font-menlo font-extralight">
              username
            </span>
            <span className="text-xxs font-mono font-menlo font-extralight font">
              7 months ago
            </span>
          </div>
          <div className="h-[25%] container flex flex-row justify-between items-center bg-white-57">
            <span className="text-xxs font-mono font-menlo font-bold">
              DESIGNER
            </span>
            <span className="text-xxs font-mono font-menlo font-bold">M</span>
          </div>
          <div className="h-[25%] container flex flex-row justify-between items-center bg-white-57">
            <span className="text-xxs font-mono font-menlo font-thin">
              supreme x stone
            </span>
            <span className="text-xxs font-mono font-menlo">Text</span>
          </div>
          <div className="h-[25%] container flex flex-row justify-between items-center bg-white-57">
            <span className="text-xxs font-mono font-menlo font-bold">
              $512
            </span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>{' '}
      {/* <NextLink
        key={p.id}
        href={`/listings/${p.id}`}
        onMouseEnter={handleMouseEnterContainer}
        onMouseMove={handleMouseMoveContainer}
        onMouseLeave={handleMouseLeaveContainer}
        className="Parent"
      > 
      </NextLink> */}
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(test);
