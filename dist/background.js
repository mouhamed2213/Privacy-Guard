/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*********************************!*\
  !*** ./src/background/index.ts ***!
  \*********************************/

console.log("Privacy Guard Service Worker a démarré !");
chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
            {
                id: 1,
                priority: 1,
                action: { type: 'block' },
                condition: {
                    urlFilter: '||example.com',
                    resourceTypes: ['main_frame'],
                },
            },
        ],
        removeRuleIds: [1]
    }, () => {
        console.log("Règle de test pour example.com installée.");
    });
});

/******/ })()
;
//# sourceMappingURL=background.js.map