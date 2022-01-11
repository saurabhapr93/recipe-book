import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import 'firebase/auth';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router) {}

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            error => console.log(error)
        );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response => {
                // console.log(response);
                localStorage.setItem('userToken', JSON.stringify(response.user));
                this.router.navigate(['/']);
                firebase.auth().currentUser.getIdToken()
                .then(
                    (token: string) => this.token = token
                );
            }
        )
        .catch(
            error => console.log(error)
        );
    }

    signoutUser() {
        firebase.auth().signOut();
        this.token = null;
        localStorage.removeItem("userToken");
        this.router.navigate(['/signin']);
    }

    getIdToken() {
        console.log(firebase.auth().currentUser.getIdToken());
        firebase.auth().currentUser.getIdToken()
        .then(
            (token: string) => this.token = token
        );
        return this.token;
    }

    checkIsLocalTokenAvailable() {
        const cd = new Date();
        const cTimestamp = cd.getTime();
        const localToken = JSON.parse(localStorage.getItem('userToken'));
        if(localToken != null && cTimestamp < localToken.stsTokenManager.expirationTime) {
            this.token = localToken.stsTokenManager.accessToken;
        } else {
            this.token = null;
        }
    }

    isAuthenticated() {
        //this.checkIsLocalTokenAvailable();
        return this.token != null;
    }
}