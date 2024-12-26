import { PageSetting, PageSettingDictionary } from '../app/_models/common/common';

export const environment = {
    production: true, // Set to true in environment.prod.ts
    externalConfig: {} // Placeholder for external configuration
};

interface EnvironmentConfig {
    pageSettingDictionary   : PageSettingDictionary;
    currentUserId           : number;
    currentUserRoles        : string;     
    externalConfig          : {};                //
    usersInfo               : [];                // 
    routesList              : [];                // 
    usersList               : [];                // 
    usersDictionary         : [];                // 
    jsonList                : PageSetting[];     // 
    aiPrompts               : [] 
}


export const _environment : EnvironmentConfig  = {
    pageSettingDictionary   : {},
    currentUserId           : 0,       
    currentUserRoles        : "",      
    externalConfig          : {},        // 
    usersInfo               : [],        // 
    routesList              : [],        // 
    usersList               : [],        // 
    usersDictionary         : [],        // 
    jsonList                : [],        // 
    aiPrompts               : []        // 
};

