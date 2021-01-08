package ca.recipeextractor.ui;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://entertainingwithbeth.com/foolproof-french-macaron-recipe/");
            String name = url.getPath();
            name = name.replace("/", "");
            name = name.replace("-", " ");
            System.out.println(name);

            Scanner scanner = new Scanner(url.openStream());
            while(scanner.hasNext()){
                String line = scanner.nextLine();
                System.out.println(line);
//                if(!printRecipe(line)){
//                    printIngredients(line);
//                }
            }
            scanner.close();
//            File file = new File(String.valueOf(url));
        } catch (IOException e) {
            System.out.println("ERROR: " + e.getMessage());
        }
    }

    private static void printIngredients(String line) {
        String lineCpy = line;
        if(lineCpy.toLowerCase().contains("ingredient")){
            lineCpy = lineCpy.replaceAll("<[^>]*>", "");
            System.out.println("LINE: " + lineCpy);
        } else if(lineCpy.toLowerCase().contains("instruction")){
            lineCpy = lineCpy.replaceAll("<[^>]*>", "");
            System.out.println("LINE: " + lineCpy);
        }
    }

    private static boolean printRecipe(String line) {
        String lineCpy = line;
        if(lineCpy.toLowerCase().contains("recipe")){
            int index = lineCpy.indexOf('<');
            String tag = "";
            if(index == -1){
                return false;
            }
            for(int j = index; j < lineCpy.length(); j++){
                tag += lineCpy.charAt(j);
                if(lineCpy.charAt(j) == '>'){
                    break;
                }
            }
            if(tag.contains("recipe")){
                lineCpy = lineCpy.replaceAll("<[^>]*>", "");
                System.out.println("LINE: " + lineCpy);
                return true;
            }
        }
        return false;
    }
}
