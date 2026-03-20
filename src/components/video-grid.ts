/**
 * video-grid.ts
 * 
 * The VideoGrid component is responsible for displaying a list of videos in either a grid or list layout.
 * It handles loading states, empty states, and emits events when users interact with video cards (e.g., bookmarking).
 * The component is designed to be reusable and can be used in both the SearchView and BookmarksView components.
 */


import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { Video, ViewMode } from "../types.js";
import "./video-card.js";

@customElement('video-grid')
export class VideoGrid extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 20px;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #666;
      font-size: 1.1rem;
    }

    .loading {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    /* Optimize for low-end devices */
    @media (max-width: 600px) {
      .grid {
        grid-template-columns: 1fr;
        gap: 12px;
        padding: 12px;
      }

      .list {
        padding: 12px;
        gap: 12px;
      }
    }
  `;

  @property({ type: Array }) videos: Video[] = [];
  @property({ type: String }) viewMode: ViewMode = 'grid';
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) emptyMessage = 'No videos found';

  // Use repeat directive for efficient list updates
  render() {
    if (this.loading) {
      return html`<div class="loading" role="status">Loading videos...</div>`;
    }

    if (!this.videos.length) {
      return html`<div class="empty-state" role="status">${this.emptyMessage}</div>`;
    }

    return html`
      <div class="${this.viewMode}" 
           role="feed"
           aria-busy=${this.loading}>
        ${repeat(this.videos, (video) => video.id, (video) => html`
          <video-card .video=${video}
                      viewMode=${this.viewMode}>
          </video-card>
        `)}
      </div>
    `;
  }
}