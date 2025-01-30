#include <stdio.h>

int main() {
    char matrice[30][50];
    int i;
    FILE *file = fopen("articolo_giornale.txt", "r");
    if (file == NULL) {
        printf("Errore nell'apertura del file\n");
        return 1;
    }

    i = 0;
    while (fscanf(file, "%s", matrice[i]) == 1 && i < 30) {
        i++;
    }

    for (int j = 0; j < i; j++) {
        printf("%s\n", matrice[j]);
    }

    fclose(file);
    return 0;
}