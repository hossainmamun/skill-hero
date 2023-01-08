import { Link } from 'react-router-dom';
import { banner_card } from '../test/test.js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Banner = () => {
   const [banner, setBanner] = useState([]);
   const [error, setError] = useState(null);

   // useEffect hook
   useEffect(() => {
      fetchBanner();
   }, []);

   // get method
   const fetchBanner = async () => {
      try {
         const response = await axios.get('http://localhost:1000/api/banner');
         if (response.status === 200) {
            setBanner(response?.data[0]);
         }
      } catch (error) {
         setError({
            message: error.message,
            statusText: error.response.statusText,
         });
      }
   };

   const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 5000,
      pauseOnHover: false,
      cssEase: 'linear',
      arrows: false,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               infinite: true,
            },
         },
         {
            breakpoint: 800,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               initialSlide: 2,
            },
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            },
         },
      ],
   };
   return (
      <div className='min-h-screen'>
         <div className='mx-6 sm:mx-16 md:mx-20 lg:mx-36 lx:mx-48 2xl:mx-60 translate-y-1/2'>
            {!error ? (
               <div>
                  {banner.length === 0 ? (
                     <div className='text-center text-xl font-extrabold text-white'>
                        <h3>Loading...</h3>
                     </div>
                  ) : (
                     <div className='text-center space-y-6'>
                        <h3 className='xl:w-10/12 m-auto text-white font-extrabold uppercase text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl'>
                           {banner.bannerTitle}
                        </h3>
                        <p className='text-[#fdffb6] font-bold capitalize text-base md:text-lg lg:text-2xl '>
                           {banner.bannerSubTitle}
                        </p>
                        <div>
                           <Link
                              to='/all-courses'
                              className='inline-block text-white md:text-black md:border md:border-[#fdffb6] md:px-10 md:py-4 md:rounded-xl md:bg-[#fdffb6] md:hover:text-[#fdffb6] md:hover:bg-transparent duration-150'>
                              ALL COURSES
                           </Link>
                        </div>
                     </div>
                  )}
               </div>
            ) : (
               <div className='text-center space-y-2'>
                  <p className='capitalize'>{error.message}</p>
                  <h3 className='text-red-600 text-xl font-bold'>
                     {error.statusText}
                  </h3>
               </div>
            )}

            <Slider {...settings}>
               {banner_card.map((card, index) => {
                  const { card_img, card_title } = card;
                  return (
                     <div key={index} className='mt-10 md:mt-24'>
                        <div className='mx-4 space-y-3 py-4 shadow-md rounded-xl bg-[#fdffb6] text-center'>
                           <div className='h-[100px] w-[100px] m-auto'>
                              <img
                                 src={card_img}
                                 alt=''
                                 className='h-[100px] w-[100px]'
                              />
                           </div>
                           <div className='p-3 space-y-3'>
                              <h3 className='capitalize font-semibold text-md'>
                                 {card_title}
                              </h3>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </Slider>
         </div>
      </div>
   );
};

export default Banner;
