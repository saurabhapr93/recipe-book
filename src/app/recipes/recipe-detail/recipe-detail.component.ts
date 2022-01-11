import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeservice: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.recipe = this.recipeservice.getRecipe(+this.route.snapshot.params.id);
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.recipe = this.recipeservice.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList() {
    // this.recipe.ingredients.forEach(ing => {
    //   this.shoppingList.addIngredient(ing);
    // });
    this.recipeservice.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeservice.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
