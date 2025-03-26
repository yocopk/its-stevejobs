# Convertire un numero da decimale a binario

def dec2bin(n):
    if n == 0:
        return "0"
    numero = ""
    while n > 0:
        numero = str(n % 2) + numero
        n //= 2
    return numero

def bin2dec(n):
    pot, numero = 1, 0
    for i in n[::-1]:
        if i != "0" and i != "1":
            return "Il numero inserito non è binario"
        numero += int(i) * pot
        pot *= 2
    return numero

def dec2hex(n):
    hexdigits = "0123456789ABCDEF"
    if n == 0:
        return "0"
    numero = ""
    while n > 0:
        numero = hexdigits[n % 16] + numero
        n //= 16
    return numero

def hex2dec(n):
    hexdigits = "0123456789ABCDEF"
    numero = 0
    pot = 1
    for i in n[::-1]:
        if i.upper() not in hexdigits:
                return "Il numero inserito non è esadecimale"
        numero += hexdigits.index(i.upper()) * pot
        pot *= 16
    return numero

def bubbleSort(lista):
    for i in range(len(lista) - 1):
        for j in range(len(lista) - 1, i, -1):
            if lista[j] < lista[j - 1]:
                lista[j], lista[j - 1] = lista[j - 1], lista[j]
    return lista
    
    
