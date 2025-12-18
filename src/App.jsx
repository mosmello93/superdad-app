import React, { useState, useEffect, useMemo } from 'react';
import { Home, LayoutGrid, BookOpen, Users, MessageCircle } from 'lucide-react';
import { signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

// Config
import { auth, db } from './config/firebase';
import { OASIS_IDEAS, LOSS_SHIELD_OPTIONS, LOSS_CARE_OPTIONS } from './data/content';
import { ACHIEVEMENTS } from './data/achievements';

// Utils
import { calculateStatus, getDailyOasis } from './utils/calculations';

// Hooks
import { useHabits } from './hooks/useHabits';
import { useGamification } from './hooks/useGamification';
import { calculateLevel } from './utils/gamification';
import { checkAndSendNotifications, requestNotificationPermission } from './utils/notifications';

// Components
import HeaderSoft from './components/layout/HeaderSoft';
import ModeSelection from './components/layout/ModeSelection';

import ProgressCardSoft from './components/dashboard/ProgressCardSoft';
import HabitGridSoft from './components/dashboard/HabitGridSoft';
import ToolGridSoft from './components/dashboard/ToolGridSoft';
import KnowledgeView from './components/dashboard/KnowledgeView';

import DeepTalkSoft from './components/features/DeepTalkSoft';
import AIVibeCheck from './components/features/AIVibeCheck';
import PartnerPulse from './components/features/PartnerPulse';
import ContractionTimer from './components/features/ContractionTimer';
import DadLog from './components/features/DadLog';
import DailyTipWidget from './components/features/DailyTipWidget';

// Overlays
import EmergencyOverlay from './components/overlays/EmergencyOverlay';
import HospitalBagOverlay from './components/overlays/HospitalBagOverlay';
import HabitActionOverlay from './components/overlays/HabitActionOverlay';
import ProgressDetailOverlay from './components/overlays/ProgressDetailOverlay';
import MilestoneOverlay from './components/overlays/MilestoneOverlay';
import ShieldOverlay from './components/overlays/ShieldOverlay';
import BureaucracySoft from './components/features/BureaucracySoft';
import ResourceOverlay from './components/overlays/ResourceOverlay';
import GamificationOverlay from './components/overlays/GamificationOverlay';
import AIChatOverlay from './components/overlays/AIChatOverlay';
import SettingsOverlay from './components/overlays/SettingsOverlay';
import LevelUpOverlay from './components/overlays/LevelUpOverlay';
import ContractionTimerOverlayV2 from './components/overlays/ContractionTimerOverlayV2';


import BadgesOverlay, { BadgeUnlockOverlay } from './components/overlays/BadgesOverlay';
import NameSwiperOverlay from './components/overlays/NameSwiperOverlay';
import BudgetOverlay from './components/overlays/BudgetOverlay';
import CalendarOverlay from './components/overlays/CalendarOverlay';
import CryCompassOverlay from './components/overlays/CryCompassOverlay';
import ShiftPlannerOverlay from './components/overlays/ShiftPlannerOverlay';
import MissionsOverlay from './components/overlays/MissionsOverlay';

import DueDateSetup from './components/setup/DueDateSetup';
import OnboardingFlow from './components/setup/OnboardingFlow';
import TabOnboarding from './components/setup/TabOnboarding';
import NotificationSimulator from './components/shared/NotificationSimulator';

// Global variables provided by the Canvas environment
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

const App = () => {
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [mode, setMode] = useState(null);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const [dueDate, setDueDate] = useState(null);
    const [babyName, setBabyName] = useState('');
    const [userName, setUserName] = useState(''); // New: Dad's Name
    const [gender, setGender] = useState('surprise');
    const [ssw, setSsw] = useState(null);

    const [vibeCheck, setVibeCheck] = useState('');
    const [vibeHistory, setVibeHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState({});
    const [bagItems, setBagItems] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [contractions, setContractions] = useState([]);
    const [dadLogs, setDadLogs] = useState([]);
    const [habitXP, setHabitXP] = useState(0);

    const updateHabitXP = (delta) => {
        setHabitXP(prev => {
            const newXP = Math.max(0, prev + delta);
            saveProfile({ habitXP: newXP });
            return newXP;
        });
    };

    // New State for Features
    const [showMilestones, setShowMilestones] = useState(false);
    const [showShield, setShowShield] = useState(false);
    const [showBureaucracy, setShowBureaucracy] = useState(false);
    const [showResources, setShowResources] = useState(false);
    const [showGamification, setShowGamification] = useState(false);
    const [showAIChat, setShowAIChat] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showNameSwiper, setShowNameSwiper] = useState(false);
    const [showBudget, setShowBudget] = useState(false);

    // Onboarding State
    const [showOnboarding, setShowOnboarding] = useState(true);

    const [unlockedMilestones, setUnlockedMilestones] = useState([]);
    const [milestoneDates, setMilestoneDates] = useState({});
    const [completedTasks, setCompletedTasks] = useState([]);

    // Navigation State
    const [activeTab, setActiveTab] = useState('home');
    const [seenTabs, setSeenTabs] = useState(() => {
        const saved = localStorage.getItem('seenTabs');
        return saved ? JSON.parse(saved) : { home: false, team: false, tools: false, knowledge: false };
    });

    // Dismiss Tab Onboarding
    const dismissTabOnboarding = () => {
        const updated = { ...seenTabs, [activeTab]: true };
        setSeenTabs(updated);
        localStorage.setItem('seenTabs', JSON.stringify(updated));
    };

    // Helper for Dark Mode
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    // Scroll to top on tab change or mode switch
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activeTab, mode, dueDate]);

    // Overlay States
    const [showDetail, setShowDetail] = useState(false);
    const [activeOverlayHabit, setActiveOverlayHabit] = useState(null);
    const [showBag, setShowBag] = useState(false);
    const [showEmergency, setShowEmergency] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const [showContractionTimer, setShowContractionTimer] = useState(false);
    const [showBadges, setShowBadges] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showCryCompass, setShowCryCompass] = useState(false);
    const [showShiftPlanner, setShowShiftPlanner] = useState(false);
    const [showMissions, setShowMissions] = useState(false);

    // Shift Data
    const [activeShift, setActiveShift] = useState(null); // { person: 'Papa', startTime: ts }
    const [shiftHistory, setShiftHistory] = useState([]);

    // Initial Data for Hooks (Will be updated from Firestore)
    const [initialHabits, setInitialHabits] = useState(null);

    const saveProfile = async (data) => {
        if (!userId) return;
        await setDoc(doc(db, `artifacts/${appId}/users/${userId}/dad_support_data`, 'user_profile'), data, { merge: true });
    };

    // --- HOOKS INTEGRATION ---
    const { habits, toggleHabit, resetHabits } = useHabits(initialHabits, saveProfile, updateHabitXP);
    const { currentXP, newLevelUnlocked, dismissLevelUp, newBadgeUnlocked, dismissBadge, unlockedBadges } = useGamification(tasks, habitXP, habits);

    useEffect(() => {
        // Auth Listener setup
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                setIsAuthReady(true);
            } else {
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
                if (data.userName) setUserName(data.userName); // Load Dad's Name
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

                // XP Logic with Migration
                if (data.habitXP !== undefined) {
                    setHabitXP(data.habitXP);
                } else if (data.habits) {
                    // MIGRATION: Calculate initial XP from existing habits for the first time
                    const existingHabitXP = Object.values(data.habits).filter(v => v === true).length * 10;
                    setHabitXP(existingHabitXP);
                    // We don't save immediately to avoid write-loops, it will save on next action
                }

                // Load New Features
                if (data.unlockedMilestones) setUnlockedMilestones(data.unlockedMilestones);
                if (data.milestoneDates) setMilestoneDates(data.milestoneDates);
                if (data.completedTasks) setCompletedTasks(data.completedTasks);
                if (data.partnerHistory) setPartnerHistory(data.partnerHistory);
                if (data.partnerHistory) setPartnerHistory(data.partnerHistory);
                if (data.lastSeenWeek) setLastSeenWeek(data.lastSeenWeek);
                if (data.activeShift) setActiveShift(data.activeShift);
                if (data.shiftHistory) setShiftHistory(data.shiftHistory);
            }
            setLoading(false);
        });
        return () => unsub();
    }, [isAuthReady, userId]);

    // Save Functions
    const saveMode = (m) => { setMode(m); saveProfile({ mode: m }); };

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

    // New Wrapper Functions
    const toggleMilestone = (id) => {
        const isUnlocking = !unlockedMilestones.includes(id);
        const newSet = isUnlocking
            ? [...unlockedMilestones, id]
            : unlockedMilestones.filter(m => m !== id);

        setUnlockedMilestones(newSet);

        // Date Logic
        let newDates = { ...milestoneDates };
        if (isUnlocking) {
            // ALWAYS set the date when unlocking (auto-stamp)
            // Use ISO string split to ensure YYYY-MM-DD format universally (avoid locale issues)
            const today = new Date().toISOString().split('T')[0];
            newDates[id] = today;
        } else {
            // If un-checking, remove the date
            delete newDates[id];
        }
        setMilestoneDates(newDates);

        saveProfile({ unlockedMilestones: newSet, milestoneDates: newDates });
    };

    const updateMilestoneDate = (id, newDate) => {
        const newDates = { ...milestoneDates, [id]: newDate };
        setMilestoneDates(newDates);
        saveProfile({ milestoneDates: newDates });
    };

    const toggleBureaucracyTask = (id) => {
        const newSet = completedTasks.includes(id)
            ? completedTasks.filter(t => t !== id)
            : [...completedTasks, id];
        setCompletedTasks(newSet);
        saveProfile({ completedTasks: newSet });
    };

    // Partner Pulse Logic
    const [partnerHistory, setPartnerHistory] = useState([]);

    // Notification State
    const [lastSeenWeek, setLastSeenWeek] = useState(0);

    // Initial Notification Check (Wait for data load)


    const savePartnerMood = (moodId) => {
        const entry = { date: Date.now(), moodId };
        const newHistory = [entry, ...partnerHistory]; // Newest first
        setPartnerHistory(newHistory);
        saveProfile({ partnerHistory: newHistory });
    };

    // Photos State
    const [milestonePhotos, setMilestonePhotos] = useState({});

    useEffect(() => {
        // Load photos from localStorage (simple persistence for MVP)
        const savedPhotos = localStorage.getItem(`milestone_photos_${userId}`);
        if (savedPhotos) {
            setMilestonePhotos(JSON.parse(savedPhotos));
        }
    }, [userId]);

    const saveMilestonePhoto = (milestoneId, photoDataUrl) => {
        const newPhotos = { ...milestonePhotos, [milestoneId]: photoDataUrl };
        setMilestonePhotos(newPhotos);
        // Persist to local storage for now to avoid Firestore size limits with base64
        if (userId) {
            localStorage.setItem(`milestone_photos_${userId}`, JSON.stringify(newPhotos));
        }
    };

    const statusData = useMemo(() => calculateStatus(dueDate, mode), [dueDate, mode]);

    // Initial Notification Check
    useEffect(() => {
        if (!loading && mode && statusData && statusData.week) {
            checkAndSendNotifications(mode, statusData.week, lastSeenWeek, (newWeek) => {
                setLastSeenWeek(newWeek);
                saveProfile({ lastSeenWeek: newWeek });
            });
        }
    }, [loading, mode, statusData, lastSeenWeek]);

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

    if (!isAuthReady || loading) return <div className="flex h-screen items-center justify-center text-stone-400">Lade...</div>;

    return (
        <div className="min-h-screen bg-[#F5F5F0] dark:bg-stone-950 font-sans text-stone-800 dark:text-stone-100 pb-safe selection:bg-stone-200 dark:selection:bg-stone-800 flex flex-col transition-colors duration-300">
            <div className="max-w-md mx-auto w-full relative flex-grow pb-24">
                {/* PUSH NOTIFICATION SIMULATION */}
                <NotificationSimulator habits={habits} mode={mode} dueDate={dueDate} />

                {!mode && (
                    showOnboarding ? (
                        <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
                    ) : (
                        <ModeSelection setMode={saveMode} />
                    )
                )}
                {mode && !dueDate && <DueDateSetup saveProfile={saveProfile} mode={mode} />}

                {mode && dueDate && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <HeaderSoft
                            statusData={statusData}
                            mode={mode}
                            babyName={babyName}
                            userName={userName}
                            xp={currentXP}
                            onOpenGamification={() => setShowBadges(true)}
                            onOpenSettings={() => setShowSettings(true)}
                            darkMode={darkMode}
                            toggleDarkMode={() => setDarkMode(!darkMode)}
                            onRequestNotifications={requestNotificationPermission} // Pass detailed function
                        />
                        <div className="px-4">
                            {/* VIEW SWITCHER */}
                            {activeTab === 'home' && (
                                <div className="space-y-6">
                                    <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100 fill-mode-backwards">
                                        <DailyTipWidget mode={mode} week={statusData.week} babyName={babyName} userName={userName} gender={gender} />
                                    </div>
                                    <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200 fill-mode-backwards">
                                        <ProgressCardSoft statusData={statusData} mode={mode} openDetail={() => setShowDetail(true)} />
                                    </div>
                                    <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300 fill-mode-backwards">
                                        <HabitGridSoft
                                            habits={habits}
                                            toggleHabit={toggleHabit}
                                            mode={mode}
                                            openOverlay={(key) => setActiveOverlayHabit(key)}
                                        />
                                    </div>
                                    <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500 fill-mode-backwards">
                                        <DadLog logs={dadLogs} saveLog={saveLog} />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'team' && (
                                <div className="space-y-6 animate-in fade-in">
                                    <PartnerPulse mode={mode} history={partnerHistory} onSave={savePartnerMood} />
                                    <DeepTalkSoft mode={mode} statusData={statusData} />
                                    <AIVibeCheck vibeCheck={vibeCheck} vibeHistory={vibeHistory} saveVibeCheck={saveVibeCheck} mode={mode} ssw={statusData.week} gender={gender} babyName={babyName} />
                                </div>
                            )}

                            {activeTab === 'tools' && (
                                <div className="animate-in fade-in">
                                    <ToolGridSoft
                                        mode={mode}
                                        toggleTimer={() => setShowContractionTimer(true)}
                                        openBag={() => setShowBag(true)}
                                        openMilestones={() => setShowMilestones(true)}
                                        openShield={() => setShowShield(true)}
                                        openBureaucracy={() => setShowBureaucracy(true)}
                                        openResources={() => setShowResources(true)}
                                        openEmergency={() => setShowEmergency(true)}
                                        openNameSwiper={() => setShowNameSwiper(true)}
                                        openBudget={() => setShowBudget(true)}
                                        openCalendar={() => setShowCalendar(true)}
                                        openCryCompass={() => setShowCryCompass(true)}
                                        openShiftPlanner={() => setShowShiftPlanner(true)}
                                        openMissions={() => setShowMissions(true)}
                                    />
                                </div>
                            )}

                            {activeTab === 'knowledge' && (
                                <KnowledgeView week={statusData.week} mode={mode} ssw={ssw} />
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* BOTTOM NAVIGATION */}
            {mode && dueDate && (
                <>
                    {/* AI CHAT FAB */}
                    <div className="fixed bottom-24 right-4 z-30">
                        <button
                            onClick={() => setShowAIChat(true)}
                            className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform hover:scale-105 flex items-center justify-center"
                        >
                            <MessageCircle size={24} />
                        </button>
                    </div>

                    <div className="fixed bottom-6 left-0 right-0 px-6 max-w-md mx-auto z-40 pointer-events-none">
                        <div className="bg-white/90 backdrop-blur-md border border-stone-200 shadow-xl rounded-full p-2 flex justify-between items-center pointer-events-auto">
                            <button onClick={() => setActiveTab('home')} className={`p-3 rounded-full transition-all duration-300 ${activeTab === 'home' ? 'bg-stone-800 text-white scale-110 shadow-md' : 'text-stone-400 hover:text-stone-600 hover:scale-105'}`}><Home size={20} /></button>
                            <button onClick={() => setActiveTab('team')} className={`p-3 rounded-full transition-all duration-300 ${activeTab === 'team' ? 'bg-stone-800 text-white scale-110 shadow-md' : 'text-stone-400 hover:text-stone-600 hover:scale-105'}`}><Users size={20} /></button>
                            <button onClick={() => setActiveTab('tools')} className={`p-3 rounded-full transition-all duration-300 ${activeTab === 'tools' ? 'bg-stone-800 text-white scale-110 shadow-md' : 'text-stone-400 hover:text-stone-600 hover:scale-105'}`}><LayoutGrid size={20} /></button>
                            <button onClick={() => setActiveTab('knowledge')} className={`p-3 rounded-full transition-all duration-300 ${activeTab === 'knowledge' ? 'bg-stone-800 text-white scale-110 shadow-md' : 'text-stone-400 hover:text-stone-600 hover:scale-105'}`}><BookOpen size={20} /></button>
                        </div>
                    </div>

                </>
            )
            }

            {/* OVERLAYS */}
            {showDetail && <ProgressDetailOverlay statusData={statusData} mode={mode} closeDetail={() => setShowDetail(false)} />}
            {
                getOverlayData() && (
                    <HabitActionOverlay
                        title={getOverlayData().title}
                        subtitle={getOverlayData().subtitle}
                        options={getOverlayData().options}
                        color={getOverlayData().color}
                        isDone={habits[activeOverlayHabit]}
                        onConfirm={markOverlayHabitDone}
                        onClose={() => setActiveOverlayHabit(null)}
                    />
                )
            }

            {showBag && <HospitalBagOverlay bagItems={bagItems} toggleItem={toggleBagItem} closeBag={() => setShowBag(false)} mode={mode} ssw={ssw} />}
            {showEmergency && <EmergencyOverlay contacts={contacts} updateContact={updateContact} closeEmergency={() => setShowEmergency(false)} />}

            {/* NEW OVERLAYS */}
            {
                showMilestones && (
                    <MilestoneOverlay
                        unlockedMilestones={unlockedMilestones}
                        toggleMilestone={toggleMilestone}
                        close={() => setShowMilestones(false)}
                        mode={mode}
                        milestonePhotos={milestonePhotos}
                        onSavePhoto={saveMilestonePhoto}
                        milestoneDates={milestoneDates}
                        onUpdateDate={updateMilestoneDate}
                    />
                )
            }

            {showShield && <ShieldOverlay close={() => setShowShield(false)} />}
            {showBureaucracy && <BureaucracySoft completedTasks={completedTasks} toggleTask={toggleBureaucracyTask} close={() => setShowBureaucracy(false)} mode={mode} />}
            {showResources && <ResourceOverlay close={() => setShowResources(false)} mode={mode} />}

            {
                showGamification && (
                    <GamificationOverlay
                        xp={currentXP}
                        levelInfo={calculateLevel(currentXP)}
                        onClose={() => setShowGamification(false)}
                    />
                )
            }

            {
                showAIChat && (
                    <AIChatOverlay
                        mode={mode}
                        babyName={babyName}
                        gender={gender}
                        ssw={statusData.week} // Pass current week
                        onClose={() => setShowAIChat(false)}
                    />
                )
            }

            {
                showSettings && (
                    <SettingsOverlay
                        onClose={() => setShowSettings(false)}
                        babyName={babyName}
                        gender={gender}
                        mode={mode}
                        dueDate={dueDate}
                        onSaveProfile={saveProfile}
                        onResetApp={() => {
                            const emptyState = {
                                mode: null, dueDate: null, babyName: '', gender: 'surprise', ssw: null,
                                habitXP: 0, unlockedMilestones: [], milestoneDates: {}, completedTasks: [],
                                dadLogs: [], contractions: [], contacts: {}, bagItems: [], tasks: [],
                                vibeCheck: '', vibeHistory: [], partnerHistory: [], habits: null
                            };
                            saveProfile(emptyState);

                            // Reset Local State
                            setHabitXP(0);
                            setUnlockedMilestones([]);
                            setMilestoneDates({});
                            setCompletedTasks([]);
                            setDadLogs([]);
                            setContractions([]);
                            setContacts({});
                            setBagItems([]);
                            setTasks([]);
                            setVibeCheck('');
                            setVibeHistory([]);
                            setPartnerHistory([]);
                            setBabyName('');
                            setGender('surprise');
                            setMode(null);
                            setDueDate(null);
                            setInitialHabits(null); // Clear initial habits to prevent re-merge
                            resetHabits(); // Force hook to reset to defaults

                            // Clear Local Storage
                            localStorage.removeItem('seenTabs');
                            localStorage.removeItem('dad_last_level');
                            localStorage.removeItem('theme');
                            if (userId) localStorage.removeItem(`milestone_photos_${userId}`);

                            setSeenTabs({ home: false, team: false, tools: false, knowledge: false });
                            setShowSettings(false);
                            setShowOnboarding(true);
                        }}
                    />
                )
            }

            {/* LEVEL UP CELEBRATION - Disabled in Loss Mode */}
            {
                newLevelUnlocked && mode !== 'loss' && (
                    <LevelUpOverlay
                        levelInfo={newLevelUnlocked}
                        onClose={dismissLevelUp}
                    />
                )
            }

            {/* CONTRACTION TIMER */}
            {
                showContractionTimer && (
                    <ContractionTimerOverlayV2
                        onClose={() => setShowContractionTimer(false)}
                        contacts={contacts}
                    />
                )
            }

            {/* BADGE UNLOCK CELEBRATION */}
            {
                newBadgeUnlocked && (
                    <BadgeUnlockOverlay
                        badge={newBadgeUnlocked}
                        onClose={dismissBadge}
                    />
                )
            }

            {/* BADGES COLLECTION OVERLAY */}
            {
                showBadges && (
                    <BadgesOverlay
                        unlockedBadges={unlockedBadges}
                        allBadges={ACHIEVEMENTS}
                        onClose={() => setShowBadges(false)}
                        currentXP={currentXP}
                        levelInfo={calculateLevel(currentXP)}
                    />
                )
            }

            {/* NAME SWIPER */}
            {
                showNameSwiper && (
                    <NameSwiperOverlay
                        preselectedGender={gender}
                        onClose={() => setShowNameSwiper(false)}
                    />
                )
            }

            {/* BABY BUDGET */}
            {
                showBudget && (
                    <BudgetOverlay
                        onClose={() => setShowBudget(false)}
                    />
                )
            }

            {/* NEW POSTPARTUM TOOLS */}
            {
                showCryCompass && (
                    <CryCompassOverlay
                        onClose={() => setShowCryCompass(false)}
                    />
                )
            }
            {
                showShiftPlanner && (
                    <ShiftPlannerOverlay
                        onClose={() => setShowShiftPlanner(false)}
                        activeShift={activeShift}
                        history={shiftHistory}
                        startShift={(person) => {
                            const newShift = { person, startTime: Date.now() };
                            setActiveShift(newShift);
                            saveProfile({ activeShift: newShift });
                            // Notify user?
                        }}
                        endShift={() => {
                            if (!activeShift) return;
                            const duration = Date.now() - activeShift.startTime;
                            const entry = {
                                person: activeShift.person,
                                duration,
                                endedAt: Date.now()
                            };
                            const newHistory = [entry, ...shiftHistory].slice(0, 10); // Keep last 10
                            setShiftHistory(newHistory);
                            setActiveShift(null);
                            saveProfile({ activeShift: null, shiftHistory: newHistory });
                        }}
                    />
                )
            }

            {/* MISSIONS OVERLAY */}
            {
                showMissions && (
                    <MissionsOverlay
                        onClose={() => setShowMissions(false)}
                        statusData={statusData}
                        tasks={tasks}
                        toggleTask={toggleTask}
                        mode={mode}
                    />
                )
            }

            {/* CALENDAR OVERLAY */}
            {
                showCalendar && (
                    <CalendarOverlay
                        onClose={() => setShowCalendar(false)}
                        dueDate={dueDate}
                        birthDate={mode === 'postpartum' ? dueDate : null} // Rough approximation if birthDate not stored separately, ideally use separate field
                        mode={mode}
                    />
                )
            }

            {/* TAB ONBOARDING (Only if main onboarding is done AND setup is complete) */}
            {
                !showOnboarding && mode && dueDate && !seenTabs[activeTab] && (
                    <TabOnboarding mode={mode} activeTab={activeTab} onDismiss={dismissTabOnboarding} babyName={babyName} gender={gender} />
                )
            }
        </div >
    );
};

export default App;