import { useContext, useState } from 'react';
import {
   AiOutlineHome,
   AiOutlineUserAdd,
   AiOutlineUpload,
   AiOutlineBars,
   AiOutlineClose,
   AiOutlineLogout,
   AiOutlineArrowDown,
} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/authContext.jsx';

const Sidebar = () => {
   const [open, setOpen] = useState(true);
   const [menuOpen, setMenuOpen] = useState(false);
   const navigate = useNavigate();
   const { user, dispatch } = useContext(authContext);
   const logout = () => {
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
      navigate('/', { replace: true });
   };

   return (
      <div
         className={
            open
               ? 'shadow space-y-10 min-h-screen min-w-[56px] bg-white z-40'
               : 'shadow space-y-10 min-h-screen min-w-[280px] bg-white z-40'
         }>
         <div className={`pt-4 ${!open && 'pl-6'}`}>
            {open ? (
               <button
                  onClick={() => setOpen(!open)}
                  className='px-4 block cursor-pointer'>
                  <AiOutlineBars className='text-xl text-[#3a0ca3]' />
               </button>
            ) : (
               <div className='flex justify-between items-center'>
                  <div className='space-y-2 text-[#3a0ca3]'>
                     {/* <AiOutlineUser className='text-xl' /> */}
                     <span className='block capitalize'>{user?.userName}</span>
                  </div>
                  <div>
                     <button
                        onClick={() => setOpen(!open)}
                        className='px-4 cursor-pointer'>
                        <AiOutlineClose className='text-xl text-[#3a0ca3]' />
                     </button>
                  </div>
               </div>
            )}
         </div>

         {/* menu start here */}

         <div className='space-y-4'>
            {/* dashboard link */}

            <Link to='/' className='flex justify-start items-center space-x-2'>
               <span className='px-4'>
                  <AiOutlineHome className='text-xl text-[#3a0ca3]' />
               </span>
               <li
                  className={
                     !open
                        ? 'list-none block text-[#3a0ca3] hover:text-green-600'
                        : 'list-none hidden'
                  }>
                  BACK TO HOME
               </li>
            </Link>

            <Link
               to='profile'
               className='flex justify-start items-center space-x-2'>
               <span className='px-4'>
                  <AiOutlineUserAdd className='text-xl text-[#3a0ca3]' />
               </span>
               <li
                  className={
                     !open
                        ? 'list-none block text-[#3a0ca3] hover:text-green-600'
                        : 'list-none hidden'
                  }>
                  PROFILE
               </li>
            </Link>

            <Link
               to='manage-content'
               className='flex justify-start items-center space-x-2'>
               <span className='px-4'>
                  <AiOutlineUserAdd className='text-xl text-[#3a0ca3]' />
               </span>
               <li
                  className={
                     !open
                        ? 'list-none block text-[#3a0ca3] hover:text-green-600'
                        : 'list-none hidden'
                  }>
                  MANAGE CONTENT
               </li>
            </Link>

            <button
               onClick={() => setMenuOpen(!menuOpen)}
               className='flex justify-start items-center space-x-2'>
               <div className='px-4'>
                  <AiOutlineUpload className='text-xl text-[#3a0ca3]' />
               </div>
               <li
                  className={
                     !open
                        ? 'list-none block text-[#3a0ca3] relative space-y-4'
                        : 'list-none hidden'
                  }>
                  <div className='flex justify-between items-center capitalize space-x-2 hover:text-green-600'>
                     <span>CONTENT UPLOAD</span>
                     <span>
                        <AiOutlineArrowDown />
                     </span>
                  </div>

                  {menuOpen && (
                     <div className='absolute top-full min-w-full w-max bg-white rounded-lg text-black shadow'>
                        <ul className='list-none text-start'>
                           <Link
                              to='upload-banner'
                              className='px-2 hover:bg-black hover:text-[#fdffb6] py-2 block rounded-t-md duration-100'>
                              Banner
                           </Link>
                           <Link
                              to='upload-popularCourse'
                              className='hover:bg-black hover:text-[#fdffb6] px-2 py-2 block duration-100'>
                              Popular course
                           </Link>
                           <Link
                              to='upload-foundationCourse'
                              className='hover:bg-black hover:text-[#fdffb6] px-2 py-2 block rounded-b-md duration-100'>
                              Foundation course
                           </Link>
                        </ul>
                     </div>
                  )}
               </li>
            </button>

            <button className='flex justify-start items-center space-x-2'>
               <span className='px-4'>
                  <AiOutlineLogout className='text-xl text-[#3a0ca3]' />
               </span>
               <li
                  onClick={() => logout()}
                  className={
                     !open
                        ? 'list-none block text-[#3a0ca3] hover:text-green-600'
                        : 'list-none hidden'
                  }>
                  LOGOUT
               </li>
            </button>
         </div>
      </div>
   );
};

export default Sidebar;
