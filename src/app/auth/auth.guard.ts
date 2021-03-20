import { CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';




@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(private readonly router: Router) { }

	canActivate(): boolean{
		
		const user = sessionStorage.getItem('user');

		if(user) {
			return true;	
		} else {
			this.router.navigate(['auth']);
			return false;
		}
	}


}

