echo "Inserisci il percorso del file da leggere: "
read txt_file
if [ ! -f $txt_file ]; then
    echo "Il file non esiste."
    exit 1
fi
content=$(<"$txt_file")
echo "Contenuto del file: $content"
sleep 2
# Salva il contenuto in un nuovo file .sh
echo "Premi INVIO per salvare il contenuto del file in un nuovo file .sh"
read
echo "$content" > newfile.sh 
chmod +x newfile.sh
echo "Il file è stato salvato con successo."
echo "Eseguo il nuovo file..."
sleep 2
./newfile.sh