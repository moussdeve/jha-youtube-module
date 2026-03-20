/**
 * video-grid.ts
 *
 * The VideoGrid component is responsible for displaying a list of videos in either a grid or list layout.
 * It handles loading states, empty states, and emits events when users interact with video cards (e.g., bookmarking).
 * The component is designed to be reusable and can be used in both the SearchView and BookmarksView components.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import "./video-card.js";
let VideoGrid = class VideoGrid extends LitElement {
    constructor() {
        super(...arguments);
        this.videos = [];
        this.viewMode = 'grid';
        this.loading = false;
        this.emptyMessage = 'No videos found';
    }
    // Use repeat directive for efficient list updates
    render() {
        if (this.loading) {
            return html `<div class="loading" role="status">Loading videos...</div>`;
        }
        if (!this.videos.length) {
            return html `<div class="empty-state" role="status">${this.emptyMessage}</div>`;
        }
        return html `
      <div class="${this.viewMode}" 
           role="feed"
           aria-busy=${this.loading}>
        ${repeat(this.videos, (video) => video.id, (video) => html `
          <video-card .video=${video}
                      viewMode=${this.viewMode}>
          </video-card>
        `)}
      </div>
    `;
    }
};
VideoGrid.styles = css `
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
__decorate([
    property({ type: Array })
], VideoGrid.prototype, "videos", void 0);
__decorate([
    property({ type: String })
], VideoGrid.prototype, "viewMode", void 0);
__decorate([
    property({ type: Boolean })
], VideoGrid.prototype, "loading", void 0);
__decorate([
    property({ type: String })
], VideoGrid.prototype, "emptyMessage", void 0);
VideoGrid = __decorate([
    customElement('video-grid')
], VideoGrid);
export { VideoGrid };
