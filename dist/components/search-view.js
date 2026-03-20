/**
 * search-view.ts
 *
 * The SearchView component represents the main search interface for the YouTube search and bookmark app.
 * It includes a search input, sorting options, view mode toggles, and displays search results using the
 *  video-grid component.
 * The component interacts with the SearchController to manage state and handle user interactions.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { SearchController } from "../controllers/search-controller.js";
import { storageContext } from '../context/storage-context.js';
import { consume } from '@lit/context';
import "./video-grid.js";
let SearchView = class SearchView extends LitElement {
    constructor() {
        super(...arguments);
        this.searchController = new SearchController(this, 'AIzaSyACGUYVflzzpbI9hwle9s32BLJ-MsAWyvI');
    }
    handleSearchInput(e) {
        const input = e.target;
        this.searchController.search(input.value);
    }
    handleSortChange(e) {
        const select = e.target;
        this.searchController.setSortBy(select.value);
    }
    handleViewModeChange(mode) {
        this.searchController.setViewMode(mode);
    }
    handleToggleBookmark(e) {
        const video = e.detail.video;
        if (this.storage?.isBookmarked(video.id)) {
            this.storage.removeBookmark(video.id);
        }
        else {
            this.storage?.addBookmark(video);
        }
    }
    render() {
        const { state } = this.searchController;
        return html `
      <div class="container">
        <header class="header">
          <div class="search-section">
            <input type="search"
                   class="search-input"
                   placeholder="Search YouTube videos..."
                   .value=${state.query}
                   @input=${this.handleSearchInput}
                   aria-label="Search videos"
                   autocomplete="off" />
            
            <div class="controls">
              <select @change=${this.handleSortChange}
                      value=${state.sortBy}
                      aria-label="Sort by">
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
                <option value="rating">Rating</option>
              </select>
              
              <button class=${state.viewMode === 'grid' ? 'active' : ''}
                      @click=${() => this.handleViewModeChange('grid')}
                      aria-label="Grid view"
                      aria-pressed=${state.viewMode === 'grid'}>
                Grid
              </button>
              
              <button class=${state.viewMode === 'list' ? 'active' : ''}
                      @click=${() => this.handleViewModeChange('list')}
                      aria-label="List view"
                      aria-pressed=${state.viewMode === 'list'}>
                List
              </button>
            </div>
          </div>
        </header>

        ${state.error ? html `
          <div class="error" role="alert">
            Error: ${state.error}
          </div>
        ` : ''}

        <video-grid .videos=${state.videos}
                    viewMode=${state.viewMode}
                    ?loading=${state.loading}
                    @toggle-bookmark=${this.handleToggleBookmark}>
        </video-grid>
      </div>
    `;
    }
};
SearchView.styles = css `
    :host {
      display: block;
      height: 100%;
    }

    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .header {
      position: sticky;
      top: 0;
      background: var(--header-bg, #ffffff);
      padding: 16px 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 10;
    }

    .search-section {
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-input {
      flex: 1;
      min-width: 200px;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .search-input:focus {
      outline: 2px solid var(--focus-color, #0066cc);
      outline-offset: 2px;
    }

    .controls {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    select, button {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      font-size: 0.9rem;
    }

    select:focus, button:focus {
      outline: 2px solid var(--focus-color, #0066cc);
      outline-offset: 2px;
    }

    button.active {
      background: var(--primary-color, #0066cc);
      color: white;
      border-color: var(--primary-color, #0066cc);
    }

    .error {
      margin: 16px 20px;
      padding: 12px;
      background: #ffebee;
      border-left: 4px solid #c62828;
      color: #c62828;
      border-radius: 4px;
    }

    /* Mobile optimizations */
    @media (max-width: 600px) {
      .header {
        padding: 12px;
      }

      .search-section {
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
], SearchView.prototype, "storage", void 0);
SearchView = __decorate([
    customElement('search-view')
], SearchView);
export { SearchView };
