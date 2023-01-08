import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import axios from 'axios';

const PopularCourse = () => {
   const [sliderRef, setSliderRef] = useState(null);
   const [popularCourse, setPopularCourse] = useState([]);
   const [error, setError] = useState(null);

   // useEffect hook
   useEffect(() => {
      fetchCourse();
   }, []);

   // get method
   const fetchCourse = async () => {
      try {
         const response = await axios.get(
            'http://localhost:1000/api/popularCourses'
         );
         if (response.status === 200) {
            setPopularCourse(response?.data);
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
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      speed: 500,
      // autoplaySpeed: 5000,
      pauseOnHover: false,
      cssEase: 'linear',
      arrows: false,
   };

   return (
      <div className='py-16 mt-10 bg-[#022e42]'>
         <div className='mx-6 sm:mx-16 md:mx-20 lg:mx-36 lx:mx-48 2xl:mx-60'>
            {!error ? (
               <div>
                  {popularCourse.length === 0 ? (
                     <div className='text-center text-xl font-extrabold text-white'>
                        <h3>Loading...</h3>
                     </div>
                  ) : (
                     <div className='space-y-6'>
                        <div className=' flex justify-between items-center'>
                           <h3 className='text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase text-white'>
                              popular{' '}
                              <span className='text-[#fdffb6]'>course</span>
                           </h3>
                           <Link
                              to=''
                              className='text-white md:text-[#fdffb6] capitalize text-lg'>
                              view all
                           </Link>
                        </div>
                        <Slider ref={setSliderRef} {...settings}>
                           {popularCourse.map((course) => {
                              const {
                                 _id,
                                 coverImage,
                                 courseTitle,
                                 courseDetail,
                                 titleBangla,
                                 coursePrice,
                                 instructorImage,
                                 updateDate,
                                 instructorProfession,
                              } = course;
                              return (
                                 <div key={_id} className='my-3'>
                                    <div className='lg:flex lg:justify-between items-center space-y-10 lg:space-y-0'>
                                       <div className='lg:w-5/12'>
                                          <img
                                             src={coverImage}
                                             className='w-full h-full rounded-xl'
                                             alt=''
                                          />
                                       </div>
                                       <div className='lg:w-6/12 text-white space-y-4'>
                                          <div className='space-y-4'>
                                             <Link
                                                to={`popular-course-detail/${_id}`} className='hover:text-green-600'>
                                                <h3 className='text-xl md:text-xl lg:text-4xl font-bold capitalize'>
                                                   career track: {courseTitle}
                                                </h3>
                                             </Link>

                                             <p className='capitalize'>
                                                {titleBangla}
                                             </p>

                                             <p className='text-lg'>
                                                {courseDetail}
                                             </p>
                                             <p className='text-xl font-bold'>
                                                Course Price: {coursePrice}
                                             </p>
                                          </div>

                                          <div className='space-y-4'>
                                             <p className='text-xl capitalize font-semibold'>
                                                instructors
                                             </p>
                                             <div className='flex justify-start items-center space-x-4'>
                                                <img
                                                   src={instructorImage}
                                                   alt=''
                                                />
                                                <p className='text-lg capitalize font-semibold'>
                                                   {instructorProfession}
                                                </p>
                                             </div>

                                             <p className='text-xl capitalize font-bold'>
                                                update date: {updateDate}
                                             </p>
                                          </div>

                                          <div className='flex justify-start items-center space-x-4'>
                                             <Link
                                                to=''
                                                className='inline-block text-white md:text-black md:border md:border-[#fdffb6] md:px-6 md:py-4 md:rounded-xl md:bg-[#fdffb6] md:hover:text-[#fdffb6] md:hover:bg-transparent duration-150'>
                                                ADMIT NOW
                                             </Link>
                                             <Link
                                                to={`popular-course-detail/${_id}`}
                                                className='inline-block text-white md:text-[#fdffb6] md:border md:border-[#fdffb6] md:px-6 md:py-4 md:rounded-xl md:hover:text-black md:hover:bg-[#fdffb6] duration-150'>
                                                COURSE DETAIL
                                             </Link>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              );
                           })}
                        </Slider>

                        <div className='flex justify-end items-center space-x-3'>
                           <button
                              className='text-white md:text-[#fdffb6] md:border md:border-[#fdffb6] md:px-6 md:py-3 md:rounded-xl md:hover:text-black md:hover:bg-[#fdffb6] duration-150'
                              onClick={sliderRef?.slickPrev}>
                              <MdArrowBack />
                           </button>
                           <button
                              className='text-white md:text-[#fdffb6] md:border md:border-[#fdffb6] md:px-6 md:py-3 md:rounded-xl md:hover:text-black md:hover:bg-[#fdffb6] duration-150'
                              onClick={sliderRef?.slickNext}>
                              <MdArrowForward />
                           </button>
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
         </div>
      </div>
   );
};

export default PopularCourse;
