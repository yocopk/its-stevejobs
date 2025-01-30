#include <stdio.h>
#include <math.h>

int main() {
    int base;
    int altezza;
    int area;
    int perimetro;
    
    printf("Inserisci la base del rettangolo: ");
    scanf("%d", &base);
    
    printf("Inserisci l'altezza del rettangolo: ");
    scanf("%d", &altezza);

    area = base * altezza;
    
    perimetro = (float) round(2 * (base + altezza));

    printf("L'area del rettangolo e': %d\n", area);
    
    printf("Il perimetro del rettangolo e': %d\n", perimetro);
}
