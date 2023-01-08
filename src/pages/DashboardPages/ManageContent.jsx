import React from 'react';
import ManageBanners from './ManageBanners.jsx';
import ManageFoundationCourse from './ManageFoundationCourse.jsx';
import ManagePopularCourse from './ManagePopularCourse.jsx';

const ManageContent = () => {
    return (
       <div className='min-h-screen w-full flex justify-center py-8'>
          <div className='space-y-24 w-full'>
             <ManageBanners />
             <ManagePopularCourse />
             <ManageFoundationCourse/>
          </div>
       </div>
    );
};

export default ManageContent;