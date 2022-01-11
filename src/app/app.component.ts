import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // loadedFeature = 'recipes';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBd_WD5FucDwutZPRag2EeihQwlxltyUcs',
      authDomain: 'https://ng-recipe-book-1da02.firebaseio.com/'
    });
  }

  /*onNavigate(feature: string) {
    this.loadedFeature = feature;
  }*/
}
