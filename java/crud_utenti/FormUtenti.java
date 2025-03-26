package crud_utenti;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.util.ArrayList;
import java.util.regex.Pattern;
// Classe Utente per memorizzare i dati
class Utente implements Serializable {
private String nome;
private String cognome;
private String email;
private int eta;
public Utente(String nome, String cognome, String email, int eta) {
this.nome = nome;
this.cognome = cognome;
this.email = email;
this.eta = eta;
}
public String getNome() {
return nome;
}
public String getCognome() {
return cognome;
}
public String getEmail() {
return email;
}
public int getEta() {
return eta;
}
@Override
public String toString() {
return nome + " " + cognome + " - " + email + " - Età: " + eta;
}
}

// Classe principale con l'interfaccia grafica
public class FormUtenti {
private JFrame frame;
private JTextField txtNome, txtCognome, txtEmail, txtEta;
private JTextArea txtAreaUtenti;
private ArrayList<Utente> listaUtenti;
private static final String FILE_UTENTI = "utenti.dat";
public FormUtenti() {
listaUtenti = caricaUtentiDaFile(); // Carica utenti da file all'avvio
// Creazione della finestra
frame = new JFrame("Registrazione Utenti");
frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
frame.setSize(450, 400);
frame.setLayout(new GridLayout(6, 2, 5, 5));
// Creazione dei componenti
JLabel lblNome = new JLabel("Nome:");
txtNome = new JTextField();
JLabel lblCognome = new JLabel("Cognome:");
txtCognome = new JTextField();
JLabel lblEmail = new JLabel("Email:");
txtEmail = new JTextField();
JLabel lblEta = new JLabel("Età:");
txtEta = new JTextField();
JButton btnRegistrati = new JButton("Registra Utente");
JButton btnElimina = new JButton("Elimina Utente");
txtAreaUtenti = new JTextArea();
txtAreaUtenti.setEditable(false);
// Aggiunta dell'azione al pulsante "Registra Utente"
btnRegistrati.addActionListener(new ActionListener() {
@Override
public void actionPerformed(ActionEvent e) {
registraUtente();
}
});
// Aggiunta dell'azione al pulsante "Elimina Utente"
btnElimina.addActionListener(new ActionListener() {
@Override
public void actionPerformed(ActionEvent e) {
eliminaUtente();
}
});

// Aggiunta dei componenti alla finestra
frame.add(lblNome);
frame.add(txtNome);
frame.add(lblCognome);
frame.add(txtCognome);
frame.add(lblEmail);
frame.add(txtEmail);
frame.add(lblEta);
frame.add(txtEta);
frame.add(btnRegistrati);
frame.add(btnElimina);
frame.add(new JLabel("Utenti registrati:"));
frame.add(new JScrollPane(txtAreaUtenti));
aggiornaListaUtenti(); // Aggiorna la visualizzazione della lista utenti
frame.setVisible(true);
}
// Metodo per registrare un utente
private void registraUtente() {
String nome = txtNome.getText().trim();
String cognome = txtCognome.getText().trim();
String email = txtEmail.getText().trim();
String etaStr = txtEta.getText().trim();
// Validazione: campi non vuoti
if (nome.isEmpty() || cognome.isEmpty() || email.isEmpty() || etaStr.isEmpty()) {
JOptionPane.showMessageDialog(frame, "Tutti i campi sono obbligatori!", "Errore",
JOptionPane.ERROR_MESSAGE);
return;
}
// Validazione: età deve essere un numero intero positivo
int eta;
try {
eta = Integer.parseInt(etaStr);
if (eta < 0) throw new NumberFormatException();
} catch (NumberFormatException e) {
JOptionPane.showMessageDialog(frame, "Inserisci un'età valida!", "Errore",
JOptionPane.ERROR_MESSAGE);
return;
}
// Validazione email
if (!validaEmail(email)) {
JOptionPane.showMessageDialog(frame, "Email non valida!", "Errore",
JOptionPane.ERROR_MESSAGE);
return;
}

// Creazione e salvataggio dell'utente
Utente nuovoUtente = new Utente(nome, cognome, email, eta);
listaUtenti.add(nuovoUtente);
salvaUtentiSuFile();
aggiornaListaUtenti();
// Pulizia dei campi
txtNome.setText("");
txtCognome.setText("");
txtEmail.setText("");
txtEta.setText("");
}
// Metodo per validare l'email con un'espressione regolare
private boolean validaEmail(String email) {
String regexEmail = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
return Pattern.matches(regexEmail, email);
}
// Metodo per aggiornare la visualizzazione della lista utenti
private void aggiornaListaUtenti() {
StringBuilder sb = new StringBuilder();
for (int i = 0; i < listaUtenti.size(); i++) {
sb.append(i + 1).append(". ").append(listaUtenti.get(i)).append("\n");
}
txtAreaUtenti.setText(sb.toString());
}
// Metodo per eliminare un utente selezionato dalla lista
private void eliminaUtente() {
String indiceStr = JOptionPane.showInputDialog(frame, "Inserisci il numero dell'utente da eliminare:");
try {
int indice = Integer.parseInt(indiceStr) - 1;
if (indice < 0 || indice >= listaUtenti.size()) {
JOptionPane.showMessageDialog(frame, "Numero non valido!", "Errore",
JOptionPane.ERROR_MESSAGE);
return;
}
listaUtenti.remove(indice);
salvaUtentiSuFile();
aggiornaListaUtenti();
} catch (NumberFormatException e) {
JOptionPane.showMessageDialog(frame, "Inserisci un numero valido!", "Errore",
JOptionPane.ERROR_MESSAGE);
}
}

// Metodo per salvare gli utenti su file
private void salvaUtentiSuFile() {
try (ObjectOutputStream oos = new ObjectOutputStream(new
FileOutputStream(FILE_UTENTI))) {
oos.writeObject(listaUtenti);
} catch (IOException e) {
e.printStackTrace();
}
}
// Metodo per caricare gli utenti da file
private ArrayList<Utente> caricaUtentiDaFile() {
File file = new File(FILE_UTENTI);
if (!file.exists()) return new ArrayList<>();
try (ObjectInputStream ois = new ObjectInputStream(new
FileInputStream(FILE_UTENTI))) {
return (ArrayList<Utente>) ois.readObject();
} catch (IOException | ClassNotFoundException e) {
e.printStackTrace();
return new ArrayList<>();
}
}
// Metodo main per avviare il programma
public static void main(String[] args) {
new FormUtenti();
}
}