# Modifca i permessi di un file.
clear
echo "Inserisci il percorso del file di cui vuoi modificare i permessi: "
read file
if [ ! -f $file ]; then
    echo "Il file non esiste."
    exit 1
fi
echo "I permessi del file sono: "
ls -l $file
sleep 2
while true; do
    echo "Inserisci i permessi per l'utente (0-7): "
    read user
    if [[ "$user" =~ ^[0-7]$ ]]; then
        break
    else
        echo "Inserisci un numero valido (0-7)."
    fi
done

while true; do
    echo "Inserisci i permessi per il gruppo (0-7): "
    read group
    if [[ "$group" =~ ^[0-7]$ ]]; then
        break
    else
        echo "Inserisci un numero valido (0-7)."
    fi
done

while true; do
    echo "Inserisci i permessi per gli altri (0-7): "
    read others
    if [[ "$others" =~ ^[0-7]$ ]]; then
        break
    else
        echo "Inserisci un numero valido (0-7)."
    fi
done
newPerms=$user$group$others
chmod $newPerms $file
echo "Permessi inseriti: $newPerms"
sleep 2
echo "I nuovi permessi del file sono: "
ls -l $file
sleep 2
echo "I permessi del file sono stati modificati con successo."