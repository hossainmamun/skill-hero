import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../Components/Footer.jsx';
import NavBar from '../Components/NavBar.jsx';
import { courseFeature } from '../test/test.js';

const PopularCourseDetail = () => {
   const { courseId } = useParams();
   const [error, setError] = useState(null);
   const [course, setCourse] = useState({});
   const {
      courseTitle,
      courseDetail,
      coursePrice,
      coverImage,
      instructorDetail,
      instructorImage,
      instructorProfession,
      shortNote,
      titleBangla,
      updateDate,
   } = course;

   useEffect(() => {
      fetchSingleCourse();
   }, [courseId]);

   const fetchSingleCourse = async () => {
      try {
         const response = await axios.get(
            `http://localhost:1000/api/popularCourses/${courseId}`
         );
         if (response.status === 200) {
            setCourse(response?.data);
         }
      } catch (error) {
         setError({
            message: error.message,
            statusText: error.response.statusText,
         });
      }
   };

   return (
      <div className='bg-white min-h-screen relative'>
         <NavBar />

         <div className='pt-48 pb-48 space-y-8 mx-6 sm:mx-16 md:mx-20 lg:mx-36 lx:mx-48 2xl:mx-60'>
            {!error ? (
               <div>
                  {course === null ? (
                     <div className='text-center text-xl font-extrabold text-white'>
                        <h3>Loading...</h3>
                     </div>
                  ) : (
                     <div className='lg:flex justify-start'>
                        <div className='lg:w-6/12 space-y-6'>
                           <h3 className='text-xl md:text-xl lg:text-3xl font-bold capitalize'>
                              {courseTitle}
                           </h3>
                           <p className='text-xl md:text-xl lg:text-3xl font-bold'>
                              {titleBangla}
                           </p>
                           <p className='text-lg'>{courseDetail}</p>
                           <div>
                              <img
                                 src={coverImage}
                                 className='lg:h-[450px] w-full'
                                 alt=''
                              />
                           </div>

                           <div className='p-5 bg-slate-200 rounded-lg space-y-6'>
                              <h3 className='text-xl md:text-xl lg:text-2xl font-bold'>
                                 আপনি যার কাছ থেকে শিখবেন
                              </h3>
                              <div className='bg-white p-6 rounded-lg space-y-8'>
                                 <div className='flex justify-start items-center space-x-6 '>
                                    <img
                                       src={instructorImage}
                                       className='w-28 h-28 rounded-full'
                                       alt=''
                                    />
                                    <div>
                                       <p className='text-xl md:text-xl lg:text-2xl font-bold'>
                                          Simanta Paul
                                       </p>
                                       <p className='text-base capitalize font-semibold'>
                                          {instructorProfession}
                                       </p>
                                    </div>
                                 </div>
                                 <hr />
                                 <p>{instructorDetail}</p>
                              </div>
                           </div>
                        </div>
                        <div className='lg:w-4/12 xl:w-3/12 lg:fixed lg:right-36 xl:right-48 2xl:right-56 bg-[#023047] p-6 rounded-xl text-white'>
                           <div className='space-y-6'>
                              <h3 className='text-lg md:text-xl lg:text-2xl font-bold'>
                                 এই কোর্সের ভেতরে যা যা রয়েছে
                              </h3>
                              <div>
                                 {courseFeature.map((features) => {
                                    const { id, icon, feature } = features;
                                    return (
                                       <div key={id}>
                                          <div className='flex justify-start items-center space-y-2 space-x-3'>
                                             <p className='text-orange-600'>
                                                {icon}
                                             </p>
                                             <p>{feature}</p>
                                          </div>
                                       </div>
                                    );
                                 })}
                              </div>
                              <div className='flex justify-between items-center py-6 px-4 rounded-lg bg-[#023f5e]'>
                                 <h3 className='font-extrabold'>
                                    কোর্সের মূল্য
                                 </h3>
                                 <p className='md:text-xl font-extrabold'>
                                    ৳৮,০০০
                                 </p>
                              </div>

                              <div>
                                 <button className='bg-[#EFAD1E] text-white text-center py-3 px-4 rounded-md capitalize block hover:bg-[#868a16] duration-500'>
                                    BOOK A SEAT
                                 </button>
                              </div>
                           </div>
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

         <div className='absolute bottom-0 left-0 w-full'>
            <Footer />
         </div>
      </div>
   );
};

export default PopularCourseDetail;
