public class GestioneEccezioni {
public static void main(String[] args) {
try {
int risultato = 10 / 2; // Errore: divisione per zero
System.out.println("Risultato: " + risultato);
} catch (ArithmeticException e) {
System.out.println("Errore: Divisione per zero non permessa.");
}
}
}