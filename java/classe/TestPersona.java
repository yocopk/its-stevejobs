class Persona {
String nome;
int eta;
public Persona(String nome, int eta) {
this.nome = nome;
this.eta = eta;
}
public void saluta() {
System.out.println("Ciao, mi chiamo " + nome + " e ho " + eta + " anni.");
}
}
public class TestPersona {
public static void main(String[] args) {
Persona persona1 = new Persona("Marco", 25);
persona1.saluta();
}
}