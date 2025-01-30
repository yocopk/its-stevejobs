#include <stdio.h>
/*
Il programma richiederà all'operatore la dimensione del lato. 
Successivamente il programma stamperà, tramite una serie di caratteri *, un quadrato pieno e dopo un quadrato vuoto (cioè stamperà solo i lati del quadrato)
*/

int main() {
    int lato, i, j;

    printf("Inserisci la lunghezza del lato del quadrato: ");
    scanf("%d", &lato);

    for (i = 0; i < lato; i++) {
        for (j = 0; j < lato; j++) {
            printf("* ");
        }
        printf("\n");
    }

    printf("--------------------\n");
    
    for(i = 0; i < lato; i++){
        for(j = 0; j < lato; j++){
            if(i == 0 || i == lato - 1 || j == 0 || j == lato - 1){
                printf("* ");
            } else {
                printf("  ");
            }
        }
        printf("\n");
    }

    return 0;
}