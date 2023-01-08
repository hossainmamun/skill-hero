import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const EditBanner = () => {
   const [isLoading, setIsLoading] = useState(null);
   const [banner, setBanner] = useState({});
   const { bannerId } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      getSingleBanner();
   }, [bannerId]);

   // get single banner
   const getSingleBanner = async () => {
      setIsLoading(true);
      try {
         const response = await axios.get(
            `http://localhost:1000/api/banner/${bannerId}`
         );

         if (response.status === 200) {
            setBanner(response.data);
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

   // edit banner function
   const handleEditBanner = (e) => {
      const newBanner = { ...banner };
      newBanner[e.target.name] = e.target.value;
      setBanner(newBanner);
   };

   // update banner
   const handleUpdateBanner = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
         const response = await axios.patch(
            `http://localhost:1000/api/banner/${bannerId}`,
            {
               bannerTitle: banner.bannerTitle,
               bannerSubTitle: banner.bannerSubTitle,
            }
         );
         if (response.status === 200) {
            swal({
               title: 'Good job!',
               text: 'Banner update successfully',
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
                  Update banner content
               </h3>
               <p>Banner Id: {bannerId}</p>
            </div>

            <form onSubmit={handleUpdateBanner}>
               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Banner Title
                  </label>
                  <input
                     type='text'
                     name='bannerTitle'
                     value={banner.bannerTitle || ''}
                     onChange={handleEditBanner}
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Enter Banner Title'
                     disabled={isLoading}
                     required
                  />
               </div>

               <div className='mb-3 w-full'>
                  <label className='form-label inline-block mb-2 text-gray-700'>
                     Banner SubTitle
                  </label>
                  <textarea
                     type='text'
                     name='bannerSubTitle'
                     rows='4'
                     value={banner.bannerSubTitle || ''}
                     onChange={handleEditBanner}
                     className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                     placeholder='Banner Detail'
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

export default EditBanner;
