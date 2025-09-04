export interface KeywordMetrics {
  searchVolume: string;
  difficulty: string;
  cpc: string;
  intent: string;
}

export interface KeywordData {
  keyword: string;
  metrics: KeywordMetrics;
  relatedKeywords: string[];
  longTailKeywords: string[];
  aiOverview: string;
  semanticallySimilarKeywords: string[];
}

export type CategorizedKeywords = {
  [category: string]: KeywordData[];
};

export interface GroundingChunk {
  web?: {
    // FIX: The properties of `web` are optional in the type from `@google/ai`.
    uri?: string;
    title?: string;
  };
}

export interface KeywordCluster {
    topicId: number;
    topicName: string;
    keywords: string[];
    count: number;
}

export type ClusteringData = KeywordCluster[];