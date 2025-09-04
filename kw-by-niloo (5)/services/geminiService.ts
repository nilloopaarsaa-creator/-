import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMainKeywordAnalysis = async (keyword: string): Promise<GenerateContentResponse> => {
  const prompt = `
    Provide a detailed SEO analysis for the Persian keyword "${keyword}" targeting the search market in Iran.
    I need the following information in a structured format. Use the exact English labels provided below followed by a colon.
    For SEARCH_VOLUME, DIFFICULTY, and CPC, provide *only* the value itself (e.g., "1500", "65", "2500") without any extra descriptive text or labels.

    SEARCH_VOLUME: [Estimated monthly search volume]
    DIFFICULTY: [SEO keyword difficulty on a 1-100 scale]
    CPC: [Average Cost Per Click (CPC) in Iranian Toman]
    SEARCH_INTENT: [Classify the user's primary search intent (e.g., اطلاعاتی, تراکنشی) and then suggest the best placement for it on a website (e.g., ' - مناسب برای پست بلاگ', ' - مناسب برای صفحه محصول'). Combine them into one line.]
    AI_OVERVIEW_START
    [Provide a concise, 2-3 sentence summary explaining the keyword topic, similar to a Google AI Overview. Synthesize information to answer the likely user intent.]
    AI_OVERVIEW_END
    RELATED_KEYWORDS_START
    [Related Keyword 1]
    [Related Keyword 2]
    [Related Keyword 3]
    [Related Keyword 4]
    [Related Keyword 5]
    RELATED_KEYWORDS_END
    LONG_TAIL_KEYWORDS_START
    [Long-Tail Keyword Question 1]
    [Long-Tail Keyword Question 2]
    [Long-Tail Keyword Question 3]
    [Long-Tail Keyword Question 4]
    [Long-Tail Keyword Question 5]
    LONG_TAIL_KEYWORDS_END

    Provide the most up-to-date information available. If a value is not available, write "N/A".
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response;
};

export const getSemanticallySimilarKeywords = async (originalKeyword: string, keywordList: string[]): Promise<GenerateContentResponse> => {
    const prompt = `
    From the following list of keywords, identify and list the top 5 keywords that are most semantically similar (conceptually related) to the original keyword "${originalKeyword}".

    Keyword List:
    ${keywordList.join('\n')}

    Output only the list of the top 5 semantically similar keywords, each on a new line. Do not add any extra text, labels, or markers.
    `;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    
    return response;
};


export const suggestCategoryWithGemini = async (keyword: string, intent: string, relatedKeywords: string[]): Promise<GenerateContentResponse> => {
  const prompt = `
    Based on the SEO analysis for the Persian keyword "${keyword}", suggest a single, concise, and relevant category name in Persian.
    This category name should be suitable for grouping this keyword with other similar keywords in a folder-like structure.
    - Search Intent: ${intent}
    - Some Related Keywords: ${relatedKeywords.slice(0, 3).join(', ')}

    Examples:
    - For keyword "قیمت گوشی سامسونگ A54", a good category is "قیمت گوشی سامسونگ".
    - For keyword "طرز تهیه قورمه سبزی", a good category is "دستور پخت غذای ایرانی".
    - For keyword "دانلود فیلم جدید", a good category is "دانلود فیلم".

    Return only the category name, and nothing else.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response;
};


export const clusterKeywordsWithGemini = async (keywords: string[]): Promise<GenerateContentResponse> => {
    const prompt = `
    You are an expert SEO and keyword research analyst acting as an advanced topic modeling tool like BERTopic. Your task is to analyze a list of Persian keywords and group them into semantically related topics.
    For the following list of keywords, please perform these actions:
    1. Identify the underlying topics within the keyword list.
    2. Assign each keyword to a single, most relevant topic.
    3. For each topic, create a concise, descriptive name in Persian (like BERTopic's 'Name' or 'Representation').
    4. Assign a unique numeric ID to each topic, starting from 0. Exclude outliers (topic -1).
    5. Count the number of keywords in each topic.
    6. Ensure the final output strictly follows the provided JSON schema.

    Here is the list of keywords:
    ${keywords.join('\n')}
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        topicId: {
                            type: Type.INTEGER,
                            description: "شناسه عددی منحصر به فرد برای موضوع، شروع از 0.",
                        },
                        topicName: {
                            type: Type.STRING,
                            description: "نام کوتاه و توصیفی برای این موضوع به زبان فارسی.",
                        },
                        keywords: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            },
                            description: "لیستی از کلمات کلیدی که به این موضوع تعلق دارند.",
                        },
                        count: {
                            type: Type.INTEGER,
                            description: "تعداد کلمات کلیدی در این موضوع.",
                        },
                    },
                    required: ["topicId", "topicName", "keywords", "count"],
                },
            },
        },
    });

    return response;
};