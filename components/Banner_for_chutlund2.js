import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import Flag from 'react-world-flags';

export default function Banner_for_chutlund2() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const showRedirect = getCookie('show_redirect_chutlunds2');

    if (showRedirect === undefined) {
      setCookie('show_redirect_chutlunds2', 'true', {
        maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
        path: '/',
      });
      setIsVisible(true);
    } else if (showRedirect === 'true') {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    setLoading(false); // Cookie check is complete
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setCookie('show_redirect_chutlunds2', 'false', {
      maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
      path: '/',
    });
  };

  if (loading) return null; // Don't render the component until the cookie check is done

  return (
    <div className={`bg-gray-800 m-2 text-white p-4 flex justify-between items-center ${isVisible ? '' : 'hidden'}`}>
      <span className="flex-1 text-left md:text-center text-sm md:text-md ">
        If this website is blocked in your country (
        <Flag code="CN" style={{ width: '20px', height: '14px' }} className="inline-block mx-1" />
        <Flag code="RU" style={{ width: '20px', height: '14px' }} className="inline-block mx-1" />
        <Flag code="TR" style={{ width: '20px', height: '14px' }} className="inline-block mx-1" />
        ) go to our alternate website{' '}


        <a href="https://cumcraze1.com" className="underline text-yellow-500 font-inter">cumcraze1.com </a>
        ,
        <a href="https://milfymadness1.com" className="ml-1 underline text-yellow-500 font-inter">milfymadness1.com</a>

      </span>

      <button onClick={handleClose} className="text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
