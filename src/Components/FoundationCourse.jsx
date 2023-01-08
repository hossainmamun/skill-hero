import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FoundationCourse = () => {
   const [foundationCourse, setFoundationCourse] = useState([]);
   const [error, setError] = useState(null);
   console.log(foundationCourse);

   // useEffect hook
   useEffect(() => {
      fetchCourse();
   }, []);

   // get method
   const fetchCourse = async () => {
      try {
         const response = await axios.get(
            'http://localhost:1000/api/foundationCourses'
         );
         if (response.status === 200) {
            setFoundationCourse(response?.data);
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
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      cssEase: 'linear',
      arrows: false,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 3,
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
      <div className='mt-24'>
         {!error ? (
            <div>
               {foundationCourse.length === 0 ? (
                  <div className='text-center text-xl font-extrabold text-white'>
                     <h3>Loading...</h3>
                  </div>
               ) : (
                  <div className='space-y-6 mx-6 md:mx-20 lg:mx-26 xl:mx-48 2xl:mx-60'>
                     <div className=' flex justify-between items-center'>
                        <h3 className='text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase text-white'>
                           Foundation{' '}
                           <span className='text-[#fdffb6]'>course</span>
                        </h3>
                        <Link
                           to=''
                           className='text-white md:text-[#fdffb6] capitalize text-lg'>
                           view all
                        </Link>
                     </div>
                     <Slider {...settings}>
                        {foundationCourse.map((course, index) => {
                           const { courseImage, courseTitle, coursePrice } =
                              course;
                           return (
                              <div key={index} className='mt-6'>
                                 <div className='mx-4 space-y-3 shadow-md drop-shadow-md rounded-md bg-white'>
                                    <div className='h-[200px]'>
                                       <img
                                          src={courseImage}
                                          alt=''
                                          className='h-[200px] w-full rounded-tl-md rounded-tr-md'
                                       />
                                    </div>
                                    <div className='p-3 space-y-3'>
                                       <Link to=''>
                                          <h3 className='capitalize font-semibold text-md lg:text-lg truncate'>
                                             {courseTitle}
                                          </h3>
                                       </Link>
                                       <h3 className='block font-semibold text-sm lg:text-lg'>
                                          price: {coursePrice} tk.
                                       </h3>
                                       <Link
                                          to='/'
                                          className='bg-[#4a60f6] text-white text-center py-3 rounded-md capitalize block hover:bg-[#868a16] duration-500'>
                                          enroll now
                                       </Link>
                                    </div>
                                 </div>
                              </div>
                           );
                        })}
                     </Slider>
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
      </div>
   );
};

export default FoundationCourse;
