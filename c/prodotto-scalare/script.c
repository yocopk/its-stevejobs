#include <stdio.h>
#define N 3

int sommaVettori(int v1[], int v2[]) {
    int somma = 0;
    for (int i = 0; i < N; i++) {
        somma += v1[i] + v2[i];
    }
    return somma;
}

int prodottoScalare(int v1[], int v2[]) {
    int prodotto = 0;
    int acc = 0;
    for (int i = 0; i < N; i++) {
        prodotto += v1[i] * v2[i];
        acc += prodotto;
    }
    return prodotto;
}

int main() {
    int v1[N] = {3, 2, 4};
    int v2[N] = {8, 9, 4};
    printf("Somma vettori: %d\n", sommaVettori(v1, v2));
    printf("Prodotto scalare: %d\n", prodottoScalare(v1, v2));
    return 0;
}