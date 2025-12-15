import React, { useState, useEffect, useRef } from 'react';
import { X, Heart, RotateCcw, List, Settings2, Copy, Trash2, Check, Sparkles } from 'lucide-react';
import { BABY_NAMES } from '../../data/names';

const NameSwiperOverlay = ({ onClose, preselectedGender }) => {
    // State
    const [filterGender, setFilterGender] = useState(preselectedGender === 'surprise' ? null : preselectedGender);
    const [view, setView] = useState('swiper'); // 'swiper', 'favorites', 'settings'
    const [likedNames, setLikedNames] = useState([]);
    const [viewedNames, setViewedNames] = useState([]);
    const [history, setHistory] = useState([]); // For Undo
    const [filteredNames, setFilteredNames] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(null); // 'left' or 'right'
    const [lastName, setLastName] = useState(''); // New: Last Name

    // Touch State
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

    // Initial Load
    useEffect(() => {
        const savedLikes = JSON.parse(localStorage.getItem('liked_names') || '[]');
        const savedViewed = JSON.parse(localStorage.getItem('viewed_names') || '[]');
        const savedLastName = localStorage.getItem('swiper_last_name') || '';

        setLikedNames(savedLikes);
        setViewedNames(savedViewed);
        setLastName(savedLastName);
    }, []);

    // Save Last Name on Change
    useEffect(() => {
        localStorage.setItem('swiper_last_name', lastName);
    }, [lastName]);

    // Filter Logic
    useEffect(() => {
        let pool = BABY_NAMES;
        if (filterGender && filterGender !== 'surprise') {
            pool = pool.filter(n => n.gender === filterGender);
        }
        // Exclude viewed
        const cleanPool = pool.filter(n => !viewedNames.includes(n.name));

        // Shuffle only on initial load or reset, to keep order consistent during session could be better,
        // but for now simple shuffle on filter change is okay.
        const shuffled = [...cleanPool].sort(() => Math.random() - 0.5);
        setFilteredNames(shuffled);
        setCurrentIndex(0);
    }, [filterGender, viewedNames.length]);

    const currentName = filteredNames[currentIndex];

    // Actions
    const handleSwipe = (dir) => {
        if (!currentName) return;
        setDirection(dir);

        setTimeout(() => {
            const newViewed = [...viewedNames, currentName.name];
            setViewedNames(newViewed);
            localStorage.setItem('viewed_names', JSON.stringify(newViewed));

            // Add to history for Undo
            setHistory(prev => [...prev, currentName]);

            if (dir === 'right') {
                const newLikes = [...likedNames, currentName];
                setLikedNames(newLikes);
                localStorage.setItem('liked_names', JSON.stringify(newLikes));
            }

            setCurrentIndex(prev => prev + 1);
            setDirection(null);
        }, 200);
    };

    const handleUndo = () => {
        if (history.length === 0) return;
        const lastNameItem = history[history.length - 1]; // Renamed to avoid collision with lastName state

        // Remove from viewed
        const newViewed = viewedNames.filter(n => n !== lastNameItem.name);
        setViewedNames(newViewed);
        localStorage.setItem('viewed_names', JSON.stringify(newViewed));

        // Remove from liked if it was liked
        const wasLiked = likedNames.find(n => n.name === lastNameItem.name);
        if (wasLiked) {
            const newLikes = likedNames.filter(n => n.name !== lastNameItem.name);
            setLikedNames(newLikes);
            localStorage.setItem('liked_names', JSON.stringify(newLikes));
        }

        // Remove from history
        setHistory(prev => prev.slice(0, -1));

        // We trigger a re-render via useEffect dependencies, but we need to ensure
        // the "undone" name appears back at the front.
        // Since we blindly filter 'viewedNames' in the effect, simply removing it from viewedNames
        // and triggering the effect *should* bring it back into the filtered pool.
        // However, the shuffle might put it anywhere.
        // IMPROVEMENT: Insert it back at currentIndex 0 without reshuffling entire list would be better
        // but for MVP "undo" often just means "reset state".
        // Let's rely on the effect for now.
    };

    const removeLike = (nameToRemove) => {
        const newLikes = likedNames.filter(n => n.name !== nameToRemove);
        setLikedNames(newLikes);
        localStorage.setItem('liked_names', JSON.stringify(newLikes));
    };

    const copyToClipboard = () => {
        // Include last name in export if set
        const text = likedNames.map(n => `${n.name} ${lastName} (${n.origin})`).join('\n');
        navigator.clipboard.writeText(text);
        alert("Liste kopiert!");
    };

    // Touch Handlers
    const onTouchStart = (e) => {
        touchEndX.current = null;
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const onTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;
        if (distance > 50) handleSwipe('left');
        if (distance < -50) handleSwipe('right');
    };

    // Sub-Views
    const renderHeader = () => (
        <div className="flex justify-between items-center p-6 pb-2 shrink-0 bg-[#FAFAF9] z-20 relative">
            {/* Left: Close */}
            <button
                onClick={onClose}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-400 shadow-sm border border-stone-100 hover:text-stone-600 active:scale-95 transition-all"
            >
                <X size={20} />
            </button>

            {/* Center: Title */}
            <span className="font-bold text-stone-400 tracking-widest text-xs uppercase absolute left-1/2 transform -translate-x-1/2 pointer-events-none">
                Namen-Finder
            </span>

            {/* Right: Actions */}
            <div className="flex gap-2">
                <button
                    onClick={() => setView(view === 'settings' ? 'swiper' : 'settings')}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${view === 'settings' ? 'bg-stone-800 text-white shadow-md' : 'bg-white text-stone-400 border border-stone-100 hover:text-stone-600 shadow-sm'}`}
                >
                    <Settings2 size={20} />
                </button>

                <button
                    onClick={() => setView(view === 'favorites' ? 'swiper' : 'favorites')}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all relative ${view === 'favorites' ? 'bg-rose-500 text-white shadow-md' : 'bg-white text-stone-400 border border-stone-100 hover:text-rose-500 shadow-sm'}`}
                >
                    <Heart size={20} fill={view === 'favorites' ? "currentColor" : "none"} />
                    {likedNames.length > 0 && view !== 'favorites' && (
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                    )}
                </button>
            </div>
        </div>
    );

    const renderCard = () => {
        if (!currentName) return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-stone-300">
                    <Check size={48} />
                </div>
                <h3 className="text-2xl font-bold text-stone-700 mb-2">Alles gesehen!</h3>
                <p className="text-stone-400 mb-8">Du hast alle Namen durchgeswiped.</p>
                <button
                    onClick={() => {
                        const confirm = window.confirm("Alle ignorieren Namen zurücksetzen?");
                        if (confirm) {
                            localStorage.setItem('viewed_names', JSON.stringify(likedNames.map(n => n.name)));
                            window.location.reload();
                        }
                    }}
                    className="px-8 py-3 bg-stone-900 text-white rounded-full font-bold shadow-lg active:scale-95 transition-transform"
                >
                    Neustarten
                </button>
            </div>
        );

        const isBoy = currentName.gender === 'boy';
        const cardColor = isBoy ? 'bg-[#3B82F6]' : 'bg-[#F43F5E]'; // Vibrant Blue or Pink

        return (
            <div className="flex-1 flex items-center justify-center relative w-full px-6 py-4">
                <div
                    className={`w-full h-full max-h-[500px] rounded-[32px] shadow-2xl ${cardColor} flex flex-col items-center justify-center p-8 text-white relative overflow-hidden transition-all duration-300 ease-out transform ${direction === 'left' ? '-translate-x-[150%] -rotate-12 opacity-80' : ''} ${direction === 'right' ? 'translate-x-[150%] rotate-12 opacity-80' : ''}`}
                    onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
                >
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-white blur-3xl"></div>
                        <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-white blur-3xl"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center w-full">
                        <div className="mb-2 opacity-80 font-medium tracking-wider uppercase text-sm">
                            {currentName.origin}
                        </div>
                        <h2 className="text-5xl font-extrabold tracking-tight mb-2 drop-shadow-md break-words leading-tight">
                            {currentName.name}
                        </h2>

                        {/* Last Name Display or Prompt */}
                        {lastName ? (
                            <div className="text-2xl font-semibold opacity-60 tracking-wide uppercase mb-4 animate-in slide-in-from-bottom-2">
                                {lastName}
                            </div>
                        ) : (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent swipe or other clicks
                                    setView('settings');
                                }}
                                className="text-sm font-bold opacity-40 uppercase tracking-widest mb-4 hover:opacity-100 hover:bg-white/20 px-4 py-2 rounded-full transition-all border border-transparent hover:border-white/40"
                            >
                                + Nachnamen hinzufügen
                            </button>
                        )}

                        <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold mt-2">
                            {isBoy ? 'Junge' : 'Mädchen'}
                        </div>
                    </div>

                    {/* Swipe Hints (Visible only during drag/interaction conceptually, simplifying here) */}
                    <div className="absolute bottom-8 w-full px-8 flex justify-between opacity-40 text-xs font-bold tracking-widest uppercase">
                        <span>Nicht mein Fall</span>
                        <span>Gefällt mir</span>
                    </div>
                </div>
            </div>
        );
    };

    const renderControls = () => (
        <div className="h-32 shrink-0 flex items-center justify-center gap-6 pb-8">
            {/* UNDO */}
            <button
                onClick={handleUndo}
                disabled={history.length === 0}
                className="w-14 h-14 rounded-full bg-stone-100 text-yellow-500 shadow-sm flex items-center justify-center hover:bg-stone-200 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <RotateCcw size={24} strokeWidth={2.5} />
            </button>

            {/* DISLIKE */}
            <button
                onClick={() => handleSwipe('left')}
                className="w-18 h-18 p-5 rounded-full bg-white border border-stone-100 text-stone-400 shadow-lg flex items-center justify-center hover:text-red-500 hover:scale-110 active:scale-95 transition-all"
            >
                <X size={32} strokeWidth={3} />
            </button>

            {/* LIKE */}
            <button
                onClick={() => handleSwipe('right')}
                className="w-20 h-20 rounded-full bg-rose-500 text-white shadow-xl shadow-rose-500/30 flex items-center justify-center hover:bg-rose-600 hover:scale-110 active:scale-95 transition-all"
            >
                <Heart size={36} fill="currentColor" />
            </button>
        </div>
    );

    const renderSettings = () => (
        <div className="flex-1 p-8 flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-stone-800">Filter & Einstellungen</h2>

            <div className="space-y-6">
                {/* LAST NAME INPUT */}
                <div>
                    <label className="block text-sm font-bold text-stone-500 uppercase mb-2">Nachname (Optional)</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Euren Nachnamen eingeben..."
                        className="w-full p-4 bg-stone-100 rounded-xl border-2 border-transparent focus:border-stone-900 focus:bg-white transition-all font-bold text-lg text-stone-900 placeholder:text-stone-400 outline-none"
                    />
                    <p className="text-xs text-stone-400 mt-2">Wird auf der Karte unter dem Vornamen angezeigt.</p>
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-500 uppercase mb-2">Geschlecht</label>
                    <div className="grid grid-cols-1 gap-3">
                        <button onClick={() => setFilterGender(null)} className={`p-4 rounded-xl border-2 text-left font-bold transition flex items-center justify-between ${!filterGender ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-stone-100 bg-white text-stone-600'}`}>
                            <span>Alle anzeigen</span>
                            {!filterGender && <Check size={20} />}
                        </button>
                        <button onClick={() => setFilterGender('boy')} className={`p-4 rounded-xl border-2 text-left font-bold transition flex items-center justify-between ${filterGender === 'boy' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-stone-100 bg-white text-stone-600'}`}>
                            <span>Nur Jungs</span>
                            {filterGender === 'boy' && <Check size={20} />}
                        </button>
                        <button onClick={() => setFilterGender('girl')} className={`p-4 rounded-xl border-2 text-left font-bold transition flex items-center justify-between ${filterGender === 'girl' ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-stone-100 bg-white text-stone-600'}`}>
                            <span>Nur Mädchen</span>
                            {filterGender === 'girl' && <Check size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                <button onClick={() => setView('swiper')} className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold">Zurück zum Swiper</button>
            </div>
        </div>
    );

    const renderFavorites = () => (
        <div className="h-full flex flex-col p-4">
            <h2 className="text-xl font-bold mb-4 px-2 flex items-center gap-2">
                <Heart size={20} className="text-rose-500" fill="currentColor" />
                Deine Favoriten ({likedNames.length})
            </h2>
            <div className="flex-1 overflow-y-auto px-2 space-y-3">
                {likedNames.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-stone-400 opacity-60">
                        <Sparkles size={48} className="mb-4" />
                        <p>Noch keine Namen geliked.</p>
                    </div>
                ) : (
                    likedNames.map((n, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-stone-100 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-inner ${n.gender === 'boy' ? 'bg-blue-100 text-blue-500' : 'bg-rose-100 text-rose-500'}`}>
                                    {n.gender === 'boy' ? '👦' : '👧'}
                                </div>
                                <div>
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-lg text-stone-800 leading-none">{n.name}</h3>
                                        {/* Optional last name in favorites list too? Maybe clutter, but let's add minimal if space */}
                                    </div>
                                    <p className="text-xs text-stone-400 font-medium uppercase mt-1">{n.origin}</p>
                                </div>
                            </div>
                            <button onClick={() => removeLike(n.name)} className="p-3 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-full transition">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))
                )}
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100">
                <button onClick={copyToClipboard} className="w-full py-3 bg-stone-100 text-stone-800 hover:bg-stone-200 rounded-xl font-bold flex items-center justify-center gap-2 transition">
                    <Copy size={18} /> Liste kopieren
                </button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 bg-[#F5F5F0] dark:bg-stone-950 flex flex-col animate-in fade-in duration-300">
            {/* Main Container - Full Screen Mobile Style */}
            <div className="flex-1 flex flex-col max-w-md mx-auto w-full h-full bg-[#FAFAF9] relative shadow-2xl overflow-hidden">

                {renderHeader()}

                <div className="flex-1 overflow-hidden relative flex flex-col">
                    {view === 'swiper' && (
                        <>
                            {renderCard()}
                            {currentName && renderControls()}
                        </>
                    )}
                    {view === 'settings' && renderSettings()}
                    {view === 'favorites' && renderFavorites()}
                </div>

                {/* Close Button Absolute if needed, but 'Header' has navigation.
                    We need a way to actually CLOSE the overlay completely.
                    The header doesn't have a close 'X' for the whole overlay anymore,
                    let's add it back or assume 'Back' from main app handles it?
                    Better to have a clear 'Close' action.
                */}

            </div>
        </div>
    );
};

export default NameSwiperOverlay;
