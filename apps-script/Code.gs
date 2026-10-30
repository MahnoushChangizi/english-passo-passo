/* English Passo Passo – casella postale dei compiti.
   Riceve i compiti dall'app, ti avvisa su WhatsApp (e per email) e conserva i voti.

   1) Scrivi qui sotto il tuo numero WhatsApp, la chiave di CallMeBot e un codice insegnante a tua scelta.
   2) Distribuisci: Esegui il deployment > Nuovo deployment > App web
      (Esegui come: Me · Chi ha accesso: Chiunque). */

const PHONE = "+39";            // il tuo numero WhatsApp, con +39 davanti
const CALLMEBOT_KEY = "";       // la chiave che ti manda CallMeBot
const TEACHER_CODE = "";        // il codice per entrare nell'Area insegnante (scegli tu)
const EMAIL_TOO = true;         // manda anche un'email al tuo Gmail

const SHEET = "Consegne";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = JSON.parse(e.postData.contents);
    const sh = sheet_();

    if (p.op === "submit") {
      const row = [String(p.id), String(p.name || ""), String(p.hw || ""), new Date(Number(p.s) || Date.now()),
                   JSON.stringify(p.answers || {}), "", ""];
      const r = findRow_(sh, p.id);
      if (r < 0) sh.appendRow(row); else sh.getRange(r, 1, 1, 7).setValues([row]);
      notify_((p.name || "Lo studente") + " ha consegnato i compiti di inglese (" + (p.title || p.hw) + "). " +
              "Aprili nell'app English Passo Passo > Area insegnante.");
      return out_({ ok: true });
    }

    if (p.op === "status") {
      const r = findRow_(sh, p.id);
      if (r < 0) return out_({ ok: true, correction: null });
      const c = sh.getRange(r, 7).getValue();
      return out_({ ok: true, correction: c ? JSON.parse(c) : null });
    }

    if (!TEACHER_CODE || p.code !== TEACHER_CODE) return out_({ ok: false, error: "code" });

    if (p.op === "list") {
      const n = sh.getLastRow() - 1;
      const rows = n > 0 ? sh.getRange(2, 1, n, 7).getValues() : [];
      return out_({ ok: true, items: rows.map(v => ({
        id: String(v[0]), name: v[1], hw: v[2], submitted: new Date(v[3]).getTime(),
        answers: v[4] ? JSON.parse(v[4]) : {}, correction: v[6] ? JSON.parse(v[6]) : null })) });
    }

    if (p.op === "grade") {
      const r = findRow_(sh, p.id);
      if (r < 0) return out_({ ok: false, error: "missing" });
      sh.getRange(r, 6, 1, 2).setValues([[new Date(), JSON.stringify(p.correction || {})]]);
      return out_({ ok: true });
    }

    return out_({ ok: false, error: "op" });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return out_({ ok: true, app: "English Passo Passo" }); }

/* Esegui questa funzione una volta per provare: devi ricevere un messaggio su WhatsApp. */
function prova() { notify_("Prova: English Passo Passo è collegato!"); }

function notify_(text) {
  if (PHONE.length > 4 && CALLMEBOT_KEY) {
    UrlFetchApp.fetch("https://api.callmebot.com/whatsapp.php?phone=" + encodeURIComponent(PHONE) +
      "&text=" + encodeURIComponent(text) + "&apikey=" + encodeURIComponent(CALLMEBOT_KEY), { muteHttpExceptions: true });
  }
  if (EMAIL_TOO) MailApp.sendEmail(Session.getEffectiveUser().getEmail(), "Compiti consegnati – English Passo Passo", text);
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) {
    sh = ss.insertSheet(SHEET);
    sh.appendRow(["Codice", "Studente", "Compito", "Consegnato", "Risposte", "Corretto", "Correzione"]);
  }
  return sh;
}

function findRow_(sh, id) {
  const n = sh.getLastRow() - 1;
  if (n < 1) return -1;
  const ids = sh.getRange(2, 1, n, 1).getValues();
  for (let i = 0; i < ids.length; i++) if (String(ids[i][0]) === String(id)) return i + 2;
  return -1;
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
