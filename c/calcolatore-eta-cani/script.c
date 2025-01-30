#include <stdio.h>

int main() {
    int anni;
    int eta;
    int eta_cani;
    printf("Inserisci il numero di anni: ");
    scanf("%d", &anni);
    eta = 21 - anni;
    eta_cani = eta * 7;
    printf("La tua eta' corrisponde a %d cani\n", eta_cani);
}