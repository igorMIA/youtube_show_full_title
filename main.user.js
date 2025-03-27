// ==UserScript==
// @name         Youtube full titles
// @namespace    http://tampermonkey.net/
// @version      2025-03-27
// @description  try to take over the world!
// @author       igor@matchenko.com
// @match        http://youtube.com/*
// @match        https://youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Custom CSS to override YouTube's default title truncation
    const customCSS = `
        /* Remove title truncation */
        #video-title,
        ytd-compact-video-renderer #video-title.ytd-compact-video-renderer,
        ytd-grid-video-renderer #video-title.ytd-grid-video-renderer,
        ytd-rich-grid-media #video-title.ytd-rich-grid-media {
            display: block !important;
            -webkit-line-clamp: unset !important;
            -webkit-box-orient: unset !important;
            white-space: normal !important;
            max-height: none !important;
            line-height: 1.4em !important;
            overflow: visible !important;
            text-overflow: unset !important;
        }

        /* Adjust spacing for channel info */
        ytd-video-meta-block,
        #meta.ytd-grid-video-renderer,
        #meta.ytd-rich-grid-media {
            margin-top: 8px !important;
            padding-top: 4px !important;
            position: relative !important;
        }

        /* Ensure thumbnails maintain proper spacing */
        ytd-rich-item-renderer,
        ytd-grid-video-renderer,
        ytd-compact-video-renderer {
            margin-bottom: 24px !important;
        }
    `;

    // Function to inject custom styles
    function injectStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = customCSS;
        document.head.appendChild(styleElement);
    }

    // Function to remove inline styles that might cause truncation
    function removeInlineStyles(element) {
        if (!element) return;
        
        const titleElements = element.querySelectorAll('#video-title');
        titleElements.forEach(title => {
            if (title.style.webkitLineClamp) {
                title.style.webkitLineClamp = 'unset';
            }
            if (title.style.maxHeight) {
                title.style.maxHeight = 'none';
            }
        });
    }

    // Initialize MutationObserver to watch for dynamic content changes
    function initObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                // Check for added nodes
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        removeInlineStyles(node);
                    }
                });

                // Check for style attribute changes
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    removeInlineStyles(mutation.target.closest('ytd-rich-grid-media, ytd-grid-video-renderer, ytd-compact-video-renderer'));
                }
            });
        });

        // Start observing with appropriate configuration
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style']
        });
    }  

    // Initial setup
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            injectStyles();
            initObserver();
        });
    } else {
        injectStyles();
        initObserver();
    }
})();

