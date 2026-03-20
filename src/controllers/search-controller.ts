/**
 * SearchController.ts
 * 
 * This SearchController manages the state and logic for searching YouTube videos based on user input/queries.
 */


import { ReactiveController, ReactiveControllerHost } from 'lit';
import { YouTubeApi } from '../services/youtube-api.js';
import { SearchState, SortOptions } from '../types.js';

export class SearchController implements ReactiveController {
    private host: ReactiveControllerHost;
    private youtubeApi: YouTubeApi;
    private debounceTimeout: number | null = null;

    state: SearchState = {
        query: '',
        videos: [],
        loading: false,
        error: null,
        sortBy: 'relevance',
        viewMode: 'grid'
    };

    constructor(host: ReactiveControllerHost, apiKey: string) {
        this.host = host;
        this.youtubeApi = new YouTubeApi(apiKey);
        this.host.addController(this);
    }

    hostConnected() {
        // Component mounted
    }

    hostDisconnected() {
        // Component unmounted, cancel any ongoing API requests
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
    }

    // Main method to perform a search based on the current query and sort option
    async search(query: string) {
        this.state.query = query;

        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }

        if (!query.trim()) {
            this.state.videos = [];
            this.state.loading = false;
            this.host.requestUpdate();
            return;
        }

        this.debounceTimeout = setTimeout(async () => {
            this.state.loading = true;
            this.state.error = null;
            this.host.requestUpdate();

            try {
                this.state.videos = await this.youtubeApi.searchVideos(this.state.query, this.state.sortBy);
            } catch (error) {
                console.error("Error failed:", error);
                this.state.error = (error as Error).message || 'Search failed. Please try again.';
                this.state.videos = [];
            } finally {
                this.state.loading = false;
                this.host.requestUpdate();
            }
        }, 300); // Debounce delay
    }
    
    setSortBy(sortBy: SortOptions) {
        this.state.sortBy = sortBy;
        if (this.state.query.trim()) {
            this.search(this.state.query);
        }
    }

    setViewMode(viewMode: 'grid' | 'list') {
        this.state.viewMode = viewMode;
        this.host.requestUpdate();
    }
    
}