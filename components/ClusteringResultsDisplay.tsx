import React, { useState, useMemo } from 'react';
import { ClusteringData } from '../types';
import { ClusterIcon, DownloadIcon, MindMapIcon, ViewGridIcon, FilterIcon } from './Icons';
import MindMapDisplay from './MindMapDisplay';

interface ClusteringResultsDisplayProps {
    data: ClusteringData;
}

type DisplayMode = 'cards' | 'mindmap';

const ClusteringResultsDisplay: React.FC<ClusteringResultsDisplayProps> = ({ data }) => {
    const [displayMode, setDisplayMode] = useState<DisplayMode>('cards');
    const [minKeywordCount, setMinKeywordCount] = useState<number>(1);

    const filteredData = useMemo(() => {
        const filterValue = Number(minKeywordCount) || 0;
        if (filterValue <= 1) {
            return data;
        }
        return data.filter(cluster => cluster.count >= filterValue);
    }, [data, minKeywordCount]);

    const convertToCSV = (data: Record<string, any>[], headers: string[]) => {
        const headerRow = headers.join(',');
        const rows = data.map(row => 
            headers.map(header => {
                const cell = row[header];
                const escaped = ('' + cell).replace(/"/g, '""');
                return `"${escaped}"`;
            }).join(',')
        );
        return [headerRow, ...rows].join('\n');
    };

    const downloadCSV = (csvContent: string, fileName: string) => {
        const BOM = '\uFEFF'; // UTF-8 Byte Order Mark
        const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleDownloadKeywords = () => {
        const keywordsWithTopicsData = filteredData.flatMap(cluster => 
            cluster.keywords.map(keyword => ({
                'Keywords': keyword,
                'Assigned Topic': cluster.topicName
            }))
        );
        const csv = convertToCSV(keywordsWithTopicsData, ['Keywords', 'Assigned Topic']);
        downloadCSV(csv, 'keywords_with_topics.csv');
    };

    const handleDownloadSummary = () => {
        const topicSummaryData = filteredData.map(cluster => ({
            'Topic': cluster.topicId,
            'Count': cluster.count,
            'Name': cluster.topicName,
        })).sort((a,b) => a.Topic - b.Topic);
        const csv = convertToCSV(topicSummaryData, ['Topic', 'Count', 'Name']);
        downloadCSV(csv, 'topic_summary.csv');
    };
    
    const ViewToggleButton: React.FC<{
      mode: DisplayMode, 
      label: string, 
      icon: React.ReactNode
    }> = ({ mode, label, icon }) => (
       <button 
          onClick={() => setDisplayMode(mode)} 
          className={`p-2 rounded-md transition-colors ${displayMode === mode ? 'bg-teal-500 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
          aria-label={label}
        >
          {icon}
       </button>
    );

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-white text-center sm:text-right">
                    نتایج خوشه‌بندی
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-700/50 p-2 rounded-lg">
                        <FilterIcon className="w-5 h-5 text-gray-300" />
                        <input
                            id="min-keywords"
                            type="number"
                            min="1"
                            value={minKeywordCount}
                            onChange={(e) => setMinKeywordCount(Number(e.target.value))}
                            className="bg-transparent text-white w-16 text-center focus:outline-none [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder="حداقل"
                            aria-label="حداقل تعداد کلمات کلیدی برای فیلتر"
                        />
                    </div>
                    <div className="flex bg-gray-700/50 p-1 rounded-lg">
                        <ViewToggleButton mode="cards" label="نمایش کارتی" icon={<ViewGridIcon className="w-5 h-5" />} />
                        <ViewToggleButton mode="mindmap" label="نمایش نقشه ذهنی" icon={<MindMapIcon className="w-5 h-5" />} />
                    </div>
                    <button onClick={handleDownloadKeywords} className="flex items-center justify-center bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-300">
                        <DownloadIcon className="w-5 h-5 ml-2" />
                        کلمات کلیدی با موضوع
                    </button>
                    <button onClick={handleDownloadSummary} className="flex items-center justify-center bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-300">
                        <DownloadIcon className="w-5 h-5 ml-2" />
                        خلاصه موضوعات
                    </button>
                </div>
            </div>

            {displayMode === 'cards' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.length === 0 ? (
                        <p className="text-gray-400 col-span-full text-center py-8">
                            هیچ خوشه‌ای با این معیار فیلتر یافت نشد.
                        </p>
                    ) : (
                        filteredData.map((cluster) => (
                            <div key={cluster.topicId} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex flex-col">
                                <div className="flex items-center mb-4">
                                    <div className="bg-gray-700 p-3 rounded-full mr-4">
                                        <ClusterIcon className="w-6 h-6 text-teal-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{cluster.topicName}</h3>
                                        <p className="text-sm text-gray-400">شناسه: {cluster.topicId} | تعداد: {cluster.count}</p>
                                    </div>
                                </div>
                                <ul className="space-y-3 flex-grow mt-2">
                                    {cluster.keywords.map((kw, kwIndex) => (
                                        <li key={kwIndex} className="flex items-center text-gray-300">
                                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 shrink-0"></span>
                                            {kw}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                 <MindMapDisplay data={filteredData} />
            )}
        </div>
    );
};

export default ClusteringResultsDisplay;