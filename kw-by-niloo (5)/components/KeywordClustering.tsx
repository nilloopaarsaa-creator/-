import React, { useState, useCallback } from 'react';
import { ClusteringData } from '../types';
import { clusterKeywordsWithGemini } from '../services/geminiService';
import { ClusterIcon } from './Icons';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import ClusteringResultsDisplay from './ClusteringResultsDisplay';

const KeywordClustering: React.FC = () => {
    const [keywordsInput, setKeywordsInput] = useState<string>('');
    const [results, setResults] = useState<ClusteringData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        const keywords = keywordsInput.split('\n').map(k => k.trim()).filter(Boolean);
        if (keywords.length === 0) {
            setError("لطفاً حداقل یک کلمه کلیدی وارد کنید.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setResults(null);

        try {
            const response = await clusterKeywordsWithGemini(keywords);
            const responseText = response.text.trim();
            if (!responseText) {
                throw new Error("پاسخ خالی از سرویس دریافت شد.");
            }
            
            const parsedData = JSON.parse(responseText);
            setResults(parsedData);

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? `خطا در پردازش: ${err.message}` : "یک خطای ناشناخته رخ داد. ممکن است فرمت پاسخ نامعتبر باشد.");
        } finally {
            setIsLoading(false);
        }
    }, [keywordsInput]);

    return (
        <div className="animate-fade-in">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
                <p className="text-gray-300 text-center">
                    لیستی از کلمات کلیدی خود را (هر کدام در یک خط) وارد کنید تا ابزار آنها را به گروه‌های موضوعی دسته‌بندی کند.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <textarea
                    value={keywordsInput}
                    onChange={(e) => setKeywordsInput(e.target.value)}
                    placeholder="مثال:&#10;خرید گوشی سامسونگ&#10;قیمت آیفون ۱۳&#10;بهترین گوشی شیائومی&#10;مقایسه گوشی سامسونگ و شیائومی"
                    className="flex-grow bg-gray-800 text-white placeholder-gray-500 border-2 border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 min-h-[200px]"
                    disabled={isLoading}
                    rows={10}
                />
                <button
                    type="submit"
                    disabled={isLoading || keywordsInput.trim() === ''}
                    className="flex w-full items-center justify-center bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            در حال خوشه‌بندی...
                        </>
                    ) : (
                        <>
                            <ClusterIcon className="w-6 h-6 ml-2" />
                            شروع خوشه‌بندی
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8">
                {isLoading && <LoadingSpinner />}
                {error && <ErrorMessage message={error} />}
                {results && <ClusteringResultsDisplay data={results} />}
            </div>
        </div>
    );
};

export default KeywordClustering;