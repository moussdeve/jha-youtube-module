/**
 * SearchController.ts
 *
 * This SearchController manages the state and logic for searching YouTube videos based on user input/queries.
 */
import { YouTubeApi } from '../services/youtube-api.js';
export class SearchController {
    constructor(host, apiKey) {
        this.debounceTimeout = null;
        this.state = {
            query: '',
            videos: [],
            loading: false,
            error: null,
            sortBy: 'relevance',
            viewMode: 'grid'
        };
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
    async search(query) {
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
            }
            catch (error) {
                console.error("Error failed:", error);
                this.state.error = error.message || 'Search failed. Please try again.';
                this.state.videos = [];
            }
            finally {
                this.state.loading = false;
                this.host.requestUpdate();
            }
        }, 300); // Debounce delay
    }
    setSortBy(sortBy) {
        this.state.sortBy = sortBy;
        if (this.state.query.trim()) {
            this.search(this.state.query);
        }
    }
    setViewMode(viewMode) {
        this.state.viewMode = viewMode;
        this.host.requestUpdate();
    }
}
