import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Footer from '../Components/Footer.jsx';
import NavBar from '../Components/NavBar.jsx';

const AllCourses = () => {
   const [foundationCourse, setFoundationCourse] = useState([]);
   const [popularCourse, setPopularCourse] = useState([]);
   const [error, setError] = useState(null);
   // const [allCourse, setAllCourse] = useState([]);

   const allCourse = [...foundationCourse, ...popularCourse];
   

   // useEffect hook
   useEffect(() => {
      fetchPopularCourse();
      fetchFoundationCourse();
   }, []);

   // get method
   const fetchPopularCourse = async () => {
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

   // get method
   const fetchFoundationCourse = async () => {
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

   return (
      <div className='bg-white min-h-screen relative'>
         <NavBar />
         <div className='pt-48 pb-48 space-y-8'>
            <div className='text-center'>
               <h3 className='text-xl sm:text-2xl md:text-3xl xl:text-4xl font-extrabold uppercase'>
                  our all courses
               </h3>
            </div>
            <div className='mx-6 sm:mx-16 md:mx-20 lg:mx-36 lx:mx-48 2xl:mx-60'>
               {!error ? (
                  <div>
                     {allCourse.length === 0 ? (
                        <div className='text-center font-extrabold'>
                           <h3>Loading...</h3>
                        </div>
                     ) : (
                        <div className='space-y-6 md:grid grid-cols-3 gap-6'>
                           {allCourse.map((course) => {
                              const {
                                 _id,
                                 courseImage,
                                 coursePrice,
                                 courseTitle,
                                 shortNote,
                                 coverImage,
                              } = course;
                              return (
                                 <div key={_id} className='mt-6'>
                                    <div className='mx-4 space-y-3 shadow-md drop-shadow-md rounded-md bg-white'>
                                       <div className='h-[200px]'>
                                          <img
                                             src={courseImage || coverImage}
                                             alt=''
                                             className='h-[200px] w-full rounded-tl-md rounded-tr-md object-fill'
                                          />
                                       </div>
                                       <div className='p-4'>
                                          <div className='p-3 space-y-3'>
                                             <h3 className='capitalize font-semibold text-md lg:text-lg'>
                                                {courseTitle}
                                             </h3>
                                             <p className='text-xl capitalize'>
                                                {shortNote}
                                             </p>
                                             <h3 className='block font-semibold text-sm lg:text-lg'>
                                                price: {coursePrice} tk.
                                             </h3>
                                          </div>
                                          <div>
                                             <button className='bg-[#4a60f6] text-white text-center py-3 px-4 rounded-md capitalize block hover:bg-[#868a16] duration-500'>
                                                Course Detail
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              );
                           })}
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

         <div className='absolute bottom-0 left-0 w-full'>
            <Footer />
         </div>
      </div>
   );
};

export default AllCourses;
