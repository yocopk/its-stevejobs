package tatan;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener; // Import aggiunto
import java.text.DecimalFormat; // Import aggiunto per arrotondamento
import java.awt.Color; // Import aggiunto per i colori

import javax.swing.BoxLayout;    // Import aggiunto
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.SwingUtilities;

class Giocatore {
    private int livello;
    private double danno;
    private double oro;

    public Giocatore(int livello, double danno, double oro) {
        this.livello = livello;
        this.danno = danno;
        this.oro = oro;
    }

    public void attacca(Nemico nemico) {
        nemico.subisciDanno(danno);
    }

    public void guadagnaOro(double oro) {
        this.oro += oro;
    }

    public void potenziaDanno() {
        if (oro >= 50) {
            danno *= 1.1; // Danno aumentato del 10%
            oro -= 50;
        }
    }

    public void aumentaLivello() {
        livello++;
    }

    public double getOro() {
        return oro;
    }

    public double getDanno() {
        return danno;
    }

    public int getLivello() {
        return livello;
    }
}

class Nemico {
    protected double vita;
    protected double oroRilasciato;

    public Nemico(int livello) {
        this.vita = 100 * livello;
        this.oroRilasciato = 10 * livello; 
    }

    public void subisciDanno(double danno) {
        vita -= danno;
    }

    public boolean isMorto() {
        return vita <= 0;
    }

    public double getOroRilasciato() {
        return oroRilasciato;
    }

    public double getVita() {
        return vita;
    }
}

class Boss extends Nemico {
    public Boss(int livello) {
        super(livello);
        this.vita *= 3; // I boss hanno più vita
        this.oroRilasciato *= 2; // E danno più oro
    }
}

public class Gioco extends JFrame {
    private Giocatore giocatore;
    private Nemico nemico;
    private int nemiciSconfitti = 0;
    private JLabel lblVitaNemico, lblOro, lblLivello, lblNemiciSconfitti, lblDanno;
    private JButton btnAttacca, btnPotenzia;
    private DecimalFormat df = new DecimalFormat("#.##"); // Formattatore per arrotondare i numeri

    public Gioco() {
        giocatore = new Giocatore( 1, 10, 0);

        setTitle("Tap Titans");
        setSize(300, 300); // Aumentata l'altezza per migliorare la disposizione
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BoxLayout(getContentPane(), BoxLayout.Y_AXIS));
        getContentPane().setBackground(Color.DARK_GRAY); // Colore di sfondo del frame

        lblVitaNemico = new JLabel("Vita Nemico: ");
        lblVitaNemico.setForeground(Color.WHITE); // Colore del testo
        lblOro = new JLabel("Oro: " + giocatore.getOro());
        lblOro.setForeground(Color.YELLOW); // Colore del testo
        lblLivello = new JLabel("Livello: " + giocatore.getLivello());
        lblLivello.setForeground(Color.CYAN); // Colore del testo
        lblNemiciSconfitti = new JLabel("Nemici Sconfitti: " + nemiciSconfitti);
        lblNemiciSconfitti.setForeground(Color.GREEN); // Colore del testo
        lblDanno = new JLabel("Danno: " + giocatore.getDanno());
        lblDanno.setForeground(Color.ORANGE); // Colore del testo

        btnAttacca = new JButton("Attacca");
        btnAttacca.setBackground(Color.RED); // Colore di sfondo del pulsante
        btnAttacca.setForeground(Color.WHITE); // Colore del testo del pulsante
        btnPotenzia = new JButton("Potenzia Danno (50 oro)");
        btnPotenzia.setBackground(Color.BLUE); // Colore di sfondo del pulsante
        btnPotenzia.setForeground(Color.WHITE); // Colore del testo del pulsante

        btnAttacca.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                giocatore.attacca(nemico);
                lblVitaNemico.setText("Vita Nemico: " + df.format(nemico.getVita())); // Arrotondamento
                if (nemico.isMorto()) {
                    giocatore.guadagnaOro(nemico.getOroRilasciato());
                    lblOro.setText("Oro: " + df.format(giocatore.getOro())); // Arrotondamento
                    nemiciSconfitti++;
                    generaNuovoNemico();
                    lblVitaNemico.setText("Vita Nemico: " + df.format(nemico.getVita())); // Arrotondamento
                    lblNemiciSconfitti.setText("Nemici Sconfitti: " + nemiciSconfitti);
                }
            }
        });

        btnPotenzia.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                giocatore.potenziaDanno();
                lblOro.setText("Oro: " + df.format(giocatore.getOro())); // Arrotondamento
                lblDanno.setText("Danno: " + df.format(giocatore.getDanno())); // Arrotondamento
            }
        });

        add(lblVitaNemico);
        add(lblOro);
        add(btnAttacca);
        add(btnPotenzia);
        add(lblLivello);
        add(lblNemiciSconfitti);
        add(lblDanno);

        generaNuovoNemico(); // Spostato qui dopo l'inizializzazione dei componenti
    }

    private void generaNuovoNemico() {
        if (nemiciSconfitti % 10 == 0 && nemiciSconfitti != 0) {
            nemico = new Boss(nemiciSconfitti / 10);
            lblVitaNemico.setText("Vita Boss: " + df.format(nemico.getVita())); // Arrotondamento
            giocatore.aumentaLivello();
            lblLivello.setText("Livello: " + giocatore.getLivello());
            JOptionPane.showMessageDialog(this, "Attenzione! Stai affrontando un Boss!", "Boss Incontrato", JOptionPane.WARNING_MESSAGE); // Feedback
        } else {
            nemico = new Nemico(nemiciSconfitti + 1);
            lblVitaNemico.setText("Vita Nemico: " + df.format(nemico.getVita())); // Arrotondamento
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new Gioco().setVisible(true));
    }
}
