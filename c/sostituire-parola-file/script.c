#include <stdio.h>

int replaceWord(char *oldWord, char *newWord, FILE *textFile, FILE *newTextFile) {
    int i, j, match;
    char buffer[1000];

    // Leggi il file riga per riga
    while (fgets(buffer, 1000, textFile) != NULL) {
        // Scorri ogni carattere della riga
        for (i = 0; buffer[i] != '\0'; i++) {
            match = 1;
            // Controlla se la parola vecchia è presente
            for (j = 0; oldWord[j] != '\0'; j++) {
                if (buffer[i + j] != oldWord[j]) {
                    match = 0;
                    break;
                }
            }
            // Se la parola vecchia è trovata, sostituiscila con la nuova parola
            if (match) {
                fputs(newWord, newTextFile);
                i += j - 1;
            } else {
                fputc(buffer[i], newTextFile);
            }
        }
    }

    return 0;
}

int main() {
    int i, j, match;
    char buffer[1000];
    char oldWord[] = "alunni"; // Parola da sostituire
    char newWord[] = "allievi"; // Parola con cui sostituire

    FILE *textFile = fopen("articolo_giornale.txt", "r"); // Apri il file originale per la lettura
    FILE *newTextFile = fopen("articolo_giornale_new.txt", "w"); // Apri un nuovo file per la scrittura
    if (textFile == NULL) {
        printf("Errore nell'apertura dei file\n");
        return 1;
    }

    replaceWord(oldWord, newWord, textFile, newTextFile); // Sostituisci la parola

    fclose(textFile); // Chiudi il file originale
    fclose(newTextFile); // Chiudi il nuovo file

    printf("Operazione completata\n");

    return 0;
}