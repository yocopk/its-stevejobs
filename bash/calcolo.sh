clear
echo "Quanti valori vuoi sommare?"
read n
somma=0
for (( i=1; i<=n; i++))
do
echo "Inserisci il valore $i:"
read val
somma=$((somma + val))
done
echo "Risultato dell'addizione: $somma"
read -p "Premi un tasto per continuare..."

