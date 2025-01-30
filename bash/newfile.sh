# Funzione per l'addizione
function addizione() {
clear
echo "Inserisci il numero di valori da sommare: "
read n
sum=0
for (( i=1; i<=$n; i++ ))
do
while true; do
    echo "Inserisci il numero $i: "
    read num
    if [[ "$num" =~ ^[0-9]$ ]]; then
        break
    else
        echo "Inserisci un numero valido (0-9)."
    fi
done
sum=$((sum+num))
done
echo "Il risultato dell'addizione è: $sum"
sleep 2
}

# Funzione per la sottrazione
function sottrazione() {
clear
echo "Inserisci il numero di valori da sottrarre: "
read n
sum=0
for (( i=1; i<=$n; i++ ))
do
while true; do
    echo "Inserisci il numero $i: "
    read num
    if [[ "$num" =~ ^[0-9]$ ]]; then
        break
    else
        echo "Inserisci un numero valido (0-9)."
    fi
done
if [ $i -eq 1 ]; then #se il numero messo è il primo, lo assegno a sum
sum=$num
else
sum=$((sum-num))
fi
done
echo "Il risultato della sottrazione è: $sum"
sleep 2
}

# Funzione per la moltiplicazione
function moltiplicazione() {
clear
echo "Inserisci il numero di valori da moltiplicare: "
read n
sum=1
for (( i=1; i<=$n; i++ ))
do
while true; do
    echo "Inserisci il numero $i: "
    read num
    if [[ "$num" =~ ^[0-9]$ ]]; then
        break
    else
        echo "Inserisci un numero valido (0-9)."
    fi
done
sum=$((sum*num))
done
echo "Il risultato della moltiplicazione è: $sum"
sleep 2
}

# Funzione per la divisione
function divisione() {
clear
while true; do
    echo "Inserisci il dividendo: "
    read dividendo
    if [[ "$dividendo" =~ ^[0-9]$ ]]; then
        break
    else
        echo "Inserisci un numero valido (0-9)."
    fi
done
while true; do
    echo "Inserisci il divisore: "
    read divisore
    if [[ "$divisore" =~ ^[0-9]$ ]]; then
        break
    else
        echo "Inserisci un numero valido (0-9)."
    fi
done
result=$((dividendo/divisore))
echo "Il risultato della divisione è: $result"
sleep 2
}

function menu() {
clear
# Ciclo principale del programma
while true
do
echo "Schegli un'operazione da eseguire."
echo "1) Addizione"
echo "2) Sottrazione"
echo "3) Moltiplicazione"
echo "4) Divisione"
read -p "Inserisci la tua scelta(1-4):" operazione

# Controllo dell'input per validità
if [[ "$operazione" =~ ^[1-4]$ ]]; then
case $operazione in
1)addizione
;;
2)sottrazione
;;
3)moltiplicazione
;;
4)divisione
;;
esac
else
echo "Scelta non valida. Inserisci un numero tra 1 e 2."
sleep 2
fi
done
}
menu
