package esercizio1;

// public class StampaInfo {
//     public static void main(String[] args) {
//         int eta = 20;
//         double altezza = 1.80;
//         String nome = "Mario";
//         System.out.println("Nome: " + nome);
//         System.out.println("Età: " + eta);
//         System.out.println("Altezza: " + altezza);
//     }
// }

// import java.util.Scanner;

// public class StampaInfo {
//     public static void main(String[] args) {
//         try (Scanner scanner = new Scanner(System.in)) {
//             System.out.println("Inserisci il primo numero: ");
//             int num1 = scanner.nextInt();
//             System.out.println("Inserisci il secondo numero: ");
//             int num2 = scanner.nextInt();
//             System.out.println("La somma è: " + somma(num1, num2));
//             System.out.println("La differenza è: " + differenza(num1, num2));
//             System.out.println("Il prodotto è: " + prodotto(num1, num2));
//         } catch (Exception e) {
//             System.out.println("Errore: " + e.getMessage());
//         }
//     }

//     public static int somma(int num1, int num2) {
//         return num1 + num2;
//     }

//     public static int differenza(int num1, int num2) {
//         return num1 - num2;
//     }

//     public static int prodotto(int num1, int num2) {
//         return num1 * num2;
//     }
// }

// import java.util.Scanner;

// public class StampaInfo {
//     public static void main(String[] args) {
//         Scanner scanner = new Scanner(System.in);
//         System.out.println("Inserisci la tua età: ");
//         int eta = scanner.nextInt();
//         if (eta < 18) {
//             System.out.println("Sei minorenne, non puoi guidare");
//         } else {
//             System.out.println("Sei maggiorenne, puoi guidare");
//         }
//         scanner.close();
//     }
// }

import java.util.Scanner;

public class StampaInfo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Inserisci il tuo nome: ");
        String nome = scanner.nextLine();
        System.out.println(saluta(nome));
        scanner.close();
    }

    public static String saluta(String nome) {
        return "Ciao, sono " + nome;
    }
}