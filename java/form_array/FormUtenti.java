package form_array;
import java.awt.*;
import java.util.ArrayList;
import javax.swing.*;

public class FormUtenti {
    private JFrame frame;
    private JTextArea txtArea;
    private JTextField txtNome, txtCognome, txtEmail;
    private ArrayList<Utente> listaUtenti;

    public FormUtenti(){
        // Creazione finestra
        frame = new JFrame("Modulo di Registrazione");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(350, 250);
        frame.setLayout(new GridLayout(5, 2, 5, 5));
        
        //Creazione componenti
        JLabel lblNome = new JLabel("Nome:");
        txtNome = new JTextField();
        JLabel lblCognome = new JLabel("Cognome:");
        txtCognome = new JTextField();
        JLabel lblEmail = new JLabel("Email:");
        txtEmail = new JTextField();
        JButton btnInvia = new JButton("Registra");
        JButton btnVisualizza = new JButton("Visualizza");
        txtArea = new JTextArea();
        txtArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(txtArea);

        //Metodo per registrare utente
    }

    private void registraUtente(){
        String nome = txtNome.getText();
        String cognome = txtCognome.getText();
        String email = txtEmail.getText();
        Utente utente = new Utente(nome, cognome, email);
        listaUtenti.add(utente);
        txtArea.append(utente.toString() + "\n");
        txtNome.setText("");
        txtCognome.setText("");
        txtEmail.setText("");
    }

    private void visualizzaUtenti(){
        txtArea.setText("");
        for(Utente utente : listaUtenti){
            txtArea.append(utente.toString() + "\n");
        }
    }

    
}
