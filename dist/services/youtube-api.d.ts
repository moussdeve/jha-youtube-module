/**
 * YouTubeApi.ts
 *
 * This YouTubeApi service handles communication with the YouTube Data API v3 to search for videos based on user queries.
 * It includes features such as request cancellation, response caching, and data sanitization for security.
 */
import { SortOptions, Video } from "../types.js";
export declare class YouTubeApi {
    private readonly apiKey;
    private abortController;
    private cache;
    private readonly apiUrl;
    private readonly CACHE_TTL;
    constructor(apiKey: string);
    searchVideos(query: string, sortBy: SortOptions): Promise<Video[]>;
    private cancelPreviousRequest;
    private sanitizeVideoData;
    private escapeHtml;
    private fetchVideoStatistics;
}
