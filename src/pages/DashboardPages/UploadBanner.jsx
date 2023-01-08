import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

const UploadBanner = () => {
   const [isLoading, setLoading] = useState(false);

   // * form submission function
   const { register, handleSubmit, reset } = useForm();
   const onSubmit = async (data) => {
      setLoading(true);
      const { bannerTitle, bannerSubTitle } = data;

      try {
         const response = await axios.post('http://localhost:1000/api/banner', {
            bannerTitle,
            bannerSubTitle,
         });
         if (response.status === 201) {
            swal({
               title: 'Good job!',
               text: 'Banner publish successfully',
               icon: 'success',
            });
            reset();
            setLoading(false);
         }
      } catch (error) {
         setLoading(false);
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
            <div className='text-center'>
               <h3 className='capitalize font-extrabold text-xl md:text-2xl lg:text-4xl text-[#3a0ca3]'>
                  upload banner content
               </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Banner Title
                  </label>
                  <input
                     type='text'
                     name='bannerTitle'
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Enter Banner Title'
                     disabled={isLoading}
                     required
                     {...register('bannerTitle')}
                  />
               </div>

               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Banner Detail
                  </label>
                  <textarea
                     type='text'
                     name='bannerSubTitle'
                     rows='4'
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Banner Detail'
                     disabled={isLoading}
                     required
                     {...register('bannerSubTitle')}
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

export default UploadBanner;
