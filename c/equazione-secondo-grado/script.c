#include <stdio.h>
#include <math.h>

int main() {
    float a, b, c, delta, x1, x2;
    
    printf("Inserisci a: ");
    scanf("%f", &a);
    printf("Inserisci b: ");
    scanf("%f", &b);
    printf("Inserisci c: ");
    scanf("%f", &c);

    delta = (b * b) - (4 * a * c);

    x1 = (-b + sqrt(delta)) / (2 * a);
    x2 = (-b - sqrt(delta)) / (2 * a);

    if (a == 0) {
        printf("Il coefficiente a non puo' essere uguale a 0\n");
        return 0;
    }

    if (delta == 0) {
        printf("L'equazione ha una sola soluzione: %f\n", x1);
        return 0;
    }

    if (delta < 0) {
        printf("L'equazione non ha soluzioni reali\n");
        return 0;
    }
    else {
        printf("Il primo risultato e': %f\n", x1);
        printf("Il secondo risultato e': %f\n", x2);
    }
}