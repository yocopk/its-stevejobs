package controllo;

public class ControlloFlusso {
    public static void main(String[] args) {
        int num1 = 5;
        int num2 = 3;
        if (num1 > num2) {
            System.out.println("Il primo numero è maggiore del secondo");
        } else if (num1 < num2) {
            System.out.println("Il primo numero è minore del secondo");
        } else {
            System.out.println("I due numeri sono uguali");
        }
    }
}
