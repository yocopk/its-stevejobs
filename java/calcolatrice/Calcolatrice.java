package calcolatrice;
import java.util.Scanner;

public class Calcolatrice {
    public static void main(String[] args) {
        Calcolatrice calcolatrice = new Calcolatrice();
        Scanner scanner = new Scanner(System.in);
        System.out.println("Scegli un operazione (+, -, *, /): ");
        String operazione = scanner.nextLine();
        System.out.println("Inserisci il primo numero: ");
        int a = scanner.nextInt();
        System.out.println("Inserisci il secondo numero: ");
        int b = scanner.nextInt();
        switch (operazione) {
            case "+":
                System.out.println("Il risultato è: " + calcolatrice.somma(a, b));
                break;
            case "-":
                System.out.println("Il risultato è: " + calcolatrice.sottrazione(a, b));
                break;
            case "*":
                System.out.println("Il risultato è: " + calcolatrice.moltiplicazione(a, b));
                break;
            case "/":
                System.out.println("Il risultato è: " + calcolatrice.divisione(a, b));
                break;
            default:
                System.out.println("Operazione non valida");
        }

        scanner.close();
    }

    public int somma(int a, int b) {
        return a + b;
    }

    public int sottrazione(int a, int b) {
        return a - b;
    }

    public int moltiplicazione(int a, int b) {
        return a * b;
    }

    public int divisione(int a, int b) {
        return a / b;
    }
}
