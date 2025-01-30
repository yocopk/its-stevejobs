// Il programma chiede all'operatore di inserire 3 interi.
// Il programma deve indicare il valore del numero massimo tra quelli inseriti

#include <stdio.h>

int main() {
    int a, b, c, max;


    printf("Inserisci a: ");
    scanf("%d", &a);
    printf("Inserisci b: ");
    scanf("%d", &b);
    printf("Inserisci c: ");
    scanf("%d", &c);

    if (a > b && a > c) {
        max = a;
    }
    else if (b > a && b > c) {
        max = b;
    }
    else {
        max = c;
    }

    printf("Il numero massimo e': %d\n", max);
}