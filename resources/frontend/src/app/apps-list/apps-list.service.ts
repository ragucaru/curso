import { Injectable } from '@angular/core';
import { APPS, App } from './apps';

@Injectable({
  providedIn: 'root'
})
export class AppsListService {

  constructor() { }

  defaultChildRoute(appRoute): string {
    console.log('AppHelper ::: ' + appRoute);
    let apps = JSON.parse(localStorage.getItem('userApps'));
    for (let i = 0; i < apps.length; i++) {
        let app = apps[i];
        if(app.route == appRoute && app.hideHome){
            if(app.children && app.children.length > 0){
                return app.children[0].route;
            }
        }
    }
    return '...';
  }

  getApps(): any[] {
    let userApps: App[] = [];

    //console.log(APPS);
    if(!localStorage.getItem('token')){
      return [];
    }

    let permissions = {};

    if(localStorage.getItem('permissions')){
      permissions = JSON.parse(localStorage.getItem('permissions'));
    }

    userApps = JSON.parse(JSON.stringify(APPS));

    for (let i = 0; i < userApps.length; i++) {
      let app = userApps[i];

      if(app.children && app.children.length > 0){
        for (let j = 0; j < app.children.length; j++) {
          let child = app.children[j];
          if(child.permission && !permissions[child.permission]){
            userApps[i].children.splice(j,1);
            j -= 1;
          }
        }
      }

      if((app.permission && !permissions[app.permission]) || (app.isHub && app.children && app.children.length == 0)){
        userApps.splice(i,1);
        i -= 1;
      }
    }
    
    localStorage.setItem('userApps',JSON.stringify(userApps));
    
    //console.log(userApps);

    return userApps;
  }
}
