#!/bin/bash

aggiungi_libri() {
    clear
    while true; do
        clear
        echo "Inserisci il numero di libri da aggiungere: "
        read numLibri
        if [[ $numLibri =~ ^[0-9]+$ ]]; then
            break
        else
            echo "Numero non valido."
            sleep 1
        fi
    done
    declare -a libri
    for ((i = 0; i < numLibri; i++)); do
        num=$((i + 1)) # Numero del libro
        while true; do
            echo "Inserisci il titolo del $num° libro: "
            read titolo
            while [[ ! $titolo =~ ^[a-zA-Z0-9\ ]+$ ]]; do # Solo lettere, numeri e spazi
                echo "Inserisci un titolo valido (solo lettere, numeri e spazi): "
                read titolo
            done
            echo "Inserisci l'autore del libro: "
            read autore
            while [[ ! $autore =~ ^[a-zA-Z\ ]+$ ]]; do # Solo lettere e spazi
                echo "Inserisci un autore valido (solo lettere e spazi): "
                read autore
            done
            if grep -qF "$titolo, $autore" archivio_libri.txt; then # Controllo se titolo e autore sono già presenti nell'archivio
                echo "Il libro con titolo '$titolo' e autore '$autore' è già presente nell'archivio. Reinserisci i dati."
            else
                break
            fi
        done
        echo "Inserisci l'anno di pubblicazione: "
        read anno
        currentYear=$(date +"%Y") # Anno corrente
        while [[ ! $anno =~ ^[0-9]{4}$ || $anno > $currentYear ]]; do # 4 cifre e che non sia superiore all'anno corrente
            echo "Inserisci un anno valido (4 cifre e non superiore all'anno corrente): "
            read anno
        done
        libri+=("$titolo, $autore, $anno") # Aggiungi libro all'array
    done
    # Creazione file archivio se non esiste
    if [ ! -f archivio_libri.txt ]; then
        touch archivio_libri.txt
    fi
    # Controllo duplicati
    for libro in "${libri[@]}"; do
        if grep -qF "$libro" archivio_libri.txt; then
            echo "Il libro '$libro' è già presente nell'archivio."
        else
            echo "- $libro" >>archivio_libri.txt
        fi
    done
    if [ ${#libri[@]} -eq 1 ]; then
        echo "Libro aggiunto con successo!"
    else
        echo "Libri aggiunti con successo!"
    fi
    sleep 2
}

# Funzione per cercare un libro per titolo o autore
cerca_libro() {
    clear
    echo "Inserisci una parola chiave (titolo o autore): "
    read keyword
    if grep -qF "$keyword" archivio_libri.txt; then
        echo "Libro trovato:"
        grep -i "$keyword" archivio_libri.txt
    else
        echo "Nessun libro trovato."
    fi
    sleep 2
}

# Funzione per visualizzare tutti i libri presenti nell'archivio
visualizza_libri() {
    clear
    if [ -s archivio_libri.txt ]; then # Se il file non è vuoto
        echo "Libri presenti nell'archivio:"
        cat archivio_libri.txt
    else
        echo "Nessun libro presente nell'archivio."
    fi
    sleep 3
}

# Funzione per ottimizzare l'archivio
ottimizza_archivio() {
    clear
    sort -t, -k3 -n archivio_libri.txt | uniq >temp.txt
    mv temp.txt archivio_libri.txt
    echo "Archivio ottimizzato con successo!"
    sleep 2
}

# Funzione per eliminare l'archivio (just for fun)
formatta_archivio() {
    clear
    echo "Sei sicuro di voler formattare l'archivio? (s/n): "
    read response
    if [ "$response" == "s" ]; then
        clear
        echo "Ne sei proprio sicuro? (s/n): "
        read response2
        if [ "$response2" == "s" ]; then
            : > archivio_libri.txt # Cancella il contenuto del file
            echo "Archivio formattato con successo!"
            sleep 2
            break
            fi
    else
        break
    fi
}

# Main
while true; do
    clear
    echo "---------------------------------"
    echo "Benvenuto nell'archivio libri!"
    echo "1. Aggiungi un libro"
    echo "2. Cerca un libro"
    echo "3. Visualizza tutti i libri"
    echo "4. Ottimizza archivio"
    echo "5. Esci"
    echo "---------------------------------"
    echo "555. Formatta archivio (ATTENZIONE!)"
    echo "---------------------------------"
    echo "Scelta: "
    read scelta
    case $scelta in
    1)
        aggiungi_libri
        ;;
    2)
        cerca_libro
        ;;
    3)
        visualizza_libri
        ;;
    4)
        ottimizza_archivio
        ;;
    5)
        clear
        echo "Arrivederci!"
        break
        ;;
    555)
        clear
        formatta_archivio
        ;;
    *)
        clear
        echo "Scelta non valida."
        sleep 2
        ;;
    esac
done