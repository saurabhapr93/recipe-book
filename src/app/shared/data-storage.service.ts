import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes() {
        //const token = this.authService.getIdToken();
        //const headers = new HttpHeaders().set('Authorization', 'Bearer abcde');

        //return this.httpClient.put('https://ng-recipe-book-1da02.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getrecipes());

        // return this.httpClient.put('https://ng-recipe-book-1da02.firebaseio.com/recipes.json', this.recipeService.getrecipes(), {
        //     observe: 'body', //events
        //     //headers: headers,
        //     params: new HttpParams().set('auth', token)
        // });

        const req = new HttpRequest('PUT', 'https://ng-recipe-book-1da02.firebaseio.com/recipes.json', this.recipeService.getrecipes(), {reportProgress: true});
        return this.httpClient.request(req);
    }

    getRecipes() {
        //const token = this.authService.getIdToken();
        //this.httpClient.get<Recipe[]>('https://ng-recipe-book-1da02.firebaseio.com/recipes.json?auth=' + token).pipe(map(
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-1da02.firebaseio.com/recipes.json', {
            observe: 'body',
            responseType: 'json'
        }).pipe(map(
            (recipes) => {
                for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                        console.log(recipe);
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            }
        )).subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}