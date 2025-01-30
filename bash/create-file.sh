# Programma per creare un file di testo
clear
while true; do
    echo "Inserisci il nome del file da creare: "
    read fileName
    if [ -f $fileName ]; then
        echo "Il file esiste già."
    else
        break
    fi
done
echo "Inserisci il testo da scrivere nel file (digita 'fine' per completare): "
while true; do
    read line
    if [ "$line" == "fine" ]; then
        break
    else
        echo $line >> $fileName
    fi
done
# Mostra il contenuto del file e conta le righe, le parole e i caratteri
echo "Contenuto del file: "
cat $fileName
lines=$(wc -l < $fileName)
words=$(wc -w < $fileName)
chars=$(wc -m < $fileName)
echo "Il file contiene $lines righe, $words parole e $chars caratteri."
sleep 3
echo "Il file è stato creato con successo."
# Creiamo un file copia del file appena creato
clear
echo "Inserisci il nome del file copiato: "
read copyFile
cp $fileName $copyFile
echo "Il file è stato copiato con successo."
sleep 2
# Rinominiamo il file originale
clear
echo "Inserisci il nuovo nome del file originale: "
read newFileName
mv $fileName $newFileName
echo "Il file è stato rinominato con successo."
sleep 2
# Eliminiamo il file copiato
echo "Vuoi eliminare il file copiato? (s/n): "
read response
if [ "$response" == "s" ]; then
    rm $copyFile
    echo "Il file copiato è stato eliminato con successo."
else
    echo "Il file copiato non è stato eliminato."
fi
sleep 2
# Fine del programma
clear
echo "Grazie per aver utilizzato il programma."
