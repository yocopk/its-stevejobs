package hanged;

public class HangedConsole {
    public static void main(String[] args) {
        Hanged.printWelcome();
        String word = Hanged.generateRandomWord();
        String hiddenWord = Hanged.generateHiddenWord(word);
        int attempts = Hanged.chooseDifficulty();
        while (!Hanged.isGameOver(attempts) && !Hanged.isWordGuessed(word, hiddenWord)) {
            Hanged.printHiddenWord(hiddenWord);
            Hanged.printAttempts(attempts);
            char letter = Hanged.readLetter();
            if (Hanged.isLetterInWord(word, letter)) {
                if (hiddenWord.indexOf(letter) == -1) {
                    hiddenWord = Hanged.revealLetter(word, hiddenWord, letter);
                    Hanged.printLetterInWord();
                } else {
                    Hanged.printAlreadyGuessed();
                }
            } else {
                attempts--;
                Hanged.printLetterNotInWord();
            }
        }
        if (Hanged.isWordGuessed(word, hiddenWord)) {
            Hanged.printWin();
            System.out.println("La parola era: " + word);
        } else {
            Hanged.printGameOver();
            System.out.println("La parola era: " + word);
        }
        Hanged.printGoodbye(); 
    }
}
