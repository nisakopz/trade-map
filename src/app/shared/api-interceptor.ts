import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	
		let apiReq = req.clone({
			url: `https://trade-map-307816-default-rtdb.firebaseio.com${req.url}`
		});
		

		return next.handle(apiReq);

	}

	constructor() { }
}
