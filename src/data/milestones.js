import { Footprints, Smile, Bath, Camera, Moon, Star, Sun, Heart } from 'lucide-react';

export const MILESTONES = [
    {
        id: 'first_bath',
        title: 'Das erste Bad',
        desc: 'Ein großes Abenteuer. Hat es ihm/ihr gefallen?',
        timing: 'Woche 1-2',
        icon: Bath,
        color: 'blue'
    },
    {
        id: 'first_smile',
        title: 'Das erste Lächeln',
        desc: 'Kein Reflex mehr, sondern echte Liebe.',
        timing: 'Woche 4-6',
        icon: Smile,
        color: 'rose'
    },
    {
        id: 'first_walk',
        title: 'Erster Spaziergang',
        desc: 'Mit dem Kinderwagen die Welt entdecken.',
        timing: 'Woche 1',
        icon: Footprints,
        color: 'emerald'
    },
    {
        id: 'first_night',
        title: 'Erste Nacht zuhause',
        desc: 'Endlich im eigenen Bett. Ruhe bewahren!',
        timing: 'Tag 1',
        icon: Moon,
        color: 'indigo'
    },
    {
        id: 'navel_fall',
        title: 'Bauchnabel fällt ab',
        desc: 'Sieht komisch aus, ist aber ein Heilungsprozess.',
        timing: 'Tag 5-10',
        icon: Star,
        color: 'amber'
    },
    {
        id: 'first_photo',
        title: 'Erstes Familienfoto',
        desc: 'Ihr drei zusammen. Ein Moment für die Ewigkeit.',
        timing: 'Tag 1-3',
        icon: Camera,
        color: 'violet'
    }
];
