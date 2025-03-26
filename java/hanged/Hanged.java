package hanged;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Hanged {

    public static String generateRandomWord() {
        File filePath = new File("C:\\Users\\andre\\Desktop\\WEB-DEV\\its-steve-jobs\\java\\hanged\\parole.txt");
        try (Scanner scanner = new Scanner(filePath)) {
            String[] words = scanner.nextLine().split(";");
            int randomIndex = (int) (Math.random() * words.length);
            return words[randomIndex];
        } catch (FileNotFoundException e) {
            System.out.println("Error: File not found.");
            return "default"; // Return a default word in case of error
        }
    }

    public static String generateHiddenWord(String word) {
        String hiddenWord = "";
        for (int i = 0; i < word.length(); i++) {
            hiddenWord += "_";
        }
        return hiddenWord;
    }

    public static String revealLetter(String word, String hiddenWord, char letter) {
        String newHiddenWord = "";
        for (int i = 0; i < word.length(); i++) {
            if (word.charAt(i) == letter) {
                newHiddenWord += letter;
            } else {
                newHiddenWord += hiddenWord.charAt(i);
            }
        }
        return newHiddenWord;
    }

    public static boolean isWordGuessed(String word, String hiddenWord) {
        return word.equals(hiddenWord);
    }

    public static boolean isGameOver(int attempts) {
        return attempts == 0;
    }

    public static boolean isLetterInWord(String word, char letter) {
        return word.indexOf(letter) != -1;
    }

    public static void printHiddenWord(String hiddenWord) {
        for (int i = 0; i < hiddenWord.length(); i++) {
            System.out.print(hiddenWord.charAt(i) + " ");
        }
        System.out.println();
    }

    public static int chooseDifficulty() {
        System.out.println("Scegli la difficoltà:");
        System.out.println("1. Facile (10 tentativi)");
        System.out.println("2. Medio (5 tentativi)");
        System.out.println("3. Difficile (3 tentativi)");
        System.out.print("Scelta: ");
        String input = System.console().readLine();
        switch (input) {
            case "1" -> {
                return 10;
            }
            case "2" -> {
                return 5;
            }
            case "3" -> {
                return 3;
            }
            default -> {
                printInvalidInput();
                return chooseDifficulty();
            }
        }
    }

    public static void printAttempts(int attempts) {
        System.out.println("Attempts: " + attempts);
    }

    public static void printGameOver() {
        System.out.println("Hai perso!");
    }

    public static void printWin() {
        System.out.println("Hai vinto!");
    }

    public static void printLetterInWord() {
        System.out.println("Bravo! Lettera presente nella parola");
    }

    public static void printLetterNotInWord() {
        System.out.println("Peccato! Lettera non presente nella parola");
    }

    public static void printAlreadyGuessed() {
        System.out.println("Lettera già inserita");
    }

    public static void printInvalidInput() {
        System.out.println("Input non valido");
    }

    public static void printWelcome() {
        System.out.println("Benvenuto in Hanged!");
    }

    public static void printGoodbye() {
        System.out.println("Arrivederci!");
    }

    public static char readLetter() {
        System.out.print("Inserisci una lettera: ");
        String input = System.console().readLine();
        if (input.length() != 1) {
            printInvalidInput();
            return readLetter();
        }
        return input.charAt(0);
    }
}