package form_ui;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;

public class FormExample {
    private static Utente ultimoUtenteRegistrato;

    public static void main(String[] args) {
        // Creazione della finestra
        JFrame frame = new JFrame("Modulo di Registrazione");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(350, 250);
        frame.setLayout(new GridLayout(5, 2, 5, 5));
        // Creazione dei componenti del form
        JLabel lblNome = new JLabel("Nome:");
        JTextField txtNome = new JTextField();
        JLabel lblCognome = new JLabel("Cognome:");
        JTextField txtCognome = new JTextField();
        JLabel lblEmail = new JLabel("Email:");
        JTextField txtEmail = new JTextField();
        JButton btnInvia = new JButton("Invia");
        JButton btnModifica = new JButton("Modifica");
        JLabel lblRisultato = new JLabel("");
        // Aggiunta dell'azione al pulsante
        btnInvia.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String nome = txtNome.getText();
                String cognome = txtCognome.getText();
                String email = txtEmail.getText();
                Utente utente = new Utente(nome, cognome, email);

                utente.mostraDettagli();
                lblRisultato.setText("Utente registrato con successo!");
                txtNome.setText("");
                txtCognome.setText("");
                txtEmail.setText("");

                ultimoUtenteRegistrato = utente;
            }
        });

        btnModifica.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (ultimoUtenteRegistrato != null) {
                    txtNome.setText(ultimoUtenteRegistrato.getNome());
                    txtCognome.setText(ultimoUtenteRegistrato.getCognome());
                    txtEmail.setText(ultimoUtenteRegistrato.getEmail());
                    lblRisultato.setText("Modifica i dati e clicca su Invia");
                }
            }
        });
        // Aggiunta dei componenti alla finestra
        frame.add(lblNome);
        frame.add(txtNome);
        frame.add(lblCognome);
        frame.add(txtCognome);
        frame.add(lblEmail);
        frame.add(txtEmail);
        frame.add(btnInvia);
        frame.add(btnModifica);
        frame.add(lblRisultato);
        // Visualizzazione della finestra
        frame.setVisible(true);
    }
}