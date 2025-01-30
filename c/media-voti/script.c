#include <stdio.h>

int main() {
    int voto1, voto2, voto3, voto4, voto5;
    int votiSommati;
    float media;
    printf("Inserisci il primo voto: ");
    scanf("%d", &voto1);
    printf("Inserisci il secondo voto: ");
    scanf("%d", &voto2);
    printf("Inserisci il terzo voto: ");
    scanf("%d", &voto3);
    printf("Inserisci il quarto voto: ");
    scanf("%d", &voto4);
    printf("Inserisci il quinto voto: ");
    scanf("%d", &voto5);
    
    votiSommati = voto1 + voto2 + voto3 + voto4 + voto5;
    media = (float) votiSommati / 5;
    printf("La media dei voti e': %f \n", media);
}