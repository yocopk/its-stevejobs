#include <stdio.h>
#define N 10

int main() {
    int i, j, k, temp;
    int vett[N] = {2, 5, 7, 10, 9, 8, 4, 1, 3, 6};

    temp = vett[0];

    printf("Vettore non ordinato: \n");
    for ( i = 0; i < N; i++ ) {
        printf("%d ", vett[i]);
    }
    printf("\n");
    printf("\n");
    printf("Vettori ordinati man mano che il ciclo si esegue: \n");
    for ( i = 0; i < N; i++ ) {
        for ( j = i + 1; j < N; j++ ) {
            if ( vett[i] > vett[j] ) {
                temp = vett[i];
                vett[i] = vett[j];
                vett[j] = temp;
            }
            printf("\n");
            // stampa via via l'array ad ogni spostamento, per vedere come si ordina il vettore a capo
            for ( k = 0; k < N; k++ ) {
                printf("%d ", vett[k]);
            }
        }
    }
    printf("\n");

    printf("Vettore ordinato: \n");
    for ( i = 0; i < N; i++ ) {
        printf("%d ", vett[i]);
    }
}