
export const APP_FEATURES = {
    pregnancy: [
        { id: 'contraction_timer', name: 'Wehen-Timer', trigger: 'Wehen messen, Abstände stoppen' },
        { id: 'hospital_bag', name: 'Kliniktasche', trigger: 'Tasche packen, Checkliste, was mitnehmen' },
        { id: 'name_swiper', name: 'Namen-Finder', trigger: 'Namen suchen, Babynamen' },
        { id: 'budget', name: 'Baby-Budget', trigger: 'Kosten, Geld, Erstausstattung' }
    ],
    postpartum: [
        { id: 'cry_compass', name: 'Schrei-Kompass', trigger: 'Baby schreit, Beruhigen, warum weint es' },
        { id: 'shift_planner', name: 'Schicht-Planer', trigger: 'Schlaf aufteilen, wer ist dran, Nachtschicht' },
        { id: 'milestones', name: 'Meilensteine', trigger: 'Entwicklungsschub, was kann es schon' }
    ],
    general: [
        { id: 'partner_pulse', name: 'Partner Pulse', trigger: 'Stimmung der Frau, wie geht es ihr' },
        { id: 'deep_talk', name: 'Deep Talk', trigger: 'Gesprächsthemen, Beziehung' },
        { id: 'bureaucracy', name: 'Papierkram-Manager', trigger: 'Anträge, Elterngeld, Kindergeld, Behörden' },
        { id: 'emergency', name: 'Notfall-Infos', trigger: 'Notarzt, Giftnotruf, Wichtige Nummern' }
    ]
};
