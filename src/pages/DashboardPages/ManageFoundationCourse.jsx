import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { BsCheck2Circle } from 'react-icons/bs';
import { RiErrorWarningLine } from 'react-icons/ri';

const ManageFoundationCourse = () => {
   const [foundationCourse, setFoundationCourse] = useState([]);
   const [error, setError] = useState(null);
   const [courseId, setCourseId] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [action, setAction] = useState(false);

   // useEffect hook
   useEffect(() => {
      fetchBanner();
   }, []);

   // get method
   const fetchBanner = async () => {
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

   // delete method
   const deletePopularCourse = async (id) => {
      try {
         const response = await axios.delete(
            `http://localhost:1000/api/foundationCourses/${id}`
         );
         if (response.status === 200) {
            setAction(true);
            fetchBanner();
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
      <div className='space-y-6 px-4 lg:px-8'>
         <div className='text-center'>
            <h3 className='text-xl sm:text-2xl md:text-3xl xl:text-4xl font-extrabold uppercase'>
               manage Foundation Course
            </h3>
         </div>

         <div>
            {!error ? (
               <div>
                  {foundationCourse.length === 0 ? (
                     <div className='text-center font-extrabold'>
                        <h3>Loading...</h3>
                     </div>
                  ) : (
                     <div className='space-y-6 md:grid grid-cols-2 gap-6'>
                        {foundationCourse.map((course) => {
                           const {
                              _id,
                              courseImage,
                              courseTitle,
                              titleBangla,
                              coursePrice,
                              shortNote,
                              courseDetail,
                              instructorImage,
                              instructorProfession,
                              instructorDetail,
                           } = course;
                           return (
                              <div
                                 className='shadow rounded-lg space-y-10 p-4'
                                 key={_id}>
                                 <div>
                                    <img
                                       src={courseImage}
                                       className='w-full h-full'
                                       alt='img'
                                    />
                                 </div>

                                 <div>
                                    <div className='space-y-4'>
                                       <h3 className='text-xl md:text-xl lg:text-4xl font-bold capitalize'>
                                          foundation course: {courseTitle}
                                       </h3>
                                       <p className='capitalize'>
                                          {titleBangla}
                                       </p>
                                       <p className='text-xl capitalize'>
                                          {shortNote}
                                       </p>
                                       <p className='text-lg'>{courseDetail}</p>
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
                                             className='space-x-4 w-20 h-20 rounded-full'
                                             alt=''
                                          />
                                          <p className='text-lg capitalize font-semibold'>
                                             {instructorProfession}
                                          </p>
                                       </div>

                                       <p className='text-lg'>
                                          <span className='font-extrabold'>
                                             InstructorDetail:
                                          </span>{' '}
                                          {instructorDetail}
                                       </p>
                                    </div>

                                    <div className='flex justify-between pb-4 mt-8'>
                                       <Link
                                          to={`/dashboard/edit-foundationCourse/${_id}`}
                                          className='w-3/6 py-3 px-4 text-center uppercase rounded-l-md border border-green-600 bg-green-600 text-white hover:bg-green-700 duration-150'>
                                          Edit
                                       </Link>

                                       <button
                                          onClick={() =>
                                             setShowModal(
                                                true,
                                                setCourseId(_id)
                                             )
                                          }
                                          className='w-3/6 py-3 px-4 uppercase rounded-r-md border border-red-600 bg-red-600 text-white hover:bg-red-700 duration-150'>
                                          Delete
                                       </button>
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

         {/* modal display */}
         {showModal ? (
            <>
               <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                  <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                     <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                        <div className='p-5 border-b border-solid border-slate-200 rounded-t'>
                           {!action ? (
                              <div className='space-y-4 text-center'>
                                 <RiErrorWarningLine className='text-6xl text-orange-600 m-auto' />
                                 <h3 className='text-xl font-semibold capitalize'>
                                    are you sure ?
                                 </h3>
                                 <p className='font-semibold'>
                                    Once deleted, you will not be able to
                                    recover this file!
                                 </p>
                              </div>
                           ) : (
                              <div className='space-y-4'>
                                 <BsCheck2Circle className='text-6xl text-green-600 m-auto' />
                                 <h3 className='text-lg font-semibold capitalize'>
                                    Your file has been deleted!
                                 </h3>
                              </div>
                           )}
                        </div>

                        <div className='flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b'>
                           {!action ? (
                              <>
                                 <button
                                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150'
                                    type='button'
                                    onClick={() => setShowModal(false)}>
                                    Cancel
                                 </button>
                                 <button
                                    onClick={() =>
                                       deletePopularCourse(courseId)
                                    }
                                    className='bg-red-600 text-white active:bg-emerald-600 uppercase text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
                                    type='button'>
                                    Delete
                                 </button>
                              </>
                           ) : (
                              <button
                                 className='bg-green-600 text-white active:bg-emerald-600 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
                                 type='button'
                                 onClick={() =>
                                    setShowModal(false, setAction(false))
                                 }>
                                 Ok
                              </button>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
               <div className='opacity-50 fixed inset-0 z-40 bg-black'></div>
            </>
         ) : null}
      </div>
   );
};

export default ManageFoundationCourse;
