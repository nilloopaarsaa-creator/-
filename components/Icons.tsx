import React from 'react';

type IconProps = {
    className?: string;
}

export const GeminiIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.33 15.33c-1.39 1.39-3.58 1.39-4.97 0s-1.39-3.58 0-4.97c1.39-1.39 3.58-1.39 4.97 0s1.39 3.58 0 4.97z" fill="currentColor"/>
    <path d="M12 6.5c-3.04 0-5.5 2.46-5.5 5.5 0 1.25.42 2.4 1.13 3.33l1.41-1.41c-.45-.63-.74-1.4-.74-2.22 0-2.07 1.68-3.75 3.75-3.75s3.75 1.68 3.75 3.75c0 .82-.28 1.59-.74 2.22l1.41 1.41c.72-.93 1.13-2.08 1.13-3.33 0-3.04-2.46-5.5-5.5-5.5z" fill="currentColor"/>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const ChartBarIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

export const CurrencyDollarIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01M12 18v-2m0-2v-2m0-2V8m0 0c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-4c1.11 0 2.08.402 2.599 1M12 12V7m0 5v.01" />
    </svg>
);

export const TrendingUpIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);

export const LightbulbIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 017.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

export const BookmarkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export const HistoryIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ClusterIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export const MindMapIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v3a3 3 0 003 3h1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12H9a3 3 0 00-3 3v1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v-3a3 3 0 013-3h1" />
    </svg>
);

export const ViewGridIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

export const BrainIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.871 14.736c-1.173.391-2.45.034-3.465-1.022a.965.965 0 01-.013-1.393L3.1 9.998c.42-.44.99-.714 1.6-.714h1.4c.61 0 1.18.274 1.6.714l1.71 1.724a.965.965 0 01-1.378 1.378l-1.34-1.346a.965.965 0 00-1.378 0l-1.34 1.346a.965.965 0 000 1.378l1.34 1.346a.965.965 0 010 1.378l-1.34 1.346a.965.965 0 00-1.378 0L3.1 22.002c-.42.44-.99.714-1.6.714H.1c-.61 0-1.18-.274-1.6-.714a.965.965 0 01.013-1.393l1.71-1.724a.965.965 0 000-1.378L.21 17.447a.965.965 0 011.378-1.378l1.34 1.346a.965.965 0 001.378 0l1.34-1.346a.965.965 0 011.378 0l1.34 1.346a.965.965 0 001.378 0l1.34-1.346a.965.965 0 011.378 0l1.34 1.346a.965.965 0 001.378 0l1.34-1.346a.965.965 0 011.378-1.378l1.71-1.724a.965.965 0 00.013-1.393c-1.015-1.056-2.292-1.413-3.465-1.022-1.173.391-2.14 1.35-2.629 2.524-.488 1.173-.488 2.523 0 3.696.488 1.173 1.456 2.133 2.629 2.524 1.173.391 2.45.034 3.465-1.022a.965.965 0 011.393-.013l1.724 1.71c.44.42.714.99.714 1.6v1.4c0 .61-.274 1.18-.714 1.6l-2.322 2.322a.965.965 0 01-1.393.013c-1.056-1.015-2.413-1.292-3.696-1.292s-2.64.277-3.696 1.292a.965.965 0 01-1.393-.013l-2.322-2.322c-.44-.42-.714-.99-.714-1.6v-1.4c0-.61.274-1.18.714-1.6l1.724-1.71a.965.965 0 011.393.013c1.015 1.056 2.292 1.413 3.465 1.022 1.173-.391 2.14 1.35 2.629 2.524-.488-1.173-.488-2.523 0-3.696-.488-1.173-1.456-2.133-2.629-2.524-1.173-.391-2.45-.034-3.465 1.022a.965.965 0 01-1.393.013l-1.724-1.71c-.44-.42-.714-.99-.714-1.6v-1.4c0-.61.274-1.18.714-1.6l2.322-2.322a.965.965 0 011.393-.013c1.056 1.015 2.413 1.292 3.696 1.292s2.64-.277 3.696-1.292a.965.965 0 011.393.013l2.322 2.322c.44.42.714.99.714 1.6v1.4c0 .61-.274 1.18-.714 1.6l-1.724 1.71a.965.965 0 01-1.393-.013c-1.015-1.056-2.292-1.413-3.465-1.022-1.173.391-2.14 1.35-2.629 2.524-.488-1.173-.488-2.523 0 3.696.488 1.173 1.456 2.133 2.629 2.524z" />
    </svg>
);

export const FilterIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L12 12l-2.293-2.293a1 1 0 010-1.414L10 8m5 4l2.293 2.293a1 1 0 010 1.414L12 20l-2.293-2.293a1 1 0 010-1.414L10 16" />
    </svg>
);

export const AiOverviewIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 5h.01M15 8h.01M15 11h.01" strokeWidth={2.5} />
    </svg>
);