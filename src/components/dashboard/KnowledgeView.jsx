import React from 'react';
import { BookOpen, Sprout, Sparkles, AlertCircle, Heart } from 'lucide-react';
import { PREGNANCY_WEEKS, POSTPARTUM_WEEKS, LOSS_CONTENT } from '../../data/content';

const KnowledgeView = ({ week, mode, ssw }) => {

    // RENDER: LOSS
    if (mode === 'loss') {
        const categories = [
            { id: 'acute', title: 'Akute Hilfe (Erste 48h)' },
            { id: 'physical', title: 'Körperliche Heilung', condition: !ssw || ssw >= 12 }, // Show if SSW unknown or >= 12
            { id: 'bureocracy', title: 'Recht & Bürokratie' },
            { id: 'farewell', title: 'Abschied & Erinnerung' },
            { id: 'dad', title: 'Für Dich (Papa)' }
        ];

        return (
            <div className="space-y-6 animate-in fade-in pb-24">
                <div className="bg-[#E7E5E4] p-8 rounded-[32px] shadow-sm text-stone-800 relative overflow-hidden">
                    <h2 className="text-2xl font-bold mb-2 font-serif text-stone-700">Wegbegleiter</h2>
                    <p className="text-stone-600">Wissen für eine schwere Zeit. Du bist nicht allein.</p>
                </div>

                {categories.map(cat => {
                    if (cat.condition === false) return null;
                    const items = LOSS_CONTENT[cat.id];
                    if (!items) return null;

                    return (
                        <div key={cat.id} className="space-y-3">
                            <h3 className="text-lg font-bold text-stone-400 uppercase tracking-widest pl-2 mt-8 mb-2">{cat.title}</h3>
                            {items.map((item, idx) => (
                                <div key={idx} className="bg-white p-5 rounded-3xl border border-stone-100 shadow-sm flex gap-4">
                                    <div className="p-3 bg-stone-50 h-fit rounded-2xl text-stone-500 flex-shrink-0">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-stone-800 mb-1">{item.title}</h4>
                                        <p className="text-stone-600 text-sm leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    }

    // RENDER: PREGNANCY & POSTPARTUM
    if (mode === 'pregnancy' || mode === 'postpartum') {
        // Data selection based on mode
        const dataSet = mode === 'postpartum' ? POSTPARTUM_WEEKS : PREGNANCY_WEEKS;
        // Fallback info
        const defaultInfo = {
            size: '---',
            feeling: mode === 'postpartum' ? 'Ankommen' : 'Wachstum',
            tip: 'Sei einfach für sie da.',
            title: mode === 'postpartum' ? `Woche ${week}` : 'Der Fokus der Woche'
        };

        const info = dataSet[week] || defaultInfo;
        const isPostpartum = mode === 'postpartum';

        // Custom Title Logic
        const mainTitle = info.title || (isPostpartum ? `Woche ${week} nach Geburt` : 'Der Fokus der Woche');

        return (
            <div className="space-y-4 animate-in fade-in pb-24">
                {/* Hero Card */}
                <div className={`bg-gradient-to-br ${isPostpartum ? 'from-rose-500 to-pink-600' : 'from-indigo-600 to-violet-700'} p-8 rounded-[32px] shadow-lg text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-xs font-bold backdrop-blur-md border border-white/10">
                                {isPostpartum ? `Woche ${week} (PP)` : `SSW ${week}`}
                            </span>
                            <BookOpen size={20} className="text-white/70" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 leading-tight">{mainTitle}</h2>
                        <p className="text-white/90 font-medium">"{info.feeling}"</p>
                    </div>
                </div>

                {/* Baby/Status Card - Varied by mode */}
                <div className="bg-white p-6 rounded-[32px] border border-stone-100 shadow-sm flex items-center gap-5">
                    <div className={`w-16 h-16 ${isPostpartum ? 'bg-rose-100' : 'bg-emerald-100'} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        {isPostpartum ? <Heart size={32} className="text-rose-500" /> : <Sprout size={32} className="text-emerald-600" />}
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-1">
                            {isPostpartum ? 'Status' : 'Baby-Größe'}
                        </h3>
                        <p className="text-xl font-bold text-stone-800 leading-tight">
                            {isPostpartum ? 'Du & Sie & Baby' : `Wie ${info.size}`}
                        </p>
                    </div>
                </div>

                {/* Pro Tip Card */}
                <div className="bg-[#FFFBEB] p-6 rounded-[32px] border border-amber-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-amber-100 p-2 rounded-full text-amber-600">
                            <Sparkles size={20} />
                        </div>
                        <h3 className="font-bold text-amber-900">Dein Pro-Tipp</h3>
                    </div>
                    <p className="text-amber-800 leading-relaxed">
                        {info.tip}
                    </p>
                </div>
            </div>
        );
    }

    return null;
};

export default KnowledgeView;
