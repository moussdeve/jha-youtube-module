/**
 * video-grid.ts
 *
 * The VideoGrid component is responsible for displaying a list of videos in either a grid or list layout.
 * It handles loading states, empty states, and emits events when users interact with video cards (e.g., bookmarking).
 * The component is designed to be reusable and can be used in both the SearchView and BookmarksView components.
 */
import { LitElement } from "lit";
import { Video, ViewMode } from "../types.js";
import "./video-card.js";
export declare class VideoGrid extends LitElement {
    static styles: import("lit").CSSResult;
    videos: Video[];
    viewMode: ViewMode;
    loading: boolean;
    emptyMessage: string;
    render(): import("lit-html").TemplateResult<1>;
}
