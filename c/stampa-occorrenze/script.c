#include <stdio.h>
#define N 20

int main(){
    int i, j, fuori;
    int vett[N] = {1, 4, 3, 4, 3, 6, 4, 8, 9, 5, 0, 2, 3, 4, 5, 2, 7, 0, 9, 10};
    int valori[10] = {0};


    fuori = 0;
    for ( i = 0; i < N; i++ ) {
        if ( vett[i] < 0 || vett[i] > 9 ) {
            fuori++;
        }
        for ( j = 0; j < 10; j++ ) {
            if ( vett[i] == j ) {
                valori[j]++;
            }
        }
    }

    for ( i = 0; i < 10; i++ ) {
        printf("Il numero %d compare %d volte\n", i, valori[i]);
    }

    printf("Ci sono %d numeri fuori dal range 0-9\n", fuori);
}