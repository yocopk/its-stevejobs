/*
Creare due matrici che contengono le tabelline una seguendo l'esempio dell'allegato 1 e l'altra seguendo l'esempio dell'allegato 2
*/

#include <stdio.h>

int main(){
    int tabellina1[10][10];
    int tabellina2[10][10];
    int i, j;

    for(i = 0; i < 10; i++){
        for(j = 0; j < 10; j++){
            tabellina1[i][j] = (i+1)*(j+1);
            tabellina2[i][j] = (i+1)*(j+1);
        }
    }

    printf("Tabellina 1\n");
    for(i = 0; i < 10; i++){
        for(j = 0; j < 10; j++){
            printf("%d\t", tabellina1[i][j]);
        }
        printf("\n");
    }

    printf("\nTabellina 2\n");
    for(i = 0; i < 10; i++){
        for(j = 0; j < 10; j++){
            printf("%d\t", tabellina2[j][i]);
        }
        printf("\n");
    }

    return 0;
}