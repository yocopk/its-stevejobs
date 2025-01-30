/*
Dato un vettore precaricato di 10 elementi (si usi il #define N 10) si vuole generare il vettore calcolato come segue:
-ogni elemento del vettore calcolato è la media i 5 elementi
-l’elemento i-esimo è dato dalla media dei seguenti 5 elementi: vett[i-2] vett[i-1] vett[i] vett[i+1] vett[i+2]
-gli elementi che sono fuori dal vettore sono da considerarsi nulli
Si pensi il programma per N generico
*/

#include <stdio.h>
#define N 10

int main(){
    int vett[N] = {7, 5, 2, 6, 5, 1, 0, 5, 9, 1};
    float vettMedia[N] = {0};
    float dividendo = 5;
    int i;

    for( i = 0; i < N; i++){
        if(i >= 2 && i < N-2){
            vettMedia[i] = (vett[i-2] + vett[i-1] + vett[i] + vett[i+1] + vett[i+2]) / dividendo;
        } else if (i == 0){
            vettMedia[i] = (vett[i] + vett[i+1] + vett[i+2]) / dividendo;
        } else if (i == 1){
            vettMedia[i] = (vett[i-1] + vett[i] + vett[i+1] + vett[i+2]) / dividendo;
        } else if (i == N-2){
            vettMedia[i] = (vett[i-2] + vett[i-1] + vett[i] + vett[i+1]) / dividendo;
        } else if (i == N-1){
            vettMedia[i] = (vett[i-2] + vett[i-1] + vett[i]) / dividendo;
        }
    }

    for( i = 0; i < N; i++){
        printf("%.2f ", vettMedia[i]);
    }

}