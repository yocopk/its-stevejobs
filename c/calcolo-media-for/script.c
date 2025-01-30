#include <stdio.h>

int main() {
    int i, q, acc, somma = 0;

    printf("Inserisci il numero di voti che inserirai: ");
    scanf("%d", &q);

    for (i = 0; i < q; i++) {
        printf("Inserisci il %d voto: ", i+1);
        scanf("%d", &acc);
        somma += acc;
    }

    printf("La media dei voti inseriti e': %.2f", (float)somma/q);

    return 0;
}