// import java.awt.*;
// import java.awt.event.ActionEvent;
// import java.awt.event.ActionListener;
// import javax.swing.*;

// public class FormInserimento extends JFrame implements ActionListener {
//     private final JTextField nomeField;
//     private final JTextField etaField;
//     private final JButton inviaButton;

//     public FormInserimento() {
//         // Impostazioni della finestra
//         setTitle("Form di Inserimento");
//         setSize(300, 200);
//         setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//         setLayout(new GridLayout(3, 2));

//         // Creazione componenti
//         JLabel nomeLabel = new JLabel("Nome:");
//         nomeField = new JTextField();
//         JLabel etaLabel = new JLabel("Età:");
//         etaField = new JTextField();
//         inviaButton = new JButton("Invia");

//         // Aggiunta listener per il pulsante
//         inviaButton.addActionListener(this);

//         // Aggiunta componenti alla finestra
//         add(nomeLabel);
//         add(nomeField);
//         add(etaLabel);
//         add(etaField);
//         add(inviaButton);

//         // Rendere visibile la finestra
//         setVisible(true);
//     }

//     @Override
//     public void actionPerformed(ActionEvent e) {
//         if (e.getSource() == inviaButton) {
//             // Recupera i dati inseriti
//             String nome = nomeField.getText();
//             String eta = etaField.getText();

//             // Crea una nuova finestra per mostrare i dati
//             JFrame resultFrame = new JFrame("Dati Inseriti");
//             resultFrame.setSize(300, 100);
//             resultFrame.setLayout(new GridLayout(2, 1));
//             resultFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

//             // Crea le etichette per mostrare i dati
//             JLabel nomeResultLabel = new JLabel("Nome: " + nome);
//             JLabel etaResultLabel = new JLabel("Età: " + eta);

//             // Aggiungi le etichette alla nuova finestra
//             resultFrame.add(nomeResultLabel);
//             resultFrame.add(etaResultLabel);

//             // Mostra la nuova finestra
//             resultFrame.setVisible(true);

//             // Puoi anche chiudere la finestra del form dopo l'invio
//             dispose(); // Chiude la finestra del form
//         }
//     }

//     public static void main(String[] args) {
//         new FormInserimento(); // Avvia il form
//     }
// }
