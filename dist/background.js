/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*********************************!*\
  !*** ./src/background/index.ts ***!
  \*********************************/

/** Notre code actuel (src/background/index.ts) est censé bloquer toute tentative de navigation
 * vers le site example.com. Nous allons vérifier si c'est bien le cas.*/
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
/*
Description : C'est le cerveau de votre extension. Ce script s'exécute en arrière-plan,
invisible pour l'utilisateur. C'est lui qui contient la logique principale.

Rôle actuel : Il écoute l'événement d'installation de l'extension (onInstalled) et,
 à ce moment-là, il demande au navigateur de mettre en place une règle simple pour bloquer le site example.com.*/ 

/******/ })()
;
//# sourceMappingURL=background.js.map