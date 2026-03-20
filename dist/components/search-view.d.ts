/**
 * search-view.ts
 *
 * The SearchView component represents the main search interface for the YouTube search and bookmark app.
 * It includes a search input, sorting options, view mode toggles, and displays search results using the
 *  video-grid component.
 * The component interacts with the SearchController to manage state and handle user interactions.
 */
import { LitElement } from "lit";
import { StorageService } from "../services/storage.js";
import "./video-grid.js";
export declare class SearchView extends LitElement {
    static styles: import("lit").CSSResult;
    storage?: StorageService;
    private searchController;
    private handleSearchInput;
    private handleSortChange;
    private handleViewModeChange;
    private handleToggleBookmark;
    render(): import("lit-html").TemplateResult<1>;
}
