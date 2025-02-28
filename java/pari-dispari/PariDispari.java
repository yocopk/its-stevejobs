import java.util.Scanner;

public class PariDispari {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Inserisci un numero: ");
        int num = scanner.nextInt();
        if (num % 2 == 0) {
            System.out.println("Il numero è pari.");
        } else {
            System.out.println("Il numero è dispari.");
        }
    }}
