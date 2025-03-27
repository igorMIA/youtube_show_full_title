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

    /*************************************************
     * 1) Inject CSS to expand containers and un-truncate titles
     *************************************************/
    const style = document.createElement('style');
    style.innerHTML = `
        /* Expand containers (no fixed/max height) */
        .ytd-video-renderer #dismissible,
        .ytd-video-renderer #details,
        .ytd-video-renderer #meta,
        .ytd-grid-video-renderer #dismissible,
        .ytd-grid-video-renderer #details,
        .ytd-grid-video-renderer #meta,
        .ytd-compact-video-renderer #dismissible,
        .ytd-compact-video-renderer #details,
        .ytd-compact-video-renderer #meta,
        .ytd-rich-item-renderer #dismissible,
        .ytd-rich-item-renderer #details,
        .ytd-rich-item-renderer #meta,
        .ytd-rich-grid-media #details {
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
        }

        /* Untruncate titles: remove text-overflow and allow wrapping */
        #video-title,
        .ytd-video-renderer #video-title,
        .ytd-grid-video-renderer #video-title,
        .ytd-compact-video-renderer #video-title,
        .ytd-rich-item-renderer #video-title {
            display: block !important;        /* so margin-bottom works */
            white-space: normal !important;
            text-overflow: unset !important;
            overflow: visible !important;
            line-height: 1.4 !important;      /* more vertical spacing */
            margin-bottom: 1em !important;    /* space between title & channel row */
        }

        /* Keep channel avatar & name on one line, add a bit of spacing above */
        .ytd-video-owner-renderer,
        .ytd-video-owner-renderer #owner-container,
        .ytd-video-meta-block #owner-container,
        .ytd-rich-item-renderer #owner-container,
        .ytd-compact-video-renderer #owner-container {
            display: flex !important;
            align-items: center !important;
            margin-top: 0.6em !important;
        }

        /* Gap between channel avatar and channel name */
        .ytd-video-owner-renderer #avatar,
        .ytd-video-owner-renderer #avatar-link,
        .ytd-rich-item-renderer #avatar,
        .ytd-rich-item-renderer #avatar-link,
        .ytd-compact-video-renderer #avatar,
        .ytd-compact-video-renderer #avatar-link {
            margin-right: 0.6em !important;
        }
    `;
    document.head.appendChild(style);

    /*************************************************
     * 2) MutationObserver to remove any inline style
     *    that re-enables line-clamp on the titles
     *************************************************/
    const removeClamp = () => {
        document.querySelectorAll('#video-title').forEach(el => {
            // Remove possible inline styles that clamp lines
            el.style.setProperty('-webkit-line-clamp', 'unset', 'important');
            el.style.setProperty('-webkit-box-orient', 'unset', 'important');
            el.style.setProperty('max-height', 'none', 'important');
            // The following ensures it remains multiline
            el.style.setProperty('white-space', 'normal', 'important');
            el.style.setProperty('overflow', 'visible', 'important');
            el.style.setProperty('text-overflow', 'unset', 'important');
            el.style.setProperty('display', 'block', 'important');
            el.style.setProperty('line-height', '1.4', 'important');
        });
    };

    // Run once on page load
    removeClamp();

    // Watch for dynamic changes (e.g., AJAX navigation, infinite scroll)
    const observer = new MutationObserver(() => {
        removeClamp();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true
    });
})();
