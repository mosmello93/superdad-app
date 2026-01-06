import {
    Heart, Calendar, CheckCircle, Circle, MessageCircle, Activity, ChevronRight,
    ShieldCheck, Droplets, Sparkles, Cookie, ArrowUpRight, Battery, MessageSquare,
    Baby, Star, CloudRain, Feather, HelpCircle, BookOpen, User, Moon, Utensils,
    RefreshCw, Wand2, Trash2, Backpack, X, CheckSquare, Phone, MapPin,
    AlertTriangle, Navigation, Scale, Home, LayoutGrid, Sprout, Ruler, Weight,
    Timer, Play, Square, Clock, History, Bell, Trophy, Award, Zap, FileText, Camera, Box, Thermometer, Users
} from 'lucide-react';

export const OASIS_IDEAS = {
    trimester1: [
        { title: "Ingwer-Held", text: "Koch ihr einen frischen Ingwer-Tee gegen die Übelkeit." },
        { title: "Snack-Service", text: "Schneide ihr Obst klein und stell es kommentarlos hin." },
        { title: "Ruhe-Pol", text: "Nimm ihr heute Abend alles ab, damit sie um 20 Uhr schlafen kann." },
        { title: "Frische Luft", text: "Ein kurzer, langsamer Spaziergang im Park (hilft gegen Müdigkeit)." },
        { title: "Geruchs-Wächter", text: "Lüfte die Wohnung gut durch und vermeide starke Parfums." },
        { title: "Smoothie", text: "Mix ihr einen grünen Smoothie (Eisen & Vitamine), wenn sie nichts Schweres essen kann." },
        { title: "Kissen-Check", text: "Braucht sie ein extra Kissen für den Rücken? Frag einfach mal." },
        { title: "Digital Detox", text: "Legt beide die Handys weg und redet 15 Min nur über euch (nicht über Sorgen)." }
    ],
    conception: [
        { title: "Zuversicht", text: "Erinnere sie daran, dass ihr ein Team seid, egal was passiert." },
        { title: "Ablenkung", text: "Plan ein Date, bei dem das Thema 'Baby' tabu ist." },
        { title: "Kleine Geste", text: "Bring ihr Blumen oder Schokolade mit - einfach so." },
        { title: "Zuhörer", text: "Frag sie, wie es ihr wirklich geht, und hör einfach nur zu." },
        { title: "Entspannung", text: "Lass ihr ein Bad einlaufen oder biete eine Massage an." },
        { title: "Gesundheit", text: "Koch heute mal besonders frisch und gesund für euch beide." },
        { title: "Bewegung", text: "Macht zusammen Sport oder einen langen Spaziergang." }
    ],
    trimester2: [
        { title: "Date Night", text: "Plan ein kleines Date (Kino oder schick essen), solange es noch leicht geht." },
        { title: "Bauch-Öl", text: "Besorg ein gutes Pflegeöl und biete an, den Bauch einzucremen." },
        { title: "Kompliment", text: "Sag ihr, wie wunderschön sie mit dem Babybauch aussieht." },
        { title: "Ausflug", text: "Fahrt am Wochenende irgendwo hin, wo ihr noch nie wart." },
        { title: "Nestbau-Support", text: "Frag sie: 'Was wolltest du im Kinderzimmer schon immer erledigt haben?' und mach es." },
        { title: "Foto-Session", text: "Mach ein schönes Foto von ihr und dem Bauch (nicht nur Selfies)." },
        { title: "Kino", text: "Geht ins Kino. Bald wird das für lange Zeit schwierig." },
        { title: "Zuhören", text: "Frag nach ihren Träumen für das Baby. Wie stellt sie sich das Leben vor?" }
    ],
    trimester3: [
        { title: "Schuh-Service", text: "Binde ihr heute die Schuhe zu. Der Bauch ist im Weg!" },
        { title: "Rücken-Retter", text: "Eine 5-Minuten Massage für den unteren Rücken wirkt Wunder." },
        { title: "Kissen-Burg", text: "Arrangiere ihre Kissen im Bett oder auf dem Sofa neu für maximalen Komfort." },
        { title: "Chauffeur", text: "Fahr sie überall hin. Laufen ist jetzt Sport." },
        { title: "Beine hoch", text: "Leg ihre Beine hoch und massiere vorsichtig die Waden." },
        { title: "Lackier-Dienst", text: "Kann sie ihre Fußnägel noch sehen? Falls nicht: Biete an, sie zu lackieren (oder zum Profi zu fahren)." },
        { title: "Kliniktasche", text: "Check heimlich, ob sie wirklich alles hat. Pack ihren Lieblingsriegel dazu." },
        { title: "Emotionen", text: "Wenn sie weint: Nimm sie in den Arm. Sag nichts. Halte sie einfach." }
    ],
    postpartum: [
        { title: "Dusch-Wächter", text: "Nimm das Baby für 30 Min, damit sie in Ruhe (!) duschen kann." },
        { title: "Chefkoch", text: "Koche ihr Lieblingsessen (oder bestell es). Stillen macht hungrig." },
        { title: "Wasser-Marsch", text: "Stell ihr bei jedem Stillen ungefragt ein großes Glas Wasser hin." },
        { title: "Nachtschicht", text: "Übernimm heute das Wickeln nach dem Stillen in der Nacht." },
        { title: "Mutmacher", text: "Sag ihr, dass sie eine fantastische Mutter ist." },
        { title: "Einkauf", text: "Geh einkaufen, ohne dass sie eine Liste schreiben muss. Check selbst, was fehlt." },
        { title: "Rausgehen", text: "Schick sie für eine Stunde alleine raus. Spazieren, Kaffee trinken, Luft atmen." },
        { title: "Handy-Dienst", text: "Mach Fotos von IHR mit dem Baby. Mamas fehlen oft auf Bildern." }
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
    4: {
        size: 'ein Mohnsamen', image: '/images/mohnsamen.png', color: 'from-indigo-100/80 to-white/50 border-indigo-200', cm: 0.1, g: 1, feeling: 'Hoffnung & Geheimnis', tip: 'Noch nix sagen, aber Folsäure checken.',
        development: {
            summary: 'Die Eizelle nistet sich in der Gebärmutter ein. Der Beginn von allem.',
            details: [
                { headline: "Einnistung", text: "Der Embryo gräbt sich in die Gebärmutterschleimhaut ein. Das kann leicht ziehen." },
                { headline: "Zellteilung", text: "Aus einer Zelle werden Tausende. Drei Schichten entstehen, aus denen später Organe werden." },
                { headline: "Größe", text: "Kleiner als das i-Tüpfelchen auf dieser Seite. Aber mit komplettem genetischen Code!" }
            ]
        },
        mom: {
            summary: 'Vielleicht eine leichte Einnistungsblutung oder Ziehen.',
            details: [
                { headline: "Hormonanstieg", text: "Das HCG-Hormon steigt rasant an. Das sorgt für den positiven Test!" },
                { headline: "Symptome", text: "Viele spüren noch gar nichts, andere sind schon extrem müde oder haben empfindliche Brüste." },
                { headline: "Partner-Tipp", text: "Besorg Folsäure, falls sie es noch nicht nimmt. Sei der vorbereitete Held." }
            ]
        }
    },
    5: {
        size: 'ein Sesamkorn', image: '/images/sesam.png', color: 'from-amber-100/80 to-white/50 border-amber-200', cm: 0.2, g: 1, feeling: 'Ahnung & Aufregung', tip: 'Verzicht auf Alkohol/Zigaretten unterstützen.',
        development: {
            summary: 'Das Herz beginnt zu schlagen (noch nicht hörbar).',
            details: [
                { headline: "Herzschlag", text: "Das Herz ist eines der ersten Organe, das arbeitet. Es pumpt Blut durch den winzigen Körper." },
                { headline: "Form", text: "Der Embryo sieht aus wie eine kleine Kaulquappe. Kopf und Schwanz sind erkennbar." },
                { headline: "Fun Fact", text: "Die ersten Blutgefäße entstehen noch vor dem Herzen – die Infrastruktur steht zuerst." }
            ]
        },
        mom: {
            summary: 'Müdigkeit und Spannungsgefühle in den Brüsten können auftreten.',
            details: [
                { headline: "Müdigkeit", text: "Der Körper leistet Schwerstarbeit. Sie könnte jetzt 12 Stunden schlafen und wäre immer noch müde." },
                { headline: "Geruchssinn", text: "Kaffee oder Parfüm könnten plötzlich ekelhaft riechen. Der 'Super-Riecher' schlägt an." },
                { headline: "Partner-Tipp", text: "Wenn sie müde ist: Frag nicht, mach einfach. Wäsche, Essen, Aufräumen." }
            ]
        }
    },
    6: {
        size: 'eine Erbse', image: '/images/erbse.png', color: 'from-green-100/80 to-white/50 border-green-200', cm: 0.5, g: 1, feeling: 'Müdigkeit kickt rein', tip: 'Lass sie schlafen. Übernimm den Einkauf.',
        development: {
            summary: 'Das Neuralrohr (Vorläufer von Gehirn & Rückenmark) schließt sich.',
            details: [
                { headline: "Gesichtszüge", text: "Augen, Ohren und Mund sind als dunkle Flecken zu erahnen." },
                { headline: "Organe", text: "Leber, Nieren und Lunge beginnen sich zu formen. Alles ist im Aufbau." },
                { headline: "Speed", text: "Das Herz schlägt jetzt doppelt so schnell wie deins (ca. 100-160 bpm)." }
            ]
        },
        mom: {
            summary: 'Häufiger Harndrang und erste Übelkeit sind typisch.',
            details: [
                { headline: "Übelkeit", text: "Die berüchtigte Morgenübelkeit kann den ganzen Tag dauern. Ingwer hilft oft." },
                { headline: "Blase", text: "Die wachsende Gebärmutter drückt auf die Blase. Sie muss ständig aufs Klo." },
                { headline: "Partner-Tipp", text: "Kauf Snacks für den Nachttisch. Ein Keks VOR dem Aufstehen hilft oft gegen Übelkeit." }
            ]
        }
    },
    7: {
        size: 'eine Blaubeere', image: '/images/blaubeere.png', color: 'from-blue-100/80 to-white/50 border-blue-200', cm: 1.0, g: 1, feeling: 'Übelkeit & Ekel', tip: 'Koche geruchsneutral. Ingwertee besorgen.',
        development: {
            summary: 'Arm- und Beinknospen werden sichtbar. Es wächst rasant.',
            details: [
                { headline: "Hände & Füße", text: "Kleine Paddel wachsen dort, wo mal Arme und Beine sein werden." },
                { headline: "Bewegung", text: "Es zuckt schon, aber viel zu klein, um es zu spüren." },
                { headline: "Schwanz", text: "Der Embryo hat noch einen kleinen Schwanzfortsatz (Reste der Evolution), der bald verschwindet." }
            ]
        },
        mom: {
            summary: 'Geruchsempfindlichkeit und Antipathie gegen bestimmte Speisen.',
            details: [
                { headline: "Essen", text: "Was gestern noch schmeckte, kann heute Ekel auslösen. Sei flexibel beim Kochen." },
                { headline: "Stimmung", text: "Himmelhoch jauchzend, zu Tode betrübt. Die Hormone fahren Achterbahn." },
                { headline: "Partner-Tipp", text: "Nimm ihre Launen nicht persönlich. Es spricht das Progesteron, nicht sie." }
            ]
        }
    },
    8: {
        size: 'eine Himbeere', image: '/images/himbeere.png', color: 'from-rose-200/80 to-white/50 border-rose-300', cm: 1.6, g: 1, feeling: 'Gefühlschaos', tip: 'Sei ihr Blitzableiter für Launen.',
        development: {
            summary: 'Finger und Zehen beginnen sich zu formen. Schwimmhäute verschwinden.',
            details: [
                { headline: "Finger", text: "Die 'Paddel' teilen sich. Winzige Finger entstehen." },
                { headline: "Proportionen", text: "Der Kopf ist riesig im Vergleich zum Körper, damit das Gehirn wachsen kann." },
                { headline: "Nase", text: "Die Nasenspitze ist jetzt erkennbar. Es bekommt ein Gesicht!" }
            ]
        },
        mom: {
            summary: 'Die Gebärmutter wächst, was auf die Blase drückt.',
            details: [
                { headline: "Bauch?", text: "Man sieht noch nichts, aber die Hose könnte schon zwicken (Blähbauch)." },
                { headline: "Haut", text: "Manche bekommen strahlende Haut, andere 'Pubertäts-Pickel'. Alles normal." },
                { headline: "Partner-Tipp", text: "Sag ihr, dass sie schön ist. Auch (oder gerade) wenn sie sich aufgedunsen fühlt." }
            ]
        }
    },
    9: {
        size: 'eine Olive', image: '/images/olive.png', color: 'from-green-200/80 to-white/50 border-green-300', cm: 2.3, g: 2, feeling: 'Erschöpfung', tip: 'Bring ihr Snacks ans Bett bevor sie aufsteht.',
        development: {
            summary: 'Muskeln bilden sich, erste spontane Bewegungen.',
            details: [
                { headline: "Bewegung", text: "Arme und Beine können gebeugt werden. Es ist ein kleines Gummibärchen in Action." },
                { headline: "Herz", text: "Das Herz ist fertig entwickelt und schlägt sehr schnell (ca. 160 bpm)." },
                { headline: "Organe", text: "Darm, Leber, Nieren – alles ist da und beginnt zu 'üben'." }
            ]
        },
        mom: {
            summary: 'Kreislaufprobleme und Müdigkeit sind jetzt Hochleistungssport.',
            details: [
                { headline: "Kreislauf", text: "Das Blutvolumen steigt, die Gefäße weiten sich -> Schwindel ist häufig." },
                { headline: "Brüste", text: "Sie wachsen und können sehr empfindlich sein. BH-Kauf steht vielleicht an." },
                { headline: "Partner-Tipp", text: "Kauf alkoholfreien Sekt/Wein, damit sie beim Anstoßen nicht nur Wasser hat." }
            ]
        }
    },
    10: {
        size: 'eine Pflaume', image: '/images/pflaume.png', color: 'from-purple-200/80 to-white/50 border-purple-300', cm: 3.1, g: 4, feeling: 'Hormon-Party', tip: 'Erster Ultraschall? Nimm dir frei!',
        development: {
            summary: 'Alle lebenswichtigen Organe sind angelegt. Die kritischste Phase endet bald.',
            details: [
                { headline: "Organe fertig", text: "Ab jetzt müssen sie 'nur' noch wachsen und reifen." },
                { headline: "Zähne", text: "Im Kiefer bilden sich schon die Anlagen für die Milchzähne!" },
                { headline: "Schwanz weg", text: "Der kleine Schwanzfortsatz ist komplett verschwunden. Hallo Mensch!" }
            ]
        },
        mom: {
            summary: 'Das Blutvolumen steigt, was für mehr Durst sorgt.',
            details: [
                { headline: "Durst", text: "Sie braucht viel Flüssigkeit. Stell ihr immer Wasser hin." },
                { headline: "Ultraschall", text: "Oft findet jetzt der erste große Ultraschall statt. Taschentücher bereit?" },
                { headline: "Partner-Tipp", text: "Biete eine Fußmassage an. Das entspannt und verbindet." }
            ]
        }
    },
    11: {
        size: 'eine Limette', image: '/images/limette.png', color: 'from-lime-200/80 to-white/50 border-lime-300', cm: 4.1, g: 7, feeling: 'Durst & Harndrang', tip: 'Immer Wasserflasche auffüllen.',
        development: {
            summary: 'Die Haut ist noch durchsichtig; Finger sind getrennt.',
            details: [
                { headline: "Haut", text: "Die Haut ist hauchdünn, man sieht Adern durchschimmern." },
                { headline: "Reflexe", text: "Es kann schon schlucken und treten (unbemerkt)." },
                { headline: "Geruch", text: "Die Nase entwickelt sich weiter. Es könnte theoretisch riechen (wenn da Luft wäre)." }
            ]
        },
        mom: {
            summary: 'Haare und Nägel können sich verändern (oft zum Positiven!).',
            details: [
                { headline: "Glow", text: "Durch die bessere Durchblutung sehen viele Schwangere jetzt frischer aus." },
                { headline: "Wärme", text: "Ihr ist oft wärmer als dir. Ein Hoch auf die Heizkosten." },
                { headline: "Partner-Tipp", text: "Lüfte oft. Frische Luft hilft gegen Übelkeit und Hitzewallungen." }
            ]
        }
    },
    12: {
        size: 'eine Aprikose', image: '/images/aprikose.png', color: 'from-orange-100/80 to-white/50 border-orange-200', cm: 5.4, g: 14, feeling: 'Aufatmen (1. Etappe)', tip: 'Verkündet es der Familie!',
        development: {
            summary: 'Die einzigartigen Fingerabdrücke entstehen. Ein Meilenstein!',
            details: [
                { headline: "Fingerabdruck", text: "Die Rillen an den Fingerkuppen bilden sich. Ein absolutes Unikat." },
                { headline: "Gesicht", text: "Die Augen wandern von der Seite nach vorne. Es sieht immer menschlicher aus." },
                { headline: "Refplexe", text: "Es nuckelt am Daumen und 'atmet' Fruchtwasser, um die Muskeln zu trainieren." }
            ]
        },
        mom: {
            summary: 'Die Übelkeit lässt bei vielen Frauen langsam nach. Das 2. Trimester naht!',
            details: [
                { headline: "Besserung", text: "Das HCG sinkt leicht, die Plazenta übernimmt. Vielen geht es schlagartig besser." },
                { headline: "Bauch", text: "Die Gebärmutter wächst aus dem Becken heraus. Ein kleiner Babybump kann sichtbar werden." },
                { headline: "Partner-Tipp", text: "Planungs-Zeit: Jetzt ist ein guter Moment, um über Elternzeit-Modelle zu sprechen." }
            ]
        }
    },
    13: {
        size: 'eine Zitrone', image: '/images/zitrone.png', color: 'from-yellow-200/80 to-white/50 border-yellow-300', cm: 7.4, g: 23, feeling: 'Energie kehrt zurück', tip: 'Plant einen kleinen Ausflug.',
        development: {
            summary: 'Der Saugreflex entwickelt sich (Daumenlutschen möglich).',
            details: [
                { headline: "Stimmbänder", text: "Die Stimmbänder bilden sich. Schreien kann es aber erst nach der Geburt (dank Luft)." },
                { headline: "Darm", text: "Der Darm wandert vom Nabel in den Bauchraum." },
                { headline: "Eierstöcke", text: "Bei Mädchen sind jetzt schon ca. 2 Millionen Eizellen angelegt!" }
            ]
        },
        mom: {
            summary: 'Die "kritische Phase" ist vorbei, die Libido kann zurückkehren.',
            details: [
                { headline: "Libido", text: "Durch die bessere Durchblutung im Becken haben viele Frauen jetzt (wieder) mehr Lust." },
                { headline: "Aufatmen", text: "Das Risiko für eine Fehlgeburt sinkt dramatisch. Die entspannte Phase beginnt." },
                { headline: "Partner-Tipp", text: "Genießt die Zweisamkeit. Das zweite Trimester ist oft die schönste Phase." }
            ]
        }
    },
    14: {
        size: 'eine Orange', image: '/images/orange.png', color: 'from-orange-200/80 to-white/50 border-orange-300', cm: 8.7, g: 43, feeling: 'Babybauch wächst', tip: 'Mach die ersten Bauch-Fotos.',
        development: {
            summary: 'Das Baby beginnt, Fruchtwasser zu trinken und auszuscheiden.',
            details: [
                { headline: "Nieren", text: "Die Nieren arbeiten! Es trinkt Fruchtwasser und pinkelt es wieder aus. Kreislauf des Lebens." },
                { headline: "Haare", text: "Ein feiner Flaum (Lanugo) bedeckt den Körper zum Schutz der Haut." },
                { headline: "Mimik", text: "Es kann schon Grimassen schneiden – Stirnrunzeln und Lächeln üben." }
            ]
        },
        mom: {
            summary: 'Ein kleines Bäuchlein könnte sichtbar werden.',
            details: [
                { headline: "Umstandsmode", text: "Zeit für Hosen mit dehnbarem Bund. Nichts sollte drücken." },
                { headline: "Zahnfleisch", text: "Zahnfleischbluten ist häufig (bessere Durchblutung). Weiche Zahnbürste nutzen!" },
                { headline: "Partner-Tipp", text: "Geh mit zum Shoppen (oder bestell online). Bestärke sie, dass der Bauch toll aussieht." }
            ]
        },
    },
    15: {
        size: 'ein Apfel', image: '/images/apfel.png', color: 'from-red-200/80 to-white/50 border-red-200', cm: 10.1, g: 70, feeling: 'Libido schwankt', tip: 'Geduld und Zärtlichkeit ohne Druck.',
        development: {
            summary: 'Es kann jetzt Lichtveränderungen wahrnehmen, obwohl die Augen zu sind.',
            details: [
                { headline: "Lichtscheu", text: "Wenn du mit einer Taschenlampe auf den Bauch leuchtest, könnte es sich wegdrehen." },
                { headline: "Beine", text: "Die Beine wachsen jetzt schneller als die Arme." },
                { headline: "Knochen", text: "Die Gehörknöchelchen verhärten sich. Es fängt an, Geräusche zu ahnen." }
            ]
        },
        mom: {
            summary: 'Das Herzzeitvolumen steigt um bis zu 40%.',
            details: [
                { headline: "Herzklopfen", text: "Ihr Herz muss viel mehr Blut pumpen. Sie kommt schneller außer Puste." },
                { headline: "Vergesslichkeit", text: "'Schwangerschaftsdemenz' ist real. Das Gehirn strukturiert sich tatsächlich um." },
                { headline: "Partner-Tipp", text: "Sei ihr externes Gedächtnis. Schreib Termine auf, erinnere sie liebevoll." }
            ]
        }
    },
    16: {
        size: 'eine Avocado', image: '/images/avocado.png', color: 'from-emerald-200/80 to-white/50 border-emerald-300', cm: 11.6, g: 100, feeling: 'Nestbautrieb startet', tip: 'Entrümple das Arbeitszimmer/Zukünftiges Kinderzimmer.',
        development: {
            summary: 'Das Herz pumpt ca. 24 Liter Blut pro Tag. Rückenmuskeln werden stärker.',
            details: [
                { headline: "Krafttraining", text: "Es richtet sich auf und streckt sich. Die Nackenmuskeln halten den Kopf." },
                { headline: "Grimassen", text: "Stirn runzeln, schielen, Mund verziehen – es trainiert die Gesichtsmuskeln." },
                { headline: "Blutgruppe", text: "Die Blutgruppe ist jetzt bestimmt und das Rhesus-System ist fertig." }
            ]
        },
        mom: {
            summary: 'Vielleicht spürt sie das erste "Flattern" (Kindsbewegungen).',
            details: [
                { headline: "Quickening", text: "Fühlt sich an wie Schmetterlinge oder platzende Seifenblasen. Erstgebärende spüren es oft später (bis Woche 20)." },
                { headline: "Bindung", text: "Das Spüren macht das Baby plötzlich viel realer. Ein magischer Moment." },
                { headline: "Partner-Tipp", text: "Frag sie, wie sich das 'Flattern' anfühlt. Leg die Hand auf, auch wenn du noch nichts spürst." }
            ]
        }
    },
    17: {
        size: 'eine Birne', image: '/images/birne.png', color: 'from-lime-100/80 to-white/50 border-lime-200', cm: 13.0, g: 140, feeling: 'Bänderdehnung', tip: 'Biete ihr eine Rückenmassage an.',
        development: {
            summary: 'Das Skelett verknöchert langsam. Die Knorpel werden zu festen Knochen.',
            details: [
                { headline: "Skelett-Umbau", text: "Aus dem weichen Knorpel wird jetzt harter Knochen. Auch die Gehörknöchelchen verfestigen sich – das Baby beginnt zu hören!" },
                { headline: "Proportionen", text: "Die Beine sind jetzt länger als die Arme. Das Baby sieht immer mehr aus wie ein 'richtiger' Mensch." },
                { headline: "Schluckauf", text: "Es hat jetzt öfter Schluckauf. Das trainiert das Zwerchfell für die Atmung." }
            ]
        },
        mom: {
            summary: 'Die Mutterbänder dehnen sich, was Ziehen in der Leiste verursacht.',
            details: [
                { headline: "Mutterbänder", text: "Die Gebärmutter wächst rasant. Die Haltebänder (Mutterbänder) müssen Schwerstarbeit leisten, was oft als stechender Schmerz in der Leiste spürbar ist." },
                { headline: "Kreislauf", text: "Das Herz muss viel mehr Blut pumpen. Schwindel beim schnellen Aufstehen ist normal. Langsam machen!" },
                { headline: "Partner-Tipp", text: "Biete ihr an, den schweren Einkauf zu tragen. Ihre Bänder danken es dir." }
            ]
        }
    },
    18: {
        size: 'eine Paprika', image: '/images/paprika.png', color: 'from-red-200/80 to-white/50 border-red-300', cm: 14.2, g: 190, feeling: 'Erstes Flattern?', tip: 'Hand auf den Bauch, Geduld haben.',
        development: {
            summary: 'Die Ohren sind an der richtigen Stelle; Hören beginnt. Es kann dich hören!',
            details: [
                { headline: "Gehör", text: "Die Gehörknöchelchen sind fest. Es hört deinen Herzschlag und gedämpfte Stimmen." },
                { headline: "Nerven", text: "Die Nervenbahnen werden mit Myelin umhüllt (Isolierung). Das beschleunigt die Reizleitung." },
                { headline: "Fingerabdruck", text: "Die unverwechselbaren Linien an Fingern und Zehen sind jetzt komplett fertig." }
            ]
        },
        mom: {
            summary: 'Der Schwerpunkt verlagert sich, was zu Rückenschmerzen führen kann.',
            details: [
                { headline: "Rücken", text: "Der Bauch zieht nach vorne, man geht ins Hohlkreuz. Achte auf deine Haltung!" },
                { headline: "Kreislauf", text: "Schwindel ist immer noch möglich, da der Blutdruck im 2. Trimester oft niedrig ist." },
                { headline: "Partner-Tipp", text: "Ein Kissen zwischen den Beinen hilft beim Schlafen. Besorg ihr ein Seitenschläferkissen?" }
            ]
        }
    },
    19: {
        size: 'eine Mango', image: '/images/mango.png', color: 'from-orange-200/80 to-white/50 border-orange-300', cm: 15.3, g: 240, feeling: 'Heißhunger', tip: 'Geh auch nachts für Eis zur Tanke.',
        development: {
            summary: 'Vernix (Käseschmiere) bildet sich zum Hautschutz im Fruchtwasser.',
            details: [
                { headline: "Käseschmiere", text: "Eine weiße Fettschicht schützt die zarte Haut vor dem Aufweichen im Wasser." },
                { headline: "Sinne", text: "Geschmacks- und Tastsinn entwickeln sich rasant. Es schmeckt, was Mama isst." },
                { headline: "Lanugo", text: "Der Körper ist jetzt komplett von feinem Wollhaar bedeckt." }
            ]
        },
        mom: {
            summary: 'Pigmentveränderungen (Linea Nigra) können am Bauch erscheinen.',
            details: [
                { headline: "Linea Nigra", text: "Die dunkle Linie vom Nabel abwärts kommt vom Melanin. Sie verblasst nach der Geburt." },
                { headline: "Maske", text: "Auch im Gesicht können Pigmentflecken auftreten (Chloasma). Sonnenschutz ist wichtig." },
                { headline: "Partner-Tipp", text: "Koch ihr was Leckeres. Heißhunger ist jetzt real (und der Bedarf an Kalorien steigt leicht)." }
            ]
        }
    },
    20: {
        size: 'eine Banane', image: '/images/banane.png', color: 'from-yellow-200/80 to-white/50 border-yellow-300', cm: 16.4, g: 300, feeling: 'Halbzeit!', tip: 'Feiert Bergfest. Geht schick essen.',
        development: {
            summary: 'Geschlechtsorgane sind im Ultraschall gut erkennbar. Mädchen oder Junge?',
            details: [
                { headline: "Geschlecht", text: "Bei Mädchen sind Eierstöcke (mit Millionen Eizellen!) angelegt, bei Jungs die Hoden." },
                { headline: "Haare", text: "Kopfhaar beginnt zu wachsen. Manche Babys kommen mit Frisur zur Welt." },
                { headline: "Zähne", text: "Die bleibenden Zähne (unter den Milchzähnen) werden jetzt schon angelegt." }
            ]
        },
        mom: {
            summary: 'Der Bauchnabel wölbt sich eventuell nach außen (der \'Plop\').',
            details: [
                { headline: "Bauchnabel", text: "Wenn die Gebärmutter drückt, ploppt der Nabel raus. Das ist normal und geht zurück." },
                { headline: "Halbzeit", text: "20 Wochen geschafft, 20 to go. Viele fühlen sich jetzt am wohlsten." },
                { headline: "Partner-Tipp", text: "Halbzeit! Feiert das mit einem alkoholfreien Drink oder einem schönen Abendessen." }
            ]
        }
    },
    21: {
        size: 'eine Karotte', image: '/images/karotte.png', color: 'from-orange-200/80 to-white/50 border-orange-300', cm: 26.7, g: 360, feeling: 'Bewegungsdrang', tip: 'Geht zusammen schwimmen (entlastet den Rücken).',
        development: {
            summary: 'Der Schlaf-Wach-Rhythmus pendelt sich ein.',
            details: [
                { headline: "Größensprung", text: "Ab jetzt messen Ärzte oft vom Scheitel bis zur Ferse (nicht mehr bis zum Po). Daher der Sprung auf 26cm!" },
                { headline: "Rhythmus", text: "Leider ist der oft umgekehrt zu Mama: Wenn sie läuft, schläft es (Geschaukel). Wenn sie liegt, wacht es auf." },
                { headline: "Die Leber", text: "Die Leber beginnt, Blutzellen abzubauen. Das ist wichtig für den Stoffwechsel." }
            ]
        },
        mom: {
            summary: 'Wassereinlagerungen in Beinen und Füßen sind möglich.',
            details: [
                { headline: "Ödeme", text: "Füße hochlegen! Wasser lagert sich im Gewebe ein. Viel trinken hilft (klingt unlogisch, ist aber so)." },
                { headline: "Krampfadern", text: "Das zusätzliche Gewicht drückt auf die Venen. Kompressionsstrümpfe können helfen." },
                { headline: "Partner-Tipp", text: "Ihre Füße könnten anschwellen. Ein kaltes Fußbad am Abend wirkt Wunder." }
            ]
        }
    },
    22: {
        size: 'eine Papaya', image: '/images/papaya.png', color: 'from-orange-200/80 to-white/50 border-orange-300', cm: 27.8, g: 430, feeling: 'Tritte werden stärker', tip: 'Sprich mit dem Bauch, er hört dich jetzt.',
        development: {
            summary: 'Der Tastsinn verfeinert sich, es greift nach der Nabelschnur.',
            details: [
                { headline: "Greifen", text: "Es spielt mit der Nabelschnur. Keine Sorge, die ist robust und knickt nicht ab." },
                { headline: "Hören", text: "Es kann deine Stimme von anderen unterscheiden. Sprich viel mit ihm!" },
                { headline: "Augenbrauen", text: "Feine Härchen als Augenbrauen werden sichtbar. Es bekommt Charakter!" }
            ]
        },
        mom: {
            summary: 'Heißhungerattacken oder seltsame Gelüste nehmen zu.',
            details: [
                { headline: "Gelüste", text: "Gurken mit Nutella? Der Körper holt sich, was er braucht (oder die Hormone spielen verrückt)." },
                { headline: "Blase", text: "Tritte gegen die Blase sind jetzt ein beliebter Sport des Babys." },
                { headline: "Partner-Tipp", text: "Der Bauch wird schwerer. Hilf ihr beim Aufstehen vom Sofa oder aus dem Bett." }
            ]
        }
    },
    23: {
        size: 'eine Grapefruit', image: '/images/grapefruit.png', color: 'from-red-200/80 to-white/50 border-red-300', cm: 28.9, g: 500, feeling: 'Schwere Beine', tip: 'Besorg ihr Kompressionsstrümpfe oder Fußmassage.',
        development: {
            summary: 'Die Lungen entwickeln sich weiter (Atembewegungen werden geübt).',
            details: [
                { headline: "Atmung", text: "Es 'atmet' Fruchtwasser ein und aus, um die Lungen zu trainieren." },
                { headline: "Gleichgewicht", text: "Es spürt, wie es liegt (oben/unten), wenn Mama sich bewegt." },
                { headline: "Gehör", text: "Es kann jetzt tiefe Töne besser hören als hohe. Deine Stimme kommt super an, Papa!" }
            ]
        },
        mom: {
            summary: 'Übungswehen (Harter Bauch) können sporadisch auftreten.',
            details: [
                { headline: "Braxton-Hicks", text: "Der Bauch wird kurz hart (schmerzlos). Die Gebärmutter trainiert für den Marathon." },
                { headline: "Magnesium", text: "Kann gegen Wadenkrämpfe und zu viele Übungswehen helfen (Arzt fragen)." },
                { headline: "Partner-Tipp", text: "Sing ihr (und dem Baby) was vor. Oder lies eine Gute-Nacht-Geschichte." }
            ]
        }
    },
    24: {
        size: 'ein Maiskolben', image: '/images/mais.png', color: 'bg-yellow-100', cm: 30.0, g: 600, feeling: 'Sodbrennen', tip: 'Milch oder Mandeln bereitstellen.',
        development: {
            summary: 'Gleichgewichtssinn im Innenohr ist entwickelt. Es weiß, wo oben und unten ist.',
            details: [
                { headline: "Überlebensfähig", text: "Ab jetzt (24. Woche) haben Frühchen eine reale Überlebenschance bei medizinischer Versorgung." },
                { headline: "Haut", text: "Die Haut ist noch runzelig, da das Fettpolster noch fehlt." },
                { headline: "Wimpern", text: "Die Wimpern wachsen. Bald kann es damit klimpern (wenn die Augen aufgehen)." }
            ]
        },
        mom: {
            summary: 'Der Magen wird nach oben gedrückt, Achtung Sodbrennen!',
            details: [
                { headline: "Sodbrennen", text: "Die Gebärmutter drückt den Magen hoch. Kleine Mahlzeiten und Mandeln kauen hilft." },
                { headline: "Diabetes", text: "Der Test auf Schwangerschaftsdiabetes steht oft in diesen Wochen an." },
                { headline: "Partner-Tipp", text: "Massier ihren unteren Rücken. Die Belastung nimmt dort jetzt täglich zu." }
            ]
        }
    },
    25: {
        size: 'eine Rübe', image: '/images/ruebe.png', color: 'bg-rose-100', cm: 34.6, g: 660, feeling: 'Schlafprobleme', tip: 'Stillkissen zum Schlafen besorgen.',
        development: {
            summary: 'Die Kapillaren (kleine Blutgefäße) bilden sich aus. Die Haut wird rosiger.',
            details: [
                { headline: "Durchblutung", text: "Die Haut verliert ihre Transparenz und wird langsam rosa." },
                { headline: "Lunge", text: "Surfactant wird gebildet – ein Stoff, der verhindert, dass die Lungenbläschen verkleben." },
                { headline: "Greifreflex", text: "Es greift seine Füße und spielt damit. Yoga im Bauch!" }
            ]
        },
        mom: {
            summary: 'Schlafen wird schwieriger, da der Bauch im Weg ist.',
            details: [
                { headline: "Schlafposition", text: "Auf dem Rücken liegen kann die Hohlvene abdrücken (Vena Cava Syndrom). Linke Seite ist am besten." },
                { headline: "Schnarchen", text: "Durch geschwollene Schleimhäute fangen viele Frauen jetzt an zu schnarchen. Ohropax für dich?" },
                { headline: "Partner-Tipp", text: "Organisier ein Date. Kino? Essen? Bald ist die Zweisamkeit erstmal seltener." }
            ]
        }
    },
    26: {
        size: 'eine Zucchini', image: '/images/zucchini.png', color: 'from-green-200/80 to-white/50 border-green-300', cm: 35.6, g: 760, feeling: 'Rückenschmerzen', tip: 'Schuhe binden übernehmen.',
        development: {
            summary: 'Die Augen öffnen sich erstmals. Hallo Welt!',
            details: [
                { headline: "Augen auf", text: "Die Lider waren lange verschlossen. Jetzt öffnet es die Augen und blinzelt." },
                { headline: "Augenfarbe", text: "Fast alle Babys haben jetzt blaue Augen (Melanin kommt später)." },
                { headline: "Atemübungen", text: "Es 'atmet' jetzt regelmäßig Fruchtwasser ein und aus (Brustkorb hebt sich)." }
            ]
        },
        mom: {
            summary: 'Rückenschmerzen durch das zusätzliche Gewicht und Schwerpunktsverlagerung.',
            details: [
                { headline: "Becken", text: "Die Gelenke werden lockerer (Vorbereitung auf Geburt). Das kann im Becken schmerzen." },
                { headline: "Tritte", text: "Die Tritte können jetzt schon weh tun, besonders gegen die Rippen." },
                { headline: "Partner-Tipp", text: "Die Schuhe binden wird schwer. Sei ihr Gentleman und biete es an." }
            ]
        }
    },
    27: {
        size: 'ein Blumenkohl', image: '/images/blumenkohl.png', color: 'from-stone-200/80 to-white/50 border-stone-300', cm: 36.6, g: 875, feeling: 'Atemnot', tip: 'Treppen langsam gehen, Pausen machen.',
        development: {
            summary: 'Gehirnwellen zeigen Reaktionen auf Geräusche. Es lernt!',
            details: [
                { headline: "Gehirn", text: "Die Hirnoberfläche faltet sich, um mehr Platz für Neuronen zu schaffen." },
                { headline: "Träume", text: "Man geht davon aus, dass Babys jetzt schon träumen." },
                { headline: "Geschmack", text: "Es hat mehr Geschmacksknospen als ein Erwachsener. Es schmeckt, was Mama isst." }
            ]
        },
        mom: {
            summary: 'Kurzatmigkeit, da die Gebärmutter auf das Zwerchfell drückt.',
            details: [
                { headline: "Luft", text: "Alles wird eng. Die Lunge hat weniger Platz. Treppensteigen wird zum Sport." },
                { headline: "Karpaltunnel", text: "Kribbelnde Hände? Wassereinlagerungen können auf die Nerven im Handgelenk drücken." },
                { headline: "Partner-Tipp", text: "Atemnot? Mach mit ihr langsame Spaziergänge, aber kein Marathon." }
            ]
        },
    },
    28: {
        size: 'eine Aubergine', image: '/images/aubergine.png', color: 'from-purple-200/80 to-white/50 border-purple-300', cm: 37.6, g: 1005, feeling: '3. Trimester beginnt', tip: 'Kliniktasche Packliste durchgehen.',
        development: {
            summary: 'Es träumt jetzt (REM-Schlaf nachgewiesen). Wovon wohl?',
            details: [
                { headline: "Stimme", text: "Es erkennt deine Stimme jetzt definitiv. Sing ihm was vor!" },
                { headline: "Fettgewebe", text: "Es wird pummeliger. Die Haut glättet sich langsam." },
                { headline: "Augen", text: "Es öffnet die Augen jetzt regelmäßig, wenn es wach ist." }
            ]
        },
        mom: {
            summary: 'Die Brüste bereiten sich auf die Milchproduktion vor (Vormilch).',
            details: [
                { headline: "Vormilch", text: "Gelbliche Flüssigkeit (Kolostrum) kann austreten. Ein gutes Zeichen!" },
                { headline: "Rhesus", text: "Bei Rhesus-negativen Müttern steht jetzt oft die Prophylaxe-Spritze an." },
                { headline: "Partner-Tipp", text: "Packt zusammen die Kliniktasche (zumindest gedanklich). Checkt die Liste." }
            ]
        }
    },
    29: {
        size: 'ein Butternuss-Kürbis', image: '/images/kuerbis_klein.png', color: 'from-orange-200/80 to-white/50 border-orange-300', cm: 38.6, g: 1153, feeling: 'Kindsbewegungen', tip: 'Spiel "Tritt-Antwort" mit dem Bauch.',
        development: {
            summary: 'Es kann die Körpertemperatur ansatzweise regeln.',
            details: [
                { headline: "Platzmangel", text: "Es wird eng. Statt Purzelbäumen gibt es jetzt eher Ellbogen-Stöße." },
                { headline: "Knochen", text: "Der Kalziumbedarf ist riesig, da das Skelett aushärtet." },
                { headline: "Gehirn", text: "Das Gehirn steuert jetzt die Atmung und Körpertemperatur." }
            ]
        },
        mom: {
            summary: 'Vermehrt Krampfadern oder Besenreiser möglich.',
            details: [
                { headline: "Beine", text: "Nicht lange stehen. Stützstrümpfe tragen, wenn der Arzt es empfiehlt." },
                { headline: "Verstopfung", text: "Progesteron macht den Darm träge. Ballaststoffe und Wasser helfen." },
                { headline: "Partner-Tipp", text: "Besenreiser? Sag ihr, dass sie trotzdem wunderschöne Beine hat." }
            ]
        }
    },
    30: {
        size: 'eine Gurke', image: '/images/gurke.png', color: 'from-green-200/80 to-white/50 border-green-300', cm: 39.9, g: 1319, feeling: 'Sorgen & Ängste', tip: 'Geburtsvorbereitungskurs ernst nehmen.',
        development: {
            summary: 'Die Haut wird glatter, das Wollhaar (Lanugo) verschwindet langsam.',
            details: [
                { headline: "Glatte Haut", text: "Das Fettpolster füllt die Falten auf. Das Baby sieht 'fertig' aus." },
                { headline: "Knochenmark", text: "Das Knochenmark übernimmt jetzt komplett die Blutzellenproduktion." },
                { headline: "Fingernägel", text: "Die Nägel wachsen und erreichen bald die Fingerkuppen." }
            ]
        },
        mom: {
            summary: 'Der Gang wird zum "Watschelgang" durch das weichere Becken.',
            details: [
                { headline: "Watscheln", text: "Das Becken weitet sich, die Bänder sind weich. Das verändert das Gehen." },
                { headline: "Ängste", text: "Wie wird die Geburt? Schaffen wir das? Jetzt kommen oft Sorgen hoch. Redet darüber!" },
                { headline: "Partner-Tipp", text: "Angst vor der Geburt? Geht zusammen zum Geburtsvorbereitungskurs." }
            ]
        }
    },
    31: {
        size: 'eine Ananas', image: '/images/ananas.png', color: 'from-yellow-200/80 to-white/50 border-yellow-300', cm: 41.1, g: 1502, feeling: 'Alles wird eng', tip: 'Hilf ihr aus dem Bett/Sofa hoch.',
        development: {
            summary: 'Alle 5 Sinne sind jetzt funktionsfähig. Es ist hellwach.',
            details: [
                { headline: "Sinne", text: "Schmecken, Riechen, Hören, Sehen, Fühlen – alles funktioniert. Es lernt seine Umwelt kennen." },
                { headline: "Platzangst?", text: "Es kann sich kaum noch drehen, nur noch boxen und treten." },
                { headline: "Pupillereflex", text: "Die Pupillen reagieren auf Licht. Es zieht sie bei Helligkeit zusammen." }
            ]
        },
        mom: {
            summary: 'Der Druck auf die Blase nimmt wieder zu. Schlaflosigkeit.',
            details: [
                { headline: "Blase", text: "Der Kopf drückt vielleicht schon ins Becken. Das heißt: 24/7 Toiletten-Alarm." },
                { headline: "Nestertrieb", text: "Plötzlich muss ALLES geputzt werden? Der Nestbautrieb ist auf dem Höhepunkt. Brems sie etwas." },
                { headline: "Partner-Tipp", text: "Hilf ihr aus dem Bett/Sofa hoch. Dein Arm ist der beste Kran (und Rücken-Schoner)." }
            ]
        }
    },
    32: {
        size: 'ein Chinakohl', image: '/images/chinakohl.png', color: 'from-green-200/80 to-white/50 border-green-300', cm: 42.4, g: 1702, feeling: 'Übungswehen', tip: 'Lerne Wehen zu tracken (Abstand messen).',
        development: {
            summary: 'Fingernägel sind komplett ausgebildet. Kratzgefahr!',
            details: [
                { headline: "Nägel", text: "Manche Babys kratzen sich schon im Bauch. Fäustlinge für nach der Geburt besorgen?" },
                { headline: "Position", text: "Die meisten Babys drehen sich jetzt in die Startposition (Kopf nach unten)." },
                { headline: "Immunsystem", text: "Es bekommt jetzt Antikörper von Mama für den Start ins Leben." }
            ]
        },
        mom: {
            summary: 'Senkwehen können auftreten, der Bauch rutscht tiefer.',
            details: [
                { headline: "Senkwehen", text: "Der Bauch senkt sich. Vorteil: Du bekommst wieder besser Luft. Nachteil: Druck auf die Blase." },
                { headline: "Sodbrennen", text: "Durch das Absenken wird das Sodbrennen oft besser. Ein Lichtblick!" },
                { headline: "Partner-Tipp", text: "Lerne Wehen zu tracken (Abstand messen). Es gibt Apps dafür (oder diese hier!)." }
            ]
        }
    },
    33: {
        size: 'ein Sellerie', image: '/images/sellerie.png', color: 'from-green-200/80 to-white/50 border-green-300', cm: 43.7, g: 1918, feeling: 'Ungeduld', tip: 'Kinderzimmer fertig streichen/aufbauen.',
        development: {
            summary: 'Das Immunsystem übernimmt Antikörper der Mutter.',
            details: [
                { headline: "Nestschutz", text: "Antikörper wandern durch die Plazenta. Das schützt das Baby in den ersten Monaten nach der Geburt." },
                { headline: "Knochen", text: "Der Schädel bleibt weich und besteht aus Platten, damit er bei der Geburt durch den Kanal passt." },
                { headline: "Fruchtwasser", text: "Es trinkt bis zu einem Liter Fruchtwasser am Tag. Gut für die Verdauung!" }
            ]
        },
        mom: {
            summary: 'Schlafstörungen nehmen zu, kein Platz mehr im Bett.',
            details: [
                { headline: "Insomnia", text: "Gedankenkreisen und körperliches Unwohlsein rauben den Schlaf. Mittagsschlaf empfohlen." },
                { headline: "Syndrom", text: "Karpaltunnelsyndrom (taube Hände) kann jetzt verstärkt auftreten. Handgelenksschienen helfen nachts." },
                { headline: "Partner-Tipp", text: "Kinderzimmer fertig streichen/aufbauen. Der Nestbautrieb braucht Ventile." }
            ]
        }
    },
    34: {
        size: 'eine Honigmelone', image: '/images/honigmelone.png', color: 'from-yellow-200/80 to-white/50 border-yellow-300', cm: 45.0, g: 2146, feeling: 'Mutterschutz!', tip: 'Feiert ihren letzten Arbeitstag.',
        development: {
            summary: 'Bei Jungs wandern die Hoden in den Hodensack. Alles an seinem Platz.',
            details: [
                { headline: "Hoden", text: "Der Weg vom Bauch in den Hodensack ist geschafft (meistens)." },
                { headline: "Käseschmiere", text: "Sie wird weniger, die Haut wird dicker. Das Baby macht sich hübsch." },
                { headline: "Mekonium", text: "Das 'Kindspech' (erster Stuhlgang) sammelt sich im Darm an." }
            ]
        },
        mom: {
            summary: 'Genieße den Mutterschutz! Füße hochlegen.',
            details: [
                { headline: "Ruhe", text: "Jetzt offiziell: Keine Arbeit mehr (in der Regel). Zeit zum Kraft tanken." },
                { headline: "Damm-Massage", text: "Kann Geburtsverletzungen vorbeugen. Ein Thema, das man mal ansprechen kann (sanft)." },
                { headline: "Partner-Tipp", text: "Damm-Massage? Klingt komisch, kann aber Geburtsverletzungen verhindern. Informiert euch." }
            ]
        },
    },
    35: {
        size: 'eine Kokosnuss', image: '/images/kokosnuss.png', color: 'from-stone-200/80 to-white/50 border-stone-300', cm: 46.2, g: 2383, feeling: 'Senkwehen', tip: 'Auto checken, Tank voll?',
        development: {
            summary: 'Nieren sind voll ausgereift. Leber arbeitet.',
            details: [
                { headline: "Reife", text: "Körperlich ist es fast fertig. Jetzt kommt nur noch 'Feintuning' und Gewicht." },
                { headline: "Träume", text: "Es verbringt viel Zeit im REM-Schlaf (= Hirnreifung)." },
                { headline: "Schlaf", text: "Es schläft 90% der Zeit. Und träumt intensiv vom Leben draußen." }
            ]
        },
        mom: {
            summary: 'Häufiger Harndrang, aber leichteres Atmen wenn der Bauch sich senkt.',
            details: [
                { headline: "Atmen", text: "Endlich wieder tief durchatmen (wenn der Bauch sich gesenkt hat)." },
                { headline: "B-Streptokokken", text: "Der Abstrich auf diese Bakterien wird oft jetzt gemacht. Wichtig für die Geburt." },
                { headline: "Partner-Tipp", text: "Der Mutterschutz beginnt. Feiert ihren letzten Arbeitstag!" }
            ]
        }
    },
    36: {
        size: 'ein Kopfsalat', image: '/images/salat.png', color: 'from-green-200/80 to-white/50 border-green-300', cm: 47.4, g: 2622, feeling: 'Nestbau-Finale', tip: 'Kliniktasche ins Auto stellen.',
        development: {
            summary: 'Der Kopf rutscht tiefer ins Becken. Startposition!',
            details: [
                { headline: "Beckenendlage?", text: "Wenn es jetzt noch falsch herum liegt, wird oft eine äußere Wendung besprochen." },
                { headline: "Backen", text: "Die Saugmuskeln sind jetzt so stark, dass die Wangen pummelig wirken." },
                { headline: "Startposition", text: "Der Kopf sollte jetzt unten liegen. Wenn nicht: Keine Panik, es gibt Tricks." }
            ]
        },
        mom: {
            summary: 'Der Schleimpfropf könnte sich lösen (Zeichen für baldige Geburt).',
            details: [
                { headline: "Schleimpfropf", text: "Der 'Korken' vor dem Muttermund kann abgehen. Es kann morgen losgehen – oder in 2 Wochen." },
                { headline: "Instinkt", text: "Viele Frauen ziehen sich jetzt zurück ('Höhlen-Modus'). Respektiere das." },
                { headline: "Partner-Tipp", text: "Frag sie: 'Was brauchst du für die Geburt?'. Bestärke sie in ihren Wünschen." }
            ]
        }
    },
    37: {
        size: 'ein Mangold', image: '/images/mangold.png', color: 'from-emerald-200/80 to-white/50 border-emerald-300', cm: 48.6, g: 2859, feeling: 'Bereit (Theoretisch)', tip: 'Dokumente griffbereit legen.',
        development: {
            summary: 'Lungenreife ist abgeschlossen. Kein Frühchen mehr!',
            details: [
                { headline: "Termingerecht", text: "Ab 37+0 gilt das Baby nicht mehr als Frühgeburt. Es darf kommen!" },
                { headline: "Lanugo", text: "Die meisten Lanugo-Haare sind abgefallen und schwimmen im Fruchtwasser (und werden getrunken -> erstes Kaka)." },
                { headline: "Kein Frühchen", text: "Ab Ende dieser Woche gilt es nicht mehr als Frühgeburt!" }
            ]
        },
        mom: {
            summary: 'Starke Stimmungsschwankungen zwischen Angst und Vorfreude.',
            details: [
                { headline: "Geduldsfaden", text: "Alles nervt. Die Fragen ('Ist es schon da?'), der Bauch, das Warten." },
                { headline: "Energie", text: "Vielleicht kommt nochmal ein Energieschub kurz vor der Geburt. Nutze ihn, aber verausgabe dich nicht." },
                { headline: "Partner-Tipp", text: "Tank ist voll? Autoschlüssel griffbereit? Der Ernstfall kann jederzeit eintreten." }
            ]
        }
    },
    38: {
        size: 'ein Lauch', image: '/images/lauch.png', color: 'from-green-200/80 to-white/50 border-green-300', cm: 49.8, g: 3083, feeling: 'Warten...', tip: 'Lenk sie ab. Kino, Essen, Spazieren.',
        development: {
            summary: 'Babyspeck wird angesetzt für die Tage nach der Geburt.',
            details: [
                { headline: "Reserven", text: "Die Plazenta altert langsam. Das Baby braucht eigene Reserven für den Start." },
                { headline: "Reflexer", text: "Der Greifreflex ist so stark, dass es dein Finger fest umschließen könnte." },
                { headline: "Stimme", text: "Deine tiefe Stimme beruhigt es jetzt schon. Sprich viel!" }
            ]
        },
        mom: {
            summary: 'Alles ist beschwerlich. Jede Bewegung ist ein Kraftakt.',
            details: [
                { headline: "Elefantenfüße", text: "Wassereinlagerungen können jetzt extrem sein. Viel trinken, Füße hoch." },
                { headline: "Gewicht", text: "Das Gewicht stagniert oft kurz vor der Geburt. Kein Grund zur Sorge." },
                { headline: "Partner-Tipp", text: "Geht nochmal essen oder ins Kino. Wer weiß, wann das nächste Mal ist." }
            ]
        }
    },
    39: {
        size: 'eine Wassermelone', image: '/images/wassermelone.png', color: 'from-red-200/80 to-white/50 border-red-300', cm: 50.7, g: 3288, feeling: 'Jedes Ziehen zählt', tip: 'Handy immer auf Laut.',
        development: {
            summary: 'Platzmangel: Weniger Tritte, mehr Schieben und Drücken.',
            details: [
                { headline: "Ruhe vor Sturm", text: "Babys sind oft sehr ruhig vor der Geburt, um Kraft zu sammeln." },
                { headline: "Hautfarbe", text: "Die Haut ist jetzt eher weißlich-rosa (außer bei sehr dunkler Pigmentierung)." },
                { headline: "Tränen", text: "Tränenkanäle sind noch nicht ganz fertig. Echte Tränen kommen erst Wochen nach der Geburt." }
            ]
        },
        mom: {
            summary: 'Echte Wehen könnten starten (regelmäßig, schmerzhaft).',
            details: [
                { headline: "Blasensprung", text: "Nur bei 15% beginnt die Geburt so. Meistens kommen erst die Wehen." },
                { headline: "Durchfall", text: "Der Körper reinigt sich oft selbst vor der Geburt. Durchfall kann ein Start-Signal sein." },
                { headline: "Partner-Tipp", text: "Geduld. Jedes Ziehen könnte es sein – oder auch nicht. Bleib ruhig, Don't panic." }
            ]
        }
    },
    40: {
        size: 'ein Kürbis', image: '/images/kuerbis.png', color: 'from-orange-200/80 to-white/50 border-orange-300', cm: 51.2, g: 3462, feeling: 'Geburtstermin', tip: 'Ruhepol sein. Du schaffst das.',
        development: {
            summary: 'Bereit für den ersten Atemzug. Happy Birthday (bald)!',
            details: [
                { headline: "Knautschig", text: "Der Kopf kann nach der Geburt etwas verformt sein (Geburtskanal). Das gibt sich schnell." },
                { headline: "Augen", text: "Es sieht anfangs nur unscharf (ca. 30 cm). Genau bis zu deinem Gesicht." },
                { headline: "Bereit", text: "15% Fettanteil. Es ist bereit für die Kälte draußen." }
            ]
        },
        mom: {
            summary: 'Es kann jederzeit losgehen! Oder auch nicht... (ET +/- 14 Tage)',
            details: [
                { headline: "ET", text: "Nur 4% der Kinder kommen am Termin. Geduld ist jetzt die härteste Lektion." },
                { headline: "Oxytocin", text: "Kuscheln und Entspannung fördern das Wehenhormon. Stress blockiert es." },
                { headline: "Partner-Tipp", text: "ET ist nur ein Schätzwert. Mach ihr keinen Druck. Lenk sie ab." }
            ]
        }
    },
    41: {
        size: 'ein Riesen-Kürbis', image: '/images/riesenkuerbis.png', color: 'from-orange-300/80 to-white/50 border-orange-400', cm: 51.7, g: 3597, feeling: 'Überfällig', tip: 'Nervige Nachfragen von Verwandten abblocken.',
        development: {
            summary: 'Die Haut ist jetzt oft etwas trocken ("Waschfrauenhände").',
            details: [
                { headline: "Übertragen", text: "Keine Panik, dem Baby geht es meist prächtig. Es hat einfach keine Uhr." },
                { headline: "Käseschmiere weg", text: "Die Schutzschicht ist fast weg, daher die trockene Haut nach der Geburt." }
            ]
        },
        mom: {
            summary: 'Warten auf die Einleitung oder den natürlichen Start.',
            details: [
                { headline: "Kontrolle", text: "Jetzt heißt es oft alle 2 Tage zum Arzt/CTG. Nervig, aber sicher." },
                { headline: "Einleitung", text: "Ab ET+10 wird oft über Nachhilfe gesprochen. Aber oft hilft schon ein scharfes Curry oder Sex." }
            ]
        }
    }
};

export const POSTPARTUM_WEEKS = {
    0: {
        title: "Willkommen",
        feeling: "Alles ist neu",
        tip: "Besuche rigoros begrenzen. Sie gehört ins Bett.",
        baby: {
            summary: "Schläft viel (bis zu 16h). Der erste Stuhlgang (Kindspech).",
            details: [
                { headline: "Schlafverhalten", text: "Neugeborene schlafen 16-18 Stunden, aber in kurzen Phasen (2-4h). Tag und Nacht sind noch unbekannt." },
                { headline: "Kindspech", text: "Der erste Stuhlgang ist schwarz-grün und klebrig (Mekonium). Das ist ein gutes Zeichen – der Darm arbeitet." },
                { headline: "Gewicht", text: "Eine Abnahme von bis zu 10% des Geburtsgewichts in den ersten Tagen ist völlig normal. Das holen sie schnell wieder auf." }
            ]
        },
        mom: {
            summary: "Wochenfluss ist stark. Geburtsverletzungen heilen.",
            details: [
                { headline: "Wochenfluss (Lochien)", text: "Stärker als die Periode. Ruhe ist jetzt die wichtigste Medizin, damit die Gebärmutter heilen kann." },
                { headline: "Milcheinschuss", text: "Zwischen Tag 3 und 5 schießt die Milch ein. Die Brüste können spannen, heiß werden und schmerzen. Coolpacks helfen." },
                { headline: "Hormon-Chaos", text: "Der 'Baby Blues' kann sich schon ankündigen. Tränen ohne Grund sind okay." }
            ]
        }
    },
    1: {
        title: "Wochenbett-Start",
        feeling: "Adrenalin & Erschöpfung",
        tip: "Besuche rigoros begrenzen. Sie gehört ins Bett.",
        baby: {
            summary: "Schläft viel (bis zu 16h). Der erste Stuhlgang (Kindspech).",
            details: [
                { headline: "Schlafverhalten", text: "Neugeborene schlafen 16-18 Stunden, aber in kurzen Phasen (2-4h). Tag und Nacht sind noch unbekannt." },
                { headline: "Kindspech", text: "Der erste Stuhlgang ist schwarz-grün und klebrig (Mekonium). Das ist ein gutes Zeichen – der Darm arbeitet." },
                { headline: "Gewicht", text: "Eine Abnahme von bis zu 10% des Geburtsgewichts in den ersten Tagen ist völlig normal. Das holen sie schnell wieder auf." }
            ]
        },
        mom: {
            summary: "Wochenfluss ist stark. Geburtsverletzungen heilen.",
            details: [
                { headline: "Wochenfluss (Lochien)", text: "Stärker als die Periode. Ruhe ist jetzt die wichtigste Medizin, damit die Gebärmutter heilen kann." },
                { headline: "Milcheinschuss", text: "Zwischen Tag 3 und 5 schießt die Milch ein. Die Brüste können spannen, heiß werden und schmerzen. Coolpacks helfen." },
                { headline: "Hormon-Chaos", text: "Der 'Baby Blues' kann sich schon ankündigen. Tränen ohne Grund sind okay." }
            ]
        }
    },
    2: {
        title: "Baby-Blues",
        feeling: "Tränenmeer",
        tip: "Trösten, nicht 'fixen'. Es sind die Hormone.",
        baby: {
            summary: "Nabelschnurrest fällt ab. Saugreflex ist stark.",
            details: [
                { headline: "Der Nabel", text: "Der Rest der Nabelschnur trocknet ein und fällt meist zwischen Tag 5 und 14 ab. Einfach trocken halten." },
                { headline: "Saugbedürfnis", text: "Saugen beruhigt. Hände, Schnuller oder Brust – alles wird probiert. Es ist ihr wichtigster Reflex." },
                { headline: "Wachstum", text: "Jetzt sollte das Geburtsgewicht langsam wieder erreicht sein." }
            ]
        },
        mom: {
            summary: "Der 'Baby Blues' trifft viele: Plötzliches Weinen.",
            details: [
                { headline: "Heultage", text: "Ca. 80% aller Mütter (und auch Väter!) erleben den Baby Blues. Es ist keine Depression, sondern ein Hormonabfall." },
                { headline: "Körperpflege", text: "Kurze Duschen tun gut. Baden erst, wenn der Wochenfluss vorbei ist (Infektionsgefahr)." },
                { headline: "Narbenpflege", text: "Egal ob Dammriss oder Kaiserschnitt – Luft an die Wunde lassen hilft der Heilung." }
            ]
        }
    },
    3: {
        title: "Cluster-Feeding",
        feeling: "Dauer-Stillen",
        tip: "Richte ihr eine bequeme 'Still-Station' mit Snacks ein.",
        baby: {
            summary: "Will abends oft stundenlang trinken ('Cluster Feeding').",
            details: [
                { headline: "Cluster Feeding", text: "Abendliches Dauerstillen ist normal. Es regt die Milchproduktion für den nächsten Wachstumsschub an." },
                { headline: "Baby-Akne", text: "Kleine Pickelchen im Gesicht? Das sind deine Hormone, die noch im Babykreislauf sind. Geht von alleine weg." },
                { headline: "Bauchweh", text: "Der Darm reift nach. Fliegergriff und sanfte Bauchmassagen können Linderung verschaffen." }
            ]
        },
        mom: {
            summary: "Brustwarzen können empfindlich sein. Erschöpfung am Peak.",
            details: [
                { headline: "Wunde Brustwarzen", text: "Viel Luft dranlassen, Lanolin-Salbe nutzen. Wenn es blutet oder extrem schmerzt: Hebamme fragen!" },
                { headline: "Schlafmangel", text: "Jetzt zeigt sich der Schlafentzug. Übernimm das Wickeln in der Nacht, damit sie liegen bleiben kann." },
                { headline: "Ernährung", text: "Sie braucht Energie. Stillen verbraucht ca. 500 kcal extra. Snacks bereitstellen!" }
            ]
        }
    },
    4: {
        title: "Ankommen & Routine",
        feeling: "Vorsichtige Zuversicht",
        tip: "Etabliert ein kleines Abendritual (z.B. Lied singen).",
        baby: {
            summary: "Beginnt, Gesichter kurz zu fixieren. Kopf heben üben.",
            details: [
                { headline: "Sichtfeld", text: "Dein Baby sieht am besten auf 20-30 cm Entfernung – genau der Abstand beim Tragen oder Stillen." },
                { headline: "Tummy Time", text: "Kurz auf den Bauch legen (unter Aufsicht) stärkt die Nackenmuskulatur. Aber nur wenn es wach ist." },
                { headline: "Weinen", text: "Das Weinen erreicht oft in Woche 4-6 seinen Höhepunkt. Es ist Kommunikation, keine Manipulation." }
            ]
        },
        mom: {
            summary: "Wochenfluss wird weniger. Erste Spaziergänge.",
            details: [
                { headline: "Bewegung", text: "Erste kurze Spaziergänge sind okay. Aber auf den Körper hören: Wenn der Wochenfluss wieder rot wird, war es zu viel." },
                { headline: "Beckenboden", text: "Noch keine Übungen, aber bewusstes 'Ansteuern' und Schonen ist wichtig. Nicht schwer heben!" },
                { headline: "Isolation", text: "Viele Mütter fühlen sich jetzt einsam, wenn der Partner wieder arbeitet. Ermutige sie zu Verabredungen." }
            ]
        }
    },
    5: {
        title: "Der 1. Sprung",
        feeling: "Quengelig & Anhänglich",
        tip: "Tragen, tragen, tragen. Der Gymnastikball ist dein Freund.",
        baby: {
            summary: "Erster großer Entwicklungsschub (ca. 5. Woche).",
            details: [
                { headline: "Sinnes-Explosion", text: "Die Welt wird schärfer, lauter, bunter. Das macht Angst. Das Baby braucht jetzt viel Nähe ('Klammerphase')." },
                { headline: "Clusterfeeding", text: "Es will wieder sehr oft trinken, um die Milchproduktion für das Wachstum anzukurbeln." },
                { headline: "Schlaf-Regression", text: "Durch den Schub schlafen viele Babys plötzlich wieder unruhiger. Das ist vorübergehend." }
            ]
        },
        mom: {
            summary: "Hormonumstellung zeigt sich (Haarausfall?).",
            details: [
                { headline: "Haarausfall", text: "Der Östrogenspiegel fällt. Viele Mütter verlieren jetzt die Haare, die in der Schwangerschaft geblieben sind." },
                { headline: "Zweifel", text: "'Mache ich das richtig?' - Sie ist durch das Schreien verunsichert. Bestärke sie in ihrer Intuition." },
                { headline: "Partnerschaft", text: "Der erste Stress legt sich, jetzt knallt es oft mal. Redet über Erwartungen." }
            ]
        }
    },
    6: {
        title: "Erstes Lächeln",
        feeling: "Verliebt",
        tip: "Reagiere auf jedes Glucksn mit Freude.",
        baby: {
            summary: "Das erste soziale Lächeln! Reagiert auf Ansprache.",
            details: [
                { headline: "Kommunikation", text: "Es beginnt zu 'erzählen' (Gurr-Laute). Antworte ihm, das fördert die Sprachentwicklung extrem." },
                { headline: "Greifen", text: "Die Hände öffnen sich öfter. Es versucht vielleicht schon unkoordiniert nach Dingen zu schlagen." },
                { headline: "Wachphasen", text: "Es ist jetzt länger am Stück wach und will unterhalten werden (Mobile, Grimassen)." }
            ]
        },
        mom: {
            summary: "Abschlussuntersuchung Gynäkologe (Nachsorge).",
            details: [
                { headline: "Der Check-Up", text: "Nach ca. 6 Wochen prüft der Arzt die Rückbildung der Gebärmutter und Wundheilung. Wichtiger Termin!" },
                { headline: "Rückbildung", text: "Der Kurs startet bald. Supporte sie, indem du das Baby nimmst, damit sie hingehen kann." },
                { headline: "Sex", text: "Nach dem Arzt-OK theoretisch möglich. Praktisch: Nur wenn SIE bereit ist (Kopf & Körper). Gleitgel hilft (Stillen macht trocken)." }
            ]
        }
    },
    7: {
        title: "Hände entdecken",
        feeling: "Neugierig",
        tip: "Buntes Spielzeug oder Hände bewegen.",
        baby: {
            summary: "Hand-Augen-Koordination beginnt sich zu entwickeln.",
            details: [
                { headline: "Hände beobachten", text: "Es starrt fasziniert seine eigenen Hände an. 'Das gehört zu mir?'" },
                { headline: "Farbsehen", text: "Es kann Farben jetzt besser unterscheiden, besonders starke Kontraste (Rot, Gelb, Blau)." },
                { headline: "Greifen", text: "Es versucht gezielt nach Spielzeug zu greifen, trifft aber oft noch daneben." }
            ]
        },
        mom: {
            summary: "Alltag mit Baby festigt sich. Körpermitte stärken.",
            details: [
                { headline: "Heben & Tragen", text: "Achtung: Baby + MaxiCosi ist schwer! Den Beckenboden immer vorher anspannen." },
                { headline: "Ernährung", text: "Stillen zehrt aus. Sie braucht weiterhin hochwertige Fette und Vitamine. Nüsse sind Superfood." },
                { headline: "Narbenpflege", text: "Kaiserschnittnarben können bei Wetterumschwung jucken oder ziehen. Massagen helfen." }
            ]
        }
    },
    8: {
        title: "Erste Impfung (U4)",
        feeling: "Beschützerinstinkt",
        tip: "Zäpfchen für die Nacht bereithalten (Arzt fragen).",
        baby: {
            summary: "Die U4 Untersuchung steht an. Impfungen möglich.",
            details: [
                { headline: "Der Picks", text: "Die erste 6-fach Impfung + Rotaviren. Das Baby wird weinen, du musst trösten. Danach viel Kuscheln." },
                { headline: "Reaktionen", text: "Fieber, Schläfrigkeit oder Quengeln sind normale Impfreaktionen für 1-2 Tage." },
                { headline: "Wachstum", text: "Es wächst jetzt ca. 2,5 cm pro Monat. Die Kleidung wird schon wieder zu klein." }
            ]
        },
        mom: {
            summary: "Sport-Einstieg und neue Identität.",
            details: [
                { headline: "Sanfter Sport", text: "Wenn die Rückbildung läuft, ist Yoga oder Pilates super. Joggen/High-Impact erst viel später!" },
                { headline: "Identität", text: "Sie fühlt sich langsam wieder wie sie selbst, nicht nur wie eine 'Milchbar'. Unterstütze ihre Hobbys." },
                { headline: "Freundschaften", text: "Alte Freunde ohne Kinder verstehen den neuen Alltag oft nicht. Das kann schmerzen." }
            ]
        }
    },
    9: {
        title: "Schlaf & Rhythmus",
        feeling: "Müde aber routiniert",
        tip: "Abendritual konsequent durchziehen (Bad, Buch, Bett).",
        baby: {
            summary: "Tag-Nacht-Unterscheidung festigt sich.",
            details: [
                { headline: "Melatonin", text: "Der Körper beginnt, das Schlafhormon selbst zu produzieren. Dunkelheit am Abend hilft." },
                { headline: "Schlafsäcke", text: "Strampeln wird stärker. Schlafsäcke sind sicherer als Decken (Erstickungsgefahr)." },
                { headline: "Kommunikation", text: "Es brabbelt und quietscht in verschiedenen Tonlagen. Es übt seine Stimme." }
            ]
        },
        mom: {
            summary: "Chronischer Schlafmangel kann an die Substanz gehen.",
            details: [
                { headline: "Tiefpunkt", text: "Nach 2 Monaten ohne Durchschlafen sind die Reserven leer. Achte auf Anzeichen von Erschöpfung." },
                { headline: "Aufteilung", text: "Verhandelt die Aufgaben neu. Muss wirklich alles perfekt sein? Was kann liegen bleiben?" },
                { headline: "Rauskommen", text: "Ein Abendessen mit Freundinnen (abgepumpte Milch?) wirkt Wunder für die Seele." }
            ]
        }
    },
    10: {
        title: "Bewegungsdrang",
        feeling: "Aktiv & Laut",
        tip: "Krabbeldecke auf den Boden, weg vom Sofa (Sturzgefahr!).",
        baby: {
            summary: "Will sich bewegen, strampelt wild, dreht sich vielleicht.",
            details: [
                { headline: "Kopfball", text: "In Bauchlage kann der Kopf schon minutenlang sicher gehalten werden." },
                { headline: "Drehen", text: "Einige Babys drehen sich jetzt zufällig vom Bauch auf den Rücken. Achtung beim Wickeln!" },
                { headline: "Spucken", text: "Durch viel Bewegung drückt der Magen. 'Speihkinder sind Gedeihkinder'." }
            ]
        },
        mom: {
            summary: "Austausch mit anderen Müttern wird wichtiger.",
            details: [
                { headline: "Netzwerken", text: "Krabbelgruppen oder PEKiP sind weniger fürs Baby, mehr für die Mama (Leidensgenossinnen treffen)." },
                { headline: "Mental Load", text: "Arzttermine, Impfungen, Kleidung sortieren... die Orga-Last steigt. Nimm ihr was ab." },
                { headline: "Beziehung", text: "Vergesst euch als Paar nicht. 10 Minuten bewusstes Reden am Tag (ohne Baby-Thema)." }
            ]
        }
    },
    11: {
        title: "Alles schmecken",
        feeling: "Sabbernd",
        tip: "Lätzchen-Vorrat anlegen. Es wird nass.",
        baby: {
            summary: "Die orale Phase: Alles wandert in den Mund.",
            details: [
                { headline: "Munderkundung", text: "Der Mund ist das sensibelste Tastenorgan. Spielzeug, Fäuste, deine Nase – alles wird 'gekostet'." },
                { headline: "Fremdeln?", text: "Es unterscheidet langsam zwischen 'Mama/Papa' und 'Fremd'. Oma wird vielleicht kritisch beäugt." },
                { headline: "Zähne?", text: "Das Einschießen der Zähne in den Kiefer kann schon jetzt für starkes Sabbern und Unruhe sorgen." }
            ]
        },
        mom: {
            summary: "Blick in die Zukunft: Job & Betreuung.",
            details: [
                { headline: "Beruf", text: "Wann geht es zurück in den Job? Elterngeld-Anträge prüfen (Basis vs. Plus)." },
                { headline: "Betreuung", text: "In manchen Städten muss man sich jetzt schon um Kita-Plätze kümmern. Kein Witz." },
                { headline: "Haushalt", text: "Wenn das Baby mobiler wird, muss die Wohnung 'kindersicher' werden. Putzmittel hochstellen!" }
            ]
        }
    },
    12: {
        title: "4. Trimester Ende",
        feeling: "Angekommen",
        tip: "Feiert das! Ihr habt die härteste Zeit geschafft.",
        baby: {
            summary: "Kein Neugeborenes mehr, sondern ein Säugling.",
            details: [
                { headline: "Stabilität", text: "Kopfkontrolle ist meist sicher. Es wirkt viel robuster als am Anfang." },
                { headline: "Interaktion", text: "Es lacht laut, quietscht und fordert aktiv Spielzeit ein. Es ist eine echte Persönlichkeit." },
                { headline: "Rhythmus", text: "Viele Babys haben jetzt 3 Schläfchen am Tag. Nutzt diese Struktur." }
            ]
        },
        mom: {
            summary: "Die 'akute' Heilungsphase ist abgeschlossen.",
            details: [
                { headline: "Körper-Bilanz", text: "Was ist geblieben? Streifen, weicher Bauch? Das sind Heldinnen-Spuren. Feier ihren Körper." },
                { headline: "Freiheit", text: "Erste längere Trennungen (z.B. ein halber Tag) sind jetzt oft mental möglich." },
                { headline: "Stolz", text: "Schaut euch Fotos von Woche 1 an. Wahnsinn, was ihr geleistet habt." }
            ]
        }
    },
    13: {
        title: "Der 2. Sprung (12. Woche)",
        feeling: "Wechselhaft",
        tip: "Routinen geben Sicherheit, wenn die Welt wackelt.",
        baby: {
            summary: "Wachstumsschub 'Muster': Es erkennt wiederkehrende Abläufe.",
            details: [
                { headline: "Mustererkennung", text: "Es bemerkt, dass Dinge gleich bleiben. Tägliche Rituale werden jetzt extrem wichtig." },
                { headline: "Körperbeherrschung", text: "Die Bewegungen werden flüssiger, weniger ruckartig. Es kann den Kopf sehr gut halten." },
                { headline: "Stimmung", text: "Wie bei jedem Schub: Es kann quengelig sein, schlechter schlafen und mehr Nähe fordern." }
            ]
        },
        mom: {
            summary: "Die Hormone pendeln sich langsam auf ein 'Normal' ein.",
            details: [
                { headline: "Rückbildung", text: "Der Kurs wird intensiver. Muskelkater im Beckenboden? Das ist ein gutes Zeichen (Muskeln arbeiten!)." },
                { headline: "Beruf", text: "Vielleicht kommen erste Gedanken an den Job zurück. Oder die Erkenntnis, dass sich Prioritäten verschoben haben." },
                { headline: "Freundschaften", text: "Zeit, alte Kontakte zu pflegen. Ein Telefonat ohne Baby-Geschrei im Hintergrund tut gut." }
            ]
        }
    },
    14: {
        title: "Greifen & Rasseln",
        feeling: "Verspielt",
        tip: "Gib ihm verschiedene Materialien (Holz, Stoff, Knisterpapier).",
        baby: {
            summary: "Das gezielte Greifen wird perfektioniert.",
            details: [
                { headline: "Beidhändig", text: "Es versucht, Dinge mit beiden Händen zu greifen und zur Mitte zu führen." },
                { headline: "Rasseln", text: "Geräusche selbst zu erzeugen ist der Hit. Rasseln werden geschüttelt (und gelutscht)." },
                { headline: "Ablenkung", text: "Beim Stillen/Füttern lässt es sich jetzt leicht ablenken. Sorge für eine ruhige Umgebung." }
            ]
        },
        mom: {
            summary: "Haarausfall könnte noch ein Thema sein (Geduld!).",
            details: [
                { headline: "Date Night", text: "Vielleicht klappt ein Abend zu zweit zuhause? Handy weg, Essen bestellen, Zeit für euch." },
                { headline: "Selbstbild", text: "Wie fühlt sie sich in ihrer Haut? Ein neues Kleidungsstück, das *jetzt* passt, kann Wunder wirken." },
                { headline: "Schlaf", text: "Hoffentlich etwas besser? Wenn nicht: Durchhalten. Es ist (leider) normal." }
            ]
        }
    },
    15: {
        title: "Kommunikation",
        feeling: "Lautstark",
        tip: "Führe 'Gespräche'. Mach Pausen, lass es antworten.",
        baby: {
            summary: "Es entdeckt seine Stimme und experimentiert.",
            details: [
                { headline: "Quietschen", text: "Es kann sehr laut werden. Es testet, was die Stimme alles kann (Blubbern, Kreischen)." },
                { headline: "Spiegel", text: "Zeig ihm sein Spiegelbild. Es erkennt sich noch nicht selbst, freut sich aber über das 'andere Baby log'." },
                { headline: "Lachen", text: "Aus dem Lächeln wird ein echtes Glucksen und Lachen. Kitzeln hilft!" }
            ]
        },
        mom: {
            summary: "Körperliche Belastung durch Tragen steigt.",
            details: [
                { headline: "Beckenboden-Check", text: "Husten, Niesen, Hüpfen – alles dicht? Wenn nicht: Weiter dranbleiben, nicht ignorieren!" },
                { headline: "Rücken", text: "Das Baby wird schwerer (ca. 6-7kg?). Achte auf ihre Haltung beim Tragen und Stillen." },
                { headline: "Auszeit", text: "Kann sie mal 2 Stunden alleine raus? Friseur, Sport, Spazieren? Organisier das." }
            ]
        }
    },
    16: {
        title: "Der 3. Sprung (19. Woche)",
        feeling: "Übergänge",
        tip: "Bleib ruhig, wenn es fremdelt oder weint.",
        baby: {
            summary: "Wachstumsschub 'Übergänge' (beginnt oft schon jetzt).",
            details: [
                { headline: "Zusammenhänge", text: "Es versteht fließende Übergänge (z.B. Tonleiter, Bewegung). Die Welt wird komplexer." },
                { headline: "Ernährung", text: "Es schaut dir das Essen vom Löffel? Beikostreife beginnt langsam (aber keine Eile!)." },
                { headline: "Mobilität", text: "Es strampelt wild, will sich vielleicht drehen. Frust, wenn es nicht klappt." }
            ]
        },
        mom: {
            summary: "Das Thema 'Beikost' wirft seine Schatten voraus.",
            details: [
                { headline: "Info-Dschungel", text: "Brei oder Baby-Led-Weaning? Helft ihr, den Druck rauszunehmen. Milch bleibt Hauptnahrung." },
                { headline: "Vergleiche", text: "'Die anderen Babys drehen sich schon?' - Stoppt das Vergleichen. Jedes Kind hat sein Tempo." },
                { headline: "Energie", text: "Nutzt gute Phasen für Ausflüge. Das Baby ist noch relativ 'transportabel' (robbt nicht weg)." }
            ]
        }
    },
    17: {
        title: "Mobilität & Drehen",
        feeling: "In Action",
        tip: "Sicher machen: Ab jetzt nie mehr unbeaufsichtigt auf dem Wickeltisch!",
        baby: {
            summary: "Viele Babys drehen sich jetzt (Rücken auf Bauch).",
            details: [
                { headline: "Dreh-Moment", text: "Der große Sport-Moment: Die Drehung. Erst Zufall, dann Absicht. Und dann: Frust (weil es nicht zurück geht)." },
                { headline: "Fuß-Entdecker", text: "Die Füße werden entdeckt und in den Mund gesteckt. Super Dehnung für den Rücken!" },
                { headline: "Schlaf", text: "Nächtliches Üben (Drehen im Schlaf) kann wieder für Unruhe sorgen." }
            ]
        },
        mom: {
            summary: "Grenzen setzen gegenüber Ratschlägen.",
            details: [
                { headline: "Nervige Tipps", text: "'Hat es Hunger?', 'Ist ihm kalt?' - Lernt, solche Kommentare freundlich aber bestimmt zu überhören." },
                { headline: "Abgrenzung", text: "Ihr seid die Experten für EUER Kind. Niemand sonst." },
                { headline: "Erholung", text: "Wenn die Nächte unruhig sind: Wer kann tagsüber mal den Kinderwagen schieben, damit sie schlafen kann?" }
            ]
        }
    },
    18: {
        title: "Fremdeln?",
        feeling: "Mama-Fixiert",
        tip: "Nimm es nicht persönlich, wenn es nur zu Mama will.",
        baby: {
            summary: "Erste Anzeichen von Fremdeln oder '8-Monats-Angst' (verfrüht).",
            details: [
                { headline: "Klammern", text: "Es unterscheidet scharf zwischen Bezugsperson und 'Fremd'. Oma wird vielleicht angebrüllt." },
                { headline: "Objektpermanenz", text: "Es beginnt zu verstehen: Wenn Mama weg ist, ist sie weg (und das ist doof)." },
                { headline: "Wachstum", text: "Die Kleidung wird schon wieder zu klein. Aussortieren steht an." }
            ]
        },
        mom: {
            summary: "Mental Load Thema: Kleidung & Ausstattung.",
            details: [
                { headline: "Aussortieren", text: "Das Wegpacken der 'ganz kleinen' Sachen kann emotional sein. Mach mit, sei da." },
                { headline: "Rücken", text: "Das Tragen eines 'klammernden' Babys ist anstrengend. Biete Massagen an." },
                { headline: "Geduld", text: "Wenn das Baby nur zu ihr will: Bring ihr Getränke, Snacks, Handy. Sei der Assistent." }
            ]
        }
    },
    19: {
        title: "Zähne im Anmarsch?",
        feeling: "Aua",
        tip: "Beißring kühlen oder Veilchenwurzel anbieten.",
        baby: {
            summary: "Alles wird angekaut. Rote Backen, viel Sabber.",
            details: [
                { headline: "Zahnen", text: "Die Zähne schießen in den Kiefer (oder brechen durch). Das tut weh. Osanit oder Dentinox bereit halten." },
                { headline: "Beißen", text: "Es beißt auf allem herum – auch auf der Brust/Flasche. Autsch." },
                { headline: "Infekte", text: "Zahnen schwächt oft das Immunsystem leicht -> Schnupfen oder Fieber möglich." }
            ]
        },
        mom: {
            summary: "Spagat zwischen Arbeit (Gedanken) und Baby.",
            details: [
                { headline: "Zukunftssorgen", text: "Finanzen, Job-Rückkehr, KiTa-Suche. Diese Themen können drücken. Redet offen darüber." },
                { headline: "Kraft", text: "Ein zahnendes Baby ist 'High Need'. Sie braucht Pausen, in denen sie NICHTS hören muss." },
                { headline: "Ernährung", text: "Achte darauf, dass sie genug isst. Stress killt den Appetit." }
            ]
        }
    },
    20: {
        title: "Halbzeit!",
        feeling: "Stolz",
        tip: "Macht ein Foto: 'Genau so groß wie bei der Geburt' (Vergleich).",
        baby: {
            summary: "Fast 5 Monate alt. Reagiert oft schon auf den Namen.",
            details: [
                { headline: "Namen", text: "Es dreht den Kopf, wenn man seinen Namen ruft (oder zumindest die Tonlage erkennt)." },
                { headline: "Sitzen?", text: "Es will hoch hinaus. Sitzen (mit Stütze!) findet es toll, aber der Rücken muss noch geschont werden." },
                { headline: "Beikost", text: "Vielleicht startet ihr bald? Besorgt schon mal Lätzchen und Löffel." }
            ]
        },
        mom: {
            summary: "Self-Care Reminder. Akkus aufladen.",
            details: [
                { headline: "Rückblick", text: "5 Monate! Die Zeit rennt. Gönnt euch einen Moment, um alte Fotos anzusehen." },
                { headline: "Auszeit", text: "Wie wäre es mit einem Wochenende (oder einer Nacht) 'Schichtfrei' für sie (bei Oma/Opa?), falls möglich?" },
                { headline: "Gesundheit", text: "Vitamine, Eisen, Schilddrüse. Ein kleiner Check-up beim Hausarzt kann bei Müdigkeit nicht schaden." }
            ]
        }
    },
    21: { title: "Beikost-Start", feeling: "Experimentierfreudig", tip: "Kamera bereit halten für das erste Brei-Gesicht!", baby: { summary: "Der Start in die Welt der festen Nahrung (optional).", details: [{ headline: "Brei oder Fingerfood?", text: "Ob BLW oder Brei – es geht um Spaß, nicht um Kalorien ('Food under one is just for fun')." }, { headline: "Sitzen", text: "Es kann vielleicht schon kurz mit Unterstützung sitzen. Der Hochstuhl wird interessant." }, { headline: "Zähne", text: "Die ersten Zähnchen könnten sichtbar werden (unten Mitte meist zuerst)." }] }, mom: { summary: "Füttern kann stressen oder Spaß machen.", details: [{ headline: "Geduld", text: "Am Anfang landet mehr auf dem Boden als im Magen. Das ist normal." }, { headline: "Freiheit", text: "Wenn das Baby isst, kann Papa auch mal füttern (Abstillen/Flasche reduzieren?)." }, { headline: "Rücken", text: "Das Heben wird schwerer (Baby wiegt 7-8kg+). Achte auf ihre Haltung." }] } },
    22: { title: "Mikrobiom", feeling: "Matschig", tip: "Lätzchen mit Ärmeln sind Gold wert.", baby: { summary: "Der Darm stellt sich um.", details: [{ headline: "Verdauung", text: "Feste Nahrung verändert den Stuhlgang (Konsistenz & Geruch!). Viel trinken anbieten." }, { headline: "Motorik", text: "Es greift gezielter und gibt Gegenstände von einer Hand in die andere." }, { headline: "Laute", text: "Silbenketten wie 'Da-da' oder 'Ba-ba' werden geübt (noch ohne Bedeutung)." }] }, mom: { summary: "Der Alltag mit einem essenden Baby ändert sich.", details: [{ headline: "Meal Prep", text: "Vorkochen für das Baby? Unterstütze sie dabei (Gemüse dünsten/pürieren)." }, { headline: "Zeitmanagement", text: "Essen dauert jetzt 3x so lange. Plant das ein." }, { headline: "Schlaf", text: "Manchmal schlafen Babys mit Brei besser – manchmal schlechter (Bauchweh). Kein Garant!" }] } },
    23: { title: "Dreh-Wurm", feeling: "Aktiv", tip: "Wickeln wird zum Wrestling-Match. Ablenkung (Spielzeug) hilft.", baby: { summary: "Es dreht sich fleißig (Rücken -> Bauch -> Rücken).", details: [{ headline: "Mobilität", text: "Es rollt sich durch den Raum. Nichts ist mehr sicher auf dem Boden." }, { headline: "Sicht", text: "Es sieht fast so gut wie ein Erwachsener. Auch kleine Krümel werden entdeckt." }, { headline: "Füße", text: "Die Füße landen oft im Mund. Ein wichtiges Spiel zur Körperwahrnehmung." }] }, mom: { summary: "Sicherheit im Haushalt wird Thema.", details: [{ headline: "Steckdosen", text: "Jetzt spätestens alles sichern. Sie macht sich Sorgen? Nimm sie ernst und handle." }, { headline: "Boden", text: "Ihr lebt jetzt auf dem Teppich. Sauberkeit wird wichtiger (aber nicht steril)." }, { headline: "Kraft", text: "Das ständige Bücken und Heben trainiert, aber ermüdet auch." }] } },
    24: { title: "Halbes Jahr!", feeling: "Ungläubig", tip: "Feiert das 'Halbe'. Ein kleiner Kuchen für euch?", baby: { summary: "6 Monate! Ein Meilenstein.", details: [{ headline: "Wahrnehmung", text: "Es erkennt Emotionen in eurem Gesicht und reagiert darauf." }, { headline: "Namen", text: "Es reagiert zuverlässig auf seinen Namen." }, { headline: "Schlaf", text: "Viele Babys machen jetzt 2 längere Schläfchen am Tag statt vieler kleiner." }] }, mom: { summary: "Ein halbes Jahr Muttersein. Zeit für ein Resümee.", details: [{ headline: "Stolz", text: "Schaut zurück: Was habt ihr alles gelernt? Ihr seid Profis geworden." }, { headline: "Zukunft", text: "Wie geht es weiter mit Job/Elternzeit? Die zweite Hälfte beginnt." }, { headline: "Selbstfürsorge", text: "Hat sie ihre Hobbys wieder aufgenommen? Wenn nicht: Jetzt anschubsen." }] } },
    25: { title: "Robben startet", feeling: "Unterwegs", tip: "Türen schließen! Es wird mobil.", baby: { summary: "Erste Vorwärtsbewegungen (Robben oder Kriechen).", details: [{ headline: "Robben", text: "Es schiebt sich rückwärts oder zieht sich vorwärts. Der Radius wächst." }, { headline: "Frustration", text: "Es will zum Spielzeug, kommt aber nicht hin. Frust-Geschrei ist Training." }, { headline: "Fremdeln", text: "Die Bindung zu euch ist extrem stark. Fremde werden kritisch beäugt." }] }, mom: { summary: "Keine ruhige Minute mehr.", details: [{ headline: "Aufsicht", text: "Man kann das Baby keine Sekunde mehr allein lassen (auf Sofa/Wickeltisch)." }, { headline: "Mental Load", text: "Ständige Wachsamkeit ('Achtung Kante!') ist anstrengend." }, { headline: "Freiraum", text: "Ermögliche ihr Auszeiten außer Haus, damit sie den 'Radar' abschalten kann." }] } },
    26: { title: "Objektpermanenz", feeling: "Schlau", tip: "Spiel 'Gugus-Dada' (Verstecken). Der Hit!", baby: { summary: "Es versteht: Dinge sind noch da, auch wenn man sie nicht sieht.", details: [{ headline: "Verstecken", text: "Wenn du den Raum verlässt, weiß es, dass du noch existierst (und ruft dich!)." }, { headline: "Werfen", text: "Dinge runterwerfen und schauen, ob sie wiederkommen (Physik-Unterricht)." }, { headline: "Zähne", text: "Nächste Runde? Schneidezähne oben kommen oft jetzt." }] }, mom: { summary: "Das 'Klammern' kann zunehmen (Trennungsangst).", details: [{ headline: "Trennungsangst", text: "Wenn Mama geht, ist Drama. Das ist ein Zeichen guter Bindung, aber nervig." }, { headline: "Geduld", text: "Das 'Runterwerf-Spiel' macht sie wahnsinnig. Spiel du es mit ihm." }, { headline: "Schlaf", text: "Durch die Entwicklung kann der Schlaf wieder unruhiger werden." }] } },
    27: { title: "Pinzettengriff üben", feeling: "Feinmotorisch", tip: "Erbsen oder Heidelbeeren als Übungsobjekte (unter Aufsicht).", baby: { summary: "Fingerfertigkeit nimmt zu. Daumen und Zeigefinger arbeiten zusammen.", details: [{ headline: "Scherengriff", text: "Es greift Dinge jetzt mit Daumen und Zeigefinger (Vorstufe Pinzettengriff)." }, { headline: "Klatschen", text: "Vielleicht klatscht es schon in die Hände?" }, { headline: "Brabbeln", text: "'Dadada' oder 'Mamama'. Meist noch ohne Zuweisung, aber süß." }] }, mom: { summary: "Stolz auf die kleinen Fortschritte.", details: [{ headline: "Vergleich", text: "Andere Babys krabbeln schon? Egal. Jedes Kind hat sein Tempo. Beruhige sie." }, { headline: "Essen", text: "Fingerfood macht Dreck. Sei entspannt bei der Sauerei." }, { headline: "Auszeit", text: "Ein Abendessen mit Freundinnen? Schlag es vor." }] } },
    28: { title: "Krabbel-Modus", feeling: "Schnell", tip: "Knieschoner sind Quatsch, aber rutschfeste Hosen helfen.", baby: { summary: "Vom Robben zum Vierfüßlerstand zum Krabbeln.", details: [{ headline: "Vierfüßler", text: "Es wippt im Vierfüßler vor und zurück. Der Startschuss zum Krabbeln." }, { headline: "Krabbeln", text: "Einige starten jetzt durch. Achtung: Treppen sichern!" }, { headline: "Höhe", text: "Es zieht sich an Möbeln hoch in den Kniestand." }] }, mom: { summary: "Hinterherrennen ist der neue Sport.", details: [{ headline: "Sicherheit", text: "Treppengitter montieren! Das ist jetzt dein Job." }, { headline: "Schuhe", text: "Braucht das Baby Schuhe? Nein, Barfuß oder Lederpuschen ist am besten." }, { headline: "Müdigkeit", text: "Die körperliche Aktivität des Babys macht auch die Eltern müde." }] } },
    29: { title: "Sitzen Profi", feeling: "Aufrecht", tip: "Setz es in den Sandkasten oder auf die Wiese.", baby: { summary: "Freies Sitzen klappt immer besser.", details: [{ headline: "Stabilität", text: "Es kann sich beim Sitzen drehen, ohne umzufallen." }, { headline: "Spielen", text: "Im Sitzen sind die Hände frei für komplexere Spiele (Bauklötze)." }, { headline: "Winken", text: "Vielleicht winkt es schon zum Abschied?" }] }, mom: { summary: "Fahrradsitz möglich? Erst wenn es sicher sitzt!", details: [{ headline: "Mobilität", text: "Mit dem Fahrrad unterwegs sein? Besorgt Helme und einen guten Sitz." }, { headline: "Tragen", text: "Auf dem Rücken tragen wird jetzt bequemer für längere Strecken." }, { headline: "Rücken", text: "Ihr Rücken wird entlastet, wenn sie es weniger tragen muss." }] } },
    30: { title: "Fremdeln Hochphase", feeling: "Skeptisch", tip: "Respektiere, wenn es jemanden nicht mag. Nicht zwingen.", baby: { summary: "Die '8-Monats-Angst' kann sich verspätet zeigen.", details: [{ headline: "Unbekannte", text: "Auch Tante Erna kann plötzlich gruselig sein. Das ist Schutzinstinkt." }, { headline: "Nachahmen", text: "Es hustet, wenn du hustest. Es lacht, wenn du lachst." }, { headline: "Nein", text: "Es versteht den Tonfall von 'Nein' (hört aber nicht unbedingt drauf)." }] }, mom: { summary: "Manchmal peinlich, wenn das Kind Oma anbrüllt.", details: [{ headline: "Diplomatie", text: "Erklärt Verwandten, dass es eine Phase ist. Es liegt nicht an ihnen." }, { headline: "Schutz", text: "Stellt euch vor das Kind. Zwingt es nicht auf den Arm." }, { headline: "Nacht", text: "Nachts wird oft mehr Nähe gesucht/gecheckt." }] } },
    31: { title: "Hochziehen", feeling: "Vertikal", tip: "Achtung: Tischdecken werden runtergezogen!", baby: { summary: "Es zieht sich überall hoch zum Stehen.", details: [{ headline: "Stand", text: "Es steht wackelig am Couchtisch. Runterkommen ist oft das Problem (Plumps)." }, { headline: "Fallschule", text: "Es wird oft hinfallen. Trösten, aber nicht überdramatisieren." }, { headline: "Wille", text: "Es will Dinge haben, die oben liegen. Der Wille wächst." }] }, mom: { summary: "Neue Gefahrenzone: Tischkanten und Regale.", details: [{ headline: "Eckenschutz", text: "Klebe Ecken ab. Es wird passieren." }, { headline: "Deko", text: "Alles unter 1m Höhe wegräumen. Minimalismus ist angesagt." }, { headline: "Nerven", text: "Das ständige 'Nein, heiß!' oder 'Vorsicht!' zehrt." }] } },
    32: { title: "Pinzettengriff Perfekt", feeling: "Präzise", tip: "Lass es Krümel vom Tisch aufsammeln (Beschäftigungstherapie).", baby: { summary: "Kleinste Dinge werden mit zwei Fingern gepickt.", details: [{ headline: "Feinmotorik", text: "Perfekter Pinzettengriff. Vorsicht mit Kleinteilen (Verschluckungsgefahr!)." }, { headline: "Zeigen", text: "Es deutet mit dem Zeigefinger auf Dinge, die es haben will ('Da!')." }, { headline: "Verstehen", text: "Es verknüpft Wörter mit Gegenständen ('Wo ist der Ball?')." }] }, mom: { summary: "Kommunikation wird einfacher.", details: [{ headline: "Interaktion", text: "Man kann jetzt 'Bücher anschauen' und Dinge benennen. Das macht Spaß." }, { headline: "Gefahr", text: "Checkt den Boden auf Münzen, Lego, Knöpfe. Alles wandert in den Mund." }, { headline: "Pause", text: "Wenn es konzentriert spielt: Nicht stören! Genieß den Kaffee." }] } },
    33: { title: "Brabbel-Dialoge", feeling: "Gesprächig", tip: "Antworte ihm in 'echter' Sprache, nicht nur Babysprache.", baby: { summary: "Es führt Gespräche in seiner Fantasie-Sprache.", details: [{ headline: "Intonation", text: "Es klingt wie eine echte Frage oder ein Befehl, nur die Worte fehlen." }, { headline: "Mama/Papa", text: "Gezieltes 'Mama' oder 'Papa'? Könnte jetzt passieren!" }, { headline: "Küssen", text: "Es gibt nasse, offene Münder als Kuss." }] }, mom: { summary: "Das erste 'Mama' ist ein Highlight.", details: [{ headline: "Emotion", text: "Das Herz schmilzt. Feiert diesen Moment." }, { headline: "Vorlesen", text: "Gute Nacht Geschichten werden zum Ritual. Übernimm du das Vorlesen." }, { headline: "Sozial", text: "Spielplätze werden interessanter (Beobachten anderer Kinder)." }] } },
    34: { title: "Klettermx", feeling: "Abenteuerlich", tip: "Zeig ihm, wie man rückwärts vom Sofa runtersteigt.", baby: { summary: "Höhen werden erklommen. Sofas, Treppen, Stühle.", details: [{ headline: "Klettern", text: "Nichts ist sicher. Es versucht überall raufzukommen." }, { headline: "Rückwärts", text: "Die wichtigste Lektion: Rückwärts runtergehen. Übe das täglich." }, { headline: "Schlafsack", text: "Es steht im Bett. Schlafsack verhindert das Raorklettern (meistens)." }] }, mom: { summary: "Ständige Absturzgefahr.", details: [{ headline: "Aufsicht", text: "Man muss wirklich daneben stehen. Das ist anstrengend." }, { headline: "Unfälle", text: "Beulen gehören dazu. Arnika-Kügelchen oder Kühlpad bereit halten." }, { headline: "Vertrauen", text: "Trau dem Kind etwas zu, aber sichere ab." }] } },
    35: { title: "Experimente", feeling: "Forscher", tip: "Baden wird zur Physikstunde. Becher, Eimer, Spritzen.", baby: { summary: "Ursache und Wirkung werden getestet.", details: [{ headline: "Schwerkraft", text: "Löffel runterwerfen. Immer wieder. Kommt Mama? Ja. Test bestanden." }, { headline: "Licht", text: "Lichtschalter an/aus. Ein faszinierendes Spiel." }, { headline: "Musik", text: "Es tanzt oder wippt zur Musik." }] }, mom: { summary: "Geduld bei Wiederholungen.", details: [{ headline: "Nerven", text: "Das 100. Mal den Löffel aufheben nervt. Mach einen Witz draus." }, { headline: "Spielzeug", text: "Alltagsgegenstände (Schüssel, Löffel) sind spannender als teures Spielzeug." }, { headline: "Auszeit", text: "Schick sie zum Sport oder in die Wanne. Du machst den Löffel-Dienst." }] } },
    36: { title: "Nein!", feeling: "Autonom", tip: "Wähle deine Kämpfe. Muss man hier 'Nein' sagen oder ist es egal?", baby: { summary: "Es testet Grenzen und versteht Verbote.", details: [{ headline: "Grenzen", text: "Es schaut dich an und fasst trotzdem an die Steckdose. Es testet deine Reaktion." }, { headline: "Wut", text: "Wenn etwas nicht klappt, wird gemeckert oder geschrien." }, { headline: "Essen", text: "Es entscheidet selbst, was und wieviel es isst. Füttern wird oft verweigert." }] }, mom: { summary: "Erziehung beginnt (sanft).", details: [{ headline: "Konsequenz", text: "Ein 'Nein' sollte ein 'Nein' bleiben. Sprecht euch ab." }, { headline: "Essen", text: "Essen wird geworfen. Bleib ruhig. Es lernt Physik, nicht Manieren." }, { headline: "Humor", text: "Lacht über die Tests. Es ist nicht böse gemeint." }] } },
    37: { title: "Cruising", feeling: "Mobil", tip: "Möbelrücken: Schaff Platz für Laufwege.", baby: { summary: "Es läuft an Möbeln entlang (Seitwärts-Schritt).", details: [{ headline: "Möbel-Laufen", text: "Es hangelt sich vom Tisch zum Sofa. Alles muss stabil stehen!" }, { headline: "Freistehen", text: "Es lässt kurz los und steht frei (für 2 Sekunden). Plumps." }, { headline: "Schlafen", text: "Verarbeitung der Mobilität kann zu schlechtem Schlaf führen." }] }, mom: { summary: "Stolperfalle Kind.", details: [{ headline: "Achtsamkeit", text: "Man muss immer schauen, wo das Kind gerade hangelt." }, { headline: "Schuhe", text: "Immer noch: Barfuß ist am besten für die Fußmuskeln." }, { headline: "Urlaub", text: "Urlaub planen? Bedenkt die Mobilität (Unterkunft kindersicher?)." }] } },
    38: { title: "Charakter", feeling: "Persönlichkeit", tip: "Beobachte: Ist es wild? Vorsichtig? Lustig?", baby: { summary: "Die Persönlichkeit wird immer deutlicher.", details: [{ headline: "Vorlieben", text: "Es hat klare Lieblingsbücher, -essen und -menschen." }, { headline: "Humor", text: "Es macht Quatsch, um euch zum Lachen zu bringen." }, { headline: "Helfen", text: "Es will beim Anziehen 'helfen' (Arm reinstecken)." }] }, mom: { summary: "Man lernt sein Kind neu kennen.", details: [{ headline: "Beziehung", text: "Es ist nicht mehr nur 'das Baby', es ist eine kleine Person." }, { headline: "Kita", text: "Startet bald die Eingewöhnung? Gefühle besprechen." }, { headline: "Arbeit", text: "Der Wiedereinstieg rückt näher? Das kann stressen." }] } },
    39: { title: "Verstecken", feeling: "Verspielt", tip: "Bau eine Höhle aus Decken und Kissen.", baby: { summary: "Es liebt Versteckspiele und Höhlen.", details: [{ headline: "Verstecken", text: "Es versteckt sich (Augen zuhalten) und denkt, es ist weg." }, { headline: "Suchen", text: "Es sucht gezielt nach verstecktem Spielzeug." }, { headline: "Nachahmen", text: "Es telefoniert mit der Banane oder wischt den Tisch." }] }, mom: { summary: "Spielen macht jetzt richtig Spaß.", details: [{ headline: "Mitspielen", text: "Lass dich auf seine Welt ein. Krabbel mit in die Höhle." }, { headline: "Haushalt", text: "Lass es 'mithelfen' (eigenen Lappen geben). Dauert länger, macht aber stolz." }, { headline: "Planung", text: "1. Geburtstag in Sicht? Fangt langsam an zu planen." }] } },
    40: { title: "Fingerfood Profi", feeling: "Selbstständig", tip: "Kleine Gabel/Löffel anbieten. Übung macht den Meister.", baby: { summary: "Es isst fast alles vom Familientisch mit.", details: [{ headline: "Essen", text: "Es will das, was ihr habt. Salzarm kochen!" }, { headline: "Trinken", text: "Trinken aus dem Becher klappt immer besser (mit Überschwemmung)." }, { headline: "Schlafen", text: "Vielleicht nur noch 1 Mittagsschlaf? Der Übergang ist oft knifflig." }] }, mom: { summary: "Weniger 'Baby-Brei', mehr Familienessen.", details: [{ headline: "Kochen", text: "Ein Essen für alle. Das entlastet." }, { headline: "Abstillen", text: "Vielleicht ein Thema? Oder Langzeitstillen? Beides ist okay." }, { headline: "Gesundheit", text: "Zähneputzen ist oft ein Kampf. Bleibt dran (singen, spiegeln)." }] } },
    41: { title: "Erste Schritte?", feeling: "Wackelig", tip: "Laufwagen (zum Schieben, kein Gehfrei!) sind jetzt der Hit.", baby: { summary: "Vielleicht die ersten freien Schritte? Oder schnelles Krabbeln.", details: [{ headline: "Laufen", text: "Manche laufen schon, andere lassen sich Zeit bis 18 Monate. Alles normal." }, { headline: "Sprechen", text: "Der Wortschatz wächst passiv enorm. Es versteht fast alles." }, { headline: "Trotzen", text: "Wenn es nicht klappt, wird getobt." }] }, mom: { summary: "Spannung: Wann läuft es?", details: [{ headline: "Vergleich", text: "Kein Druck. 'Laufen lernen' kann man nicht üben, es ist Hirnreife." }, { headline: "Rücken", text: "Das an-der-Hand-laufen (gebückt) ist der Tod für den Rücken. Vermeiden!" }, { headline: "Schuhe", text: "Erste Schuhe erst kaufen, wenn es sicher draußen läuft." }] } },
    42: { title: "Baumeister", feeling: "Konstruktiv", tip: "Duplo oder Holzbausteine. Bauen und Umwerfen.", baby: { summary: "Feinmotorik erlaubt Turmbau (2-3 Klötze).", details: [{ headline: "Stapeln", text: "Es stapelt Dinge übereinander. Und wirft sie um." }, { headline: "Bücher", text: "Es blättert Seiten um (Pappbücher)." }, { headline: "Zeigen", text: "Es zeigt auf Körperteile ('Wo ist die Nase?')." }] }, mom: { summary: "Interaktives Vorlesen.", details: [{ headline: "Bücher", text: "Bibliotheks-Ausweis besorgen? Bücher sind teuer/schwer." }, { headline: "Sprache", text: "Korrigier es nicht ('Nana' -> 'Ja, eine Banane'). Bestätigen und richtig wiederholen." }, { headline: "Ruhe", text: "Bücher angucken sind gute Ruhe-Inseln im wilden Alltag." }] } },
    43: { title: "Mein Willen", feeling: "Bestimmend", tip: "Biete Auswahl an: 'Roten oder blauen Becher?' (Schein-Autonomie).", baby: { summary: "Autonomie-Phase (Trotzphase) kündigt sich an.", details: [{ headline: "Selber!", text: "Es will alles alleine machen. Auch wenn es nicht klappt." }, { headline: "Wut", text: "Wutanfälle häufen sich. Es kann seine Gefühle noch nicht regulieren." }, { headline: "Schlaf", text: "Abends ins Bett gehen kann zum Machtkampf werden." }] }, mom: { summary: "Geduld, Geduld, Geduld.", details: [{ headline: "Co-Regulation", text: "Du bist sein externer Stress-Regulator. Bleib ruhig, wenn es tobt." }, { headline: "Grenzen", text: "Liebevoll aber klar. Sicherheit geht vor Willen." }, { headline: "Auszeit", text: "Wechselt euch ab, wenn einer keine Nerven mehr hat." }] } },
    44: { title: "Kleine Helfer", feeling: "Nützlich", tip: "Lass es Dinge in den Müll werfen. Es liebt Aufträge.", baby: { summary: "Es versteht komplexe Aufforderungen.", details: [{ headline: "Aufträge", text: "'Hol deine Schuhe' oder 'Bring das zu Papa' wird verstanden." }, { headline: "Helfen", text: "Es will Teil der Gemeinschaft sein. Wäsche ausräumen ist toll." }, { headline: "Kuscheln", text: "Es kommt aktiv zum Kuscheln, wenn es Trost braucht." }] }, mom: { summary: "Stolz auf die Kooperation.", details: [{ headline: "Einbinden", text: "Alles dauert länger, aber es lernt so viel dabei." }, { headline: "Lob", text: "Lobe den Prozess ('Toll, wie du das trägst'), nicht nur das Ergebnis." }, { headline: "Haushalt", text: "Lass 5 gerade sein. Ein sauberes Haus ist weniger wichtig als glückliche Eltern." }] } },
    45: { title: "Fast ein Jahr", feeling: "Melancholisch", tip: "Planung 1. Geburtstag: Wen laden wir ein?", baby: { summary: "Der Countdown läuft. Vom Baby zum Kleinkind.", details: [{ headline: "Kleinkind", text: "Das Gesicht verliert das Babyhafte. Es wirkt 'erwachsener'." }, { headline: "Laufen", text: "Viele machen jetzt die ersten freien Schritte." }, { headline: "Essen", text: "Es isst (fast) komplett am Tisch mit." }] }, mom: { summary: "Wehmut und Vorfreude mischen sich.", details: [{ headline: "Emotional", text: "'Wo ist mein Baby hin?' ist ein normaler Gedanke. Tröste sie." }, { headline: "Party", text: "Macht keinen Stress. Das Kind braucht keine riesen Party. Kuchen und Eltern reichen." }, { headline: "Geschenk", text: "Was schenkt man? Zeit oder was praktisches (Laufrad?)." }] } },
    46: { title: "Schlaf-Chaos?", feeling: "Müde", tip: "Bleibt bei den Routinen. Das gibt Halt.", baby: { summary: "Schlafregression um den 1. Geburtstag ist typisch.", details: [{ headline: "Schlaf", text: "Es wird nachts wach, übt Laufen im Bett oder verarbeitet den Tag." }, { headline: "Träume", text: "Es träumt intensiv und wacht weinend auf." }, { headline: "Nähe", text: "Es braucht nachts wieder mehr Rückversicherung." }] }, mom: { summary: "Schlafmangel Reloaded.", details: [{ headline: "Durchhalten", text: "Es ist (wirklich) nur eine Phase. Wechsle dich mit ihr ab." }, { headline: "Kaffee", text: "Mein bester Freund." }, { headline: "Verständnis", text: "Es macht das nicht, um euch zu ärgern. Es wächst." }] } },
    47: { title: "Entdecker", feeling: "Grenzenlos", tip: "Spielplatz-Zeit! Sand, Schaukel, Rutsche.", baby: { summary: "Draußen sein ist das Größte.", details: [{ headline: "Sand", text: "Sand essen gehört dazu. Stärkt das Immunsystem (sagt man)." }, { headline: "Rutsche", text: "Es liebt das Kribbeln im Bauch. Immer wieder." }, { headline: "Tiere", text: "Hunde, Katzen, Vögel. Alles wird begeistert kommentiert ('Wauwau!')." }] }, mom: { summary: "Spielplatz-Verabredungen.", details: [{ headline: "Sozial", text: "Mütter treffen sich am Sandkasten. Geh du auch mal mit!" }, { headline: "Kleidung", text: "Matschhosen sind Pflicht. Für das Kind UND dich (nasse Bänke)." }, { headline: "Sonne", text: "Sonnencreme nicht vergessen. Die Haut ist empfindlich." }] } },
    48: { title: "Wortschatz", feeling: "Gesprächig", tip: "Bilderbücher mit vielen Details ('Wimmelbücher').", baby: { summary: "Es plappert den ganzen Tag.", details: [{ headline: "Wörter", text: "Es kann vielleicht 2-5 Wörter, versteht aber 100." }, { headline: "Zeichensprache", text: "Es nutzt Gesten, um sich verständlich zu machen." }, { headline: "Musik", text: "Es singt (summt) und tanzt." }] }, mom: { summary: "Kommunikation auf neuem Level.", details: [{ headline: "Verstehen", text: "Man muss weniger raten. Das entspannt." }, { headline: "Vorbild", text: "Achtet auf eure Sprache. 'Scheiße' wird schnell nachgeplappert." }, { headline: "Hören", text: "Hör ihr zu, wenn sie erzählt, was das Kind Neues gelernt hat." }] } },
    49: { title: "Countdown", feeling: "Aufgeregt", tip: "Fotobuch vom ersten Jahr erstellen (als Geschenk für sie?).", baby: { summary: "Noch 3 Wochen bis zum Geburtstag.", details: [{ headline: "Rückblick", text: "Es hat sein Gewicht verdreifacht und ist 25cm gewachsen!" }, { headline: "Selbstbild", text: "Es erkennt sich jetzt sicher im Spiegel." }, { headline: "Empathie", text: "Es tröstet vielleicht schon andere (gibt Schnuller ab)." }] }, mom: { summary: "Das Jahr Revue passieren lassen.", details: [{ headline: "Emotionen", text: "Das erste Jahr war hart und schön. Sprecht darüber." }, { headline: "Fotos", text: "Sichtet die 10.000 Fotos. Macht ein Album." }, { headline: "Feier", text: "Kuchenrezept rausgesucht? Zuckerfrei oder Schoko-Bombe?" }] } },
    50: { title: "Laufen & Rennen", feeling: "Schnell", tip: "Fangen spielen. Es wird kreischen vor Freude.", baby: { summary: "Die Schritte werden sicherer.", details: [{ headline: "Rennen", text: "Wenn es laufen kann, versucht es zu rennen. Und fällt." }, { headline: "Schuhe", text: "Jetzt lohnt sich der Gang zum Schuhladen (Füße messen lassen)." }, { headline: "Unabhängigkeit", text: "Es läuft von dir weg. Ein großer Schritt (nabelt sich ab)." }] }, mom: { summary: "Loslassen lernen.", details: [{ headline: "Vertrauen", text: "Lass es laufen, auch wenn es wackelt. Fang es auf, wenn es fällt." }, { headline: "Sicherheit", text: "Draußen an der Straße: Hand ist Pflicht! Da gibt es keine Diskussion." }, { headline: "Stolz", text: "Sieh dir an, was aus dem hilflosen Bündel geworden ist." }] } },
    51: { title: "Fast ein Kleinkind", feeling: "Groß", tip: "Packt die Baby-Sachen weg (Klamotten Gr. 74/80). Platz für Neues.", baby: { summary: "Der Babyspeck schmilzt durch die Bewegung.", details: [{ headline: "Körper", text: "Es wird drahtiger und 'kindlicher'." }, { headline: "Essen", text: "Es isst mit Gabel und Löffel (mehr oder weniger)." }, { headline: "Schlaf", text: "Ein Mittagschlaf (1-2 Stunden) reicht meist." }] }, mom: { summary: "Abschied von der Babyzeit.", details: [{ headline: "Wehmut", text: "Nie wieder Baby? Oder wollt ihr noch eins? Fragen kommen auf." }, { headline: "Kleidung", text: "Aussortieren befreit. Verkauft es oder spendet es." }, { headline: "Zukunft", text: "Freut euch auf das nächste Jahr. Kleinkinder sind lustig (und anstrengend)." }] } },
    52: { title: "Happy Birthday!", feeling: "Feier-Laune", tip: "Schenk deiner Partnerin Blumen zum '1. Mama-Geburtstag'.", baby: { summary: "1 Jahr alt! Ein Kleinkind!", details: [{ headline: "Gratulation", text: "Ihr habt das erste Jahr überlebt! Das ist eine Leistung." }, { headline: "Geschenke", text: "Das Papier ist oft spannender als der Inhalt. Mach entspannt." }, { headline: "Torte", text: "Die erste Torte (Matschen erlaubt!). Fotos machen!" }] }, mom: { summary: "Ihr habt es geschafft. Seid stolz auf euch.", details: [{ headline: "Heldin", text: "Sie hat das Kind geboren und ein Jahr genährt/umsorgt. Feier sie." }, { headline: "Paar", text: "Stoßt auf euch an. Ihr seid ein Team." }, { headline: "Ausblick", text: "Das Abenteuer geht weiter. Aber jetzt seid ihr eingespielt." }] } },
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
        if (stage === 2) return [{ id: 'p2-1', text: 'Möbel aufbauen (Crib/Wickeltisch)', category: 'Nestbau' }, { id: 'p2-2', text: 'Sicherheits-Check (Kabel/Steckdosen)', category: 'Sicherheit' }, { id: 'p2-3', text: 'Geburtskurs buchen', category: 'Logistik' }];
        if (stage === 3) return [{ id: 'p3-1', text: 'Weg zur Klinik testen', category: 'Notfall' }, { id: 'p3-2', text: 'Ruhe-Tag organisieren', category: 'Emotional' }, { id: 'p3-3', text: 'Anträge vorbereiten', category: 'Bürokratie' }];
    }
    if (mode === 'postpartum') {
        return [{ id: 'pp-1', text: 'Geburtsurkunde beantragen', category: 'Bürokratie' }, { id: 'pp-2', text: 'Krankenkasse informieren', category: 'Bürokratie' }, { id: 'pp-3', text: 'Kinderarzt U3 Termin', category: 'Gesundheit' }, { id: 'pp-4', text: 'Einkauf erledigen', category: 'Support' }, { id: 'pp-5', text: 'Besuch koordinieren', category: 'Gatekeeping' }];
    }
    if (mode === 'loss') {
        return [{ id: 'l-1', text: 'Krankmeldung/Mutterschutz klären', category: 'Bürokratie' }, { id: 'l-2', text: 'Bestatter kontaktieren', category: 'Logistik' }, { id: 'l-3', text: 'Abschiedsritual', category: 'Emotional' }, { id: 'l-4', text: 'Umfeld informieren', category: 'Kommunikation' }, { id: 'l-5', text: 'Rückbildung', category: 'Gesundheit' }];
    }
    if (mode === 'conception') {
        const common = [{ id: 'c-1', text: 'Folsäure nehmen (Sie)', category: 'Gesundheit' }, { id: 'c-2', text: 'Gesund ernähren', category: 'Lifestyle' }];
        const fertile = [{ id: 'c-f1', text: 'Zeit zu zweit einplanen', category: 'Romantik' }, { id: 'c-f2', text: 'Stress reduzieren', category: 'Mindset' }];
        const menstruation = [{ id: 'c-m1', text: 'Wärmflasche bereitstellen', category: 'Care' }, { id: 'c-m2', text: 'Schokolade besorgen', category: 'Support' }];

        if (stage === 'fertile' || stage === 'ovulation') return [...common, ...fertile];
        if (stage === 'menstruation') return [...common, ...menstruation];
        return common;
    }
    return [];
};

export const HABITS_PREGNANCY = [
    { key: 'hydration', title: "Wasser", text: "Bring ihr ein Glas", description: "Austrocknung ist ein Energie-Killer. Erinner sie ans Trinken, das hilft gegen Kreislaufprobleme.", icon: Droplets, color: 'blue' },
    { key: 'oasis', title: "Oase", text: "Tägliche Geste", description: "Eine kleine Aufmerksamkeit ohne Anlass (Blumen, Massage) zeigt: Ich sehe dich und wertschätze, was du leistest.", icon: Sparkles, color: 'amber' },
    { key: 'reading', title: "Wissen", text: "Lies einen Artikel", description: "Wissen beruhigt. Lies dich ein, damit du bei Arztterminen und Entscheidungen auf Augenhöhe mitreden kannst.", icon: BookOpen, color: 'indigo' },
    { key: 'movement', title: "Bewegung", text: "Spaziergang?", description: "Sanfte Bewegung hilft gegen Müdigkeit und Rückenschmerzen. Motiviere sie zu einem kurzen Spaziergang.", icon: Activity, color: 'emerald' },
    { key: 'date_night', title: "Date Night", text: "Zeit zu zweit", description: "Pflegt eure Beziehung, bevor der Baby-Alltag startet. Ein Abend nur für euch als Paar.", icon: Heart, color: 'rose' },
    { key: 'nesting', title: "Nestbau", text: "Zimmer planen", description: "Hilf aktiv mit, das Zuhause sicher und gemütlich zu machen. Das gibt ihr Sicherheit.", icon: Home, color: 'cyan' }
];

export const HABITS_POSTPARTUM = [
    { key: 'hydration', title: "Still-Snack", text: "Wasser & Nüsse", description: "Stillen macht hungrig und durstig. Stell ihr ungefragt Snacks und Wasser griffbereit hin.", icon: Utensils, color: 'orange' },
    { key: 'nightshift', title: "Nacht-Held", text: "Wickeln übernehmen", description: "Jede Stunde Schlaf am Stück ist für sie Gold wert. Übernimm die Nachtschicht nach dem Stillen.", icon: Moon, color: 'indigo' },
    { key: 'patience', title: "Geduld", text: "Durchatmen", description: "Hormone und Schlafmangel sind eine explosive Mischung. Bezieh ihre Laune nicht auf dich. Atme durch.", icon: Feather, color: 'rose' },
    { key: 'fresh_air', title: "Frische Luft", text: "Rausgehen", description: "Ein Tapetenwechsel tut euch allen gut. Pack das Baby ein und geht eine Runde raus.", icon: Sprout, color: 'emerald' },
    { key: 'shower', title: "Duschen", text: "Baby halten", description: "Schenk ihr 20 Minuten Zeit nur für sich im Bad. Ohne Babyfon, ohne Störung.", icon: Droplets, color: 'blue' },
    { key: 'sleep', title: "Schlaf", text: "Mittagsschlaf", description: "Nutzt jede Pause zum Schlafen. Der Haushalt läuft nicht weg, eure Gesundheit ist wichtiger.", icon: Moon, color: 'fuchsia' }
];

export const HABITS_LOSS = [
    { key: 'hydration', title: "Fürsorge", text: "Tee hinstellen", description: "Kleine Gesten der Fürsorge sagen mehr als Worte. Zeig ihr, dass du da bist.", icon: Droplets, color: 'stone' },
    { key: 'shield', title: "Schutzschild", text: "Besuch abwehren", description: "Du bist der Türsteher. Schütze euren Raum vor gut gemeinten, aber anstrengenden Besuchern.", icon: ShieldCheck, color: 'zinc' },
    { key: 'silence', title: "Stille", text: "Kerze anzünden", description: "Manchmal muss man nichts sagen. Gemeinsames Schweigen kann sehr verbindend sein.", icon: Sparkles, color: 'amber' },
    { key: 'nature', title: "Natur", text: "Waldspaziergang", description: "Die Natur urteilt nicht und fordert nichts. Das kann beim Heilen helfen.", icon: Sprout, color: 'emerald' },
    { key: 'writing', title: "Schreiben", text: "Tagebuch", description: "Gedanken aufzuschreiben hilft, das Chaos im Kopf zu ordnen. Ermutige sie dazu.", icon: FileText, color: 'indigo' },
    { key: 'music', title: "Musik", text: "Playlist hören", description: "Musik kann trösten, wo Worte fehlen. Erstellt eine Playlist für euch.", icon: Play, color: 'rose' }
];

export const HOSPITAL_BAG_CONTENT = {
    documents: {
        title: "Dokumente",
        items: [
            { id: 'mutterpass', text: 'Mutterpass' },
            { id: 'kk', text: 'Versicherungskarte' },
            { id: 'perso', text: 'Ausweise (Beide)' },
            { id: 'stammbuch', text: 'Stammbuch / Heiratsurkunde' },
            { id: 'bestattung', text: 'Ggf. Bestattungswünsche' }
        ]
    },
    mom: {
        title: "Für Mama",
        items: [
            { id: 'shirts', text: '2-3 weite Shirts/Nachthemden' },
            { id: 'slip', text: 'Bequeme Unterwäsche (Baumwolle)' },
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

export const LOSS_HOSPITAL_BAG_CONTENT = {
    documents: {
        title: "Wichtige Dokumente",
        items: [
            { id: 'mutterpass', text: 'Mutterpass & Karte' },
            { id: 'perso', text: 'Ausweise & Stammbuch' },
            { id: 'forms', text: 'Ggf. Formulare Klinikum' }
        ]
    },
    memories: {
        title: "Erinnerungen schaffen",
        items: [
            { id: 'camera', text: 'Kamera / Handy (geladen)' },
            { id: 'blanket', text: 'Besondere Decke / Tuch' },
            { id: 'toy', text: 'Kleines Kuscheltier (2x zum Tauschen)' },
            { id: 'box', text: 'Erinnerungskiste (für Armband etc.)' },
            { id: 'set', text: 'Abdruck-Set (Füße/Hände)' }
        ]
    },
    farewell: {
        title: "Für den Abschied",
        items: [
            { id: 'clothes_baby', text: 'Kleidung für das Sternenkind' },
            { id: 'symbol', text: 'Persönlicher Gegenstand / Brief' }
        ]
    },
    parents: {
        title: "Für Euch (Kraft)",
        items: [
            { id: 'food', text: 'Ausreichend Snacks & Getränke' },
            { id: 'comfy', text: 'Weiche, warme Kleidung' },
            { id: 'slippers', text: 'Hausschuhe / Dicke Socken' },
            { id: 'hygiene', text: 'Kulturbeutel (mild)' }
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

export const CONCEPTION_RESOURCES = [
    {
        title: "Wissen & Tracking",
        color: "sky",
        items: [
            { name: "Zyklus-Rechner", desc: "Verstehe die fruchtbaren Tage", url: "https://www.familienplanung.de/kinderwunsch/fruchtbarkeit-und-zyklus/fruchtbare-tage-berechnen/", icon: Calendar },
            { name: "Basaltemperatur", desc: "Anleitung zur NFP-Methode", url: "https://www.mynfp.de/temperatur-messen", icon: Thermometer },
            { name: "Kinderwunsch-Infos", desc: "Offizielles Portal der BZgA", url: "https://www.familienplanung.de/kinderwunsch/", icon: BookOpen }
        ]
    },
    {
        title: "Gesundheit Mann",
        color: "emerald",
        items: [
            { name: "Spermien-Fit", desc: "Tipps für bessere Qualität", url: "https://www.maennergesundheit.info/fruchtbarkeit", icon: Activity },
            { name: "Urologen-Suche", desc: "Finde einen Facharzt", url: "https://www.urologenportal.de/patienten/arztsuche.html", icon: Users }
        ]
    },
    {
        title: "Kliniken & Hilfe",
        color: "violet",
        items: [
            { name: "Kinderwunsch-Zentren", desc: "Register offizieller Zentren", url: "https://www.deutsches-ivf-register.de/", icon: Home },
            { name: "Beratung", desc: "Psychosoziale Beratung", url: "https://www.bkid.de/", icon: MessageCircle }
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

    parenting: {
        title: "Deep Talk: Erziehung",
        icon: MessageCircle,
        color: "violet",
        content: [
            { headline: "Wie wurdet ihr erzogen?", text: "Redet darüber, was eure Eltern toll gemacht haben – und was ihr auf keinen Fall wiederholen wollt. Das prägt euren eigenen Stil." },
            { headline: "Werte", text: "Was ist euch wichtig? Höflichkeit? Selbstständigkeit? Kreativität? Einigt euch auf 3 Kernwerte für eure Familie." },
            { headline: "Konflikte", text: "Wer darf 'Nein' sagen? Wie geht ihr mit Wutanfällen um? Einig zu sein (zumindest vor dem Kind) ist der Schlüssel." }
        ]
    },
    red_flags: {
        title: "Warnsignale (Wichtig!)",
        icon: AlertTriangle,
        color: "rose",
        content: [
            { headline: "Deine Rolle als Wächter", text: "Du siehst sie jeden Tag. Dir fallen Veränderungen auf, die sie vielleicht ignoriert. Achte auf Ödeme (Wasser) im Gesicht oder extrem geschwollene Hände." },
            { headline: "Präeklampsie (Schwangerschaftsvergiftung)", text: "Warnzeichen: Starke Kopfschmerzen, Flimmern vor den Augen, Übelkeit (im 3. Trimester), Bluthochdruck. Sofort zum Arzt!" },
            { headline: "Psychische Signale", text: "Wenn sie gar nicht mehr schlafen kann, extrem ängstlich ist oder 'grundlos' weint (über Wochen): Das kann eine prä- oder postpartale Depression sein." }
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
    },
    parenting_101: {
        title: "Erziehungs-Stile",
        icon: Users,
        color: "emerald",
        content: [
            { headline: "Bindungsorientiert", text: "Bedürfnisse prompt erfüllen, viel Nähe, kein 'Schreien lassen'. Das Ziel: Urvertrauen stärken." },
            { headline: "Autoritär vs. Autoritativ", text: "'Weil ich das sage' (autoritär) ist out. Klare Grenzen mit Liebe und Erklärung (autoritativ) sind der Goldstandard." },
            { headline: "Helikopter", text: "Alles abnehmen schwächt das Kind. Lass es Fehler machen (solange keine Gefahr besteht). Begleite, statt zu steuern." }
        ]
    },
    dad_hacks: {
        title: "Dad-Hacks (Survival)",
        icon: Zap,
        color: "amber",
        content: [
            { headline: "Der Fliegergriff", text: "Baby liegt mit dem Bauch auf deinem Unterarm, Kopf in der Ellenbeuge. Hilft fast immer bei Bauchweh." },
            { headline: "Weißes Rauschen", text: "Föhn, Staubsauger oder App anmachen. Das erinnert an die Geräusche im Bauch und beruhigt sofort." },
            { headline: "Gymnastikball", text: "Die Investition Nr. 1. Wippen beruhigt besser als Laufen – und schont deinen Rücken (etwas)." }
        ]
    }
};

export const ARTICLES_POSTPARTUM = {
    bonding: {
        title: "Bindung aufbauen",
        icon: User,
        color: "indigo",
        content: [
            { headline: "Haut an Haut", text: "Kuscheln ist nicht nur gemütlich, es schüttet Oxytocin aus. Das Bindungshormon hilft euch beiden, anzukommen." },
            { headline: "Tragen hilft", text: "Ein Tragetuch oder eine Trage ist Gold wert. Das Baby ist nah bei dir, beruhigt sich schneller und du hast die Hände frei." },
            { headline: "Deine Aufgaben", text: "Baden, Wickeln, Spazieren – mach diese Dinge zu deinen exklusiven Papa-Momenten. Routine schafft Vertrauen." }
        ]
    },
    sleep: {
        title: "Schlaf-Survival",
        icon: Moon,
        color: "blue",
        content: [
            { headline: "Schichtsystem", text: "Teilt die Nächte auf, wenn möglich. Oder einer übernimmt die erste Nachthälfte (bis 1 Uhr), der andere die zweite." },
            { headline: "Power Naps", text: "Schlaf, wenn das Baby schläft. Ja, der Haushalt bleibt liegen. Dein Schlaf ist jetzt wichtiger als ein sauberer Boden." },
            { headline: "Akzeptanz", text: "Es ist nur eine Phase. Das Mantra aller Eltern. Es wird besser. Versprochen." }
        ]
    },
    ppd_dad: {
        title: "PPD beim Mann?",
        icon: AlertTriangle,
        color: "rose",
        content: [
            { headline: "Nicht nur Mamas", text: "Auch Väter können eine postpartale Depression entwickeln (ca. 10%). Gereiztheit, Rückzug, Leeregefühl sind Warnsignale." },
            { headline: "Reden hilft", text: "Fress es nicht in dich rein. Sprich mit deiner Partnerin oder einem Freund. Es ist keine Schwäche, sich Hilfe zu holen." },
            { headline: "Professionelle Hilfe", text: "Wenn das Gefühl anhält: Geh zum Hausarzt. Es gibt Therapien, die schnell helfen." }
        ]
    },
    relationship: {
        title: "Eltern vs. Paar",
        icon: Heart,
        color: "emerald",
        content: [
            { headline: "Kleine Inseln", text: "Ein gemeinsamer Kaffee am Morgen, 10 Minuten auf dem Sofa. Sucht euch kleine Momente, in denen ihr kein 'Team' seid, sondern ein Paar." },
            { headline: "Kommunikation", text: "Sagt euch, was ihr braucht. 'Ich bin müde' ist kein Vorwurf. 'Ich brauche 30 Min Pause' ist eine klare Bitte." },
            { headline: "Geduld", text: "Ihr seid beide im Ausnahmezustand. Seid gnädig miteinander. Niemand meint es böse." }
        ]
    },
    metime: {
        title: "Zeit für Dich",
        icon: Battery,
        color: "amber",
        content: [
            { headline: "Auftanken", text: "Du kannst nicht aus einer leeren Tasse schenken. Nimm dir Auszeiten für Sport, Freunde oder Hobbys." },
            { headline: "Absprache", text: "Plant feste Zeiten ein. Dienstagabend ist Papa-Sport-Zeit. Donnerstagabend ist Mama-Zeit. Verlässlichkeit reduziert Stress." },
            { headline: "Kein schlechtes Gewissen", text: "Ein entspannter Papa ist für das Baby (und die Mama) wertvoller als ein ausgebrannter Märtyrer." }
        ]
    },
    health_baby: {
        title: "Gesundheit & Fieber",
        icon: Thermometer,
        color: "rose",
        content: [
            { headline: "Fieber", text: "Ab 38,5°C spricht man bei Babys von Fieber. Unter 3 Monaten: Sofort zum Arzt! Älter: Beobachten, wie es drauf ist." },
            { headline: "Wadenwickel?", text: "Erst bei warmen Beinen! Bei kalten Füßen niemals kühlen (Kreislaufgefahr). Lauwarmes Wasser reicht." },
            { headline: "Hausapotheke", text: "Zäpfchen (Paracetamol/Ibuprofen nach Alter), Nasensauger, Kochsalzlösung. Das muss da sein, BEVOR das Fieber kommt." }
        ]
    },
    sex_pp: {
        title: "Liebe nach Geburt",
        icon: Heart,
        color: "violet",
        content: [
            { headline: "Wann?", text: "Sobald der Wochenfluss vorbei ist (Infektionsgefahr) und sie bereit ist. Das kann 6 Wochen oder 6 Monate dauern." },
            { headline: "Anders", text: "Durch Stillhormone ist die Scheide oft trocken. Gleitgel ist Pflicht. Narben können spannen. Seid vorsichtig." },
            { headline: "Lustkiller", text: "Stillen senkt die Libido (biologisch sinnvoll, kein weiteres Baby). Mangelnde Lust hat nichts mit dir zu tun." }
        ]
    }
};
