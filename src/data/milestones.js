import { Footprints, Smile, Bath, Camera, Moon, Star, Heart, Activity, ShoppingBag, Baby, Music, Video, UserCheck } from 'lucide-react';

export const MILESTONES_POSTPARTUM = [
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

export const MILESTONES_PREGNANCY = [
    {
        id: 'positive_test',
        title: 'Der positive Test',
        desc: 'Der Moment, in dem sich alles änderte.',
        timing: 'Woche 4-5',
        icon: Heart,
        color: 'rose'
    },
    {
        id: 'first_ultrasound',
        title: 'Erster Ultraschall',
        desc: 'Das erste Mal sehen, dass da wirklich jemand ist.',
        timing: 'Woche 8-12',
        icon: Video,
        color: 'blue'
    },
    {
        id: 'heartbeat',
        title: 'Herzschlag gehört',
        desc: 'Ein galoppierendes Pferdchen. Wumm-wumm.',
        timing: 'Woche 12+',
        icon: Activity,
        color: 'red'
    },
    {
        id: 'outing',
        title: 'Das Outing',
        desc: 'Team Blau, Team Rosa oder Team Überraschung?',
        timing: 'Woche 18-22',
        icon: UserCheck,
        color: 'violet'
    },
    {
        id: 'first_kick',
        title: 'Erster Tritt',
        desc: 'Ein kleiner Stupser von innen. Hallo Papa!',
        timing: 'Woche 20-25',
        icon: Footprints,
        color: 'orange'
    },
    {
        id: 'bag_packed',
        title: 'Tasche gepackt',
        desc: 'Allzeit bereit. Die Spannung steigt.',
        timing: 'Woche 36+',
        icon: ShoppingBag,
        color: 'emerald'
    },
    {
        id: 'nursery_ready',
        title: 'Zimmer fertig',
        desc: 'Das Nest ist gebaut. Jetzt fehlt nur noch das Küken.',
        timing: 'Woche 30-38',
        icon: Baby,
        color: 'amber'
    },
    {
        id: 'name_chosen',
        title: 'Name steht fest',
        desc: 'Der perfekte Name für einen perfekten kleinen Menschen.',
        timing: 'Jederzeit',
        icon: Music,
        color: 'cyan'
    }
];
