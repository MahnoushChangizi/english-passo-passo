# English Passo Passo

App per imparare l'inglese, un passo alla volta. Si installa su Windows da Edge o Chrome (icona "Installa app" nella barra degli indirizzi) e si aggiorna da sola.

- `docs/` è il sito pubblicato con GitHub Pages (Settings → Pages → branch `main`, cartella `/docs`).
- L'app è tutta in `docs/index.html`, tra `<!-- APP START -->` e `<!-- APP END -->`.
- Per aggiornare: modifica l'app, poi `python3 build.py docs/index.html` rigenera index, service worker e manifest con una nuova versione.
