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
                <div className="bg-[#E7E5E4] dark:bg-stone-800 p-8 rounded-[32px] shadow-sm text-stone-800 dark:text-stone-100 relative overflow-hidden">
                    <h2 className="text-2xl font-bold mb-2 font-serif text-stone-700 dark:text-stone-200">Wegbegleiter</h2>
                    <p className="text-stone-600 dark:text-stone-300">Wissen für eine schwere Zeit. Du bist nicht allein.</p>
                </div>

                {categories.map(cat => {
                    if (cat.condition === false) return null;
                    const items = LOSS_CONTENT[cat.id];
                    if (!items) return null;

                    return (
                        <div key={cat.id} className="space-y-3">
                            <h3 className="text-lg font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest pl-2 mt-8 mb-2">{cat.title}</h3>
                            {items.map((item, idx) => (
                                <div key={idx} className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm flex gap-4">
                                    <div className="p-3 bg-stone-50 dark:bg-stone-800 h-fit rounded-2xl text-stone-500 dark:text-stone-400 flex-shrink-0">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-stone-800 dark:text-stone-100 mb-1">{item.title}</h4>
                                        <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">{item.text}</p>
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
                <div className="bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-stone-100 dark:border-stone-800 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-5">
                        <div className={`w-16 h-16 ${isPostpartum ? 'bg-rose-100 dark:bg-rose-900/40' : 'bg-emerald-100 dark:bg-emerald-900/40'} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                            {isPostpartum ? <Heart size={32} className="text-rose-500 dark:text-rose-400" /> : <Sprout size={32} className="text-emerald-600 dark:text-emerald-400" />}
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">
                                {isPostpartum ? 'Status' : 'Baby-Größe'}
                            </h3>
                            <p className="text-xl font-bold text-stone-800 dark:text-stone-100 leading-tight">
                                {isPostpartum ? 'Du & Sie & Baby' : `Wie ${info.size}`}
                            </p>
                        </div>
                    </div>

                    {!isPostpartum && (
                        <>
                            {/* Development Highlight */}
                            {info.development && (
                                <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                                    <p className="text-emerald-800 dark:text-emerald-300 text-sm font-medium leading-relaxed">
                                        💡 {info.development}
                                    </p>
                                </div>
                            )}

                            {/* Stats Row */}
                            <div className="flex gap-3 mt-1">
                                <div className="flex-1 bg-stone-50 dark:bg-stone-800 p-2 rounded-xl border border-stone-100 dark:border-stone-700 flex items-center gap-2 justify-center">
                                    <span className="text-stone-400 text-xs font-bold uppercase">Größe</span>
                                    <span className="text-stone-700 dark:text-stone-200 font-bold">{info.cm} cm</span>
                                </div>
                                <div className="flex-1 bg-stone-50 dark:bg-stone-800 p-2 rounded-xl border border-stone-100 dark:border-stone-700 flex items-center gap-2 justify-center">
                                    <span className="text-stone-400 text-xs font-bold uppercase">Gewicht</span>
                                    <span className="text-stone-700 dark:text-stone-200 font-bold">{info.g} g</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Pro Tip Card */}
                <div className="bg-[#FFFBEB] dark:bg-amber-900/40 p-6 rounded-[32px] border border-amber-100 dark:border-amber-800/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-full text-amber-600 dark:text-amber-400">
                            <Sparkles size={20} />
                        </div>
                        <h3 className="font-bold text-amber-900 dark:text-amber-200">Dein Pro-Tipp</h3>
                    </div>
                    <p className="text-amber-800 dark:text-amber-100 leading-relaxed">
                        {info.tip}
                    </p>
                </div>

                {/* New: Weekly Checklist */}
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest pl-2 mt-6">Checkliste der Woche</h3>
                    <div className="bg-white dark:bg-stone-900 p-5 rounded-[24px] border border-stone-100 dark:border-stone-800 shadow-sm flex items-center justify-between group cursor-pointer transition hover:border-stone-200 dark:hover:border-stone-700">
                        <div className="flex items-center gap-4">
                            <div className="bg-stone-100 dark:bg-stone-800 p-2 rounded-full text-stone-500 dark:text-stone-400"><AlertCircle size={18} /></div>
                            <span className="font-medium text-stone-700 dark:text-stone-200">Wöchentliches Update lesen</span>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-stone-200 dark:border-stone-700 group-hover:border-stone-300 dark:group-hover:border-stone-500"></div>
                    </div>
                </div>

                {/* New: Articles Placeholder to fill space */}
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest pl-2 mt-6">Mehr Wissen</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-indigo-50 dark:bg-indigo-900/40 p-4 rounded-[24px] h-32 flex flex-col justify-end relative overflow-hidden">
                            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 relative z-10">Vater werden</h4>
                            <p className="text-[10px] text-indigo-700 dark:text-indigo-300 relative z-10">Guide lesen →</p>
                            <BookOpen className="absolute -top-2 -right-2 text-indigo-200 dark:text-indigo-800/50" size={60} />
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-900/40 p-4 rounded-[24px] h-32 flex flex-col justify-end relative overflow-hidden">
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 relative z-10">Partnerschaft</h4>
                            <p className="text-[10px] text-emerald-700 dark:text-emerald-300 relative z-10">Tipps ansehen →</p>
                            <Heart className="absolute -top-2 -right-2 text-emerald-200 dark:text-emerald-800/50" size={60} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default KnowledgeView;
