export const calculateLevel = (xp, mode = 'pregnancy') => {
    // Conception specific titles
    if (mode === 'conception') {
        if (xp < 100) return { level: 1, title: "Team-Player", image: "/mascot/papa_team.png", next: 100 };
        if (xp < 300) return { level: 2, title: "Romantik-Profi", image: "/mascot/papa_romantic.png", next: 300 };
        if (xp < 600) return { level: 3, title: "Zyklus-Versteher", image: "/mascot/papa_smart_cycle.png", next: 600 };
        if (xp < 1000) return { level: 4, title: "Super Supporter", image: "/mascot/papa_supporter.png", next: 1000 };
        return { level: 5, title: "KiWu-Legende", image: "/mascot/papa_legend_zen.png", next: 2000 };
    }

    // Default (Pregnancy/Postpartum)
    if (xp < 100) return { level: 1, title: "Anwärter", next: 100 };
    if (xp < 300) return { level: 2, title: "Rookie Dad", next: 300 };
    if (xp < 600) return { level: 3, title: "Profi Dad", next: 600 };
    if (xp < 1000) return { level: 4, title: "Super Papa", next: 1000 };
    return { level: 5, title: "Legende", next: 2000 };
};
