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

    acc = 0;
    for (i = 0; stringa[i] != '\0'; i++) {
        if (stringa[i] == ' ') {
            acc++;
        }
    }
    
    return acc + 1;
}

int main() {
    char stringa[100] = "oggi \x8a una bella giornata";
    int lunghezza = strLength(stringa);
    int parole = wordCount(stringa);

    printf("La stringa iniziale \x8a: \"%s\"\n", stringa);
    printf("La stringa ha %d parole ed \x8a lunga %d caratteri.\n", parole, lunghezza);

    for (int i = 0; stringa[i] != '\0'; i++) {
        switch (stringa[i]) {
            case 'a':
                stringa[i] = 'e';
                break;
            case 'e':
                stringa[i] = 'i';
                break;
            case 'i':
                stringa[i] = 'o';
                break;
            case 'o':
                stringa[i] = 'u';
                break;
            case 'u':
                stringa[i] = 'a';
                break;
        }
    }

    printf("La stringa modificata \x8a: \"%s\"\n", stringa);
}