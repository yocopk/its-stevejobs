#include <stdio.h>

int main(){
    int a;
    int b;
    int tentativi = 5;

    do {
        printf("Operatore 1: Inserisci un numero compreso tra 1 e 9: ");
        scanf("%d", &a);
        if (a < 1 || a > 9){
            printf("Numero errato.");
        }
    } while (a < 1 || a > 9);
        
        

    do {
        printf("Operatore 2: Indovina il numero: ");
        scanf("%d", &b);

        if (a == b){
            printf("Hai indovinato!");
            break;
        }
        else if(tentativi <= 1){
            printf("Hai superato il limite.");
            break;
        }
        else{
            printf("Ritenta.\n");
            tentativi--;
            printf("Numero di tentativi rimasti: %d \n", tentativi);
        }
    }
     while (a != b);
}