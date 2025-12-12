import React, { useState } from 'react';
import { BookOpen, Sprout, Sparkles, AlertCircle, Heart, User } from 'lucide-react';
import { PREGNANCY_WEEKS, POSTPARTUM_WEEKS, LOSS_CONTENT, ARTICLES } from '../../data/content';
import ArticleOverlay from '../overlays/ArticleOverlay';
import Baby3DOverlay from '../overlays/Baby3DOverlay';

const KnowledgeView = ({ week, mode, ssw }) => {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showBaby3D, setShowBaby3D] = useState(false);

    // RENDER: LOSS
    if (mode === 'loss') {
        const categories = [
            { id: 'acute', title: 'Akute Hilfe (Erste 48h)' },
            { id: 'physical', title: 'Körperliche Heilung', condition: !ssw || ssw >= 12 },
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
            title: mode === 'postpartum' ? `Woche ${week}` : 'Der Fokus der Woche',
            development: 'Wachstum und Gedeihen.',
            mom: 'Der Körper erholt sich.'
        };

        const info = dataSet[week] || defaultInfo;
        const isPostpartum = mode === 'postpartum';

        // Custom Title Logic
        const mainTitle = info.title || (isPostpartum ? `Woche ${week} nach Geburt` : 'Der Fokus der Woche');

        // CATEGORIES
        const categories = [
            {
                id: 'baby',
                title: isPostpartum ? 'Das Baby' : `Dein Baby (SSW ${week})`,
                icon: isPostpartum ? Heart : Sprout,
                content: {
                    title: isPostpartum ? 'Entwicklung' : info.size,
                    text: info.development,
                    meta: isPostpartum ? null : `${info.cm} cm | ${info.g} g`
                },
                color: isPostpartum ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/40' : 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/40'
            },
            {
                id: 'mom',
                title: isPostpartum ? 'Die Mama' : 'Die Mama',
                icon: User,
                content: {
                    title: 'Körper & Gefühl',
                    text: info.mom || info.feeling // Fallback to feeling if mom text missing
                },
                color: 'text-rose-500 bg-rose-50 dark:bg-rose-900/40'
            },
            {
                id: 'dad',
                title: 'Deine Mission',
                icon: Sparkles,
                content: {
                    title: 'Pro-Tipp',
                    text: info.tip
                },
                color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/40'
            }
        ];

        return (
            <div className="space-y-6 animate-in fade-in pb-24">
                {/* Header */}
                <div className="bg-[#E7E5E4] dark:bg-stone-800 p-8 rounded-[32px] shadow-sm text-stone-800 dark:text-stone-100 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl font-bold font-serif text-stone-700 dark:text-stone-200">{mainTitle}</h2>
                        <div className="bg-stone-200 dark:bg-stone-700 px-3 py-1 rounded-full text-xs font-bold text-stone-600 dark:text-stone-300">
                            {isPostpartum ? `Woche ${week}` : `SSW ${week}`}
                        </div>
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 font-medium italic">"{info.feeling}"</p>

                    {/* 3D Visual (Pregnancy Only) */}
                    {!isPostpartum && (
                        <div
                            onClick={() => setShowBaby3D(true)}
                            className="mt-6 -mx-8 -mb-8 relative h-64 overflow-hidden group cursor-pointer"
                        >
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent z-10 transition-opacity group-hover:opacity-80"></div>
                            <img
                                src={`/images/fetus_3d/week_${[4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40].reduce((prev, curr) => Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev)}.png`}
                                alt={`Baby in Woche ${week}`}
                                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2 text-white/90 text-xs font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 group-hover:bg-white/20 transition-colors">
                                <Sparkles size={12} />
                                <span>3D Ansicht vergrößern</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Categories */}
                <div className="space-y-4">
                    {categories.map((cat) => (
                        <div key={cat.id} className="space-y-2">
                            <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest pl-2">{cat.title}</h3>
                            <div className="bg-white dark:bg-stone-900 p-6 rounded-[24px] border border-stone-100 dark:border-stone-800 shadow-sm flex gap-4">
                                <div className={`p-3 h-fit rounded-2xl flex-shrink-0 ${cat.color}`}>
                                    <cat.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-stone-800 dark:text-stone-100 mb-1">{cat.content.title}</h4>
                                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm">
                                        {cat.content.text}
                                    </p>
                                    {cat.content.meta && (
                                        <div className="mt-3 inline-flex items-center gap-2 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-lg text-xs font-bold text-stone-500 dark:text-stone-400">
                                            {cat.content.meta}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Articles / Deep Dives */}
                <div className="space-y-3 pt-4">
                    <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest pl-2">Mehr Wissen</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {Object.entries(ARTICLES).map(([key, article]) => {
                            const colorMap = {
                                indigo: {
                                    card: "bg-indigo-50 dark:bg-indigo-900/40 border-indigo-100 dark:border-indigo-800/20 hover:border-indigo-200",
                                    title: "text-indigo-900 dark:text-indigo-200",
                                    meta: "text-indigo-700 dark:text-indigo-300",
                                    icon: "text-indigo-500/30 dark:text-indigo-400/30"
                                },
                                emerald: {
                                    card: "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-100 dark:border-emerald-800/20 hover:border-emerald-200",
                                    title: "text-emerald-900 dark:text-emerald-200",
                                    meta: "text-emerald-700 dark:text-emerald-300",
                                    icon: "text-emerald-500/30 dark:text-emerald-400/30"
                                },
                                amber: {
                                    card: "bg-amber-50 dark:bg-amber-900/40 border-amber-100 dark:border-amber-800/20 hover:border-amber-200",
                                    title: "text-amber-900 dark:text-amber-200",
                                    meta: "text-amber-700 dark:text-amber-300",
                                    icon: "text-amber-500/30 dark:text-amber-400/30"
                                },
                                rose: {
                                    card: "bg-rose-50 dark:bg-rose-900/40 border-rose-100 dark:border-rose-800/20 hover:border-rose-200",
                                    title: "text-rose-900 dark:text-rose-200",
                                    meta: "text-rose-700 dark:text-rose-300",
                                    icon: "text-rose-500/30 dark:text-rose-400/30"
                                },
                                blue: {
                                    card: "bg-blue-50 dark:bg-blue-900/40 border-blue-100 dark:border-blue-800/20 hover:border-blue-200",
                                    title: "text-blue-900 dark:text-blue-200",
                                    meta: "text-blue-700 dark:text-blue-300",
                                    icon: "text-blue-500/30 dark:text-blue-400/30"
                                }
                            };

                            const styles = colorMap[article.color] || colorMap.indigo;

                            return (
                                <div
                                    key={key}
                                    onClick={() => setSelectedArticle(article)}
                                    className={`${styles.card} p-4 rounded-[24px] h-32 flex flex-col justify-end relative overflow-hidden group cursor-pointer border transition-colors`}
                                >
                                    <h4 className={`font-bold ${styles.title} relative z-10 text-sm`}>{article.title}</h4>
                                    <p className={`text-[10px] ${styles.meta} relative z-10 mt-1`}>Guide lesen →</p>
                                    <article.icon className={`absolute -top-2 -right-2 ${styles.icon} group-hover:scale-110 transition-transform`} size={60} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Article Overlay */}
                {selectedArticle && (
                    <ArticleOverlay
                        article={selectedArticle}
                        onClose={() => setSelectedArticle(null)}
                    />
                )}

                {/* 3D Baby Overlay */}
                {showBaby3D && (
                    <Baby3DOverlay
                        week={week}
                        onClose={() => setShowBaby3D(false)}
                    />
                )}
            </div>
        );
    }

    return null;
};

export default KnowledgeView;
