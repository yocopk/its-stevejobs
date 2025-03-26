import random

# Lista di città
cities = ["Roma", "Milano", "Napoli", "Torino", "Venezia", "Palermo", "Genova", "Bologna", "Firenze", "Bari"]

# Dizionario per memorizzare i numeri associati a ciascuna città
lotto_numbers = {}

#premi
def calcola_premio(puntata, numeriIndovinati):
    match (len(numeriIndovinati)):
        case 0:
            return 0
        case 2:
            return puntata * 12.4
        case 3:
            return puntata * 120.4
        case 4:
            return puntata * 1011.2
        case 5:
            return puntata * 102332.4
        case _:
            return 0
    

# Genera 5 numeri casuali per ciascuna città
for city in cities:
    lotto_numbers[city] = random.sample(range(1, 91), 10)

numeriUtente = []
index = 1
while len(numeriUtente) < 5:
    input_num = input("Inserisci il " + str(index) + "° numero: ")
    if input_num.isdigit():
        input_num = int(input_num)
        if input_num in numeriUtente:
            print("Hai già inserito questo numero, scegli un altro numero.")
        elif input_num < 1 or input_num > 90:
            print("Il numero deve essere compreso tra 1 e 90")
        else:
            numeriUtente.append(input_num)
            index += 1
    else:
        print("Non hai inserito un numero")

# Stampa i numeri inseriti dall'utente
print("I numeri inseriti sono: ", numeriUtente)

# Utente sceglie una o più città o tutte le città
print("_________________________________________________________")
print("Città disponibili: ", cities)
print("_________________________________________________________")
while True:
    city_choice = input("Scegli una o più città tra quelle sopra (separate da virgola) o scrivi 'tutte' per giocare tutte le ruote: ")
    if city_choice == "tutte":
        selected_cities = cities
        break
    else:
        selected_cities = [city.strip() for city in city_choice.split(",") if city.strip() in cities]
        if selected_cities:
            break
        else:
            print("Nessuna città valida inserita, riprova.")

# Scegli puntata
while True:
    puntata = input("Inserisci la tua puntata: ")
    if puntata.isnumeric():
        puntata = int(puntata)
        break
    else:
        print("Non hai inserito un numero")

# Stampa i numeri del lotto per ciascuna città
print("_________________________________________________________")
for city, numbers in lotto_numbers.items():
    print(f"{city}: {numbers}")

print("_________________________________________________________")

# Verifica se i numeri inseriti dall'utente corrispondono a quelli del lotto per le città scelte
if selected_cities:
    for city in selected_cities:
        numbers = lotto_numbers[city]
        numeriIndovinati = [num for num in numeriUtente if num in numbers]
        lenNumeriIndovinati = len(numeriIndovinati)
        match (lenNumeriIndovinati):
            case 0:
                print("Nessun numero indovinato nella città di", city)
            case 2:
                print(f"Ambo! Hai indovinato i seguenti numeri: {numeriIndovinati} nella città di {city} ed hai vinto €{calcola_premio(puntata, numeriIndovinati)}")
            case 3:
                print(f"Terno! Hai indovinato i seguenti numeri: {numeriIndovinati} nella città di {city} ed hai vinto €{calcola_premio(puntata, numeriIndovinati)}")
            case 4:
                print(f"Quaterna! Hai indovinato i seguenti numeri: {numeriIndovinati} nella città di {city} ed hai vinto €{calcola_premio(puntata, numeriIndovinati)}")
            case 5:
                print(f"Cinquina! Hai indovinato i seguenti numeri: {numeriIndovinati} nella città di {city} ed hai vinto €{calcola_premio(puntata, numeriIndovinati)}")
            case _:
                print("Meh ritenta.")
else:
    print("Città non presente")

