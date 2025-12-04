import { Droplets, Sparkles, Utensils, Moon, ShieldCheck } from 'lucide-react';

export const PREGNANCY_WEEKS = {
    4: { size: 'ein Mohnsamen', image: '/images/mohnsamen.png', cm: 0.1, g: 1, feeling: 'Hoffnung & Geheimnis', tip: 'Noch nix sagen, aber Folsäure checken.' },
    5: { size: 'ein Sesamkorn', image: '/images/sesam.png', cm: 0.2, g: 1, feeling: 'Ahnung & Aufregung', tip: 'Verzicht auf Alkohol/Zigaretten unterstützen.' },
    6: { size: 'eine Erbse', image: '/images/erbse.png', cm: 0.5, g: 1, feeling: 'Müdigkeit kickt rein', tip: 'Lass sie schlafen. Übernimm den Einkauf.' },
    // ... (Füge hier den Rest deiner Wochen ein oder kürze es für den Anfang)
    40: { size: 'ein Kürbis', image: '/images/kuerbis.png', cm: 51.2, g: 3462, feeling: 'Geburtstermin', tip: 'Ruhepol sein. Du schaffst das.' },
};

export const POSTPARTUM_EMPATHY = {
  0: { feeling: 'Adrenalin & Erschöpfung', tip: 'Besuch abwehren. Windeln wechseln. Essen ans Bett.' },
  1: { feeling: 'Baby Blues & Heilung', tip: 'Zuhören bei Tränen. Keine Ratschläge. Haushalt schmeißen.' },
  // ... Rest
};

export const BUREAUCRACY_CONTENT = {
    before_birth: {
        title: "Vor der Geburt",
        items: [
            { id: 'b-1', text: 'Vaterschaftsanerkennung (Jugendamt/Standesamt)' },
            { id: 'b-2', text: 'Sorgeerklärung (nur bei unverheiratet)' },
            { id: 'b-3', text: 'Mutterschaftsgeld (Krankenkasse) erinnern' },
            { id: 'b-4', text: 'Klinikanmeldung' },
            { id: 'b-5', text: 'Elternzeit beim Arbeitgeber anmelden (7 Wochen Frist!)' }
        ]
    },
    after_birth: {
        title: "Direkt danach",
        items: [
            { id: 'b-6', text: 'Geburtsurkunde (Standesamt)' },
            { id: 'b-7', text: 'Kind beim Einwohnermeldeamt anmelden' },
            { id: 'b-8', text: 'Krankenkasse (Familienversicherung) Antrag' },
            { id: 'b-9', text: 'Steuerklasse wechseln (falls sinnvoll)' }
        ]
    },
    finance: {
        title: "Cash & Finanzen",
        items: [
            { id: 'b-10', text: 'Elterngeld-Antrag abschicken' },
            { id: 'b-11', text: 'Kindergeld-Antrag (Familienkasse)' },
            { id: 'b-12', text: 'Versicherungen anpassen (Haftpflicht etc.)' }
        ]
    }
};

export const HOSPITAL_BAG_CONTENT = {
    documents: { title: "Papierkram (Wichtig!)", items: [{ id: 'doc-1', text: 'Mutterpass' }, { id: 'doc-2', text: 'Personalausweise' }, { id: 'doc-3', text: 'Krankenkassenkarte' }] },
    mom: { title: "Für Sie", items: [{ id: 'mom-1', text: 'Nachthemden (aufknöpfbar)' }, { id: 'mom-2', text: 'Still-BHs / Einlagen' }] },
    dad: { title: "Für Dich (Support)", items: [{ id: 'dad-1', text: 'SNACKS!' }, { id: 'dad-2', text: 'Kleingeld' }] },
    baby: { title: "Fürs Baby", items: [{ id: 'baby-1', text: 'Body (Gr. 50/56)' }, { id: 'baby-2', text: 'Mützchen' }] }
};

export const OASIS_IDEAS = {
    trimester1: [
        { title: "Ingwer-Held", text: "Koch ihr einen frischen Ingwer-Tee gegen die Übelkeit." },
        { title: "Snack-Service", text: "Schneide ihr Obst klein und stell es kommentarlos hin." }
    ],
    // ... Rest
};

export const HABITS_PREGNANCY = [{ key: 'hydration', title: "Wasser", text: "Bring ihr ein Glas", icon: Droplets, color: 'blue' }, { key: 'oasis', title: "Oase", text: "Tägliche Geste", icon: Sparkles, color: 'amber' }];
export const HABITS_POSTPARTUM = [{ key: 'hydration', title: "Still-Snack", text: "Wasser & Nüsse", icon: Utensils, color: 'orange' }, { key: 'nightshift', title: "Nacht-Held", text: "Wickeln übernehmen", icon: Moon, color: 'indigo' }];
export const HABITS_LOSS = [{ key: 'hydration', title: "Fürsorge", text: "Tee hinstellen", icon: Droplets, color: 'stone' }, { key: 'shield', title: "Schutzschild", text: "Besuch abwehren", icon: ShieldCheck, color: 'zinc' }];