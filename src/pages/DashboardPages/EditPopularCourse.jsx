import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const EditPopularCourse = () => {
   const [isLoading, setIsLoading] = useState(null);
   const [course, setCourse] = useState({});
   const { courseId } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      getSingleCourse();
   }, [courseId]);

   // get single course
   const getSingleCourse = async () => {
      setIsLoading(true);
      try {
         const response = await axios.get(
            `http://localhost:1000/api/popularCourses/${courseId}`
         );

         if (response.status === 200) {
            setCourse(response.data);
            setIsLoading(null);
         }
      } catch (error) {
         swal({
            title: error.response.statusText,
            text: error.message,
            icon: 'warning',
         });
      }
   };

   // edit course function
   const handleEditCourse = (e) => {
      const newCourse = { ...course };
      newCourse[e.target.name] = e.target.value;
      setCourse(newCourse);
   };

   // update course
   const handleUpdateCourse = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
         const response = await axios.patch(
            `http://localhost:1000/api/popularCourses/${courseId}`,
            {
               courseTitle: course.courseTitle,
               titleBangla: course.titleBangla,
               coursePrice: course.coursePrice,
               shortNote: course.shortNote,
               courseDetail: course.courseDetail,
               instructorProfession: course.instructorProfession,
               instructorDetail: course.instructorDetail,
               updateDate: course.updateDate,
            }
         );
         if (response.status === 200) {
            swal({
               title: 'Good job!',
               text: 'course update successfully',
               icon: 'success',
            });
            setIsLoading(null);
            navigate('/dashboard/manage-content', { replace: true });
         }
      } catch (error) {
         swal({
            title: error.response.statusText,
            text: error.message,
            icon: 'warning',
         });
      }
   };

   return (
      <div className='flex justify-center items-center min-h-screen w-full md:pl-0'>
         <div className='mx-6 sm:mx-10 w-full md:w-[70%] lg:w-[50%] 2xl:w-[45%] space-y-10'>
            <div className='text-center space-y-4'>
               <h3 className='capitalize font-extrabold text-xl md:text-2xl lg:text-4xl text-[#3a0ca3]'>
                  Update popular course
               </h3>
               <p>Course Id: {courseId}</p>
            </div>

            <form onSubmit={handleUpdateCourse}>
               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Course Title
                  </label>
                  <input
                     type='text'
                     name='courseTitle'
                     value={course.courseTitle || ''}
                     onChange={handleEditCourse}
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Enter Course Title'
                     disabled={isLoading}
                     required
                  />
               </div>

               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Bangla Title
                  </label>
                  <input
                     type='text'
                     name='titleBangla'
                     value={course.titleBangla || ''}
                     onChange={handleEditCourse}
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Enter Bangla Title'
                     disabled={isLoading}
                     required
                  />
               </div>

               <div className='mb-3 space-x-2 lg:flex items-center'>
                  <div className='w-full'>
                     <label className='form-label inline-block mb-2 text-gray-700'>
                        Course Price
                     </label>
                     <input
                        type='text'
                        name='coursePrice'
                        value={course.coursePrice || ''}
                        onChange={handleEditCourse}
                        className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                        placeholder='Enter Course Price'
                        disabled={isLoading}
                        required
                     />
                  </div>
                  <div className='w-full'>
                     <label className='form-label inline-block mb-2 text-gray-700'>
                        Update Date
                     </label>
                     <input
                        type='date'
                        name='updateDate'
                        value={course.updateDate || ''}
                        onChange={handleEditCourse}
                        className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                        disabled={isLoading}
                        required
                     />
                  </div>
               </div>

               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Short Note
                  </label>
                  <input
                     type='text'
                     name='shortNote'
                     value={course.shortNote || ''}
                     onChange={handleEditCourse}
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Enter A short note'
                     disabled={isLoading}
                     required
                  />
               </div>

               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Course Detail
                  </label>
                  <textarea
                     type='text'
                     name='courseDetail'
                     value={course.courseDetail || ''}
                     onChange={handleEditCourse}
                     rows='5'
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Course Detail'
                     disabled={isLoading}
                     required
                  />
               </div>

               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Instructor Profession
                  </label>
                  <input
                     type='text'
                     name='instructorProfession'
                     value={course.instructorProfession || ''}
                     onChange={handleEditCourse}
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Enter Instructor Profession'
                     disabled={isLoading}
                     required
                  />
               </div>

               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Instructor Detail
                  </label>
                  <input
                     type='text'
                     name='instructorDetail'
                     value={course.instructorDetail || ''}
                     onChange={handleEditCourse}
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Enter Instructor Detail'
                     disabled={isLoading}
                     required
                  />
               </div>

               <div className='mt-4'>
                  <input
                     type='submit'
                     className='font-base font-semibold border-2 border-[#3a0ca3] bg-[#3a0ca3] text-white px-10 py-3 rounded-md cursor-pointer hover:bg-transparent hover:text-[#3a0ca3] duration-150'
                     value={isLoading ? 'wait...' : 'UPDATE'}
                     disabled={isLoading}
                  />
               </div>
            </form>
         </div>
      </div>
   );
};

export default EditPopularCourse;
