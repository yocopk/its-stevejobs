import java.util.Scanner;

public class Somma {
    public static void main(String[] args) {
        
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.println("Inserisci il primo numero: ");
            int num1 = scanner.nextInt();
            if (num1 < 0) {
                throw new Exception("Il numero deve essere positivo");
            }
            if (num1 == 0) {
                throw new Exception("Il numero non può essere 0");
            }
            System.out.println("Inserisci il secondo numero: ");
            int num2 = scanner.nextInt();
            int somma = num1 + num2;
            System.out.println("La somma è: " + somma);
        } catch (Exception e) {
            System.out.println("Errore: " + e.getMessage());
        }
    }
}