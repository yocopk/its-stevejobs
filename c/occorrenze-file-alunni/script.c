#include <stdio.h>
#define N 6 // Lunghezza della parola da controllare

int checkWord(char *word, FILE *file) {
    char c;
    int i;

    i = 0;
    while ((c = fgetc(file)) != EOF && i < N) { // Legge i caratteri dal file
        if (c == word[i]) {
            i++; // Incrementa se il carattere corrisponde
        } else {
            i = 0; // Resetta se il carattere non corrisponde
        }
    }

    return i == N; // Restituisce true se l'intera parola è stata trovata
}

int main() {
    FILE *articoloGiornale;
    char parola[N] = "alunni"; // Parola da contare
    int occorrenze;

    articoloGiornale = fopen("articolo_giornale.txt", "r"); // Apre il file in lettura

    if (articoloGiornale == NULL) {
        printf("Errore nell'apertura del file");
        return 1;
    }

    occorrenze = 0;
    while (fgetc(articoloGiornale) != EOF) { // Legge i caratteri dal file
        if (checkWord(parola, articoloGiornale)) {
            occorrenze++; // Incrementa il conteggio se la parola è trovata
        }
    }

    printf("Occorrenze della parola 'alunni': %d\n", occorrenze); // Stampa il conteggio

    fclose(articoloGiornale); // Chiude il file
}
