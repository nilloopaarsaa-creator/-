
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-300 text-lg">در حال تحلیل کلمه کلیدی...</p>
    </div>
  );
};

export default LoadingSpinner;
