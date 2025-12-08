export const SHIELD_TEMPLATES = {
    family: {
        title: 'Engste Familie',
        desc: 'Eltern, Geschwister. Offen und direkt.',
        templates: [
            {
                label: 'Kurze Nachricht',
                text: "Ihr Lieben. Wir haben unser Kind verloren. Wir stehen unter Schock und brauchen jetzt Zeit für uns. Bitte ruft nicht an, wir melden uns, wenn wir können."
            },
            {
                label: 'Einladung zum Abschied',
                text: "Wir möchten uns von [Name] verabschieden und laden euch ein, am [Datum] dabei zu sein. Es soll eine stille Gedenkfeier im engsten Kreis werden."
            }
        ]
    },
    friends: {
        title: 'Freunde & Bekannte',
        desc: 'Informieren, aber Distanz wahren.',
        templates: [
            {
                label: 'Information',
                text: "Wir haben traurige Nachrichten. Wir mussten [Name] gehen lassen. Wir ziehen uns für eine Weile zurück. Danke für euer Verständnis."
            },
            {
                label: 'Status-Update',
                text: "Aus traurigem Anlass nehme ich mir eine Auszeit. Bitte habt Geduld, wenn ich nicht antworte."
            }
        ]
    },
    work: {
        title: 'Arbeitgeber',
        desc: 'Sachlich und formell.',
        templates: [
            {
                label: 'Krankmeldung',
                text: "Sehr geehrte/r [Name], aufgrund eines familiären Trauerfalls bin ich aktuell nicht arbeitsfähig. Meine Krankmeldung folgt. Ich bitte um Verständnis, dass ich telefonisch gerade schwer erreichbar bin."
            },
            {
                label: 'Info an Kollegen',
                text: "Liebe Kollegen, ich werde aufgrund eines privaten Schicksalsschlags einige Zeit ausfallen. Bitte wendet euch in dringenden Fällen an [Vertretung]."
            }
        ]
    }
};
