package scope;

public class ScopeTest {
    private int variabileIstanza = 0;
    private static int variabileStatica = 0;

    public static void main(String[] args) {
        ScopeTest scopeTest = new ScopeTest();
        scopeTest.incrementaVariabili();
    }

    public void incrementaVariabili() {
        int variabileLocale = 0;
        for (int i = 0; i < 3; i++) {
            variabileIstanza++;
            variabileStatica++;
            variabileLocale++;
            System.out.println("Variabile istanza: " + variabileIstanza);
            System.out.println("Variabile statica: " + variabileStatica);
            System.out.println("Variabile locale: " + variabileLocale);
        }
    }
}
