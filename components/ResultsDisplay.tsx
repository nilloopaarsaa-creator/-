import React, { useState, useEffect } from 'react';
import { KeywordData, GroundingChunk } from '../types';
import { suggestCategoryWithGemini } from '../services/geminiService';
import { ChartBarIcon, CurrencyDollarIcon, TrendingUpIcon, LinkIcon, LightbulbIcon, BookmarkIcon, BrainIcon, SparklesIcon, AiOverviewIcon } from './Icons';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex flex-col items-start h-full">
    <div className="bg-gray-700 p-3 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-gray-400 text-md font-medium">{title}</h3>
    <p className="text-3xl font-bold text-white mt-1">{value}</p>
  </div>
);

const DifficultyStatCard: React.FC<{ value: string; icon: React.ReactNode; }> = ({ value, icon }) => {
    const difficultyValue = parseInt(value, 10);
    const isValid = !isNaN(difficultyValue);
    const percentage = isValid ? Math.min(Math.max(difficultyValue, 0), 100) : 0;

    let progressBarColor = 'bg-green-500';
    let difficultyText = 'آسان';
    if (percentage >= 70) {
        progressBarColor = 'bg-red-500';
        difficultyText = 'سخت';
    } else if (percentage >= 40) {
        progressBarColor = 'bg-yellow-500';
        difficultyText = 'متوسط';
    }

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex flex-col items-start h-full">
            <div className="bg-gray-700 p-3 rounded-full mb-4">
                {icon}
            </div>
            <h3 className="text-gray-400 text-md font-medium">سختی کلمه کلیدی</h3>
            {isValid ? (
                <>
                    <div className="w-full flex items-center justify-between mt-2">
                        <p className="text-2xl font-bold text-white">{`${percentage}/۱۰۰`}</p>
                        <p className={`text-sm font-semibold ${
                            percentage >= 70 ? 'text-red-400' : percentage >= 40 ? 'text-yellow-400' : 'text-green-400'
                        }`}>{difficultyText}</p>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
                        <div
                            className={`h-2.5 rounded-full ${progressBarColor}`}
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                </>
            ) : (
                 <p className="text-3xl font-bold text-white mt-1">N/A</p>
            )}
        </div>
    );
};

const IntentStatCard: React.FC<{ value: string; icon: React.ReactNode; }> = ({ value, icon }) => (
     <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex flex-col items-start h-full">
        <div className="bg-gray-700 p-3 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-gray-400 text-md font-medium">قصد کاربر</h3>
        <span className="mt-2 text-lg font-semibold bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
            {value}
        </span>
    </div>
);


interface ResultsDisplayProps {
  data: KeywordData;
  sources: GroundingChunk[];
  onSave: (keywordData: KeywordData, category: string) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data, sources, onSave }) => {
  const [categoryInput, setCategoryInput] = useState('');
  const [suggestedCategory, setSuggestedCategory] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(true);

  useEffect(() => {
    const fetchSuggestion = async () => {
        setIsSuggesting(true);
        setSuggestedCategory('');
        try {
            const response = await suggestCategoryWithGemini(data.keyword, data.metrics.intent, data.relatedKeywords);
            const suggestion = response.text.trim();
            if (suggestion) {
                setSuggestedCategory(suggestion);
            }
        } catch (e) {
            console.error("Failed to fetch category suggestion", e);
        } finally {
            setIsSuggesting(false);
        }
    };
    if(data) {
        fetchSuggestion();
    }
  }, [data]);

  const handleManualSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryInput.trim()) {
      onSave(data, categoryInput.trim());
      setCategoryInput('');
    } else {
        alert("لطفاً یک دسته برای ذخیره وارد کنید.");
    }
  };

  const handleSuggestedSave = () => {
      if (suggestedCategory) {
          onSave(data, suggestedCategory);
      }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="حجم جستجوی ماهانه" value={data.metrics.searchVolume} icon={<TrendingUpIcon className="w-6 h-6 text-teal-400" />} />
        <DifficultyStatCard value={data.metrics.difficulty} icon={<ChartBarIcon className="w-6 h-6 text-yellow-400" />} />
        <StatCard title="هزینه به ازای هر کلیک (USD)" value={data.metrics.cpc} icon={<CurrencyDollarIcon className="w-6 h-6 text-green-400" />} />
        <IntentStatCard value={data.metrics.intent} icon={<LightbulbIcon className="w-6 h-6 text-purple-400" />} />
      </div>

      {/* AI Overview */}
      {data.aiOverview && data.aiOverview !== 'N/A' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <AiOverviewIcon className="w-6 h-6 text-yellow-400" />
                دید کلی AI (خلاصه SERP)
            </h3>
            <p className="text-gray-300 leading-relaxed">
                {data.aiOverview}
            </p>
        </div>
      )}


      {/* Keyword Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">کلمات کلیدی مرتبط</h3>
          <ul className="space-y-3">
            {data.relatedKeywords.map((kw, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 shrink-0"></span>
                {kw}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">سوالات متداول (FAQ)</h3>
          <ul className="space-y-3">
            {data.longTailKeywords.map((kw, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 shrink-0"></span>
                {kw}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BrainIcon className="w-6 h-6 text-pink-400" />
            کلمات کلیدی مشابه معنایی
          </h3>
          <ul className="space-y-3">
            {data.semanticallySimilarKeywords.map((kw, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 shrink-0"></span>
                {kw}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Save Keyword Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">ذخیره کلمه کلیدی</h3>
        
        <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                <SparklesIcon className="w-5 h-5 text-yellow-400" />
                دسته پیشنهادی هوش مصنوعی
            </label>
            {isSuggesting ? (
                <div className="animate-pulse bg-gray-700/50 rounded-lg h-12 mt-2"></div>
            ) : suggestedCategory ? (
                <button
                    type="button"
                    onClick={handleSuggestedSave}
                    className="w-full mt-2 flex items-center justify-center bg-teal-600/50 text-teal-200 font-bold py-3 px-6 rounded-lg hover:bg-teal-600/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 transition-all duration-300"
                >
                    <BookmarkIcon className="w-5 h-5 ml-2" />
                    ذخیره در دسته "{suggestedCategory}"
                </button>
            ) : (
                <p className="text-gray-500 mt-2 text-center py-2">پیشنهادی یافت نشد. می‌توانید یک دسته سفارشی ایجاد کنید.</p>
            )}
        </div>

        <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">یا</span>
            <div className="flex-grow border-t border-gray-700"></div>
        </div>
        
        <form onSubmit={handleManualSave} className="flex flex-col sm:flex-row gap-3">
            <input
                type="text"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                placeholder="ایجاد یک دسته سفارشی..."
                className="flex-grow bg-gray-700 text-white placeholder-gray-500 border-2 border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
            />
            <button
                type="submit"
                disabled={!categoryInput.trim()}
                className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50"
            >
                <BookmarkIcon className="w-5 h-5 ml-2" />
                ذخیره
            </button>
        </form>
      </div>
      
      {/* Sources */}
      {sources && sources.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">منابع داده</h3>
          <ul className="space-y-3">
            {/* FIX: Also check for source.web.uri to ensure the href is valid before rendering the link. */}
            {sources.map((source, index) => source.web && source.web.uri && (
              <li key={index}>
                <a 
                  href={source.web.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  <LinkIcon className="w-4 h-4 ml-2" />
                  {source.web.title || source.web.uri}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;