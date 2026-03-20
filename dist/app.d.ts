/**
 * App.ts
 *
 * The main application (App) component, serves as the entry point for the YouTube search and bookmark app.
 * It manages the overall layout, navigation between views, and provides the StorageService context to child components.
 */
import { LitElement } from 'lit';
import './components/video-card.js';
import './components/video-grid.js';
import './components/search-view.js';
import './components/bookmarks-view.js';
export declare class App extends LitElement {
    static styles: import("lit").CSSResult;
    private storageService;
    private currentView;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
