export const calculateLevel = (xp) => {
    if (xp < 100) return { level: 1, title: "Anwärter", next: 100 };
    if (xp < 300) return { level: 2, title: "Rookie Dad", next: 300 };
    if (xp < 600) return { level: 3, title: "Profi Dad", next: 600 };
    if (xp < 1000) return { level: 4, title: "SuperDad", next: 1000 };
    return { level: 5, title: "Legende", next: 2000 };
};
