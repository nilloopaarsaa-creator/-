import React, { useState } from 'react';
import { CategorizedKeywords } from '../types';
import { TrashIcon } from './Icons';

interface SavedKeywordsListProps {
    categorizedKeywords: CategorizedKeywords;
    onDelete: (category: string, keyword: string) => void;
}

const SavedKeywordsList: React.FC<SavedKeywordsListProps> = ({ categorizedKeywords, onDelete }) => {
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    const toggleCategory = (category: string) => {
        setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
    };
    
    const categories = Object.keys(categorizedKeywords);

    if (categories.length === 0) {
        return null;
    }

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">کلمات کلیدی ذخیره شده</h2>
            <div className="space-y-4">
                {categories.map(category => (
                    <div key={category} className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
                        <button
                            onClick={() => toggleCategory(category)}
                            className="w-full flex justify-between items-center p-4 text-left font-bold text-lg text-teal-300 hover:bg-gray-700/50 transition-colors"
                            aria-expanded={!!openCategories[category]}
                        >
                            <span>{category} ({categorizedKeywords[category].length})</span>
                             <svg className={`w-6 h-6 transition-transform transform ${openCategories[category] ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openCategories[category] && (
                            <div className="p-4 border-t border-gray-700">
                                <ul className="space-y-3">
                                    {categorizedKeywords[category].map(item => (
                                        <li key={item.keyword} className="flex justify-between items-center bg-gray-800 p-3 rounded-md">
                                            <div>
                                                <p className="font-semibold text-white">{item.keyword}</p>
                                                <p className="text-sm text-gray-400">
                                                    حجم جستجو: {item.metrics.searchVolume} | سختی: {item.metrics.difficulty} | CPC: {item.metrics.cpc}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => onDelete(category, item.keyword)}
                                                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-900/50 rounded-full transition-colors"
                                                aria-label={`حذف کلمه کلیدی ${item.keyword}`}
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedKeywordsList;
