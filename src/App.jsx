import React, { useState, useEffect, useMemo } from 'react';
import { Home, LayoutGrid, BookOpen } from 'lucide-react';
import { signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

// Config
import { auth, db } from './config/firebase';
import { OASIS_IDEAS, LOSS_SHIELD_OPTIONS, LOSS_CARE_OPTIONS } from './data/content';

// Utils
import { calculateStatus, getDailyOasis } from './utils/calculations';

// Hooks
import { useHabits } from './hooks/useHabits';
import { useGamification } from './hooks/useGamification';

// Components
import HeaderSoft from './components/layout/HeaderSoft';
import ModeSelection from './components/layout/ModeSelection';

import ProgressCardSoft from './components/dashboard/ProgressCardSoft';
import HabitGridSoft from './components/dashboard/HabitGridSoft';
import ToolGridSoft from './components/dashboard/ToolGridSoft';
import TodoWidgetSoft from './components/dashboard/TodoWidgetSoft';
import KnowledgeView from './components/dashboard/KnowledgeView';

import DeepTalkSoft from './components/features/DeepTalkSoft';
import AIVibeCheck from './components/features/AIVibeCheck';
import PartnerPulse from './components/features/PartnerPulse';
import ContractionTimer from './components/features/ContractionTimer';
import DadLog from './components/features/DadLog';

import EmergencyOverlay from './components/overlays/EmergencyOverlay';
import HospitalBagOverlay from './components/overlays/HospitalBagOverlay';
import HabitActionOverlay from './components/overlays/HabitActionOverlay';
import ProgressDetailOverlay from './components/overlays/ProgressDetailOverlay';

import DueDateSetup from './components/setup/DueDateSetup';
import NotificationSimulator from './components/shared/NotificationSimulator';

// Global variables provided by the Canvas environment
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

const App = () => {
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [mode, setMode] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [babyName, setBabyName] = useState('');
    const [gender, setGender] = useState('surprise');
    const [ssw, setSsw] = useState(null);
    // REMOVED: local habits state
    const [vibeCheck, setVibeCheck] = useState('');
    const [vibeHistory, setVibeHistory] = useState([]); // Added History
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState({});
    const [bagItems, setBagItems] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [contractions, setContractions] = useState([]);
    const [dadLogs, setDadLogs] = useState([]);

    // Navigation State
    const [activeTab, setActiveTab] = useState('home');

    // Overlay States
    const [showDetail, setShowDetail] = useState(false);
    const [activeOverlayHabit, setActiveOverlayHabit] = useState(null); // Replaces showOasis, holds 'oasis', 'shield', 'hydration'
    const [showBag, setShowBag] = useState(false);
    const [showEmergency, setShowEmergency] = useState(false);
    const [showTimer, setShowTimer] = useState(false);

    // Initial Data for Hooks (Will be updated from Firestore)
    const [initialHabits, setInitialHabits] = useState(null);

    const saveProfile = async (data) => {
        if (!userId) return;
        await setDoc(doc(db, `artifacts/${appId}/users/${userId}/dad_support_data`, 'user_profile'), data, { merge: true });
    };

    // --- HOOKS INTEGRATION ---
    const { habits, toggleHabit } = useHabits(initialHabits, saveProfile);
    const { currentXP } = useGamification(tasks, habits);

    useEffect(() => {
        // Auth Listener setup
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                setIsAuthReady(true);
            } else {
                // Fallback if no user is signed in automatically
                signInAnonymously(auth).catch((err) => console.error("Auth Fail:", err));
            }
        });

        // Initial Auth Attempt
        if (!auth.currentUser) {
            if (initialAuthToken) {
                signInWithCustomToken(auth, initialAuthToken).catch(e => console.error(e));
            } else {
                signInAnonymously(auth).catch(e => console.error(e));
            }
        }

        return () => unsubscribe();
    }, []);

    // Data Loading
    useEffect(() => {
        if (!isAuthReady || !userId || !db) return;
        const docRef = doc(db, `artifacts/${appId}/users/${userId}/dad_support_data`, 'user_profile');
        const unsub = onSnapshot(docRef, (snap) => {
            if (snap.exists()) {
                const data = snap.data();
                setMode(data.mode);
                setDueDate(data.dueDate);
                if (data.babyName) setBabyName(data.babyName);
                if (data.gender) setGender(data.gender);
                if (data.ssw) setSsw(data.ssw);
                if (data.habits) setInitialHabits(data.habits);
                if (data.vibeCheck) setVibeCheck(data.vibeCheck);
                if (data.vibeHistory) setVibeHistory(data.vibeHistory);
                if (data.contacts) setContacts(data.contacts);
                if (data.bagItems) setBagItems(data.bagItems);
                if (data.tasks) setTasks(data.tasks);
                if (data.contractions) setContractions(data.contractions);
                if (data.dadLogs) setDadLogs(data.dadLogs);
            }
            setLoading(false);
        });
        return () => unsub();
    }, [isAuthReady, userId]);

    // Save Functions
    const saveMode = (m) => { setMode(m); saveProfile({ mode: m }); };

    // Updated saveVibeCheck to handle history
    const saveVibeCheck = (v, history) => {
        setVibeCheck(v);
        if (history) setVibeHistory(history);
        saveProfile({ vibeCheck: v, vibeHistory: history || vibeHistory });
    };

    const updateContact = (c) => { setContacts(c); saveProfile({ contacts: c }); };

    const toggleBagItem = (id) => {
        let newItems = bagItems.includes(id) ? bagItems.filter(i => i !== id) : [...bagItems, id];
        setBagItems(newItems);
        saveProfile({ bagItems: newItems });
    };

    const toggleTask = (id, status) => {
        const idx = tasks.findIndex(t => t.id === id);
        let newTasks;
        if (idx >= 0) newTasks = tasks.map((t, i) => i === idx ? { ...t, completed: !status } : t);
        else newTasks = [...tasks, { id, completed: !status }];
        setTasks(newTasks);
        saveProfile({ tasks: newTasks });
    };

    const saveContractions = (newContractions) => {
        setContractions(newContractions);
        saveProfile({ contractions: newContractions });
    };

    const saveLog = (newLogEntry) => {
        const newLogs = [newLogEntry, ...dadLogs];
        setDadLogs(newLogs);
        saveProfile({ dadLogs: newLogs });
    };

    const statusData = useMemo(() => calculateStatus(dueDate, mode), [dueDate, mode]);

    // --- OVERLAY DATA PREP ---
    const getOverlayData = () => {
        if (!activeOverlayHabit) return null;

        if (activeOverlayHabit === 'oasis') {
            return {
                title: "Wähle deine Mission",
                subtitle: "Deine Oase heute",
                options: getDailyOasis(mode, statusData.week),
                color: 'amber'
            };
        }
        if (activeOverlayHabit === 'shield' && mode === 'loss') {
            return {
                title: "Schutzschild aufbauen",
                subtitle: "Grenzen setzen",
                options: LOSS_SHIELD_OPTIONS,
                color: 'zinc'
            };
        }
        if (activeOverlayHabit === 'hydration' && mode === 'loss') {
            return {
                title: "Fürsorge-Moment",
                subtitle: "Tu euch was Gutes",
                options: LOSS_CARE_OPTIONS,
                color: 'stone'
            };
        }
        return null;
    };

    const markOverlayHabitDone = async () => {
        if (activeOverlayHabit) {
            await toggleHabit(activeOverlayHabit);
            setTimeout(() => setActiveOverlayHabit(null), 500);
        }
    };

    if (loading && !isAuthReady) return <div className="flex h-screen items-center justify-center text-stone-400">Lade...</div>;

    return (
        <div className="min-h-screen bg-[#F5F5F0] font-sans text-stone-800 pb-safe selection:bg-stone-200 flex flex-col">
            <div className="max-w-md mx-auto w-full relative flex-grow pb-24">
                {/* PUSH NOTIFICATION SIMULATION */}
                <NotificationSimulator habits={habits} mode={mode} dueDate={dueDate} />

                {!mode && <ModeSelection setMode={saveMode} />}
                {mode && !dueDate && <DueDateSetup saveProfile={saveProfile} mode={mode} />}

                {mode && dueDate && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <HeaderSoft statusData={statusData} mode={mode} babyName={babyName} xp={currentXP} />
                        <div className="px-4">
                            {/* VIEW SWITCHER */}
                            {activeTab === 'home' && (
                                <>
                                    <ProgressCardSoft statusData={statusData} mode={mode} openDetail={() => setShowDetail(true)} />
                                    <HabitGridSoft
                                        habits={habits}
                                        toggleHabit={toggleHabit}
                                        mode={mode}
                                        openOverlay={(key) => setActiveOverlayHabit(key)}
                                    />
                                    <PartnerPulse mode={mode} />
                                    <DeepTalkSoft mode={mode} statusData={statusData} />
                                    <AIVibeCheck vibeCheck={vibeCheck} vibeHistory={vibeHistory} saveVibeCheck={saveVibeCheck} mode={mode} />
                                </>
                            )}

                            {activeTab === 'tools' && (
                                <div className="animate-in fade-in">
                                    {showTimer ? (
                                        <ContractionTimer contractions={contractions} saveContractions={saveContractions} closeTimer={() => setShowTimer(false)} />
                                    ) : (
                                        <ToolGridSoft mode={mode} openBag={() => setShowBag(true)} openEmergency={() => setShowEmergency(true)} bagItems={bagItems} toggleTimer={() => setShowTimer(true)} />
                                    )}
                                    <DadLog logs={dadLogs} saveLog={saveLog} />
                                    <TodoWidgetSoft statusData={statusData} tasks={tasks} toggleTask={toggleTask} mode={mode} />
                                </div>
                            )}

                            {activeTab === 'knowledge' && (
                                <KnowledgeView week={statusData.week} mode={mode} ssw={ssw} />
                            )}
                        </div>
                        {activeTab === 'home' && (
                            <div className="py-6 text-center">
                                <button onClick={() => saveProfile({ mode: null, dueDate: null, babyName: '', gender: 'surprise' })} className="text-[10px] text-red-300 uppercase tracking-widest font-semibold">Reset App</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* BOTTOM NAVIGATION */}
            {mode && dueDate && (
                <div className="fixed bottom-6 left-0 right-0 px-6 max-w-md mx-auto z-40 pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-md border border-stone-200 shadow-xl rounded-full p-2 flex justify-between items-center pointer-events-auto">
                        <button onClick={() => setActiveTab('home')} className={`p-3 rounded-full transition ${activeTab === 'home' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-600'}`}><Home size={20} /></button>
                        <button onClick={() => setActiveTab('tools')} className={`p-3 rounded-full transition ${activeTab === 'tools' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-600'}`}><LayoutGrid size={20} /></button>
                        <button onClick={() => setActiveTab('knowledge')} className={`p-3 rounded-full transition ${activeTab === 'knowledge' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-600'}`}><BookOpen size={20} /></button>
                    </div>
                </div>
            )}

            {/* OVERLAYS */}
            {showDetail && <ProgressDetailOverlay statusData={statusData} mode={mode} closeDetail={() => setShowDetail(false)} />}
            {getOverlayData() && (
                <HabitActionOverlay
                    title={getOverlayData().title}
                    subtitle={getOverlayData().subtitle}
                    options={getOverlayData().options}
                    color={getOverlayData().color}
                    isDone={habits[activeOverlayHabit]}
                    onConfirm={markOverlayHabitDone}
                    onClose={() => setActiveOverlayHabit(null)}
                />
            )}
            {showBag && <HospitalBagOverlay bagItems={bagItems} toggleItem={toggleBagItem} closeBag={() => setShowBag(false)} mode={mode} ssw={ssw} />}
            {showEmergency && <EmergencyOverlay contacts={contacts} updateContact={updateContact} closeEmergency={() => setShowEmergency(false)} />}
        </div>
    );
};

export default App;