#include <stdio.h>
#include <string.h>

int main() {
    FILE *fileNomi;
    FILE *fileCognomi;
    FILE *fileNomiCognomi;
    char nome[100];
    char cognome[100];

    fileNomi = fopen("nomi.txt", "r");
    fileCognomi = fopen("cognomi.txt", "r");
    fileNomiCognomi = fopen("nomi-cognomi.txt", "w");

    if (fileNomi == NULL || fileCognomi == NULL || fileNomiCognomi == NULL) {
        printf("Errore nell'apertura dei file");
        return 1;
    }

    while (fgets(nome, 100, fileNomi) != NULL && fgets(cognome, 100, fileCognomi) != NULL) {
        if (nome[strlen(nome) - 1] == '\n') {
            nome[strlen(nome) - 1] = '\0';
        }

        fprintf(fileNomiCognomi, "%s %s\n", nome, cognome);
    }

    fclose(fileNomi);
    fclose(fileCognomi);
    fclose(fileNomiCognomi);
}