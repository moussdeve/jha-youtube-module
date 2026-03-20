/**
 * SearchController.ts
 *
 * This SearchController manages the state and logic for searching YouTube videos based on user input/queries.
 */
import { ReactiveController, ReactiveControllerHost } from 'lit';
import { SearchState, SortOptions } from '../types.js';
export declare class SearchController implements ReactiveController {
    private host;
    private youtubeApi;
    private debounceTimeout;
    state: SearchState;
    constructor(host: ReactiveControllerHost, apiKey: string);
    hostConnected(): void;
    hostDisconnected(): void;
    search(query: string): Promise<void>;
    setSortBy(sortBy: SortOptions): void;
    setViewMode(viewMode: 'grid' | 'list'): void;
}
