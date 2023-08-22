import NextLink from 'next/link';
import { useState, useRef, useEffect } from 'react';

export function IndividualListingSmallTest({ p }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isShown, setIsShown] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const modalWidth = 200; // Set the fixed width of the modal in pixels
  const modalHeight = 200; // Set the fixed height of the modal in pixels
  const modalTimeoutRef = useRef<NodeJS.Timeout | undefined>();
  const [isCursorInContainer, setIsCursorInContainer] = useState(false);
  const [isCursorInModal, setIsCursorInModal] = useState(false);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : p.imageUrls.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < p.imageUrls.length - 1 ? prevIndex + 1 : 0
    );
  };

  const [isHovering, setIsHovering] = useState(false);
  // ... (existing code)

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(modalTimeoutRef.current);
    };
  }, []);

  const isMobileDevice = window.innerWidth <= 767; // 767px is a common breakpoint for mobile devices

  return (
    <div
      key={p}
      className=" min-h-fit min-w-max max-w-[120px] aspect-[2/3] items-center place-content-center container flex-col justify-items-center p-1 bg-red-500 overflow-clip"
    >
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
          <span className="text-xxs font-mono font-menlo font-extralight font">
            Hi
          </span>
        </div>
        <div className="h-[25%] container flex flex-row justify-between items-center bg-white-57">
          <span className="text-xxs font-mono font-menlo font-bold">Howdy</span>
        </div>
        <div className="h-[25%] container flex flex-row justify-between items-center bg-white-57">
          <span className="text-xxs font-mono font-menlo">Text</span>
        </div>
        <div className="h-[25%] container flex flex-row justify-between items-center bg-white-57">
          <span className="text-xxs font-mono font-menlo font-bold">$512</span>
        </div>
      </div>
    </div>
  );
}
