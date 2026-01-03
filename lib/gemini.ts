
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const CACHE_PREFIX = 'blossom_manga_v2_';

export const getCachedImage = (key: string): string | null => {
  try {
    return localStorage.getItem(CACHE_PREFIX + key);
  } catch (e) {
    return null;
  }
};

const setCachedImage = (key: string, data: string) => {
  try {
    localStorage.setItem(CACHE_PREFIX + key, data);
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      localStorage.clear();
      try { localStorage.setItem(CACHE_PREFIX + key, data); } catch(inner) {}
    }
  }
};

export const downloadBase64Image = (base64Data: string, filename: string) => {
  const link = document.createElement('a');
  link.href = base64Data;
  link.download = `${filename.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getAllCachedImages = () => {
  const images: { key: string, data: string }[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(CACHE_PREFIX)) {
      images.push({
        key: key.replace(CACHE_PREFIX, ''),
        data: localStorage.getItem(key) || ''
      });
    }
  }
  return images;
};

/**
 * Enhanced generation with retry logic for 429 errors.
 */
export const generateMangaPanel = async (
  subject: string, 
  type: 'scenery' | 'mascot' | 'abstract' = 'scenery',
  retryCount = 0
): Promise<string | null> => {
  const MAX_RETRIES = 2;
  const cacheKey = btoa(type + subject).substring(0, 32);
  const cached = getCachedImage(cacheKey);
  if (cached) return cached;

  try {
    const styleDescription = type === 'mascot' 
      ? "The official mascot: A breathtaking portrait of an anime girl with long, midnight-black hair reflecting violet highlights, deep purple eyes full of wisdom, wearing a high-detail pink silk kimono with dark purple cherry blossom patterns."
      : subject;

    const prompt = `A masterpiece manga splash page. ${styleDescription}. 
    Art Style: Modern 'Seinen' manga aesthetic, highly detailed line-work.
    Technique: Sharp ink outlines, professional screentone gradients.
    Color Palette: Strictly only White, Soft Blossom Pink (#FF85A2), and Deep Midnight Purple (#4A148C). No other colors.
    Atmosphere: High contrast, elegant, serene, 4k digital art.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const data = `data:image/png;base64,${part.inlineData.data}`;
        setCachedImage(cacheKey, data);
        return data;
      }
    }
    return null;
  } catch (error: any) {
    // If we hit rate limits (429), try again with backoff
    if (error?.message?.includes('429') && retryCount < MAX_RETRIES) {
      const waitTime = Math.pow(2, retryCount) * 2000;
      console.warn(`Quota exceeded. Retrying in ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return generateMangaPanel(subject, type, retryCount + 1);
    }
    
    console.error("Manga generation failed:", error);
    throw error; // Rethrow to allow component to handle error state
  }
};
