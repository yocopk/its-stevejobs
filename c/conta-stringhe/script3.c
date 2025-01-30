/*
Data una stringa di testo predefinita (anche con spazi multipli, e anche con spazi iniziali e finali) 
scrivere un programma in C in grado di stampare le singole parole individuate nella stringa, una per ogni riga. 
Esempio "Facciamo insieme questo esercizio" stamperà:
Facciamo
insieme
questo
esercizio
*/

#include <stdio.h>

int stampaParole(char stringa[]) {
    int i;

    for (i = 0; stringa[i] != '\0'; i++) {
        if (stringa[i] != ' ') {
            printf("%c", stringa[i]);
        }
        else if (stringa[i + 1] != ' ' && stringa[i + 1] != '\0') {
            printf("\n");
        }
    }
}

int main() {
    char stringa[100] = "   Facciamo insieme questo esercizio    ";
    stampaParole(stringa);
}