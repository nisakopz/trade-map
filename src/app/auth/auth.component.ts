import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  public authInstance: gapi.auth2.GoogleAuth;
  public user: gapi.auth2.GoogleUser;
  constructor(private readonly router: Router,
          private readonly userService: UserService) { }

  async ngOnInit() {
    if (await this.checkIfUserAuthenticated()) {
      this.user = this.authInstance.currentUser.get();
    }
  }

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve 
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi
    // loaded and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init({ client_id: '947886055010-6rt8la4mpai7p6spi31eu29s59qm94de.apps.googleusercontent.com' })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
          
        });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.signIn().then(
        user => {
          const userName = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
          sessionStorage.setItem('user', userName);
          this.userService.userChanged.next();
          this.router.navigate(["detail"]);
        },
        error =>{
          sessionStorage.clear();
        });
    });
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }

}
