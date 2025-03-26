package tabelline;

public class Tabellina {
    public static void main(String[] args) {
        int [] tabellina = new int[11];
        for (int i = 0; i < tabellina.length; i++) {
            tabellina[i] = 2 * i;
        }
        for (int i = 0; i < tabellina.length; i++) {
            System.out.println("2 x " + i + " = " + tabellina[i]);
        }
        // Scanner scanner = new Scanner(System.in);
        // // Chiedere all'utente una passowrd e continuare a chiedere finchè non inserisce la password corretta con do while
        // String password;
        // String passwordCorretta = "java123";
        // do {
        //     System.out.println("Inserisci la password: ");
        //     password = scanner.nextLine();
        //     if (!password.equals(passwordCorretta)) {
        //         System.out.println("Password errata");
        //     }
        
        // } while (!password.equals(passwordCorretta));
        // System.out.println("Password corretta");
        // scanner.close();
        // int n = scanner.nextInt();
        // int somma = 0;
        // int i = 1;
        // while (i <= n) {
        //     somma += i;
        //     i++;
        // } 
        // System.out.println("La somma è: " + somma);
        // scanner.close();
        // for (int i = 0; i <= 10; i++) {
        //     System.out.println("2 x " + i + " = " + (2 * i));
        // }
    }
}
