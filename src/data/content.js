import {
    Heart, Calendar, CheckCircle, Circle, MessageCircle, Activity, ChevronRight,
    ShieldCheck, Droplets, Sparkles, Cookie, ArrowUpRight, Battery, MessageSquare,
    Baby, Star, CloudRain, Feather, HelpCircle, BookOpen, User, Moon, Utensils,
    RefreshCw, Wand2, Trash2, Backpack, X, CheckSquare, Phone, MapPin,
    AlertTriangle, Navigation, Scale, Home, LayoutGrid, Sprout, Ruler, Weight,
    Timer, Play, Square, Clock, History, Bell, Trophy, Award, Zap, FileText, Camera, Box
} from 'lucide-react';

export const OASIS_IDEAS = {
    trimester1: [
        { title: "Ingwer-Held", text: "Koch ihr einen frischen Ingwer-Tee gegen die Übelkeit." },
        { title: "Snack-Service", text: "Schneide ihr Obst klein und stell es kommentarlos hin." },
        { title: "Ruhe-Pol", text: "Nimm ihr heute Abend alles ab, damit sie um 20 Uhr schlafen kann." },
        { title: "Frische Luft", text: "Ein kurzer, langsamer Spaziergang im Park (hilft gegen Müdigkeit)." },
        { title: "Geruchs-Wächter", text: "Lüfte die Wohnung gut durch und vermeide starke Parfums." }
    ],
    trimester2: [
        { title: "Date Night", text: "Plan ein kleines Date (Kino oder schick essen), solange es noch leicht geht." },
        { title: "Bauch-Öl", text: "Besorg ein gutes Pflegeöl und biete an, den Bauch einzucremen." },
        { title: "Kompliment", text: "Sag ihr, wie wunderschön sie mit dem Babybauch aussieht." },
        { title: "Ausflug", text: "Fahrt am Wochenende irgendwo hin, wo ihr noch nie wart." },
        { title: "Nestbau-Support", text: "Frag sie: 'Was wolltest du im Kinderzimmer schon immer erledigt haben?' und mach es." }
    ],
    trimester3: [
        { title: "Schuh-Service", text: "Binde ihr heute die Schuhe zu. Der Bauch ist im Weg!" },
        { title: "Rücken-Retter", text: "Eine 5-Minuten Massage für den unteren Rücken wirkt Wunder." },
        { title: "Kissen-Burg", text: "Arrangiere ihre Kissen im Bett oder auf dem Sofa neu für maximalen Komfort." },
        { title: "Chauffeur", text: "Fahr sie überall hin. Laufen ist jetzt Sport." },
        { title: "Beine hoch", text: "Leg ihre Beine hoch und massiere vorsichtig die Waden." }
    ],
    postpartum: [
        { title: "Dusch-Wächter", text: "Nimm das Baby für 30 Min, damit sie in Ruhe (!) duschen kann." },
        { title: "Chefkoch", text: "Koche ihr Lieblingsessen (oder bestell es). Stillen macht hungrig." },
        { title: "Wasser-Marsch", text: "Stell ihr bei jedem Stillen ungefragt ein großes Glas Wasser hin." },
        { title: "Nachtschicht", text: "Übernimm heute das Wickeln nach dem Stillen in der Nacht." },
        { title: "Mutmacher", text: "Sag ihr, dass sie eine fantastische Mutter ist." }
    ],
    loss: [
        { title: "Lichtblick", text: "Zünde abends eine Kerze für euer Sternchen an." },
        { title: "Zuhörer", text: "Frag sie: 'Wie fühlst du dich heute wirklich?' und hör nur zu." },
        { title: "Tee-Ritual", text: "Bring ihr eine warme Tasse Tee und eine Decke." },
        { title: "Spaziergang", text: "Geht zusammen in die Natur, ohne Ziel, einfach laufen." },
        { title: "Schutzraum", text: "Sag heute alle Termine ab, die nicht sein müssen." }
    ]
};

export const PREGNANCY_WEEKS = {
    4: { size: 'ein Mohnsamen', image: '/images/mohnsamen.png', cm: 0.1, g: 1, feeling: 'Hoffnung & Geheimnis', tip: 'Noch nix sagen, aber Folsäure checken.', development: 'Die Eizelle nistet sich in der Gebärmutter ein.', mom: 'Möglicherweise leichte Einnistungsblutung oder Ziehen im Unterleib.' },
    5: { size: 'ein Sesamkorn', image: '/images/sesam.png', cm: 0.2, g: 1, feeling: 'Ahnung & Aufregung', tip: 'Verzicht auf Alkohol/Zigaretten unterstützen.', development: 'Das Herz beginnt zu schlagen (noch nicht hörbar).', mom: 'Müdigkeit und Spannungsgefühle in den Brüsten können auftreten.' },
    6: { size: 'eine Erbse', image: '/images/erbse.png', cm: 0.5, g: 1, feeling: 'Müdigkeit kickt rein', tip: 'Lass sie schlafen. Übernimm den Einkauf.', development: 'Das Neuralrohr (Vorläufer von Gehirn & Rückenmark) schließt sich.', mom: 'Häufiger Harndrang und erste Übelkeit sind typisch.' },
    7: { size: 'eine Blaubeere', image: '/images/blaubeere.png', cm: 1.0, g: 1, feeling: 'Übelkeit & Ekel', tip: 'Koche geruchsneutral. Ingwertee besorgen.', development: 'Arm- und Beinknospen werden sichtbar.', mom: 'Geruchsempfindlichkeit und Antipathie gegen bestimmte Speisen.' },
    8: { size: 'eine Himbeere', image: '/images/himbeere.png', cm: 1.6, g: 1, feeling: 'Gefühlschaos', tip: 'Sei ihr Blitzableiter für Launen.', development: 'Finger und Zehen beginnen sich zu formen.', mom: 'Die Gebärmutter wächst, was auf die Blase drückt.' },
    9: { size: 'eine Olive', image: '/images/olive.png', cm: 2.3, g: 2, feeling: 'Erschöpfung', tip: 'Bring ihr Snacks ans Bett bevor sie aufsteht.', development: 'Muskeln bilden sich, erste spontane Bewegungen.', mom: 'Kreislaufprobleme und Müdigkeit sind jetzt Hochleistungssport.' },
    10: { size: 'eine Pflaume', image: '/images/pflaume.png', cm: 3.1, g: 4, feeling: 'Hormon-Party', tip: 'Erster Ultraschall? Nimm dir frei!', development: 'Alle lebenswichtigen Organe sind angelegt.', mom: 'Das Blutvolumen steigt, was für mehr Durst sorgt.' },
    11: { size: 'eine Limette', image: '/images/limette.png', cm: 4.1, g: 7, feeling: 'Durst & Harndrang', tip: 'Immer Wasserflasche auffüllen.', development: 'Die Haut ist noch durchsichtig; Finger sind getrennt.', mom: 'Haare und Nägel können sich verändern (oft zum Positiven!).' },
    12: { size: 'eine Aprikose', image: '/images/aprikose.png', cm: 5.4, g: 14, feeling: 'Aufatmen (1. Etappe)', tip: 'Verkündet es der Familie!', development: 'Die einzigartigen Fingerabdrücke entstehen.', mom: 'Die Übelkeit lässt bei vielen Frauen langsam nach.' },
    13: { size: 'eine Zitrone', image: '/images/zitrone.png', cm: 7.4, g: 23, feeling: 'Energie kehrt zurück', tip: 'Plant einen kleinen Ausflug.', development: 'Der Saugreflex entwickelt sich (Daumenlutschen möglich).', mom: 'Die "kritische Phase" ist vorbei, die Libido kann zurückkehren.' },
    14: { size: 'eine Orange', image: '/images/orange.png', cm: 8.7, g: 43, feeling: 'Babybauch wächst', tip: 'Mach die ersten Bauch-Fotos.', development: 'Das Baby beginnt, Fruchtwasser zu trinken.', mom: 'Ein kleines Bäuchlein könnte sichtbar werden.' },
    15: { size: 'ein Apfel', image: '/images/apfel.png', cm: 10.1, g: 70, feeling: 'Libido schwankt', tip: 'Geduld und Zärtlichkeit ohne Druck.', development: 'Es kann jetzt Lichtveränderungen wahrnehmen.', mom: 'Das Herzzeitvolumen steigt um bis zu 40%.' },
    16: { size: 'eine Avocado', image: '/images/avocado.png', cm: 11.6, g: 100, feeling: 'Nestbautrieb startet', tip: 'Entrümple das Arbeitszimmer/Zukünftiges Kinderzimmer.', development: 'Das Herz pumpt ca. 24 Liter Blut pro Tag.', mom: 'Vielleicht spürt sie das erste "Flattern" (Kindsbewegungen).' },
    17: { size: 'eine Birne', image: '/images/birne.png', cm: 13.0, g: 140, feeling: 'Bänderdehnung', tip: 'Biete ihr eine Rückenmassage an.', development: 'Das Skelett verknöchert langsam (bisher Knorpel).', mom: 'Die Mutterbänder dehnen sich, was Ziehen in der Leiste verursacht.' },
    18: { size: 'eine Paprika', image: '/images/paprika.png', cm: 14.2, g: 190, feeling: 'Erstes Flattern?', tip: 'Hand auf den Bauch, Geduld haben.', development: 'Die Ohren sind an der richtigen Stelle; Hören beginnt.', mom: 'Der Schwerpunkt verlagert sich, was zu Rückenschmerzen führen kann.' },
    19: { size: 'eine Mango', image: '/images/mango.png', cm: 15.3, g: 240, feeling: 'Heißhunger', tip: 'Geh auch nachts für Eis zur Tanke.', development: 'Vernix (Käseschmiere) bildet sich zum Hautschutz.', mom: 'Pigmentveränderungen (Linea Nigra) können am Bauch erscheinen.' },
    20: { size: 'eine Banane', image: '/images/banane.png', cm: 16.4, g: 300, feeling: 'Halbzeit!', tip: 'Feiert Bergfest. Geht schick essen.', development: 'Geschlechtsorgane sind im Ultraschall gut erkennbar.', mom: 'Der Bauchnabel wölbt sich eventuell nach außen.' },
    21: { size: 'eine Karotte', image: '/images/karotte.png', cm: 26.7, g: 360, feeling: 'Bewegungsdrang', tip: 'Geht zusammen schwimmen (entlastet den Rücken).', development: 'Der Schlaf-Wach-Rhythmus pendelt sich ein.', mom: 'Wassereinlagerungen in Beinen und Füßen sind möglich.' },
    22: { size: 'eine Papaya', image: '/images/papaya.png', cm: 27.8, g: 430, feeling: 'Tritte werden stärker', tip: 'Sprich mit dem Bauch, er hört dich jetzt.', development: 'Der Tastsinn verfeinert sich, es greift nach der Nabelschnur.', mom: 'Heißhungerattacken oder seltsame Gelüste nehmen zu.' },
    23: { size: 'eine Grapefruit', image: '/images/grapefruit.png', cm: 28.9, g: 500, feeling: 'Schwere Beine', tip: 'Besorg ihr Kompressionsstrümpfe oder Fußmassage.', development: 'Die Lungen entwickeln sich weiter (Atembewegungen werden geübt).', mom: 'Übungswehen (Harter Bauch) können sporadisch auftreten.' },
    24: { size: 'ein Maiskolben', image: '/images/mais.png', cm: 30.0, g: 600, feeling: 'Sodbrennen', tip: 'Milch oder Mandeln bereitstellen.', development: 'Gleichgewichtssinn im Innenohr ist entwickelt.', mom: 'Der Magen wird nach oben gedrückt, Achtung Sodbrennen!' },
    25: { size: 'eine Rübe', image: '/images/ruebe.png', cm: 34.6, g: 660, feeling: 'Schlafprobleme', tip: 'Stillkissen zum Schlafen besorgen.', development: 'Die Kapillaren (kleine Blutgefäße) bilden sich aus.', mom: 'Schlafen wird schwieriger, da der Bauch im Weg ist.' },
    26: { size: 'eine Zucchini', image: '/images/zucchini.png', cm: 35.6, g: 760, feeling: 'Rückenschmerzen', tip: 'Schuhe binden übernehmen.', development: 'Die Augen öffnen sich erstmals.', mom: 'Rückenschmerzen durch das zusätzliche Gewicht.' },
    27: { size: 'ein Blumenkohl', image: '/images/blumenkohl.png', cm: 36.6, g: 875, feeling: 'Atemnot', tip: 'Treppen langsam gehen, Pausen machen.', development: 'Gehirnwellen zeigen Reaktionen auf Geräusche.', mom: 'Kurzatmigkeit, da die Gebärmutter auf das Zwerchfell drückt.' },
    28: { size: 'eine Aubergine', image: '/images/aubergine.png', cm: 37.6, g: 1005, feeling: '3. Trimester beginnt', tip: 'Kliniktasche Packliste durchgehen.', development: 'Es träumt jetzt (REM-Schlaf nachgewiesen).', mom: 'Die Brüste bereiten sich auf die Milchproduktion vor (Vormilch).' },
    29: { size: 'ein Butternuss-Kürbis', image: '/images/kuerbis_klein.png', cm: 38.6, g: 1153, feeling: 'Kindsbewegungen', tip: 'Spiel "Tritt-Antwort" mit dem Bauch.', development: 'Es kann die Körpertemperatur ansatzweise regeln.', mom: 'Vermehrt Krampfadern oder Besenreiser möglich.' },
    30: { size: 'eine Gurke', image: '/images/gurke.png', cm: 39.9, g: 1319, feeling: 'Sorgen & Ängste', tip: 'Geburtsvorbereitungskurs ernst nehmen.', development: 'Die Haut wird glatter, das Wollhaar (Lanugo) verschwindet.', mom: 'Der Gang wird zum "Watschelgang" durch das weichere Becken.' },
    31: { size: 'eine Ananas', image: '/images/ananas.png', cm: 41.1, g: 1502, feeling: 'Alles wird eng', tip: 'Hilf ihr aus dem Bett/Sofa hoch.', development: 'Alle 5 Sinne sind jetzt funktionsfähig.', mom: 'Der Druck auf die Blase nimmt wieder zu.' },
    32: { size: 'ein Chinakohl', image: '/images/chinakohl.png', cm: 42.4, g: 1702, feeling: 'Übungswehen', tip: 'Lerne Wehen zu tracken (Abstand messen).', development: 'Fingernägel sind komplett ausgebildet.', mom: 'Senkwehen können auftreten, der Bauch rutscht tiefer.' },
    33: { size: 'ein Sellerie', image: '/images/sellerie.png', cm: 43.7, g: 1918, feeling: 'Ungeduld', tip: 'Kinderzimmer fertig streichen/aufbauen.', development: 'Das Immunsystem übernimmt Antikörper der Mutter.', mom: 'Schlafstörungen nehmen zu, kein Platz mehr im Bett.' },
    34: { size: 'eine Honigmelone', image: '/images/honigmelone.png', cm: 45.0, g: 2146, feeling: 'Mutterschutz!', tip: 'Feiert ihren letzten Arbeitstag.', development: 'Bei Jungs wandern die Hoden in den Hodensack.', mom: 'Genieße den Mutterschutz! Füße hochlegen.' },
    35: { size: 'eine Kokosnuss', image: '/images/kokosnuss.png', cm: 46.2, g: 2383, feeling: 'Senkwehen', tip: 'Auto checken, Tank voll?', development: 'Nieren sind voll ausgereift.', mom: 'Häufiger Harndrang, aber leichteres Atmen wenn der Bauch sich senkt.' },
    36: { size: 'ein Kopfsalat', image: '/images/salat.png', cm: 47.4, g: 2622, feeling: 'Nestbau-Finale', tip: 'Kliniktasche ins Auto stellen.', development: 'Der Kopf rutscht tiefer ins Becken.', mom: 'Der Schleimpfropf könnte sich lösen (Zeichen für baldige Geburt).' },
    37: { size: 'ein Mangold', image: '/images/mangold.png', cm: 48.6, g: 2859, feeling: 'Bereit (Theoretisch)', tip: 'Dokumente griffbereit legen.', development: 'Lungenreife ist abgeschlossen. Kein Frühchen mehr.', mom: 'Starke Stimmungsschwankungen zwischen Angst und Vorfreude.' },
    38: { size: 'ein Lauch', image: '/images/lauch.png', cm: 49.8, g: 3083, feeling: 'Warten...', tip: 'Lenk sie ab. Kino, Essen, Spazieren.', development: 'Babyspeck wird angesetzt für die Tage nach der Geburt.', mom: 'Alles ist beschwerlich. Jede Bewegung ist ein Kraftakt.' },
    39: { size: 'eine Wassermelone', image: '/images/wassermelone.png', cm: 50.7, g: 3288, feeling: 'Jedes Ziehen zählt', tip: 'Handy immer auf Laut.', development: 'Platzmangel: Weniger Tritte, mehr Schieben.', mom: 'Echte Wehen könnten starten (regelmäßig, schmerzhaft).' },
    40: { size: 'ein Kürbis', image: '/images/kuerbis.png', cm: 51.2, g: 3462, feeling: 'Geburtstermin', tip: 'Ruhepol sein. Du schaffst das.', development: 'Bereit für den ersten Atemzug.', mom: 'Es kann jederzeit losgehen!' },
    41: { size: 'ein Riesen-Kürbis', image: '/images/riesenkuerbis.png', cm: 51.7, g: 3597, feeling: 'Überfällig', tip: 'Nervige Nachfragen von Verwandten abblocken.', development: 'Die Haut ist jetzt oft etwas trocken ("Waschfrauenhände").', mom: 'Warten auf die Einleitung oder den natürlichen Start.' }
};

export const POSTPARTUM_WEEKS = {
    1: { title: "Wochenbett-Start", feeling: "Adrenalin & Erschöpfung", tip: "Besuche rigoros begrenzen. Sie gehört ins Bett." },
    2: { title: "Baby-Blues", feeling: "Tränenmeer", tip: "Trösten, nicht 'fixen'. Es sind die Hormone." },
    3: { title: "Cluster-Feeding", feeling: "Dauer-Stillen", tip: "Richte ihr eine bequeme 'Still-Station' mit Snacks ein." },
    4: { title: "Erste Routine?", feeling: "Vorsichtige Zuversicht", tip: "Überimm eine feste Aufgabe (z.B. das Abend-Bad)." },
    5: { title: "Wachstumsschub", feeling: "Quengelig", tip: "Tragen, tragen, tragen. Der Gymnastikball ist dein Freund." },
    6: { title: "Nachsorge", feeling: "Körper-Check", tip: "Frag sie, wie der Arzttermin war. Sei sensibel mit dem Thema Rückbildung." },
    8: { title: "Alltag kehrt ein", feeling: "Neu-Orientierung", tip: "Plant kleine 'Wir-Momente' ohne Baby (wenn auch nur 10 Min)." },
    12: { title: "Die 4. Trimester-Grenze", feeling: "Aufwachen", tip: "Reflektiert zusammen: Was läuft gut, was nervt?" }
};

// Helper icon
// Helper icon
const CandleIcon = Sparkles;

export const LOSS_SHIELD_OPTIONS = [
    { title: "Besuch absagen", text: "Es ist okay, 'Nein' zu sagen. Schützt euren Raum.", icon: ShieldCheck },
    { title: "Digital Detox", text: "Handy in die Schublade. Die Welt kann warten.", icon: Moon },
    { title: "Türsteher spielen", text: "Du übernimmst die Kommunikation nach außen.", icon: User },
    { title: "Klingel aus", text: "Einfach mal nicht erreichbar sein.", icon: CheckCircle }
];

export const LOSS_CARE_OPTIONS = [
    { title: "Tee-Zeremonie", text: "Koch ihr ihren Lieblingstee und setz dich dazu.", icon: Utensils },
    { title: "Warmes Bad", text: "Lass ihr ein Bad einlaufen (wenn körperlich okay).", icon: Droplets },
    { title: "Nackenkissen", text: "Wärme hilft gegen Verspannungen durch Weinen/Trauer.", icon: Activity },
    { title: "Frische Luft", text: "5 Minuten am offenen Fenster oder im Garten.", icon: Sparkles }
];

export const LOSS_CONTENT = {
    acute: [
        { title: "Funktionieren", text: "In den ersten Stunden zählt nur das Nötigste: Essen, Trinken, Schlafen. Du bist der Captain.", icon: ShieldCheck },
        { title: "Abschirmen", text: "Sag alles ab. Handy aus oder auf Flugmodus. Nur engste Familie.", icon: Home },
        { title: "Der Schock", text: "Sie steht vielleicht unter Schock (zittert, friert, starrt). Decke sie zu, bleib da.", icon: CloudRain }
    ],
    physical: [
        { title: "Der Milcheinschuss", text: "Kann auch ohne Baby passieren (ca. Tag 3-5). Kühlen (Quarkwickel) und Pfefferminztee helfen.", icon: Droplets },
        { title: "Nachwehen", text: "Die Gebärmutter bildet sich zurück. Das schmerzt. Wärmflasche hilft.", icon: Activity },
        { title: "Wochenfluss", text: "Blutungen sind normal, auch nach einer Fehlgeburt. Ruhe ist Pflicht.", icon: Heart }
    ],
    bureocracy: [
        { title: "Mutterschutz?", text: "Ab der 24. SSW (oder >500g) hat sie vollen Mutterschutz (mind. 18 Wochen). Davor: Krankschreibung holen!", icon: FileText },
        { title: "Sternenkind", text: "Unter 500g ist es eine Fehlgeburt, aber ihr könnt es beim Standesamt eintragen lassen ('Sternenkind').", icon: Star },
        { title: "Bestattung", text: "Ab 500g gibt es eine Bestattungspflicht. Darunter oft ein Recht darauf. Fragt im Krankenhaus.", icon: Backpack }
    ],
    farewell: [
        { title: "Erinnerungen schaffen", text: "Macht Fotos (Hand/Fußabdruck). Auch wenn ihr sie jetzt nicht sehen wollt – später sind sie Gold wert.", icon: Camera },
        { title: "Rituale", text: "Zündet eine Kerze an. Schreibt einen Brief. Gebt dem Kind einen Namen.", icon: CandleIcon },
        { title: "Die Box", text: "Sammelt alles (Ultraschallbilder, Krankenhausband) in einer schönen Kiste.", icon: Box }
    ],
    dad: [
        { title: "Männer-Trauer", text: "Wir trauern oft 'handelnd' oder später. Das ist okay. Weine, wenn dir danach ist, aber zwing dich nicht.", icon: User },
        { title: "Der Fels", text: "Du musst jetzt stark sein, aber such dir einen Freund zum Reden. Nicht alles bei ihr abladen.", icon: ShieldCheck },
        { title: "Job", text: "Nimm dir frei. 'Kind krank' oder Krankschreibung für dich (psychische Belastung). Geh nicht sofort arbeiten.", icon: Backpack }
    ]
};

// Deprecated: Keeping generic guides for legacy support or summary view if needed, but mostly relying on LOSS_CONTENT now.
export const LOSS_GUIDES = [
    { title: "Die erste Woche", feeling: "Schock & Leere", tip: "Funktioniere für sie. Essen, Trinken, Abschirmen.", icon: CloudRain },
    { title: "Abschied nehmen", feeling: "Trauerarbeit", tip: "Rituale helfen. Ein Brief, eine Kerze, eine Kiste.", icon: CandleIcon }
];

export const getTasks = (mode, stage) => {
    if (mode === 'pregnancy') {
        if (stage === 1) return [{ id: 'p1-1', text: 'Arzttermine planen', category: 'Logistik' }, { id: 'p1-2', text: 'Codewörter definieren', category: 'Emotional' }, { id: 'p1-3', text: 'Snack-Notfall-Kit kaufen', category: 'Support' }];
        if (stage === 2) return [{ id: 'p2-1', text: 'Zimmer planen', category: 'Vorbereitung' }, { id: 'p2-2', text: 'Geburtskurs buchen', category: 'Logistik' }, { id: 'p2-3', text: 'Massage lernen', category: 'Support' }];
        if (stage === 3) return [{ id: 'p3-1', text: 'Weg zur Klinik testen', category: 'Notfall' }, { id: 'p3-2', text: 'Ruhe-Tag organisieren', category: 'Emotional' }, { id: 'p3-3', text: 'Anträge vorbereiten', category: 'Bürokratie' }];
    }
    if (mode === 'postpartum') {
        return [{ id: 'pp-1', text: 'Geburtsurkunde beantragen', category: 'Bürokratie' }, { id: 'pp-2', text: 'Krankenkasse informieren', category: 'Bürokratie' }, { id: 'pp-3', text: 'Kinderarzt U3 Termin', category: 'Gesundheit' }, { id: 'pp-4', text: 'Einkauf erledigen', category: 'Support' }, { id: 'pp-5', text: 'Besuch koordinieren', category: 'Gatekeeping' }];
    }
    if (mode === 'loss') {
        return [{ id: 'l-1', text: 'Krankmeldung/Mutterschutz klären', category: 'Bürokratie' }, { id: 'l-2', text: 'Bestatter kontaktieren', category: 'Logistik' }, { id: 'l-3', text: 'Abschiedsritual', category: 'Emotional' }, { id: 'l-4', text: 'Umfeld informieren', category: 'Kommunikation' }, { id: 'l-5', text: 'Rückbildung', category: 'Gesundheit' }];
    }
    return [];
};

export const HABITS_PREGNANCY = [
    { key: 'hydration', title: "Wasser", text: "Bring ihr ein Glas", icon: Droplets, color: 'blue' },
    { key: 'oasis', title: "Oase", text: "Tägliche Geste", icon: Sparkles, color: 'amber' },
    { key: 'reading', title: "Wissen", text: "Lies einen Artikel", icon: BookOpen, color: 'indigo' },
    { key: 'movement', title: "Bewegung", text: "Spaziergang?", icon: Activity, color: 'emerald' },
    { key: 'date_night', title: "Date Night", text: "Zeit zu zweit", icon: Heart, color: 'rose' },
    { key: 'nesting', title: "Nestbau", text: "Zimmer planen", icon: Home, color: 'stone' }
];

export const HABITS_POSTPARTUM = [
    { key: 'hydration', title: "Still-Snack", text: "Wasser & Nüsse", icon: Utensils, color: 'orange' },
    { key: 'nightshift', title: "Nacht-Held", text: "Wickeln übernehmen", icon: Moon, color: 'indigo' },
    { key: 'patience', title: "Geduld", text: "Durchatmen", icon: Feather, color: 'rose' },
    { key: 'fresh_air', title: "Frische Luft", text: "Rausgehen", icon: Sprout, color: 'emerald' },
    { key: 'shower', title: "Duschen", text: "Baby halten", icon: Droplets, color: 'blue' },
    { key: 'sleep', title: "Schlaf", text: "Mittagsschlaf", icon: Moon, color: 'stone' }
];

export const HABITS_LOSS = [
    { key: 'hydration', title: "Fürsorge", text: "Tee hinstellen", icon: Droplets, color: 'stone' },
    { key: 'shield', title: "Schutzschild", text: "Besuch abwehren", icon: ShieldCheck, color: 'zinc' },
    { key: 'silence', title: "Stille", text: "Kerze anzünden", icon: Sparkles, color: 'amber' },
    { key: 'nature', title: "Natur", text: "Waldspaziergang", icon: Sprout, color: 'emerald' },
    { key: 'writing', title: "Schreiben", text: "Tagebuch", icon: FileText, color: 'indigo' },
    { key: 'music', title: "Musik", text: "Playlist hören", icon: Play, color: 'rose' }
];

export const HOSPITAL_BAG_CONTENT = {
    documents: {
        title: "Dokumente",
        items: [
            { id: 'mutterpass', text: 'Mutterpass' },
            { id: 'kk', text: 'Versicherungskarte' },
            { id: 'perso', text: 'Ausweise (Beide)' },
            { id: 'stammbuch', text: 'Stammbuch / Heiratsurkunde' }
        ]
    },
    mom: {
        title: "Für Mama",
        items: [
            { id: 'shirts', text: '2-3 weite Shirts/Nachthemden' },
            { id: 'slip', text: 'Bequeme Unterwäsche' },
            { id: 'socks', text: 'Warme Socken' },
            { id: 'toiletries', text: 'Kulturbeutel & Lippenbalsam' },
            { id: 'snack_mom', text: 'Lieblings-Snacks' }
        ]
    },
    baby: {
        title: "Fürs Baby",
        items: [
            { id: 'body', text: '2 Bodys (Gr. 50/56)' },
            { id: 'strampler', text: 'Strampler & Jäckchen' },
            { id: 'ba_socks', text: 'Söckchen & Mütze' },
            { id: 'carseat', text: 'Babyschale (für Heimweg)' }
        ]
    },
    dad: {
        title: "Für Dich (Dad)",
        items: [
            { id: 'snacks', text: 'Essen & Trinken (!)' },
            { id: 'change', text: 'Wechselkleidung' },
            { id: 'tech', text: 'Powerbank & Ladekabel' },
            { id: 'music', text: 'Playlist & Kopfhörer' }
        ]
    }
};

export const RESOURCES = [
    {
        title: "Gesundheit & Notfall",
        color: "rose",
        items: [
            { name: "Embryotox", desc: "Medikamente in der Schwangerschaft", url: "https://www.embryotox.de", icon: Heart },
            { name: "116 117", desc: "Ärztlicher Bereitschaftsdienst", url: "tel:116117", icon: AlertTriangle },
            { name: "Giftnotruf", desc: "Übersicht aller Nummern", url: "https://www.bvl.bund.de/DE/Arbeitsbereiche/01_Lebensmittel/03_Verbraucher/09_Infothek/01_Notfallnummern/01_Giftnotruf/giftnotruf_node.html", icon: AlertTriangle }
        ]
    },
    {
        title: "Recht & Amt",
        color: "blue",
        items: [
            { name: "ElterngeldDigital", desc: "Offizielles Antragsportal", url: "https://elterngeld-digital.de", icon: Scale },
            { name: "Familienportal", desc: "Infos vom Bundesministerium", url: "https://familienportal.de", icon: Scale }
        ]
    },
    {
        title: "Support für Väter",
        color: "emerald",
        items: [
            { name: "Väter gGmbH", desc: "Anlaufstelle für Väterarbeit", url: "https://vaeter-ggmbh.de", icon: Baby },
            { name: "Männerberatungsnetz", desc: "Hilfe in Krisen", url: "https://www.maennerberatungsnetz.de", icon: Heart }
        ]
    }
];

export const LOSS_RESOURCES = [
    {
        title: "Akuthilfe & Seelsorge",
        color: "rose",
        items: [
            { name: "Telefonseelsorge", desc: "0800 111 0 111 (24/7 erreichbar)", url: "tel:08001110111", icon: Phone },
            { name: "Initiative Regenbogen", desc: "Kontaktkreis für trauernde Eltern", url: "https://www.initiative-regenbogen.de", icon: Heart }
        ]
    },
    {
        title: "Recht & Bestattung",
        color: "stone",
        items: [
            { name: "Dein Sternenkind", desc: "Kostenlose Fotografen", url: "https://www.dein-sternenkind.eu", icon: Camera },
            { name: "Bundesverband Verwaiste Eltern", desc: "Rechtliche Infos & Hilfe", url: "https://www.veid.de", icon: Scale }
        ]
    },
    {
        title: "Für Väter",
        color: "blue",
        items: [
            { name: "Sternenpapas", desc: "Austausch für betroffene Väter", url: "https://sternenpapas.de", icon: User },
            { name: "Männerberatungsnetz", desc: "Psychologische Unterstützung", url: "https://www.maennerberatungsnetz.de", icon: ShieldCheck }
        ]
    }
];

export const POSTPARTUM_RESOURCES = [
    {
        title: "Baby & Gesundheit",
        color: "emerald",
        items: [
            { name: "Kinderärzte im Netz", desc: "Arztsuche & Notfälle", url: "https://www.kinderaerzte-im-netz.de", icon: Heart },
            { name: "Giftnotruf", desc: "Im Notfall sofort wählen", url: "https://www.bvl.bund.de/DE/Arbeitsbereiche/01_Lebensmittel/03_Verbraucher/09_Infothek/01_Notfallnummern/01_Giftnotruf/giftnotruf_node.html", icon: AlertTriangle },
            { name: "Still-Lexikon", desc: "Fundiertes Wissen zum Stillen", url: "https://www.still-lexikon.de", icon: BookOpen }
        ]
    },
    {
        title: "Geld & Behörden",
        color: "blue",
        items: [
            { name: "Kindergeld", desc: "Antrag bei der Familienkasse", url: "https://www.arbeitsagentur.de/familie-und-kinder/kindergeld-zugang", icon: Scale },
            { name: "ElterngeldDigital", desc: "Antrag online ausfüllen", url: "https://elterngeld-digital.de", icon: Scale }
        ]
    },
    {
        title: "Papa & Alltag",
        color: "amber",
        items: [
            { name: "Väter gGmbH", desc: "Infos & Austausch", url: "https://vaeter-ggmbh.de", icon: User },
            { name: "Frühe Hilfen", desc: "Unterstützung vor Ort", url: "https://www.elternsein.info", icon: Home }
        ]
    }
];
export const ARTICLES = {
    father: {
        title: "Vater werden",
        icon: User,
        color: "indigo",
        content: [
            { headline: "Die neue Rolle", text: "Vatersein beginnt nicht erst bei der Geburt. Schon jetzt bist du der wichtigste Anker für deine Partnerin. Deine Stimme beruhigt das Baby, deine Anwesenheit gibt Sicherheit." },
            { headline: "Hormone auch beim Mann?", text: "Ja! Auch Männer erleben Hormonschwankungen (Couvade-Syndrom). Dein Testosteron sinkt leicht, damit du fürsorglicher wirst. Das ist Biologie!" },
            { headline: "Vorbereitung", text: "Nutz die Zeit für Dinge, die später schwerer werden: Zocken, Freunde treffen, Schlafen. Tank deine Akkus auf." }
        ]
    },
    partnership: {
        title: "Partnerschaft bewahren",
        icon: Heart,
        color: "emerald",
        content: [
            { headline: "Wir vs. Das Baby", text: "Das Baby wird der Mittelpunkt sein, aber ihr seid das Fundament. Pflegt eure Beziehung jetzt bewusst. Kleine Gesten zählen." },
            { headline: "Intimität verändert sich", text: "Sex in der Schwangerschaft ist anders, aber oft sehr intensiv. Redet über Ängste und Wünsche. Nichts ist 'normal', alles ist okay." },
            { headline: "Konflikte", text: "Schlafmangel und Sorgen sind Zündstoff. Wenn es kracht: Atmen. Es sind oft die Umstände, nicht der Partner." }
        ]
    },
    mental_load: {
        title: "Mental Load & Orga",
        icon: CheckSquare,
        color: "amber",
        content: [
            { headline: "Der unsichtbare Rucksack", text: "Mental Load ist das 'Daran-Denken', dass Dinge erledigt werden müssen. Termine, Geschenke, Kleidung. Oft trägt Mama das allein. Änder das!" },
            { headline: "Fair Play", text: "Teilt Aufgaben nicht nur aus, sondern übergebt die Verantwortung komplett (inklusive Daran-Denken). Wer kocht, schreibt auch den Einkaufszettel." },
            { headline: "Das Wochen-Meeting", text: "Setzt euch sonntags 15 Min hin: Was steht an? Wer macht was? Das spart unter der Woche Nerven und Streit." }
        ]
    },
    birth: {
        title: "Die Geburt (Papa-Guide)",
        icon: Baby,
        color: "rose",
        content: [
            { headline: "Deine Rolle im Kreißsaal", text: "Du bist nicht der Zuschauer, du bist der Co-Pilot. Wasser reichen, Mut machen, Stirn tupfen, Ärzte 'übersetzen'. Deine Ruhe überträgt sich auf sie." },
            { headline: "Wenn es anders kommt", text: "Not-Kaiserschnitt? Saugglocke? Bleib bei ihr (oder beim Baby, wenn sie versorgt wird). Du bist ihre Verbindung zur Realität." },
            { headline: "Der erste Schrei", text: "Es ist okay, wenn du nicht sofort weinst. Jeder reagiert anders. Aber genieß diesen Moment, er kommt nie wieder." }
        ]
    },
    finance: {
        title: "Finanzen & Recht",
        icon: Scale,
        color: "blue",
        content: [
            { headline: "Elterngeld & Elternzeit", text: "Der Klassiker: 12+2 Monate. Aber es gibt auch ElterngeldPlus für Teilzeit. Rechnet es frühzeitig durch!" },
            { headline: "Vaterschaftsanerkennung", text: "Seid ihr nicht verheiratet? Dann musst du die Vaterschaft offiziell anerkennen (Jugendamt/Standesamt). Genauso das Sorgerecht." },
            { headline: "Kindergeld", text: "Gibt's für alle. Antrag bei der Familienkasse stellen (geht oft schon online vorbereitet)." }
        ]
    }
};
