# AI Disclosure

### AI Tool Used: *<u>Microsoft Copilot</u>*



Below are some of the most important api prompt that I used to audit the module. This is in addition to basic CSS and TypeScript syntax related prompts that were made throughout the development process.



```
[log-prompt-0]: Debug Info:
✅ Lit loaded from CDN
Stack: TypeError: Failed to resolve module specifier "lit"
. Relative references must start with either "/", "./", or "../".
❌ Failed to load app module: Failed to resolve module specifier "li
t". Relative references must start with either "/", "./", or "../".
📦 Script started
Waiting for scripts...
```

Fixed by adding Import Map to index.html

This issue took a long time to identify the root cause and fix.

##### Security and Performance Validation

```
[log-prompt-1]: Perform XSS prevention audit accross youtube-api class
```

XSS prevention is proactive and does not react to after an attack. It focuses on eliminating the root cause of the threat. Other security methods such as Firewalls and backend validation do not catch malicious code that's already running in the browser.



```
[log-prompt-2]: Username, Password, and API Key Exposure audit
```

I made sure that the api key was left as a placeholder to prevent unauthorized users from running the module or using it in other third party applications. I initial thought about using environment variables; however, the api key still gets stored in the generated JavaScript after a build.



```
[log-prompt-3]: Content security policy review of index.html
```

Restrict the module to only connecting to Google Api to prevent call to other third party api that may introduce malicious code.



```
[log-prompt-4]: Local Storage exaination in youtube-api
```

Ensure that bookmarked data only contains video metadata and no other user data or tokens is exposed.



```
[log-prompt-5]: Network Request Optimization of requests to google api
```

Used lazy loading on all thumbnails to improve Defer offscreen images scored, we get less layout shift while rendering page. Implemented caching to improve request response when the same term/query is used multiple times.



KEY FINDINGS AND MITIGATION

| Issue                | Location           | Risk     | Mitigation                                                                                                        |
| -------------------- | ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| XSS via video titles | API response       | High     | escapeHtml() sanitizer                                                                                            |
| API key exposure     | config             | Critical | Backend proxy required for production (not implemented in our module - it's outside of the scope of this project) |
| Image layout shift   | Thumbnails         | Medium   | Blur-up effect                                                                                                    |
| Memory leaks         | Controller cleanup | Medium   | AbortController + clearTimeout                                                                                    |
| Excessive API calls  | Search input       | Medium   | Debouncing + request cancellation                                                                                 |
