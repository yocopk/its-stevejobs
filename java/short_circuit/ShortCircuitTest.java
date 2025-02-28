package short_circuit;

public class ShortCircuitTest {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
           boolean result = (i > 2) && metodoCostoso(i);
              System.out.println("Iterazione " + i + ": " + result); 
        }
    }

    public static boolean metodoCostoso(int i) {
        System.out.println("Metodo costoso chiamato con i: " + i);
        return i % 2 == 0;
    }
}
