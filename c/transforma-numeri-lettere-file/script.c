#include <stdio.h>

int main() {
    int n;
    FILE *file = fopen("file.txt", "r");
    if (file == NULL) {
        printf("Errore nell'apertura del file\n");
        return 1;
    }
  
    // 'fscanf' legge l'input formattato dal file
    // Legge un intero dal file e lo memorizza nella variabile 'n'
    while (fscanf(file, "%d", &n) == 1) {
        int n1 = n / 1000;
        int n2 = (n % 1000) / 100;
        int n3 = (n % 100) / 10;
        int n4 = n % 10;
        printf("%d%d%d%d\n", n1, n2, n3, n4);
    }

    fclose(file);
    return 0;
}