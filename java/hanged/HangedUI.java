package hanged;
import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

public class HangedUI {
    private static int attempts = 5;

    public static void main(String[] args) {
        String word = Hanged.generateRandomWord();
        StringBuilder hiddenWord = new StringBuilder(Hanged.generateHiddenWord(word));
        String spacedHiddenWord = hiddenWord.toString().replace("", " ").trim(); // Add spaces between characters

        JFrame frame = new JFrame("L'impiccato");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(350, 250);
        frame.setLayout(new BoxLayout(frame.getContentPane(), BoxLayout.Y_AXIS));

        JLabel lblHiddenWord = new JLabel(spacedHiddenWord); // Display spaced hiddenWord initially
        JLabel lblAttempts = new JLabel("Tentativi rimasti: " + attempts);
        JLabel lblLetter = new JLabel("Inserisci una lettera:");
        JTextField txtLetter = new JTextField();
        txtLetter.setMaximumSize(new java.awt.Dimension(100, 25)); // Set preferred size for input field
        JLabel lblResult = new JLabel();    
        JButton btnGuess = new JButton("Invia");

        frame.add(lblHiddenWord);
        frame.add(lblAttempts);
        frame.add(lblLetter);
        frame.add(txtLetter);
        frame.add(lblResult);
        frame.add(btnGuess);

        frame.setVisible(true);

        btnGuess.addActionListener(e -> {
            String input = txtLetter.getText().trim();
            if (input.length() == 1) {
                char guessedLetter = input.charAt(0);
                if (Hanged.isLetterInWord(word, guessedLetter)) {
                    if (hiddenWord.indexOf(String.valueOf(guessedLetter)) == -1) {
                        String revealedWord = Hanged.revealLetter(word, hiddenWord.toString(), guessedLetter);
                        hiddenWord.setLength(0);
                        hiddenWord.append(revealedWord);
                        lblHiddenWord.setText(hiddenWord.toString().replace("", " ").trim()); // Update with spaces
                        Hanged.printLetterInWord();
                        lblResult.setText("");
                    } else {
                        Hanged.printAlreadyGuessed();
                        lblResult.setText("Lettera già inserita");
                    }
                } else {
                    attempts--; // Update the class-level attempts field
                    lblAttempts.setText("Tentativi rimasti: " + attempts);
                    Hanged.printLetterNotInWord();
                    lblResult.setText("Peccato! Lettera non presente nella parola");
                }

                // Check for victory
                if (hiddenWord.toString().equals(word)) {
                    Hanged.printWin();
                    btnGuess.setEnabled(false); // Disable further guesses
                    lblResult.setText("Hai vinto!" + " La parola era: " + word);
                }

                // Check for loss
                if (attempts == 0) {
                    Hanged.printGameOver();
                    btnGuess.setEnabled(false); // Disable further guesses
                    lblResult.setText("Hai perso!" + " La parola era: " + word);
                }
            } else {
                Hanged.printInvalidInput();
                lblResult.setText("Input non valido");
            }
            txtLetter.setText("");
        });
    }
}
