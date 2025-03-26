package oggetti;
import java.util.Scanner;

class Persona {
    String nome;
    int eta;
    float voto;

    Persona(String nome, int eta, float voto) {
        this.nome = nome;
        this.eta = eta;
        this.voto = voto;
    }

    void mostraDettagli() {
        System.out.println("Nome: " + nome);
        System.out.println("Età: " + eta);
        System.out.println("Voto medio: " + voto);
    }

    float calcolaMedia(float[] voti) {
        float somma = 0;
        for (int i = 0; i < voti.length; i++) {
            somma += voti[i];
        }
        return somma / voti.length;
    }
}

public class GestionePersone {
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        System.out.println("Quante persone vuoi inserire?");
        int n = scanner.nextInt();
        Persona[] persone = new Persona[n];
        for (int i = 0; i < n; i++) {
            System.out.println("Inserisci il nome della persona " + (i + 1) + ": ");
            String nome = scanner.next();
            System.out.println("Inserisci l'età della persona " + (i + 1) + ": ");
            int eta = scanner.nextInt();
            System.out.println("Insersci il voto medio della persona " + (i + 1) + ": ");
            float voto = scanner.nextFloat();
            persone[i] = new Persona(nome, eta, voto);
        }
        // Mostra elenco persone
        for (int i = 0; i < n; i++) {
            persone[i].mostraDettagli();
        }
        // Calcola media voti
        float[] voti = new float[n];
        for (int i = 0; i < n; i++) {
            voti[i] = persone[i].voto;
        }
        float media = persone[0].calcolaMedia(voti);
        System.out.println("La media dei voti è: " + media);
        scanner.close();
    } 
}
