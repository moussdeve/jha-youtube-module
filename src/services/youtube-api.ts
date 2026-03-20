/**
 * YouTubeApi.ts
 * 
 * This YouTubeApi service handles communication with the YouTube Data API v3 to search for videos based on user queries.
 * It includes features such as request cancellation, response caching, and data sanitization for security.
 */


import { SortOptions, Video } from "../types.js";


// API response type guards for security and type safety
interface YouTubeApiResponse {
    items: Array<{
        id: { videoId: string; };
        snippet: {
            title: string;
            description: string;
            thumbnails: {
                medium: { url: string; };
            };
            publishedAt: string;
        };
        statistics: {
            commentCount: number;
        };
    }>;
}

export class YouTubeApi {
    private readonly apiKey: string;
    private abortController: AbortController | null = null;
    private cache: Map<string, { videos: Video[], timestamp: number }> = new Map();
    private readonly apiUrl = "https://www.googleapis.com/youtube/v3/search";

    // Cache Time-To-Live: 10 minutes
    private readonly CACHE_TTL = 10 * 60 * 1000;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    // Main method to search for videos based on a query and sort option
    async searchVideos(query: string, sortBy: SortOptions): Promise<Video[]> {
        // Check cache first
        const cached = this.cache.get(query);
        const now = Date.now();
        if (cached && (now - cached.timestamp < this.CACHE_TTL)) {
            return cached.videos;
        }

        this.cancelPreviousRequest();

        try {
            // Map sort options to YouTube API order parameters
            const order = sortBy === 'date' ? 'date' : sortBy === 'rating' ? 'rating' : 'relevance';

            // Construct the API URL with query parameters
            const url = new URL(`${this.apiUrl}`);
            url.searchParams.append("key", this.apiKey);
            url.searchParams.append("q", query);
            url.searchParams.append("part", "snippet");
            url.searchParams.append("maxResults", "50");
            url.searchParams.append("type", "video");
            url.searchParams.append("order", order);

            const response = await fetch(url.toString(), {
                signal: this.abortController?.signal,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
            }

            const data: YouTubeApiResponse = await response.json();

            // Fetch statistics for each video (requires a second API per video, so we batch them)
            const videoIds = data.items.map(item => item.id.videoId).join(",");
            const stats = await this.fetchVideoStatistics(videoIds);

            // Transform, process, and sanitize the response
            const videos = data.items.map((item, index) => this.sanitizeVideoData({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnailUrl: item.snippet.thumbnails.medium.url,
                videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                publishedAt: item.snippet.publishedAt,
                commentCount: stats[index]?.commentCount || 0
            }));

            // Cache the results
            this.cache.set(query, { videos, timestamp: now });
            return videos;

        } catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                console.error("Video search request was aborted.");
                return [];   // Silently return for aborted requests               
            }
            console.error("Error fetching video data:", error);
            throw error;
        }
    }

    // Cancel any ongoing API request to prevent race conditions
    private cancelPreviousRequest() {
        if (this.abortController) {
            this.abortController.abort();
        }
        this.abortController = new AbortController();
    }

    // Sanitize video data to prevent XSS and ensure consistent formatting
    private sanitizeVideoData(video: Video): Video {
        return {
            ...video,
            title: this.escapeHtml(video.title),
            description: this.escapeHtml(video.description)
        };
    }

    // Simple HTML escaping to prevent XSS
    private escapeHtml(unsafe: string): string {
        return unsafe
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }


    // Fetch video statistics (like comment count) in a batch request
    private async fetchVideoStatistics(videoIds: string): Promise<{ commentCount: number }[]> {
        const url = new URL("https://www.googleapis.com/youtube/v3/videos");
        url.searchParams.append("part", "statistics");
        url.searchParams.append("id", videoIds);
        url.searchParams.append("key", this.apiKey);

        const response = await fetch(url.toString(), {
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.items.map((item: any) => ({
            commentCount: parseInt(item.statistics.commentCount) || 0,
        }));
    }
}