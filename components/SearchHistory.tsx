import React from 'react';
import { HistoryIcon, TrashIcon } from './Icons';

interface SearchHistoryProps {
    history: string[];
    onHistoryClick: (keyword: string) => void;
    onClear: () => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onHistoryClick, onClear }) => {
    if (history.length === 0) {
        return null;
    }

    return (
        <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white flex-1 text-center">تاریخچه جستجو</h2>
                <button
                    onClick={onClear}
                    className="flex items-center text-sm text-gray-400 hover:text-red-400 transition-colors pr-4"
                    aria-label="پاک کردن تاریخچه جستجو"
                >
                    <TrashIcon className="w-4 h-4 ml-1" />
                    پاک کردن همه
                </button>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <ul className="flex flex-wrap gap-3">
                    {history.map((keyword, index) => (
                        <li key={`${keyword}-${index}`}>
                            <button
                                onClick={() => onHistoryClick(keyword)}
                                className="flex items-center bg-gray-700 text-gray-300 px-4 py-2 rounded-full hover:bg-teal-500 hover:text-white transition-all duration-200"
                            >
                                <HistoryIcon className="w-4 h-4 ml-2" />
                                {keyword}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchHistory;
