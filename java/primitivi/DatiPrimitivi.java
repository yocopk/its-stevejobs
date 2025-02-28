package primitivi;

public class DatiPrimitivi {
    public static void main(String[] args) {
        // Dichiarazione e inizializzazione di variabili di tipo primitivo
        byte byteVar = 127;
        short shortVar = 32767;
        int intVar = 2147483647;
        long longVar = 9223372036854775807L;
        float floatVar = 3.4028235E38f;
        double doubleVar = 1.7976931348623157E308;
        char charVar = 'A';
        boolean booleanVar = true;

        // Stampa dei valori delle variabili
        System.out.println("byteVar: " + byteVar);
        System.out.println("shortVar: " + shortVar);
        System.out.println("intVar: " + intVar);
        System.out.println("longVar: " + longVar);
        System.out.println("floatVar: " + floatVar);
        System.out.println("doubleVar: " + doubleVar);
        System.out.println("charVar: " + charVar);
        System.out.println("booleanVar: " + booleanVar);
    }
}
