package casting;

public class CastingTest {
    public static void main(String[] args) {
        for (int i = 0; i <= 3; i++) {
            double valore = i * 9.99;
            int valoreIntero = (int) valore;
            System.out.println("Valore: " + valore + " - Valore intero: " + valoreIntero);
        }
    }
}
