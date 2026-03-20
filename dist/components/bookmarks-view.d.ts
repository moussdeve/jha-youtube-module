/**
 * BookmarksView.ts
 *
 * The BookmarksView component displays the user's bookmarked videos in either a grid or list view.
 * It allows users to clear all bookmarks and toggle between view modes.
 * The component listens for changes in the StorageService to keep the displayed bookmarks up-to-date.
 */
import { LitElement } from 'lit';
import { StorageService } from '../services/storage.js';
import { Video, ViewMode } from '../types.js';
import './video-grid.js';
export declare class BookmarksView extends LitElement {
    static styles: import("lit").CSSResult;
    storage?: StorageService;
    bookmarks: Video[];
    viewMode: ViewMode;
    private handleStorageChange;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleClearAll;
    private handleViewModeChange;
    private handleToggleBookmark;
    render(): import("lit-html").TemplateResult<1>;
}
