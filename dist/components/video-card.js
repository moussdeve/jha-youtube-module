var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let VideoCard = class VideoCard extends LitElement {
    constructor() {
        super(...arguments);
        this.isBookmarked = false;
        this.viewMode = 'grid';
    }
    handleBookmarkClick(e) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent('toggle-bookmark', {
            detail: { video: this.video },
            bubbles: true,
            composed: true,
        }));
    }
    // Lazy loading for images
    handleImageLoad(e) {
        const img = e.target;
        img.classList.remove('loading');
    }
    render() {
        const { title, description, thumbnailUrl, videoUrl, commentCount } = this.video;
        return html `
      <div class="card ${this.viewMode}" 
           role="article"
           aria-label="Video: ${title}">
        <div class="thumbnail-container">
          <img src="${thumbnailUrl}"
               alt="${title} thumbnail"
               loading="lazy"
               class="loading"
               @load=${this.handleImageLoad}
               aria-hidden="true" />
        </div>
        
        <div class="content">
          <h3 class="title">
            <a href="${videoUrl}"
               target="_blank"
               rel="noopener noreferrer"
               @click=${(e) => e.stopPropagation()}>
              ${title}
            </a>
          </h3>
          
          <p class="description">${description}</p>
          
          <div class="metadata">
            <span class="comments" 
                  aria-label="${commentCount} comments">
              ${commentCount.toLocaleString()}
            </span>
            
            <button class="bookmark-btn ${this.isBookmarked ? 'saved' : ''}"
                    @click=${this.handleBookmarkClick}
                    aria-pressed=${this.isBookmarked}
                    aria-label="${this.isBookmarked ? 'Remove from' : 'Add to'} bookmarks">
              ${this.isBookmarked ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    `;
    }
};
VideoCard.styles = css `
    :host {
      display: block;
      height: 100%;
    }

    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--card-bg, #ffffff);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .card:focus-within {
      outline: 2px solid var(--focus-color, #0066cc);
      outline-offset: 2px;
    }

    .card.list {
      flex-direction: row;
    }

    .thumbnail-container {
      position: relative;
      padding-top: 56.25%; /* 16:9 aspect ratio */
      background: #f0f0f0;
    }

    .list .thumbnail-container {
      padding-top: 0;
      width: 200px;
      flex-shrink: 0;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background: #f0f0f0;
    }

    /* Lazy loading blur-up effect */
    img.loading {
      filter: blur(10px);
      transform: scale(1.1);
    }

    .content {
      padding: 16px;
      flex: 1;
      min-width: 0; /* Prevents text overflow */
    }

    .title {
      margin: 0 0 8px 0;
      font-size: 1.1rem;
      font-weight: 500;
      line-height: 1.4;
    }

    .title a {
      color: inherit;
      text-decoration: none;
    }

    .title a:hover {
      text-decoration: underline;
    }

    .description {
      margin: 0 0 12px 0;
      font-size: 0.9rem;
      color: #666;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .metadata {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
      color: #888;
    }

    .comments {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .comments::before {
      content: '💬';
      font-size: 1rem;
    }

    .bookmark-btn {
      background: none;
      border: 1px solid currentColor;
      border-radius: 4px;
      padding: 4px 8px;
      cursor: pointer;
      font-size: 0.85rem;
      color: #666;
      transition: all 0.2s;
    }

    .bookmark-btn:hover {
      background: #f0f0f0;
    }

    .bookmark-btn.saved {
      background: #0066cc;
      color: white;
      border-color: #0066cc;
    }

    .bookmark-btn:focus-visible {
      outline: 2px solid var(--focus-color, #0066cc);
      outline-offset: 2px;
    }

    /* Mobile optimizations */
    @media (max-width: 600px) {
      .card.list {
        flex-direction: column;
      }

      .list .thumbnail-container {
        width: 100%;
        padding-top: 56.25%;
      }
    }
  `;
__decorate([
    property({ type: Object })
], VideoCard.prototype, "video", void 0);
__decorate([
    property({ type: Boolean })
], VideoCard.prototype, "isBookmarked", void 0);
__decorate([
    property({ type: String })
], VideoCard.prototype, "viewMode", void 0);
VideoCard = __decorate([
    customElement('video-card')
], VideoCard);
export { VideoCard };
