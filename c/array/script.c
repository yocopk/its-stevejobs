/*
All'operatore verrà richiesto di inserire 5 valori interi (che verranno memorizzati in un vettore).
Il programma stamperà orizzontalmente il vettore.
In seguito restituirà il valore Max, Min indicando le relative posizioni di inserimento
Infine stamperà il valore calcolato della Media
*/

#include <stdio.h>
int main(){
    #define N 5
    int array[N] = {};
    int i, max, min, somma, media, posMax, posMin;
    for(i=0; i<N; i++){
        printf("Inserisci il %d valore: ", i+1);
        scanf("%d", &array[i]);
    } 
    printf("Array: ");
    for(i=0; i<N; i++){
        if (i == 0) printf("%d", array[i]);
        else printf(", %d", array[i]);
    }

    max = array[0];
    min = array[0];
    somma = 0;
    posMax = 0;
    posMin = 0;

    for(i=0; i<N; i++){
        if(array[i] > max){
            max = array[i];
            posMax = i;
        }
        if(array[i] < min){
            min = array[i];
            posMin = i;
        }
        somma += array[i];
    }
    media = somma/N;
    printf("\nMax: %d, Posizione: %d \nMin: %d, Posizione: %d\n", max, posMax, min, posMin);
    printf("Media: %.2f\n", (float)media);
}