import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
       <div className='mt-40 py-10 bg-[#022e42]'>
          <div className='lg:flex justify-between items-center mx-6 md:mx-20 lg:mx-26 xl:mx-48 2xl:mx-60'>
             <div>
                <strong className='brand-font text-md sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-[#fdffb6]'>
                   SKILL HERO
                </strong>
             </div>
             <div>
                <p className='capitalize text-white'>
                   copyright &#169; {new Date().getFullYear()} skill hero
                   technology ltd.
                </p>
             </div>
             <div className='flex justify-center items-center space-x-4'>
                <FaFacebook className='text-[#fdffb6] text-2xl' />
                <FaTwitter className='text-[#fdffb6] text-2xl' />
                <FaLinkedin className='text-[#fdffb6] text-2xl' />
             </div>
          </div>
       </div>
    );
};

export default Footer;