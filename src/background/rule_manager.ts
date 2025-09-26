/**
 Description : Ce fichier sera notre "spécialiste des règles".
  Son seul travail sera de télécharger, d'analyser et de formater les listes de blocage pour les donner au navigateur.*/
  
  // list of url to block 
  const BLOCKLIST_URL = 'https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts';
  const RULE_ID_OFFSET = 1000;

  // download and parse block list 
  const fetchAndParseBlockList  = async  () : Promise<string[]>  => {    
    try {
        const rs = await fetch (BLOCKLIST_URL);
        
        if(!rs.ok){
            console.error("Error occurs while attempting to download domain list", rs.statusText)
            return []
        }

        // get the  downloaded list 
        const text = await rs.text();

        // handle text downloaded extract only essential data 
        const domains = text.split('\n')
        .filter((d) => d.startsWith('0.0.0.0'))
        .map(line => line.split(' ')[1]) // get the domain after the withspace
        .filter(Boolean) // remove  empty line
        
        console.log(`Total domain downloaded ${domains.length}`)
        return domains
    }catch (error) {
        console.error("Can't to donwload the domain list", error);
        return []
    }
  }


  // main function 
  export async function updateBlockingRules  (){
    
    const domains =  await fetchAndParseBlockList();
    if(domains.length === 0){
        console.log('Any domaine to bloc, update cancled');
    }

    // create  rule array  with chrome Api : declarativeNetRequest.Rule
    const rules : chrome.declarativeNetRequest.Rule[] = domains.map((domain , index) => ({
        id : RULE_ID_OFFSET + index,
        priority : 1, 
        action : {type: 'block'},
        condition : {
            urlFilter : `||${domain}`, // block domain and his sub domain
            resourceTypes: ['main_frame', 'sub_frame', 'script', 'xmlhttprequest', 'image', 'stylesheet', 'media', 'object'],
        }
    } ));

    // get installed rule 
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules(); // EX !
    const existingRulesIds = existingRules.map(rules => rules.id);
    
    // clean rules 
    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds : existingRulesIds,
        addRules : rules
    })

  console.log(`Terminé : ${rules.length} block rules installed .`);

// EX ! { id: 1000, action: { type: 'block' }, condition: {...} },

} 