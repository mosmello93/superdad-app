import { Car, Home, Shirt, Milk, Bath, Shield, ShoppingBag, PiggyBank, Pill, Thermometer, Stethoscope } from 'lucide-react';

export const BUDGET_CATEGORIES = [
    {
        id: 'transport',
        title: 'Mobilität',
        icon: Car,
        color: 'blue',
        items: [
            { id: 'stroller', label: 'Kinderwagen (Kombi)', defaultCost: 600 },
            { id: 'carseat', label: 'Babyschale (Auto)', defaultCost: 150 },
            { id: 'carrier', label: 'Tragetuch / Trage', defaultCost: 100 },
            { id: 'footmuff', label: 'Fußsack (Winter)', defaultCost: 50 },
            { id: 'diaperbag', label: 'Wickeltasche', defaultCost: 60 }
        ]
    },
    {
        id: 'furniture',
        title: 'Möbel & Schlaf',
        icon: Home,
        color: 'stone',
        items: [
            { id: 'crib', label: 'Beistellbett / Gitterbett', defaultCost: 200 },
            { id: 'mattress', label: 'Matratze (neu!)', defaultCost: 80 },
            { id: 'sleepingbag', label: 'Schlafsäcke (2x)', defaultCost: 60 },
            { id: 'changing_table', label: 'Wickelkommode', defaultCost: 150 },
            { id: 'monitor', label: 'Babyphone', defaultCost: 80 }
        ]
    },
    {
        id: 'clothing',
        title: 'Kleidung (Gr. 50-62)',
        icon: Shirt,
        color: 'rose',
        items: [
            { id: 'bodys', label: 'Bodys (10x Wickelbodys)', defaultCost: 60 },
            { id: 'rompers', label: 'Strampler / Schlafanzüge (6x)', defaultCost: 80 },
            { id: 'pants', label: 'Hosen & Oberteile', defaultCost: 70 },
            { id: 'socks', label: 'Socken & Mützchen', defaultCost: 30 },
            { id: 'outdoor', label: 'Overall / Jacke', defaultCost: 40 }
        ]
    },
    {
        id: 'care',
        title: 'Pflege & Wickeln',
        icon: Bath,
        color: 'emerald',
        items: [
            { id: 'diapers', label: 'Windeln (Vorrat)', defaultCost: 30 },
            { id: 'wipes', label: 'Feuchttücher', defaultCost: 10 },
            { id: 'creams', label: 'Wundschutzcreme / Öl', defaultCost: 15 },
            { id: 'bath', label: 'Badewanne / Eimer', defaultCost: 25 },
            { id: 'towel', label: 'Kapuzenhandtuch (2x)', defaultCost: 30 },
            { id: 'thermometer', label: 'Fieberthermometer', defaultCost: 10 }
        ]
    },
    {
        id: 'feeding',
        title: 'Stillen & Essen',
        icon: Milk,
        color: 'amber',
        items: [
            { id: 'pillow', label: 'Stillkissen', defaultCost: 40 },
            { id: 'cloths', label: 'Spucktücher (Mullwindeln)', defaultCost: 30 },
            { id: 'pump', label: 'Milchpumpe (Rezept?)', defaultCost: 0 },
            { id: 'bottles', label: 'Start-Set Fläschchen', defaultCost: 40 }
        ]
    },
    {
        id: 'misc',
        title: 'Sonstiges',
        icon: ShoppingBag,
        color: 'indigo',
        items: [
            { id: 'bouncer', label: 'Wippe', defaultCost: 70 },
            { id: 'playmat', label: 'Krabbeldecke', defaultCost: 40 },
            { id: 'mobile', label: 'Mobile', defaultCost: 30 }
        ]
    }
];

export const CONCEPTION_BUDGET_CATEGORIES = [
    {
        id: 'saving',
        title: 'Sparziel: Baby',
        icon: PiggyBank,
        color: 'emerald',
        items: [
            { id: 'stroller_fund', label: 'Kinderwagen-Fonds', defaultCost: 800 },
            { id: 'room_fund', label: 'Babyzimmer-Fonds', defaultCost: 1000 },
            { id: 'initial_fund', label: 'Erstausstattung (Puffer)', defaultCost: 500 }
        ]
    },
    {
        id: 'supplements',
        title: 'Gesundheit & Vitamine',
        icon: Pill,
        color: 'rose',
        items: [
            { id: 'supp_her', label: 'Folsäure & Vitamine (Sie)', defaultCost: 30 },
            { id: 'supp_him', label: 'Vitamine/Zink (Er)', defaultCost: 20 },
            { id: 'tea', label: 'Zyklustees', defaultCost: 15 }
        ]
    },
    {
        id: 'tracking',
        title: 'Tracking & Tests',
        icon: Thermometer,
        color: 'indigo',
        items: [
            { id: 'ovu', label: 'Ovulationstests', defaultCost: 20 },
            { id: 'preg_test', label: 'Schwangerschaftstests', defaultCost: 15 },
            { id: 'track_app', label: 'Zyklus-App (Premium)', defaultCost: 10 }
        ]
    },
    {
        id: 'medical',
        title: 'Medizinische Kosten',
        icon: Stethoscope,
        color: 'blue',
        items: [
            { id: 'checkup', label: 'Spermiogramm (Selbstzahler?)', defaultCost: 80 },
            { id: 'gyn', label: 'Zusatzuntersuchungen', defaultCost: 50 }
        ]
    }
];
