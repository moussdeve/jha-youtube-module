/**
 * BookmarksView.ts
 *
 * The BookmarksView component displays the user's bookmarked videos in either a grid or list view.
 * It allows users to clear all bookmarks and toggle between view modes.
 * The component listens for changes in the StorageService to keep the displayed bookmarks up-to-date.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { storageContext } from '../context/storage-context.js';
import './video-grid.js';
let BookmarksView = class BookmarksView extends LitElement {
    constructor() {
        super(...arguments);
        // Local state for bookmarks and view mode
        this.bookmarks = [];
        this.viewMode = 'grid';
        // Listen for changes in the StorageService to update bookmarks in real-time
        this.handleStorageChange = (e) => {
            this.bookmarks = e.detail.bookmarks;
        };
    }
    // Set up event listeners when the component is added to the DOM
    connectedCallback() {
        super.connectedCallback();
        this.storage?.addEventListener('bookmarks-changed', this.handleStorageChange);
        this.bookmarks = this.storage?.getBookmarks() || [];
    }
    // Clean up event listeners when the component is removed from the DOM
    disconnectedCallback() {
        super.disconnectedCallback();
        this.storage?.removeEventListener('bookmarks-changed', this.handleStorageChange);
    }
    // Handler for clearing all bookmarks with a confirmation prompt
    handleClearAll() {
        if (confirm('Are you sure you want to clear all bookmarks?')) {
            this.storage?.clearAll();
        }
    }
    // Handler for changing the view mode (grid or list)
    handleViewModeChange(mode) {
        this.viewMode = mode;
    }
    handleToggleBookmark(e) {
        const video = e.detail.video;
        this.storage?.removeBookmark(video.id);
    }
    render() {
        return html `
      <div>
        <header class="header">
          <h2>Bookmarks (${this.bookmarks.length})</h2>
          
          <div class="controls">
            <div class="view-toggle">
              <button class=${this.viewMode === 'grid' ? 'active' : ''}
                      @click=${() => this.handleViewModeChange('grid')}
                      aria-label="Grid view"
                      aria-pressed=${this.viewMode === 'grid'}>
                Grid
              </button>
              <button class=${this.viewMode === 'list' ? 'active' : ''}
                      @click=${() => this.handleViewModeChange('list')}
                      aria-label="List view"
                      aria-pressed=${this.viewMode === 'list'}>
                List
              </button>
            </div>
            
            <button class="clear-all"
                    @click=${this.handleClearAll}
                    aria-label="Clear all bookmarks">
              Clear All
            </button>
          </div>
        </header>

        <video-grid .videos=${this.bookmarks}
                    viewMode=${this.viewMode}
                    emptyMessage="No bookmarks yet. Save videos from search!"
                    @toggle-bookmark=${this.handleToggleBookmark}>
        </video-grid>
      </div>
    `;
    }
};
BookmarksView.styles = css `
    :host {
      display: block;
      height: 100%;
    }

    .header {
      position: sticky;
      top: 0;
      background: var(--header-bg, #ffffff);
      padding: 16px 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    h2 {
      margin: 0;
      font-size: 1.3rem;
    }

    .controls {
      display: flex;
      gap: 8px;
    }

    button {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      font-size: 0.9rem;
    }

    button:focus-visible {
      outline: 2px solid var(--focus-color, #0066cc);
      outline-offset: 2px;
    }

    button.clear-all {
      border-color: #dc3545;
      color: #dc3545;
    }

    button.clear-all:hover {
      background: #dc3545;
      color: white;
    }

    .view-toggle {
      display: flex;
      gap: 4px;
    }

    .view-toggle button.active {
      background: var(--primary-color, #0066cc);
      color: white;
      border-color: var(--primary-color, #0066cc);
    }

    @media (max-width: 600px) {
      .header {
        padding: 12px;
        flex-direction: column;
        align-items: stretch;
      }

      .controls {
        justify-content: space-between;
      }
    }
  `;
__decorate([
    consume({ context: storageContext }),
    property({ attribute: false })
], BookmarksView.prototype, "storage", void 0);
__decorate([
    property({ type: Array })
], BookmarksView.prototype, "bookmarks", void 0);
__decorate([
    property({ type: String })
], BookmarksView.prototype, "viewMode", void 0);
BookmarksView = __decorate([
    customElement('bookmarks-view')
], BookmarksView);
export { BookmarksView };
