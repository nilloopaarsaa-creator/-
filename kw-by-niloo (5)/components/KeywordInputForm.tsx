
import React, { useState } from 'react';
import { SearchIcon } from './Icons';

interface KeywordInputFormProps {
  onSubmit: (keyword: string) => void;
  isLoading: boolean;
}

const KeywordInputForm: React.FC<KeywordInputFormProps> = ({ onSubmit, isLoading }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="کلمه کلیدی خود را وارد کنید..."
        className="flex-grow bg-gray-800 text-white placeholder-gray-500 border-2 border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            در حال پردازش...
          </>
        ) : (
          <>
            <SearchIcon className="w-5 h-5 ml-2" />
            تحلیل کن
          </>
        )}
      </button>
    </form>
  );
};

export default KeywordInputForm;
