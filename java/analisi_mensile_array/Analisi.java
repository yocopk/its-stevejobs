package analisi_mensile_array;

public class Analisi {
    static int p1 = 25;
    static int p2 = 33;
    static int p3 = 18;
    static int p4 = 39;
    static int p5 = 45;

    public static int[] generaVenditeProdotto(int prodotto) {
        int[] venditeProdotto = new int[4];
        for (int i = 0; i < venditeProdotto.length; i++) {
            venditeProdotto[i] = prodotto * Math.round((float) Math.random() * 100);
        }
        return venditeProdotto;
    }

    public static int venditeTotaliProdotto(int[] venditeProdotto) {
        int totale = 0;
        for (int vendita : venditeProdotto) {
            totale += vendita;
        }
        return totale;
    }

    public static int totaleMassimo(int[][] vendite) {
        int totaleMassimo = 0;
        for (int[] venditeProdotto : vendite) {
            int totaleProdotto = venditeTotaliProdotto(venditeProdotto);
            if (totaleProdotto > totaleMassimo) {
                totaleMassimo = totaleProdotto;
            }
        }
        return totaleMassimo;
    }

    public static int settimanaMigliore(int[][] vendite) {
        int settimanaMigliore = 0;
        int totaleMassimo = totaleMassimo(vendite);
        for (int i = 0; i < vendite.length; i++) {
            int totaleSettimana = venditeTotaliProdotto(vendite[i]);
            if (totaleSettimana == totaleMassimo) {
                settimanaMigliore = i + 1;
            }
        }
        return settimanaMigliore;
    }

    public static void main(String[] args) {
        String[] prodotti = {"P1", "P2", "P3", "P4", "P5"};
        int[][] vendite = new int[5][4];
    
        // Generazione vendite casuali
        vendite[0] = generaVenditeProdotto(p1);
        vendite[1] = generaVenditeProdotto(p2);
        vendite[2] = generaVenditeProdotto(p3);
        vendite[3] = generaVenditeProdotto(p4);
        vendite[4] = generaVenditeProdotto(p5);
    
        // Stampa intestazione
        System.out.println("Vendite mensili:");
        System.out.println("-------------------------------------");
        System.out.printf("%-10s %-5s %-5s %-5s %-5s %-6s%n", "Prodotto", "Set1", "Set2", "Set3", "Set4", "Totale");
    
        int maxVendite = 0;
        int indiceMigliore = -1;
    
        // Determina il prodotto migliore
        for (int i = 0; i < vendite.length; i++) {
            int totale = venditeTotaliProdotto(vendite[i]);
            if (totale > maxVendite) {
                maxVendite = totale;
                indiceMigliore = i;
            }
        }
    
        // Stampa i dati dei prodotti
        for (int i = 0; i < vendite.length; i++) {
            int totale = venditeTotaliProdotto(vendite[i]);
    
            System.out.printf("%-10s %-5d %-5d %-5d %-5d %-6d", 
                              prodotti[i], vendite[i][0], vendite[i][1], vendite[i][2], vendite[i][3], totale);
    
            // Segna il prodotto migliore
            if (i == indiceMigliore) {
                System.out.print(" <-- il migliore");
            }
            System.out.println();
        }
    
        // Determina la settimana migliore
        int settimanaTop = settimanaMigliore(vendite);
    
        // Stampa settimana migliore e prodotto migliore
        System.out.println("\nSettimana migliore: " + settimanaTop);
        System.out.println("Prodotto migliore: " + prodotti[indiceMigliore] + " (totale: " + maxVendite + ")");
        
        int[] totali = new int[5];
        for (int i = 0; i < vendite.length; i++) {
            totali[i] = venditeTotaliProdotto(vendite[i]);
        }
        // Stampa in ordine decrescente
        System.out.println("\nVendite totali in ordine decrescente:");
        for (int i = 0; i < totali.length; i++) {
            int max = totali[i];
            int indiceMax = i;
            for (int j = i + 1; j < totali.length; j++) {
                if (totali[j] > max) {
                    max = totali[j];
                    indiceMax = j;
                }
            }
            int temp = totali[i];
            totali[i] = totali[indiceMax];
            totali[indiceMax] = temp;
            String prodotto = prodotti[i];
            prodotti[i] = prodotti[indiceMax];
            prodotti[indiceMax] = prodotto;
        }
        for (int i = 0; i < totali.length; i++) {
            System.out.println(prodotti[i] + ": " + totali[i]);
        }
    }      
}
