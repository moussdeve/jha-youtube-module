/**
 * StorageService.ts
 * 
 * This service manages the storage of bookmarked videos using the browser's localStorage API.
 */


import { Video } from "../types.js";


export class StorageService extends EventTarget {
    private readonly STORAGE_KEY = "youtube-bookmark";
    private bookmarks: Video[] = [];

    constructor() {
        super();
        this.loadBookmarks();
    }

    // Bookmark management
    addBookmark(video: Video) {
        if (!this.bookmarks.find(b => b.id === video.id)) {
            this.bookmarks.push(video);
            this.saveBookmarks();
            //this.dispatchEvent(new CustomEvent("bookmarksUpdated", { detail: { bookmarks: this.bookmarks } }));
        }
    }

    // Load bookmarks from localStorage on initialization
    private loadBookmarks() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            try {
                this.bookmarks = JSON.parse(stored);
            } catch (error) {
                console.error("Failed to load/parse bookmarks from localStorage:", error);
                this.bookmarks = [];
            }
        } else {
            this.bookmarks = [];
        }
    }


    // Save bookmarks to localStorage whenever they are updated
    // This method is called internally whenever bookmarks are added, removed, or cleared
    //   Save button is pressed.
    private saveBookmarks() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.bookmarks));
            this.dispatchEvent(new CustomEvent("bookmarksUpdated", { detail: { bookmarks: this.bookmarks } }));
        } catch (error) {
            console.error("Failed to save bookmarks to localStorage:", error);
        }
    }


    // Returns a copy of the bookmarks array to prevent external mutation
    getBookmarks(): Video[] {
        return [...this.bookmarks];
    }


    // Remove a bookmark by video ID
    removeBookmark(videoId: string) {
        console.log("Removing bookmark with ID:", videoId);
        this.bookmarks = this.bookmarks.filter(b => b.id !== videoId);
        console.log("Bookmark removed, current bookmarks:", this.bookmarks);
        this.saveBookmarks();
    }


    // Checks if a video is bookmarked
    isBookmarked(videoId: string): boolean {
        return this.bookmarks.some(b => b.id === videoId);
    }


    // Clears all bookmarks from localStorage and memory
    clearAll() {
        this.bookmarks = [];
        this.saveBookmarks();
    }
}