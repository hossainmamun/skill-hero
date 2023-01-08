import React from 'react';

const ErrorPage = () => {
    return (
       <div className='flex justify-center items-center min-h-screen w-full bg-white'>
          <div className='text-center space-y-2'>
             <h3 className='capitalize font-extrabold text-lg md:text-:xl lg:text-4xl text-[#e71d36]'>
                404 page not found
             </h3>
             <p className='text-base md:text-lg capitalize'>
                sorry invalid route or path name is not matched
             </p>
          </div>
       </div>
    );
};

export default ErrorPage;