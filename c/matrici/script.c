/*
Si definisca un valore N (numero pari).Dato un vettore di input N elementi preinizializzato il programma generarà tre vettori:
1) il primo vettore avrà la prima metà di elementi del vettore scambiati con la seconda metà di elementi del vettore .
    Ad esempio
    1 2 3 4 5 6 7 8 9 10  diventerà  6 7 8 9 10 1 2 3 4 5

2) Il secondo vettore sarà il vettore con gli elementi tutti ribaltati.
    Ad esempio:
    1 2 3 4 5 6 7 8 9 10  diventerà  10 9 8 7 6 5 4 3 2 1

3) Il terzo vettore negli elementi conterrà il valore 1 se il corrispondente elemento del vettore di input è pari, altrimenti conterrà 0
    Ad esempio:
    1 2 5 7 5 6 2 8 9 12  diventerà  0 1 0 0 0 1 1 1 0 1
*/

#include <stdio.h>

#define N 10

int main() {
    int array[N] = {1,2,3,4,5,6,7,8,9,10};
    int i, temp;
    int array1[N], array2[N], array3[N];
    
    for(i=0; i<N; i++){
        if (i < N/2) {
            array1[i] = array[i+N/2];
        } else {
            array1[i] = array[i-N/2];
        }
    }

    for(i=0; i<N; i++){
        array2[i] = array[N-i-1];
    }

    for(i=0; i<N; i++){
        if (array[i] % 2 == 0) {
            array3[i] = 1;
        } else {
            array3[i] = 0;
        }
    }

    printf("Array1: ");
    for(i=0; i<N; i++){
        printf("%d ", array1[i]);
    }
    printf("\n");

    printf("Array2: ");
    for(i=0; i<N; i++){
        printf("%d ", array2[i]);
    }
    printf("\n");

    printf("Array3: ");
    for(i=0; i<N; i++){
        printf("%d ", array3[i]);
    }
    printf("\n");

    return 0;

}