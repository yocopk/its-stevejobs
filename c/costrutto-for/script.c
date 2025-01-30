#include <stdio.h>

int main (){
    int i, max, min, a;

    for (i = 0; i < 8; i++){
        
        printf("Inserisci il %d numero: ", i+1);
        scanf("%d", &a);

        if( i == 0){
            max = a;
            min = a;
        }

        if (a > max){
            max = a;
        }
        if (a < min){
            min = a;
        }
    }   

    printf("Numero maggiore: %d \n", max);
    printf("Numero minore: %d", min);

    return 0;
}