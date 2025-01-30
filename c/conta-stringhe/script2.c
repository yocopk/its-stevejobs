/*
Data una stringa prefissata creare una funzione che conta le parole considerando le seguenti eccezioni:
1) la stringa può contenere spazi multipli
2) la stringa può avere uno spazio iniziale
3) la stringa può avere lunghezza nulla
4) la striga può avere spazi in coda
*/

#include <stdio.h>


int strLength(char stringa[]) {
    int i, acc;

    acc = 0;
    for (i = 0; stringa[i] != '\0'; i++) {
        if (stringa[i] != ' ') {
            acc++;
        }
    }

    return acc;
}

int wordCount(char stringa[]) {
    int i, acc;
    int len = strLength(stringa);

    acc = 0;
    if (len == 0) {
        return 0;
    }

    for (i = 0; stringa[i] != '\0'; i++) {
        if (i == 0 && stringa[i] != ' ') {
            acc++;
        }
        if (i > 0 && stringa[i] != ' ' && stringa[i-1] == ' ') {
            acc++;
        }
    }
    
    return acc;
}

int main() {
    char stringa[100] = " ciao come stai";
    int parole = wordCount(stringa);

    if (parole == 0) {
        printf("La stringa \x8a vuota.\n");
    } else {
        printf("La stringa iniziale \x8a: \"%s\"\n", stringa);
        printf("La stringa ha %d parole.\n", parole);
    }
   
}