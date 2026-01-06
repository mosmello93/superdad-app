import { FileText, Euro, Heart, Briefcase, Calculator, Building, UserCheck } from 'lucide-react';

export const BUREAUCRACY_ASSETS = {
    legal: { label: 'Rechtliches', color: 'indigo', icon: Building },
    financial: { label: 'Finanzen', color: 'emerald', icon: Euro },
    health: { label: 'Gesundheit', color: 'rose', icon: Heart },
    work: { label: 'Arbeitgeber', color: 'blue', icon: Briefcase }
};

export const BUREAUCRACY_TASKS = [
    {
        id: 'mutterschutz',
        title: 'Bescheinigung für Mutterschutz',
        category: 'work',
        urgency: 'high',
        timing: { type: 'due_date', weeks: -7 },
        description: 'Für den Arbeitgeber & Krankenkasse (Wichtig für Mutterschaftsgeld).',
        guide: `
**Was ist das?**
Die offizielle Bescheinigung über den voraussichtlichen Entbindungstermin (ET). Diese brauchst du, um in den Mutterschutz (6 Wochen vor ET) zu gehen und Mutterschaftsgeld zu beantragen.

**Woher?**
Vom Gynäkologen oder der Hebamme.

**Wann?**
Frühestens 7 Wochen vor dem ET. Nicht früher, sonst ist sie ungültig!

**Wohin damit?**
1. Original an die Krankenkasse (für das Geld).
2. Kopie an den Arbeitgeber (für den Zuschuss & Freistellung).
    `,
        icon: FileText
    },
    {
        id: 'vaterschaft',
        title: 'Vaterschaftsanerkennung',
        category: 'legal',
        urgency: 'medium',
        timing: { type: 'due_date', weeks: -8 },
        description: 'Wenn ihr nicht verheiratet seid: Unbedingt VOR der Geburt machen.',
        guide: `
**Warum wichtig?**
Nur mit der Anerkennung bist du rechtlich der Vater. Das ist Voraussetzung für Unterhalt, Erbrecht und oft auch das gemeinsame Sorgerecht.

**Wo?**
Jugendamt (kostenlos) oder Standesamt/Notar (gebührenpflichtig).

**Was braucht ihr?**
- Personalausweise beider Eltern.
- Geburtsurkunden beider Eltern.
- Mutterpass.
- Zustimmung der Mutter (muss persönlich dabei sein).
    `,
        icon: UserCheck
    },
    {
        id: 'sorgerecht',
        title: 'Gemeinsames Sorgerecht',
        category: 'legal',
        urgency: 'medium',
        timing: { type: 'due_date', weeks: -8 },
        description: 'Nicht automatisch bei unverheirateten Paaren! Separate Erklärung nötig.',
        guide: `
**Achtung:**
Die Vaterschaftsanerkennung allein reicht NICHT für das gemeinsame Sorgerecht (Mitsprache bei Kita, OP, Schule).

**Wo?**
Jugendamt. Kann oft direkt im selben Termin mit der Vaterschaftsanerkennung gemacht werden ("Sorgeerklärung").
    `,
        icon: UserCheck
    },
    {
        id: 'klinik_anmeldung',
        title: 'Anmeldung Geburtsklinik',
        category: 'health',
        urgency: 'medium',
        timing: { type: 'due_date', weeks: -6 },
        description: 'Papierkram vorab erledigen, damit unter Wehen Ruhe herrscht.',
        guide: `
**Warum?**
Damit die Klinik eure Daten schon hat (Allergien, Vorerkrankungen, Versicherungsstatus) und ihr euch unter Wehen nicht mit Formularen rumschlagen müsst.

**Wann?**
Meist ab der 30.-34. SSW. Jede Klinik handhabt das etwas anders.
    `,
        icon: Building
    },
    {
        id: 'elternzeit_dad',
        title: 'Elternzeit Anmelden (Vater)',
        category: 'work',
        urgency: 'high',
        timing: { type: 'due_date', weeks: -7 },
        description: 'Schriftlich beim Arbeitgeber. Frist: 7 Wochen vor Beginn!',
        guide: `
**Die 7-Wochen-Frist:**
Willst du direkt ab Geburt zuhause bleiben? Dann musst du den Antrag spätestens 7 Wochen vor dem errechneten Termin abgeben.

**Tipp:**
Schreib: "Hiermit melde ich Elternzeit an für den Zeitraum vom [ET] bis zum [Datum]. Sollte das Kind früher oder später geboren werden, verschiebt sich der Zeitraum entsprechend."
    `,
        icon: Briefcase
    },
    {
        id: 'geburtsurkunde',
        title: 'Geburtsurkunde beantragen',
        category: 'legal',
        urgency: 'high',
        timing: { type: 'birth', weeks: 1 },
        description: 'Das wichtigste Dokument nach der Geburt.',
        guide: `
**Wo?**
Standesamt des Geburtsortes. Oft nehmen Kliniken die Unterlagen entgegen ("Klinikservice").

**Unterlagen:**
- Perso beider Eltern.
- Geburtsbescheinigung der Klinik (Original).
- Eheurkunde / Vaterschaftsanerkennung & Sorgeerklärung.
- Bargeld (ca. 10-20€ pro Urkunde).

**Tipp:**
Bestell gleich 3-4 beglaubigte Kopien "für soziale Zwecke" mit (für Elterngeld, Kindergeld, Krankenkasse).
    `,
        icon: FileText
    },
    {
        id: 'krankenkasse_baby',
        title: 'Baby krankenversichern',
        category: 'health',
        urgency: 'high',
        timing: { type: 'birth', weeks: 2 },
        description: 'Familienversicherung beantragen.',
        guide: `
**Wie?**
Anruf bei deiner/ihrer Krankenkasse. Sie schicken ein Formular. Ausfüllen, Geburtsurkunde dazu, zurückschicken.
    `,
        icon: Heart
    },
    {
        id: 'elterngeld',
        title: 'Elterngeld beantragen',
        category: 'financial',
        urgency: 'medium',
        timing: { type: 'birth', weeks: 4 },
        description: 'Der komplizierteste Antrag. Rückwirkend nur 3 Monate!',
        guide: `
**Wo?**
Elterngeldstelle (oder ElterngeldDigital).

**Du brauchst:**
- Geburtsurkunde (Original "für Elterngeld").
- Einkommensnachweise (12 Monate vor Geburt).
- Bescheinigung der Krankenkasse über Mutterschaftsgeld.
    `,
        icon: Calculator
    },
    {
        id: 'kindergeld',
        title: 'Kindergeld beantragen',
        category: 'financial',
        urgency: 'medium',
        timing: { type: 'birth', weeks: 2 },
        description: '250€ pro Monat. Steuer-ID des Babys abwarten.',
        guide: `
**Voraussetzung:**
Du brauchst die Steuer-ID des Babys (kommt per Post 1-3 Wochen nach Geburt).

**Wo:**
Familienkasse (Agentur für Arbeit). Geht online.
    `,
        icon: Euro
    },
    // --- LOSS SPECIFIC TASKS ---
    {
        id: 'mutterschutz_loss',
        title: 'Mutterschutz nach Fehlgeburt',
        category: 'work',
        urgency: 'high',
        timing: { type: 'loss', weeks: 0 },
        description: 'Ab der 24. SSW (oder >500g) steht ihr der volle Mutterschutz zu.',
        guide: `
**Die Regelung:**
Ab einem Geburtsgewicht von 500g oder ab der 24. Schwangerschaftswoche gilt das Kind als "totgeboren".
Damit hat die Mutter Anspruch auf den vollen Mutterschutz (meist 18 Wochen nach der Geburt).

**Was tun?**
Bescheinigung vom Arzt für den Arbeitgeber und die Krankenkasse holen.
Auch bei einer Fehlgeburt (<500g) kann der Arzt sie natürlich krankschreiben ("Arbeitsunfähigkeit").
    `,
        icon: Briefcase
    },
    {
        id: 'sternenkind',
        title: 'Eintragung als Sternenkind',
        category: 'legal',
        urgency: 'medium',
        timing: { type: 'loss', weeks: 1 },
        description: 'Auch unter 500g könnt ihr euer Kind beim Standesamt eintragen lassen.',
        guide: `
**Was ist das?**
Ihr habt das Recht, euer Kind beim Standesamt zu dokumentieren, auch wenn es rechtlich keine "Person" (unter 500g) war.
Das ist oft ein wichtiger Schritt für die Trauerbewältigung.

**Wo?**
Standesamt des Geburtsortes.
    `,
        icon: FileText
    },
    {
        id: 'bestattung_loss',
        title: 'Bestattungsrecht',
        category: 'legal',
        urgency: 'high',
        timing: { type: 'loss', weeks: 0 },
        description: 'Klärt, was mit dem Körper passieren soll.',
        guide: `
**Recht & Pflicht:**
- **>500g (Totgeburt):** Es besteht Bestattungspflicht.
- **<500g (Fehlgeburt):** Keine Pflicht, aber oft ein RECHT (Sternenkindergrab).

**Tipp:**
Lasst euch Zeit. Ihr habt oft 24-48h, bevor ihr entscheiden müsst.
    `,
        icon: Building
    },
    {
        id: 'krankmeldung_dad',
        title: 'Krankschreibung für Dich',
        category: 'work',
        urgency: 'high',
        timing: { type: 'loss', weeks: 0 },
        description: 'Nimm dir die Zeit. Du musst nicht sofort funktionieren.',
        guide: `
**Optionen:**
1. **Kind-Krank:** Gilt leider oft nicht bei Totgeburten.
2. **Eigene Krankschreibung:** Geh zum Hausarzt. "Akute Belastungsreaktion". Jeder gute Arzt schreibt dich 1-2 Wochen krank.

**Warum?**
Du kannst deine Partnerin nicht stützen, wenn du zusammenbrichst.
    `,
        icon: UserCheck
    },
    // --- CONCEPTION SPECIFIC TASKS ---
    {
        id: 'fertility_check',
        title: 'Gesundheits-Check (Mann)',
        category: 'health',
        urgency: 'medium',
        timing: { type: 'conception', weeks: 0 },
        description: 'Lass dich durchchecken. Fruchtbarkeit ist Teamsport.',
        guide: `
**Warum?**
In 40-50% der Fälle liegen Ursachen für einen unerfüllten Kinderwunsch (auch) beim Mann. Ein Spermiogramm beim Urologen bringt Klarheit.

**Was passiert da?**
Keine Sorge, es tut nicht weh. Es ist ein Standard-Checkup plus eine Probe.
    `,
        icon: UserCheck
    },
    {
        id: 'insurance_check',
        title: 'Krankenkasse checken',
        category: 'financial',
        urgency: 'medium',
        timing: { type: 'conception', weeks: 0 },
        description: 'Was wird übernommen? (Heilpraktiker, Zusatzleistungen)',
        guide: `
**Infos:**
Prüft eure Kassenleistungen. Manche zahlen Zuschüsse zu Vitaminen, Akupunktur oder Osteopathie – Dinge, die in der Kinderwunschzeit helfen können.
    `,
        icon: Euro
    },
    {
        id: 'budget_planning',
        title: 'Baby-Budget anlegen',
        category: 'financial',
        urgency: 'low',
        timing: { type: 'conception', weeks: 0 },
        description: 'Ein Baby kostet Geld. Fangt an zu sparen.',
        guide: `
**Sparplan:**
Legt monatlich einen kleinen Betrag zur Seite. Nicht erst, wenn der Test positiv ist.
Die Erstausstattung (Kinderwagen, Zimmer) kann schnell 2.000€+ kosten.
    `,
        icon: Calculator
    }
];
