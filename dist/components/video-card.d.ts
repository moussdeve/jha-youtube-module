import { LitElement } from "lit";
import { Video } from "../types.js";
export declare class VideoCard extends LitElement {
    static styles: import("lit").CSSResult;
    video: Video;
    isBookmarked: boolean;
    viewMode: 'list' | 'grid';
    private handleBookmarkClick;
    private handleImageLoad;
    render(): import("lit-html").TemplateResult<1>;
}
