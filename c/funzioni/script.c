/*
Scrivere un programma che utilizzi le funzioni per il calcolo della media, del minino e del massimo. 
Il programma chiederà di inserire 5 valori che verranno memorizzati in un vettore.
Successivamente verrà proposto il seguente menù:

1) Calcola Media
2) Calcola Minino
3) Calcola Massimo
4) Esci

Effettuando la scelta il programma richiamerà la funzione relativa e stamperà il risultato e ripresenterà il menù
*/

#include <stdio.h>;
#define N 5

float media(int vett[]) {
    int i;
    int acc = 0;
    float somma;

    for( i = 0; i < N; i++) {
        acc += vett[i];
    }

    somma = (float)acc / N;

    return somma;
}

int massimo(int vett[]) {
    int i;
    int max = 0;

    for ( i = 0; i < N; i++){

        if (vett[i] > max ) {
            max = vett[i];
        }
    }

    return max;
}

int minimo(int vett[]) {
    int i, min;

    for ( i = 0; i < N; i++){
        if ( i == 0 ){
            min = vett[i];
        }
        if (vett[i] < min ) {
            min = vett[i];
        }
    }

    return min;
}

int main(){
    int vett[N];
    int i;
    int scelta;
    int risultato;

    do{
        for ( i = 0; i < N; i++){
            printf("Inserisci il %d valore: ", i+1);
            scanf("%d", &vett[i]);
        }

        printf("1) Calcola Media\n");
        printf("2) Calcola Minimo\n");
        printf("3) Calcola Massimo\n");
        printf("4) Esci\n");
        printf("Scegli un'opzione: ");
        scanf("%d", &scelta);

        switch (scelta){
            case 1:
                risultato = media(vett);
                printf("La media e': %.2f\n", (float)risultato);
                break;
            case 2:
                risultato = minimo(vett);
                printf("Il minimo e': %d\n", risultato);
                break;
            case 3:
                risultato = massimo(vett);
                printf("Il massimo e': %d\n", risultato);
                break;
            case 4:
                break;
            default:
                printf("Scelta non valida\n");
        } 
    } while (scelta != 4);
}



