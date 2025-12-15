import { Zap, Moon, Home, Heart, BookOpen, Star, Shield, Trophy, Activity, Sun, FileText } from 'lucide-react';

export const ACHIEVEMENTS = [
    {
        id: 'first_steps',
        title: 'Startblock',
        description: 'Die erste Aufgabe erledigt. Der Weg zum Superdad beginnt!',
        icon: Star,
        image: '/badges/first_steps.png',
        color: 'amber',
        condition: (stats) => stats.totalTasksCompleted >= 1
    },
    {
        id: 'streak_3',
        title: 'Dranbleiber',
        description: '3 Tage in Folge die App genutzt. Konsistenz ist King!',
        icon: Zap,
        image: '/badges/streak_3.png',
        color: 'blue',
        condition: (stats) => stats.currentStreak >= 3
    },
    {
        id: 'streak_7',
        title: 'Wochen-Held',
        description: 'Eine ganze Woche am Ball geblieben. Respekt!',
        icon: Trophy,
        image: '/badges/streak_7.png',
        color: 'violet',
        condition: (stats) => stats.currentStreak >= 7
    },
    {
        id: 'night_owl',
        title: 'Nachteule',
        description: 'Einen "Nacht-Held" Habit erledigt. Schlaf wird überbewertet, oder?',
        icon: Moon,
        image: '/badges/night_owl.png',
        color: 'indigo',
        condition: (stats) => stats.nightShifts >= 1
    },
    {
        id: 'nest_builder',
        title: 'Baumeister',
        description: '5 Nestbau-Aufgaben erledigt. Das Zuhause wird sicher!',
        icon: Home,
        image: '/badges/nest_builder.png',
        color: 'emerald',
        condition: (stats) => stats.nestingTasks >= 5
    },
    {
        id: 'supporter',
        title: 'Fels in der Brandung',
        description: '10x Wasser oder Snacks gebracht. Du kümmerst dich!',
        icon: Heart,
        image: '/badges/supporter.png',
        color: 'rose',
        condition: (stats) => stats.supportActions >= 10
    },
    {
        id: 'knowledge_seeker',
        title: 'Professor',
        description: '5 Artikel gelesen. Wissen ist Macht!',
        icon: BookOpen,
        image: '/badges/knowledge_seeker.png',
        color: 'cyan',
        condition: (stats) => stats.articlesRead >= 5
    },
    {
        id: 'protector',
        title: 'Beschützer',
        description: 'Den "Schutzschild" aktiviert. Du hältst den Rücken frei.',
        icon: Shield,
        image: '/badges/protector.png',
        color: 'stone',
        condition: (stats) => stats.shieldActivated >= 1
    },
    {
        id: 'paper_warrior',
        title: 'Papier-Krieger',
        description: '3 Bürokratie-Aufgaben erledigt. Der Amtsschimmel kann einpacken!',
        icon: FileText,
        image: '/badges/paper_warrior.png',
        color: 'slate',
        condition: (stats) => stats.bureaucracyTasks >= 3
    },
    {
        id: 'zen_master',
        title: 'Zen-Meister',
        description: 'Ruhe bewahrt ("Geduld" oder "Stille"). In der Ruhe liegt die Kraft.',
        icon: Sun,
        image: '/badges/zen_master.png',
        color: 'teal',
        condition: (stats) => stats.zenActions >= 1
    },
    {
        id: 'high_performer',
        title: 'High-Performer',
        description: 'Level 5 erreicht. Du bist auf dem Weg zur Legende.',
        icon: Trophy,
        image: '/badges/high_performer.png',
        color: 'yellow',
        condition: (stats) => stats.level >= 5
    },
    {
        id: 'team_player',
        title: 'Team-Player',
        description: 'Date Night organisiert. Ihr seid ein unschlagbares Team.',
        icon: Heart,
        image: '/badges/team_player.png',
        color: 'pink',
        condition: (stats) => stats.dateNights >= 1
    }
];
