import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth1Guard implements CanActivate {

  constructor(private router: Router) { }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  canActivate():boolean{

    if(sessionStorage.getItem("is_logged")!="true"){
			this.router.navigate(['/login']);
			return false;
		}
		
		if(sessionStorage.getItem("role")!="Manager"){
			this.router.navigate(['/login']);
			return false;
		}
		return true;
	}
  
}
