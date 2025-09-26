/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/rule_manager.ts":
/*!****************************************!*\
  !*** ./src/background/rule_manager.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateBlockingRules: () => (/* binding */ updateBlockingRules)
/* harmony export */ });
/**
 Description : Ce fichier sera notre "spécialiste des règles".
  Son seul travail sera de télécharger, d'analyser et de formater les listes de blocage pour les donner au navigateur.*/
// list of url to block 
const BLOCKLIST_URL = 'https://raw.githubusercontent.com/StevenBlack/hosts/master/ hosts';
const RULE_ID_OFFSET = 1000;
// download and parse block list 
const fetchAndParseBlockList = async () => {
    try {
        const rs = await fetch(BLOCKLIST_URL);
        if (!rs.ok) {
            console.error("Error occurs while attempting to download domain list", rs.statusText);
            return [];
        }
        // get the  downloaded list 
        const text = await rs.text();
        // handle text downloaded extract only essential data 
        const domains = text.split('\n')
            .filter((d) => d.startsWith('0.0.0.0'))
            .map(line => line.split(' ')[1]) // get the domain after the withspace
            .filter(Boolean); // remove  empty line
        console.log(`Total domain downloaded ${domains.filter}`);
        return domains;
    }
    catch (error) {
        console.error("Can't to donwload the domain list", error);
        return [];
    }
};
// main function 
async function updateBlockingRules() {
    const domains = await fetchAndParseBlockList();
    if (domains.length === 0) {
        console.log('Any domaine to bloc, update cancled');
    }
    // create  rule array  with chrome Api : declarativeNetRequest.Rule
    const rules = domains.map((domain, index) => ({
        id: RULE_ID_OFFSET + index,
        priority: 1,
        action: { type: 'block' },
        condition: {
            urlFilter: `||${domain}`, // block domain and his sub domain
            resourceTypes: ['main_frame', 'sub_frame', 'script', 'xmlhttprequest', 'image', 'stylesheet', 'media', 'object'],
        }
    }));
    // get installed rule 
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules(); // EX !
    const existingRulesIds = existingRules.map(rules => rules.id);
    // clean rules 
    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingRulesIds,
        addRules: rules
    });
    console.log(`Terminé : ${rules.length} block rules installed .`);
    // EX ! { id: 1000, action: { type: 'block' }, condition: {...} },
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/background/index.ts ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_manager */ "./src/background/rule_manager.ts");

console.log("Privacy Guard Service started !");
// checke if the extention has been installed 
chrome.runtime.onInstalled.addListener((detail) => {
    // check if it's the first installation 
    if (detail.reason === 'install') {
        console.log('isntallation of block list');
        (0,_rule_manager__WEBPACK_IMPORTED_MODULE_0__.updateBlockingRules)();
    }
});
/** Notre code actuel (src/background/index.ts) est censé bloquer toute tentative de navigation
 * vers le site example.com. Nous allons vérifier si c'est bien le cas.*/
/*
Description : C'est le cerveau de votre extension. Ce script s'exécute en arrière-plan,
invisible pour l'utilisateur. C'est lui qui contient la logique principale.

Rôle actuel : Il écoute l'événement d'installation de l'extension (onInstalled) et,
 à ce moment-là, il demande au navigateur de mettre en place une règle simple pour bloquer le site example.com.*/ 

})();

/******/ })()
;
//# sourceMappingURL=background.js.map