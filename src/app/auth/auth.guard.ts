import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
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

