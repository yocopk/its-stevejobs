package esercizio_finale;
import java.util.Scanner;

public class EsercizioFinale {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Inserisci il primo numero: ");
        int num1 = scanner.nextInt();
        System.out.println("Inserisci il secondo numero: ");
        int num2 = scanner.nextInt();
        System.out.println("La somma è: " + somma(num1, num2));
        System.out.println("La differenza è: " + differenza(num1, num2));
        System.out.println("Il prodotto è: " + prodotto(num1, num2));
        System.out.println("La divisione è: " + divisione(num1, num2));
        System.out.println("Il resto è: " + resto(num1, num2));

        // Convertiamo il primo numero in double ed il secondo in byte
        double num1Double = (double) num1;
        byte num2Byte = (byte) num2;
        System.out.println("Il primo numero convertito in double è: " + num1Double);
        System.out.println("Il secondo numero convertito in byte è: " + num2Byte);

        System.out.println("Risultati dopo la conversione: ");
        System.out.println("La somma è: " + );
        scanner.close();
    }

    public static int somma(int num1, int num2) {
        if (num1 < 0 || num2 < 0) {
            throw new IllegalArgumentException("I numeri devono essere positivi");
        }
        return num1 + num2;
    }

    public static double sommaDouble(double num1, double num2) {
        return num1 + num2;
    }

    public static int differenza(int num1, int num2) {
        if (num1 < 0 || num2 < 0) {
            throw new IllegalArgumentException("I numeri devono essere positivi");
        }
        return num1 - num2;
    }

    public static int prodotto(int num1, int num2) {
        if (num1 < 0 || num2 < 0) {
            throw new IllegalArgumentException("I numeri devono essere positivi");
        }
        return num1 * num2;
    }

    public static int divisione(int num1, int num2) {
        if (num1 < 0 || num2 < 0) {
            throw new IllegalArgumentException("I numeri devono essere positivi");
        }
        return num1 / num2;
    }

    public static int resto(int num1, int num2) {
        if (num1 < 0 || num2 < 0) {
            throw new IllegalArgumentException("I numeri devono essere positivi");
        }
        return num1 % num2;
    }
}
