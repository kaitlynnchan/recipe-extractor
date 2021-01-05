package ca.recipeextractor.model;

import java.util.ArrayList;

public class Recipe {
    private String name;
    private ArrayList<Ingredient> ingredients;
    private ArrayList<String> instructions;

    public Recipe(String name, ArrayList<Ingredient> ingredients, ArrayList<String> instructions) {
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ArrayList<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(ArrayList<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public ArrayList<String> getInstructions() {
        return instructions;
    }

    public void setInstructions(ArrayList<String> instructions) {
        this.instructions = instructions;
    }
}
