package tipi;

public class TipiPrimitivi {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            byte piccoloNumero = (byte)(i + 10);
            short numeroBreve = (short)(i + 100);
            int numeroIntero = i * 1000;
            long numeroLungo = i + 100000L;
            float numeroDecimale = i + 1.5f;
            double numeroDecimaleLungo = i + 9.99;
            char carattere = (char)('A' + i);
            boolean valoreLogico = i % 2 == 0;
            System.out.println("Iterazione: " + i + ":" + piccoloNumero + ":" + numeroBreve + ":" + numeroIntero + ":" + numeroLungo + ":" + numeroDecimale + ":" + numeroDecimaleLungo + ":" + carattere + ":" + valoreLogico);
        }
    }
}
