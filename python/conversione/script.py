import mylib

def main():
    numero = int(input("Inserisci un numero: "))
    print("Il numero binario corrispondente è:", mylib.dec2bin(numero))
    print("Il numero esadecimale corrispondente è:", mylib.dec2hex(numero))
    numero = input("Inserisci un numero binario: ")
    print("Il numero decimale corrispondente è:", mylib.bin2dec(numero))
    numero = input("Inserisci un numero esadecimale: ")
    print("Il numero decimale corrispondente è:", mylib.hex2dec(numero))


main()