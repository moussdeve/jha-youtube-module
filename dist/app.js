/**
 * App.ts
 *
 * The main application (App) component, serves as the entry point for the YouTube search and bookmark app.
 * It manages the overall layout, navigation between views, and provides the StorageService context to child components.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { provide } from '@lit/context';
// Import all components to ensure they're registered
import './components/video-card.js';
import './components/video-grid.js';
import './components/search-view.js';
import './components/bookmarks-view.js';
import { StorageService } from './services/storage.js';
import { storageContext } from './context/storage-context.js';
let App = class App extends LitElement {
    constructor() {
        super(...arguments);
        // Provide the storage service context to child components
        this.storageService = new StorageService();
        // Add debug output to verify context is provided
        this.currentView = 'search';
    }
    // Use the storage service to supress unused variable warning
    // Add useful initialization logic if needed
    connectedCallback() {
        super.connectedCallback();
        // Hide the loading indicator once the app is initialized
        const loading = document.querySelector('.app-loading');
        if (loading) {
            loading.remove();
        }
        // Use the storage service to ensure it's initialized and provided correctly
        const bookmarks = this.storageService.getBookmarks();
        console.log(`App initialized with ${bookmarks.length} bookmarks in storage.`);
    }
    render() {
        return html `
      <div class="app">
        <nav role="tablist" aria-label="App sections">
          <button role="tab"
                  aria-selected=${this.currentView === 'search'}
                  class=${this.currentView === 'search' ? 'active' : ''}
                  @click=${() => this.currentView = 'search'}>
            Search
          </button>
          <button role="tab"
                  aria-selected=${this.currentView === 'bookmarks'}
                  class=${this.currentView === 'bookmarks' ? 'active' : ''}
                  @click=${() => this.currentView = 'bookmarks'}>
            Bookmarks
          </button>
        </nav>
        
        <main>
          ${this.currentView === 'search'
            ? html `<search-view></search-view>`
            : html `<bookmarks-view></bookmarks-view>`}
        </main>
      </div>
    `;
    }
};
App.styles = css `
    :host {
      display: block;
      height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    }

    .app {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    nav {
      display: flex;
      gap: 4px;
      padding: 12px 20px;
      background: var(--nav-bg, #f8f9fa);
      border-bottom: 1px solid #dee2e6;
    }

    nav button {
      padding: 8px 16px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 1rem;
      border-radius: 4px;
      transition: all 0.2s;
    }

    nav button:hover {
      background: #e9ecef;
    }

    nav button.active {
      background: var(--primary-color, #0066cc);
      color: white;
    }

    nav button:focus-visible {
      outline: 2px solid var(--focus-color, #0066cc);
      outline-offset: 2px;
    }

    main {
      flex: 1;
      overflow: auto;
      background: var(--main-bg, #ffffff);
    }

    @media (max-width: 600px) {
      nav {
        padding: 8px 12px;
      }
      
      nav button {
        flex: 1;
        text-align: center;
      }
    }
  `;
__decorate([
    provide({ context: storageContext }),
    property({ attribute: false })
], App.prototype, "storageService", void 0);
__decorate([
    property()
], App.prototype, "currentView", void 0);
App = __decorate([
    customElement('youtube-search-app')
], App);
export { App };
