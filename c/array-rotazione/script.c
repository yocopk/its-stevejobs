/*
All'operatore verrà richiesto di inserire un vettore di 5 elementi  (utilizzare il #define)
Dopo si presenterà un menù che proporrà:
1) Rotazione a destra del vettore
2) Rotazione a sinistra del vettore
3) Uscita

La rotazione a destra funziona che tutti gli elementi del vettore scorrono di una posizione verso destra (verso l'indice più elevato). Il valore che c'era inizialmente nell'indice più elevato verrà riportato nel valore con indice 0.

La rotazione a sinistra funziona che tutti gli elementi del vettore scorrono di una posizione verso sinistra (verso l'indice più basso). Il valore che c'era inizialmente nell'indice 0 verrà riportato nel valore con indice più alto. 

Ogni volta che si fa la scelta 1) o 2) si stamperà il vettore ruotato

esempio:
 -  dato il vettore [ 1, 2, 3, 4, 5 ]  se si selezione rotazione a destra diventa  [5, 1, 2, 3, 4]
 -  dato il vettore [ 1, 2, 3, 4, 5 ]  se si selezione rotazione a sinistra diventa  [2, 3, 4, 5, 1]
*/

#include <stdio.h>
#define N 5

int main(){
    int array[N] = {};
    int i, scelta, temp;
    for(i=0; i<N; i++){
        printf("Inserisci il %d valore: ", i+1);
        scanf("%d", &array[i]);
    }
    do{
        printf("\n");
        printf("1) Rotazione a destra del vettore \n");
        printf("2) Rotazione a sinistra del vettore \n");
        printf("3) Uscita \n");
        printf("\n");
        printf("Vettore: \n");
        for(i=0; i<N; i++){
            if (i == 0 ) {
                printf("%d", array[i]);
            } else {
                printf(", %d", array[i]);
            }
        }
        printf("\n------------------------------------\n");
        printf("Scelta: ");
        scanf("%d", &scelta);
        switch(scelta){
            case 1:
                temp = array[N-1];
                for(i=N-1; i>0; i--){
                    array[i] = array[i-1];
                }
                array[0] = temp;
                break;
            case 2:
                temp = array[0];
                for(i=0; i<N-1; i++){
                    array[i] = array[i+1];
                }
                array[N-1] = temp;
                break;
            case 3:
                break;
            default:
                printf("Scelta non valida\n");
        } 
        
        printf("Vettore modificato: \n");
        for(i=0; i<N; i++){
            if (i == 0) printf("%d", array[i]);
            else printf(", %d", array[i]);
        }
        printf("\n");

    } while (scelta != 3);
}