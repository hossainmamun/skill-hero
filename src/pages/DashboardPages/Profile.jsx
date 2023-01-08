import { useContext } from 'react';
import { authContext } from '../../context/authContext.jsx';
import { AiOutlineUser } from 'react-icons/ai';

const Profile = () => {
   const { user } = useContext(authContext);

   return (
      <div className='flex justify-center items-center min-h-screen min-w-full'>
         <div className='space-y-6 w-full'>
            <div className='flex justify-center items-center mb-10'>
               <div className='space-y-2'>
                  <AiOutlineUser className='m-auto text-7xl' />
                  <span className='block capitalize font-bold'>{user?.userName}</span>
               </div>
            </div>

            <div className='overflow-x-auto relative flex justify-center'>
               <table className='w-full lg:w-3/6 text-sm text-left text-gray-500 dark:text-gray-400 space-y-6'>
                  <tbody>
                     <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <th
                           scope='row'
                           className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                           User Name
                        </th>
                        <td className='py-4 px-6'>{user?.userName}</td>
                     </tr>
                     <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <th
                           scope='row'
                           className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                           User Email
                        </th>
                        <td className='py-4 px-6'>{user?.email}</td>
                     </tr>
                  </tbody>
               </table>
            </div>

            {/* <div className='flex justify-center'>
               <button className='font-base font-semibold border-2 border-[#3a0ca3] bg-[#3a0ca3] text-white px-10 py-3 rounded-lg hover:bg-transparent hover:text-[#3a0ca3] duration-150'>
                  EDIT PROFILE
               </button>
            </div> */}
         </div>
      </div>
   );
};

export default Profile;
