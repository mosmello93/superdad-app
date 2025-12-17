import React from 'react';
import { Backpack, Clock, Trophy, Shield, FileText, Link, AlertTriangle, Heart, Calendar } from 'lucide-react';


const ToolGridSoft = ({ mode, toggleTimer, openBag, openMilestones, openShield, openBureaucracy, openResources, openEmergency, openNameSwiper, openBudget, openCalendar, openCryCompass, openShiftPlanner, openMissions }) => {

    // Helper for Section Headers
    const SectionHeader = ({ icon: Icon, title, color }) => (
        <div className="col-span-2 flex items-center gap-2 mt-6 mb-3 opacity-80 pl-1">
            <Icon size={16} className={color} />
            <h4 className={`text-xs font-bold uppercase tracking-wider ${color}`}>{title}</h4>
            <div className={`h-px flex-1 ${color === 'text-red-500' ? 'bg-red-200 dark:bg-red-900/50' : 'bg-stone-200 dark:bg-stone-800'}`}></div>
        </div>
    );

    return (
        <div className="relative mb-24">

            {/* --- 1. SOS & LIVE SECTION --- */}
            <div className="grid grid-cols-2 gap-4">
                <SectionHeader icon={AlertTriangle} title="SOS & Live" color="text-red-500" />

                {/* PREGNANCY: CONTRACTION TIMER */}
                {mode === 'pregnancy' && (
                    <div onClick={toggleTimer} className="bg-[#E0E7FF] dark:bg-indigo-900/40 p-6 rounded-[32px] cursor-pointer transition-transform hover:shadow-md active:scale-95 border border-indigo-100/50 dark:border-indigo-800/50 group overflow-hidden relative">
                        <div className="mb-4 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <img src="/mascot/papa_timer.png" alt="Timer" className="w-24 h-24 object-contain transform hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="font-bold text-indigo-900 dark:text-indigo-200 relative z-10">Wehen-<br />Timer</h3>
                    </div>
                )}

                {/* POSTPARTUM: CRY COMPASS */}
                {mode === 'postpartum' && (
                    <div onClick={openCryCompass} className="bg-teal-50 dark:bg-teal-900/40 p-6 rounded-[32px] cursor-pointer transition-transform hover:shadow-md active:scale-95 border border-teal-100 dark:border-teal-800/50 group overflow-hidden relative">
                        <div className="mb-4 flex items-center justify-center text-teal-600 dark:text-teal-400">
                            <img src="/mascot/papa_cry.png" alt="Schrei-Kompass" className="w-24 h-24 object-contain transform hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="font-bold text-teal-900 dark:text-teal-200">Schrei-<br />Kompass</h3>
                    </div>
                )}

                {/* POSTPARTUM: SHIFT PLANNER */}
                {mode === 'postpartum' && (
                    <div onClick={openShiftPlanner} className="bg-[#FDF4FF] dark:bg-fuchsia-900/30 p-6 rounded-[32px] cursor-pointer transition-transform hover:shadow-md active:scale-95 border border-fuchsia-100 dark:border-fuchsia-800/50 group overflow-hidden">
                        <div className="mb-4 flex items-center justify-center text-fuchsia-500 dark:text-fuchsia-400">
                            <img src="/mascot/papa_shift.png" alt="Schicht-Planer" className="w-24 h-24 object-contain transform hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="font-bold text-fuchsia-900 dark:text-fuchsia-100">Schicht-<br />Planer</h3>
                    </div>
                )}

                {/* ALL MODES: EMERGENCY INFO */}
                <div onClick={openEmergency} className="bg-[#FEE2E2] dark:bg-red-900/40 p-6 rounded-[32px] cursor-pointer transition-transform hover:shadow-md active:scale-95 border border-red-100/50 dark:border-red-800/50 group overflow-hidden">
                    <div className="mb-4 flex items-center justify-center text-red-600 dark:text-red-400">
                        {mode === 'loss' ? (
                            <AlertTriangle size={32} />
                        ) : (
                            <img src="/mascot/papa_emergency.png" alt="Emergency" className="w-24 h-24 object-contain transform hover:scale-110 transition-transform" />
                        )}
                    </div>
                    <h3 className="font-bold text-red-900 dark:text-red-200">Notfall<br />Infos</h3>
                </div>
            </div>


            {/* --- 2. ORGA & EVERYDAY --- */}
            {mode !== 'loss' && (
                <div className="grid grid-cols-2 gap-4">
                    <SectionHeader icon={Calendar} title="Orga & Täglich" color="text-indigo-500" />

                    {/* SLOT: MISSIONS (All) */}
                    <div onClick={openMissions} className="bg-emerald-50 dark:bg-emerald-900/30 p-6 rounded-[32px] cursor-pointer transition-transform hover:shadow-md active:scale-95 border border-emerald-100 dark:border-emerald-800/50 group overflow-hidden">
                        <div className="mb-4 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <img src="/mascot/papa_missions.png" alt="Missionen" className="w-24 h-24 object-contain transform hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="font-bold text-emerald-900 dark:text-emerald-200">Wochen-<br />Missionen</h3>
                    </div>

                    {/* SLOT: CALENDAR (Preg + Post) */}
                    {(mode === 'pregnancy' || mode === 'postpartum') && (
                        <div onClick={openCalendar} className="bg-[#EFF6FF] dark:bg-blue-900/40 p-6 rounded-[32px] cursor-pointer transition-transform hover:shadow-md active:scale-95 border border-blue-100/50 dark:border-blue-800/50 group overflow-hidden">
                            <div className="mb-4 flex items-center justify-center text-blue-500 dark:text-blue-400">
                                <img src="/mascot/papa_calender.png" alt="Kalender" className="w-24 h-24 object-contain transform hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="font-bold text-blue-900 dark:text-blue-200">Wichtige<br />Termine</h3>
                        </div>
                    )}

                    {/* SLOT: BUREAUCRACY (All) */}
                    {/* SLOT: BUREAUCRACY (All) */}
                    <div onClick={openBureaucracy} className="bg-[#FFF1F2] dark:bg-rose-900/40 p-6 rounded-[32px] cursor-pointer transition-transform hover:shadow-md active:scale-95 border border-rose-100/50 dark:border-rose-800/50 group overflow-hidden">
                        <div className="mb-4 flex items-center justify-center text-rose-600 dark:text-rose-400">
                            {mode === 'loss' ? (
                                <FileText size={32} />
                            ) : (
                                <img src="/mascot/papa_paperwork.png" alt="Bureaucracy" className="w-24 h-24 object-contain transform hover:scale-110 transition-transform" />
                            )}
                        </div>
                        <h3 className="font-bold text-rose-900 dark:text-rose-200">Papier-<br />kram</h3>
                    </div>

                    {/* SLOT: BUDGET (Pregnancy Only) */}
                    {mode === 'pregnancy' && (
                        <div onClick={openBudget} className="bg-[#ECFDF5] dark:bg-emerald-900/40 p-6 rounded-[32px] cursor-pointer transition-transform hover:shadow-md active:scale-95 border border-emerald-100/50 dark:border-emerald-800/50 group overflow-hidden">
                            <div className="mb-4 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
                                <img src="/mascot/papa_budget.png" alt="Budget" className="w-24 h-24 object-contain transform hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="font-bold text-emerald-900 dark:text-emerald-200">Baby-<br />Budget</h3>
                        </div>
                    )}

                    {/* SLOT: NAME SWIPER (Pregnancy Only) */}
                    {mode === 'pregnancy' && (
                        <div onClick={openNameSwiper} className="bg-[#FFF1F2] dark:bg-rose-900/40 p-6 rounded-[32px] cursor-pointer transition-transform hover:shadow-md active:scale-95 border border-rose-100/50 dark:border-rose-800/50 group overflow-hidden">
                            <div className="mb-4 flex items-center justify-center text-rose-500 dark:text-rose-400">
                                <img src="/mascot/papa_names.png" alt="Namen-Finder" className="w-24 h-24 object-contain transform hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="font-bold text-rose-900 dark:text-rose-200">Namen-<br />Finder</h3>
                        </div>
                    )}
                </div>
            )}

            {/* --- 3. WISSEN & VORBEREITUNG --- */}
            <div className="grid grid-cols-2 gap-4">
                <SectionHeader icon={Backpack} title="Wissen & Vorbereitung" color="text-amber-500" />

                {/* PREG/POST: MILESTONES */}
                {(mode === 'postpartum' || mode === 'pregnancy') && (
                    <div onClick={openMilestones} className={`p-6 rounded-[32px] cursor-pointer transition-transform hover:shadow-md active:scale-95 border group ${mode === 'postpartum' ? 'bg-[#FFE4E6] dark:bg-rose-900/40 border-rose-100/50 dark:border-rose-800/50' : 'bg-violet-50 dark:bg-violet-900/40 border-violet-100/50 dark:border-violet-800/50'}`}>
                        <div className={`mb-4 flex items-center justify-center ${mode === 'postpartum' ? 'text-rose-600 dark:text-rose-400' : 'text-violet-600 dark:text-violet-400'}`}>
                            <img src="/mascot/papa_happy.png" alt="Meilensteine" className="w-24 h-24 object-contain transform hover:scale-110 transition-transform" />
                        </div>
                        <h3 className={`font-bold ${mode === 'postpartum' ? 'text-rose-900 dark:text-rose-200' : 'text-violet-900 dark:text-violet-200'}`}>Meilen-<br />steine</h3>
                    </div>
                )}

                {/* LOSS: SHIELD */}
                {mode === 'loss' && (
                    <div onClick={openShield} className="bg-[#F5F5F4] dark:bg-stone-800/50 p-6 rounded-[32px] cursor-pointer transition-transform hover:shadow-md active:scale-95 border border-stone-200/50 dark:border-stone-700/50 group">
                        <div className="mb-4 flex items-center justify-center text-stone-600 dark:text-stone-400">
                            <Shield size={32} />
                        </div>
                        <h3 className="font-bold text-stone-900 dark:text-stone-200">Der<br />Schild</h3>
                    </div>
                )}

                {/* CLINIC BAG (Pregnancy only really, but maybe keep for ref?) User logic was !postpartum before. Let's stick to that */}
                {mode !== 'postpartum' && (
                    <div onClick={openBag} className="bg-[#FFEDD5] dark:bg-orange-900/40 p-6 rounded-[32px] cursor-pointer transition-transform hover:shadow-md active:scale-95 border border-orange-100/50 dark:border-orange-800/50 group relative">
                        <div className="mb-4 flex items-center justify-center text-orange-600 dark:text-orange-400">
                            {mode === 'loss' ? (
                                <Backpack size={32} />
                            ) : (
                                <img src="/mascot/papa_packing.png" alt="Kliniktasche" className="w-24 h-24 object-contain transform hover:scale-110 transition-transform" />
                            )}
                        </div>
                        <h3 className="font-bold text-orange-900 dark:text-orange-200">Klinik-<br />tasche</h3>
                    </div>
                )}

                {/* SLOT: RESOURCES (All) */}
                <div onClick={openResources} className="bg-[#F3F4F6] dark:bg-stone-800 p-6 rounded-[32px] cursor-pointer transition-transform hover:shadow-md active:scale-95 border border-gray-100/50 dark:border-stone-700/50 group overflow-hidden">
                    <div className="mb-4 flex items-center justify-center text-gray-600 dark:text-stone-400">
                        {mode === 'loss' ? (
                            <Link size={32} />
                        ) : (
                            <img src="/mascot/papa_research.png" alt="Research" className="w-24 h-24 object-contain transform hover:scale-110 transition-transform" />
                        )}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-stone-200">Wichtige<br />Links</h3>
                </div>

            </div>
        </div>
    );
};

export default ToolGridSoft;
