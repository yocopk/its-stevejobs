#include <stdio.h>
#include <math.h>

int main(){
    int a, b, scelta, temp;

    while (1){
        printf("1) Calcolare la media di due valori\n");
        printf("2) Scambiare i due valori memorizzati nelle variabili\n");
        printf("3) Dati i due valori dei cateti di un triangolo rettangolo, calcolare il valore dell'ipotenusa\n");
        printf("4) Dati due valori verificare se sono uguali altrimenti indicare il maggiore dei due.\n"); // se la scelta è errata si ripresenta il menu
        printf("Inserisci la tua scelta: ");
        scanf("%d", &scelta);
        if (scelta >= 1 && scelta <= 4){
            printf("Inserisci primo valore: ");
            scanf("%d", &a);
            temp = a;
            printf("Inserisci secondo valore: ");
            scanf("%d", &b);
            break;
        }
        else if (scelta == 'a'){
            printf("Hai scelto di uscire\n");
            return 0;
        }
        else {
            printf("Scelta non valida\n");
        }
    }

    switch (scelta){
        case 1:
            printf("Hai scelto di calcolare la media di due valori\n");
            printf("La media \x8a: %d\n", (a+b)/2);
            break;
        case 2:
            printf("Hai scelto di scambiare i due valori\n");
            a = b;
            b = temp;
            printf("Il primo valore \x8a: %d\n", a);
            printf("Il secondo valore \x8a: %d\n", b);
            break;
        case 3:
            printf("Hai scelto di calcolare l'ipotenusa\n");
            printf("L'ipotenusa \x8a: %f\n", sqrt(a*a+b*b));
            break;
        case 4:
            printf("Hai scelto di verificare se i due valori sono uguali\n");
            if (a == b){
                printf("I due valori sono uguali\n");
            } else {
                printf("Il maggiore \x8a: %d\n", a > b ? a : b);
            }
            break;
        default:
            printf("Scelta non valida\n");
    }
}