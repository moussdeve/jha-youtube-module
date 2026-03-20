/**
 * StorageService.ts
 *
 * This service manages the storage of bookmarked videos using the browser's localStorage API.
 */
import { Video } from "../types.js";
export declare class StorageService extends EventTarget {
    private readonly STORAGE_KEY;
    private bookmarks;
    constructor();
    addBookmark(video: Video): void;
    private loadBookmarks;
    private saveBookmarks;
    getBookmarks(): Video[];
    removeBookmark(videoId: string): void;
    isBookmarked(videoId: string): boolean;
    clearAll(): void;
}
