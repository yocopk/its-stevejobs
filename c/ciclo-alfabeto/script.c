#include <stdio.h>

int main() {
    char c;
    char a;

    printf("Alfabeto minuscolo o maiuscolo? inserisci a/A: ");
    scanf(" %c", &a);

    if (a == 'a') {
        for (c = 'a'; c <= 'z'; c++) {
            printf(" %c", c);
        }
    } else if (a == 'A') {
        for (c = 'A'; c <= 'Z'; c++) {
            printf(" %c", c);
        }
    } else {
        printf("Input non valido. Inserisci 'a' o 'A'.\n");
    }

    return 0;
}