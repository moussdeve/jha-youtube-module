/**
 * Represents a video object with its properties.
 */
export interface Video {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    commentCount: number;
    publishedAt: string;
}
export interface VideoDTO {
    title: string;
    thumbnailImage: string;
    Description: string;
    TotalCommentsCount: number;
}
export interface SearchState {
    query: string;
    videos: Video[];
    loading: boolean;
    error: string | null;
    sortBy: 'date' | 'rating' | 'relevance';
    viewMode: 'list' | 'grid';
}
export interface BookmarksState {
    bookmarks: Video[];
    loading: boolean;
}
export type SortOptions = 'date' | 'rating' | 'relevance';
export type ViewMode = 'list' | 'grid';
