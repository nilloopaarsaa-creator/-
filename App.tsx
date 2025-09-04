import React, { useState, useCallback, useEffect } from 'react';
import { KeywordData, GroundingChunk, CategorizedKeywords } from './types';
import { getMainKeywordAnalysis, getSemanticallySimilarKeywords } from './services/geminiService';
import KeywordInputForm from './components/KeywordInputForm';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import SavedKeywordsList from './components/SavedKeywordsList';
import SearchHistory from './components/SearchHistory';
import { GeminiIcon, ClusterIcon, SearchIcon } from './components/Icons';
import KeywordClustering from './components/KeywordClustering';

type View = 'research' | 'clustering';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('research');
  const [results, setResults] = useState<KeywordData | null>(null);
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [savedKeywords, setSavedKeywords] = useState<CategorizedKeywords>({});
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedKeywords = localStorage.getItem('savedKeywords');
      if (storedKeywords) {
        setSavedKeywords(JSON.parse(storedKeywords));
      }
    } catch (e) {
      console.error("Failed to load or parse saved keywords from localStorage", e);
    }
    try {
        const storedHistory = localStorage.getItem('searchHistory');
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory));
        }
    } catch (e) {
        console.error("Failed to load or parse search history from localStorage", e);
    }
  }, []);

  const parseResponse = (text: string, keyword: string): Omit<KeywordData, 'semanticallySimilarKeywords'> => {
    const getVal = (label: string) => text.match(new RegExp(`${label}:\\s*(.*)`))?.[1].trim() || 'N/A';
    
    const getBlock = (startMarker: string, endMarker: string) => {
        const regex = new RegExp(`${startMarker}\\n([\\s\\S]*?)\\n${endMarker}`);
        const match = text.match(regex);
        return match && match[1] ? match[1].trim() : 'N/A';
    };

    const getList = (startMarker: string, endMarker: string) => {
      const regex = new RegExp(`${startMarker}\\n([\\s\\S]*?)\\n${endMarker}`);
      const match = text.match(regex);
      if (match && match[1]) {
        return match[1].split('\n').map(item => item.trim()).filter(Boolean);
      }
      return [];
    };

    return {
      keyword,
      metrics: {
        searchVolume: getVal('SEARCH_VOLUME'),
        difficulty: getVal('DIFFICULTY'),
        cpc: getVal('CPC'),
        intent: getVal('SEARCH_INTENT'),
      },
      aiOverview: getBlock('AI_OVERVIEW_START', 'AI_OVERVIEW_END'),
      relatedKeywords: getList('RELATED_KEYWORDS_START', 'RELATED_KEYWORDS_END'),
      longTailKeywords: getList('LONG_TAIL_KEYWORDS_START', 'LONG_TAIL_KEYWORDS_END'),
    };
  };

  const handleSubmit = useCallback(async (keyword: string) => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;
    
    setActiveView('research'); // Ensure we are on the research tab

    const updatedHistory = [trimmedKeyword, ...searchHistory.filter(h => h !== trimmedKeyword)].slice(0, 15);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    setIsLoading(true);
    setError(null);
    setResults(null);
    setSources([]);

    try {
      // Step 1: Main analysis call
      const mainResponse = await getMainKeywordAnalysis(trimmedKeyword);
      const mainResponseText = mainResponse.text;
      
      if (!mainResponseText) {
        throw new Error("پاسخ اصلی از سرویس دریافت نشد.");
      }

      const parsedMainData = parseResponse(mainResponseText, trimmedKeyword);
      
      // Set initial results so user sees something
      setResults({ ...parsedMainData, semanticallySimilarKeywords: [] });
      
      const groundingMetadata = mainResponse.candidates?.[0]?.groundingMetadata;
      if (groundingMetadata?.groundingChunks) {
        setSources(groundingMetadata.groundingChunks);
      }

      // Step 2: Semantic analysis call
      const combinedList = [...parsedMainData.relatedKeywords, ...parsedMainData.longTailKeywords];
      if (combinedList.length > 0) {
        const semanticResponse = await getSemanticallySimilarKeywords(trimmedKeyword, combinedList);
        const semanticKeywords = semanticResponse.text.trim().split('\n').filter(Boolean);
        
        // Update results with the new semantic keywords
        setResults(prevResults => prevResults ? { ...prevResults, semanticallySimilarKeywords: semanticKeywords } : null);
      }

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "یک خطای ناشناخته رخ داد. لطفاً دوباره تلاش کنید.");
      setResults(null); // Clear results on error
    } finally {
      setIsLoading(false);
    }
  }, [searchHistory]);

  const handleSaveKeyword = useCallback((keywordData: KeywordData, category: string) => {
    const newSavedKeywords = { ...savedKeywords };
    if (!newSavedKeywords[category]) {
      newSavedKeywords[category] = [];
    }
    
    if (!newSavedKeywords[category].some(k => k.keyword === keywordData.keyword)) {
      newSavedKeywords[category].push(keywordData);
      setSavedKeywords(newSavedKeywords);
      localStorage.setItem('savedKeywords', JSON.stringify(newSavedKeywords));
    } else {
      alert('این کلمه کلیدی قبلاً در این دسته ذخیره شده است.');
    }
  }, [savedKeywords]);
  
  const handleDeleteKeyword = useCallback((category: string, keywordToDelete: string) => {
      const newSavedKeywords = { ...savedKeywords };
      if (newSavedKeywords[category]) {
          newSavedKeywords[category] = newSavedKeywords[category].filter(k => k.keyword !== keywordToDelete);
          if (newSavedKeywords[category].length === 0) {
              delete newSavedKeywords[category];
          }
          setSavedKeywords(newSavedKeywords);
          localStorage.setItem('savedKeywords', JSON.stringify(newSavedKeywords));
      }
  }, [savedKeywords]);

  const handleClearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  }, []);

  const TabButton: React.FC<{view: View, label: string, icon: React.ReactNode}> = ({ view, label, icon }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-md transition-all duration-300 ${activeView === view ? 'bg-teal-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 font-sans p-4 sm:p-6 md:p-8">
      <main className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div dir="ltr" className="flex items-center justify-center gap-4 mb-4">
            <GeminiIcon className="w-12 h-12 text-teal-400" />
            <h1 style={{ fontFamily: 'monospace' }} className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-500">
              KW BY NILOO
            </h1>
          </div>
          <p className="text-lg text-gray-400 mb-6">
            آمار و خوشه‌های موضوعی کلمات کلیدی را با قدرت هوش مصنوعی دریافت کنید
          </p>

          <div className="flex justify-center gap-4 p-1 bg-gray-800 rounded-lg">
             <TabButton view="research" label="تحقیق کلمه کلیدی" icon={<SearchIcon className="w-5 h-5" />} />
             <TabButton view="clustering" label="خوشه‌بندی موضوعی" icon={<ClusterIcon className="w-5 h-5" />} />
          </div>
        </header>

        {activeView === 'research' && (
          <>
            <KeywordInputForm onSubmit={handleSubmit} isLoading={isLoading} />
            <div className="mt-8">
              {isLoading && <LoadingSpinner />}
              {error && <ErrorMessage message={error} />}
              {results && <ResultsDisplay data={results} sources={sources} onSave={handleSaveKeyword} />}
            </div>
            <SavedKeywordsList 
              categorizedKeywords={savedKeywords} 
              onDelete={handleDeleteKeyword} 
            />
            <SearchHistory 
                history={searchHistory}
                onHistoryClick={handleSubmit}
                onClear={handleClearHistory}
            />
          </>
        )}

        {activeView === 'clustering' && (
          <KeywordClustering />
        )}

      </main>
      <footer className="text-center mt-12 text-gray-500">
        <p>طراحی شده با ❤️ و React</p>
      </footer>
    </div>
  );
};

export default App;