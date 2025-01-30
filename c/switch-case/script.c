#include <stdio.h>

int main() {
    int scelta, i, j, lato;

    printf("1) disegna quadrato pieno\n");
    printf("2) disegna quadrato vuoto\n");
    printf("3) disegna triangolo\n");
    printf("4) disegna quadrato semi-pieno\n");
    printf("-----------------------------\n");

    printf("Inserisci la tua scelta: ");
    scanf("%d", &scelta);
    printf("Inserisci la lunghezza del lato: ");
    scanf("%d", &lato);

    switch (scelta) {
        case 1:
            printf("Hai scelto di disegnare un quadrato pieno\n");
            for ( i = 0; i < lato; i++) {
                for ( j = 0; j < lato; j++) {
                    printf("* ");
                }
                printf("\n");
            }
            break;
        case 2:
            printf("Hai scelto di disegnare un quadrato vuoto\n");
            for ( i = 0; i < lato; i++) {
                for ( j = 0; j < lato; j++) {
                    if (i == 0 || i == lato - 1 || j == 0 || j == lato - 1) {
                        printf("* ");
                    } else {
                        printf("  ");
                    }
                }
                printf("\n");
            }
            break;
        case 3:
            printf("Hai scelto di disegnare un triangolo rettangolo\n");
            for ( i = 0; i < lato; i++) {
                for ( j = 0; j < lato; j++) {
                    if (j <= i) {
                        printf("* ");
                    } else {
                        printf("  ");
                    }
                }
                printf("\n");
            }
            break;
        case 4:
            printf("Hai scelto di disegnare un quadrato semi-pieno (tipo bicchiere)\n");
            for ( i = 0; i < lato; i++) {
                for ( j = 0; j < lato; j++) {
                    if (i == lato - 3 || i == lato - 2 || i == lato - 1 || j == 0 || j == lato - 1) {
                        printf("* ");
                    } else {
                        printf("  ");
                    }
                }
                printf("\n");
            }
            break;
        default:
            printf("Scelta non valida\n");
            break;
    }
}