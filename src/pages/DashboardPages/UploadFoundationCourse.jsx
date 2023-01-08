import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

const UploadFoundationCourse = () => {
   const [isLoading, setIsLoading] = useState(null);
   const [error, setError] = useState(null);
   const [courseImgLoading, setCourseImgLoading] = useState(null);
   const [courseImgSuccess, setCourseImgSuccess] = useState(null);
   const [instructorImgLoading, setInstructorImgLoading] = useState(null);
   const [instructorImgSuccess, setInstructorImgSuccess] = useState(null);
   const [courseImage, setCourseImage] = useState(null);
   const [instructorImage, setInstructorImage] = useState(null);

   // * UPLOAD course IMAGE TO IMG_BB
   const handleCourseImageUpload = async (e) => {
      const imgData = new FormData();
      imgData.set('key', process.env.REACT_APP_IMGBB_API_KEY);
      imgData.append('image', e.target.files[0]);

      setCourseImgLoading(true);
      setCourseImgSuccess(false);
      setError(false);

      try {
         const response = await axios.post(
            process.env.REACT_APP_API_URL,
            imgData
         );

         if (response.status === 200) {
            setCourseImage(response.data.data.display_url);
         }
         setCourseImgLoading(false);
         setCourseImgSuccess(true);
         setError(false);
      } catch (error) {
         setError(true);
         setCourseImgSuccess(false);
      }
   };

   // * UPLOAD instructor IMAGE TO IMG_BB
   const handleInstructorImgUpload = async (e) => {
      const imgData = new FormData();
      imgData.set('key', process.env.REACT_APP_IMGBB_API_KEY);
      imgData.append('image', e.target.files[0]);

      setInstructorImgLoading(true);
      setInstructorImgSuccess(false);
      setError(false);

      try {
         const response = await axios.post(
            process.env.REACT_APP_API_URL,
            imgData
         );

         if (response.status === 200) {
            setInstructorImage(response.data.data.display_url);
         }
         setInstructorImgLoading(false);
         setInstructorImgSuccess(true);
         setError(false);
      } catch (error) {
         setError(true);
         setInstructorImgSuccess(false);
      }
   };

   // * form submission function
   const { register, handleSubmit, reset } = useForm();
   const onSubmit = async (data) => {
      setIsLoading(true);
      const {
         courseTitle,
         titleBangla,
         coursePrice,
         shortNote,
         courseDetail,
         instructorProfession,
         instructorDetail,
      } = data;

      try {
         const response = await axios.post(
            'http://localhost:1000/api/foundationCourses',
            {
               courseImage,
               courseTitle,
               titleBangla,
               coursePrice,
               shortNote,
               courseDetail,
               instructorImage,
               instructorProfession,
               instructorDetail,
            }
         );
         if (response.status === 201) {
            swal({
               title: 'Good job!',
               text: 'Course publish successfully',
               icon: 'success',
            });
            reset();
            setIsLoading(false);
         }
      } catch (error) {
         setIsLoading(false);
         swal({
            title: error.response.statusText,
            text: error.message,
            icon: 'warning',
         });
      }
   };

   return (
      <div className='flex justify-center items-center min-h-screen w-full md:pl-0 py-8'>
         <div className='mx-6 sm:mx-10 w-full md:w-[70%] lg:w-[50%] 2xl:w-[45%] space-y-10'>
            <div className='text-center'>
               <h3 className='capitalize font-extrabold text-xl md:text-2xl lg:text-4xl text-[#3a0ca3]'>
                  upload foundation course
               </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
               <div className='mb-3 space-x-2 lg:flex items-center'>
                  <div className='w-full'>
                     <label className='form-label inline-block mb-2 text-gray-700'>
                        course Image
                     </label>
                     <input
                        type='file'
                        name=''
                        onChange={handleCourseImageUpload}
                        className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                        disabled={isLoading}
                        required
                     />
                     {courseImgLoading && (
                        <p className='capitalize font-semibold'>
                           wait... upload is in progress
                        </p>
                     )}

                     {courseImgSuccess && (
                        <p className='capitalize text-semibold text-[#38b000]'>
                           image upload successfully
                        </p>
                     )}

                     {error && (
                        <p className='capitalize text-semibold text-[#d00000]'>
                           image upload failed
                        </p>
                     )}
                  </div>
                  <div className='w-full'>
                     <label className='form-label inline-block mb-2 text-gray-700'>
                        Professional Image
                     </label>
                     <input
                        type='file'
                        name=''
                        onChange={handleInstructorImgUpload}
                        className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                        disabled={isLoading}
                        required
                     />
                     {instructorImgLoading && (
                        <p className='capitalize font-semibold'>
                           wait... upload is in progress
                        </p>
                     )}

                     {instructorImgSuccess && (
                        <p className='capitalize text-semibold text-[#38b000]'>
                           image upload successfully
                        </p>
                     )}

                     {error && (
                        <p className='capitalize text-semibold text-[#d00000]'>
                           image upload failed
                        </p>
                     )}
                  </div>
               </div>

               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Course Title
                  </label>
                  <input
                     type='text'
                     name='courseTitle'
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Enter Course Title'
                     disabled={isLoading}
                     required
                     {...register('courseTitle')}
                  />
               </div>

               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Bangla Title
                  </label>
                  <input
                     type='text'
                     name='titleBangla'
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Enter Bangla Title'
                     disabled={isLoading}
                     required
                     {...register('titleBangla')}
                  />
               </div>

               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Course Price
                  </label>
                  <input
                     type='text'
                     name='coursePrice'
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Enter Course Price'
                     disabled={isLoading}
                     required
                     {...register('coursePrice')}
                  />
               </div>

               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Short Note
                  </label>
                  <input
                     type='text'
                     name='shortNote'
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Enter A Short Note'
                     disabled={isLoading}
                     required
                     {...register('shortNote')}
                  />
               </div>

               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Course Detail
                  </label>
                  <textarea
                     type='text'
                     name='courseDetail'
                     rows='5'
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Course Detail'
                     disabled={isLoading}
                     required
                     {...register('courseDetail')}
                  />
               </div>

               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Instructor Profession
                  </label>
                  <input
                     type='text'
                     name='instructorProfession'
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Enter Instructor position'
                     disabled={isLoading}
                     required
                     {...register('instructorProfession')}
                  />
               </div>

               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Instructor Detail
                  </label>
                  <input
                     type='text'
                     name='instructorDetail'
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Enter Instructor Detail'
                     disabled={isLoading}
                     required
                     {...register('instructorDetail')}
                  />
               </div>

               <div className='mt-4'>
                  <input
                     type='submit'
                     className='font-base font-semibold border-2 border-[#3a0ca3] bg-[#3a0ca3] text-white px-10 py-3 rounded-md cursor-pointer hover:bg-transparent hover:text-[#3a0ca3] duration-150'
                     value={isLoading ? 'wait...' : 'PUBLISH'}
                     disabled={isLoading}
                  />
               </div>
            </form>
         </div>
      </div>
   );
};

export default UploadFoundationCourse;
