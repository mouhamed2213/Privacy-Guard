import { updateBlockingRules } from './rule_manager';

console.log("Privacy Guard Service started !");

// checke if the extention has been installed 
chrome.runtime.onInstalled.addListener((detail) => {

  // check if it's the first installation 
  if(detail.reason === 'install') {
    console.log('istallation of block list');
    updateBlockingRules();
  }
}) 


/** Notre code actuel (src/background/index.ts) est censé bloquer toute tentative de navigation 
 * vers le site example.com. Nous allons vérifier si c'est bien le cas.*/

/*
Description : C'est le cerveau de votre extension. Ce script s'exécute en arrière-plan, 
invisible pour l'utilisateur. C'est lui qui contient la logique principale.

Rôle actuel : Il écoute l'événement d'installation de l'extension (onInstalled) et,
 à ce moment-là, il demande au navigateur de mettre en place une règle simple pour bloquer le site example.com.*/ 