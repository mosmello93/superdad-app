import React, { useState } from 'react';
import { X, MapPin, Navigation, Phone, Activity, Heart } from 'lucide-react';

const EmergencyOverlay = ({ contacts, updateContact, closeEmergency, mode }) => {
    const [editMode, setEditMode] = useState(false);
    const [localContacts, setLocalContacts] = useState(contacts);
    const handleSave = () => { updateContact(localContacts); setEditMode(false); };
    const handleChange = (field, value) => { setLocalContacts({ ...localContacts, [field]: value }); };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" onClick={closeEmergency}></div>
            <div className="bg-[#F5F5F0] dark:bg-stone-950 w-full max-w-md h-[85vh] sm:h-[auto] rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300 relative">
                {/* Header */}
                <div className="bg-white dark:bg-stone-900 p-6 pb-4 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-stone-50 dark:bg-stone-800 rounded-full flex items-center justify-center flex-shrink-0">
                            <img src={mode === 'conception' ? "/mascot/papa_supporter.png" : "/mascot/papa_emergency.png"} alt="Mascot" className="w-10 h-10 object-contain" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-stone-800 dark:text-stone-100">{mode === 'conception' ? 'Wichtige Kontakte' : 'Notfall-Infos'}</h2>
                            <p className="text-stone-500 dark:text-stone-400 text-xs">{mode === 'conception' ? 'Deine Support-Crew' : "Alles griffbereit wenn's losgeht."}</p>
                        </div>
                    </div>
                    <button onClick={closeEmergency} className="bg-stone-100 dark:bg-stone-800 p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition"><X size={20} className="text-stone-600 dark:text-stone-300" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Edit Button */}
                    <div className="flex justify-end">
                        <button onClick={editMode ? handleSave : () => setEditMode(true)} className={`px-4 py-2 rounded-xl text-xs font-bold transition ${editMode ? 'bg-stone-800 dark:bg-stone-100 text-white dark:text-stone-900' : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'}`}>
                            {editMode ? 'Speichern' : 'Bearbeiten'}
                        </button>
                    </div>

                    {/* Clinic Section */}
                    <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
                        <div className="flex items-center mb-4"><MapPin size={18} className="text-rose-500 mr-2" /><h3 className="font-bold text-stone-700 dark:text-stone-200">{mode === 'conception' ? 'Kinderwunschzentrum / Arzt' : 'Die Klinik'}</h3></div>
                        {editMode ? (
                            <div className="space-y-3">
                                <input placeholder={mode === 'conception' ? "Name der Praxis/Klinik" : "Name der Klinik"} className="w-full bg-stone-50 dark:bg-stone-800 p-3 rounded-xl text-sm text-stone-900 dark:text-stone-100" value={localContacts.clinicName || ''} onChange={(e) => handleChange('clinicName', e.target.value)} />
                                <input placeholder="Adresse für Navi" className="w-full bg-stone-50 dark:bg-stone-800 p-3 rounded-xl text-sm text-stone-900 dark:text-stone-100" value={localContacts.clinicAddress || ''} onChange={(e) => handleChange('clinicAddress', e.target.value)} />
                            </div>
                        ) : (
                            <div>
                                <p className="font-bold text-lg text-stone-800 dark:text-stone-100">{localContacts.clinicName || (mode === 'conception' ? 'Noch nicht eingetragen' : 'Klinik noch nicht eingetragen')}</p>
                                <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">{localContacts.clinicAddress || 'Adresse fehlt'}</p>
                                {localContacts.clinicAddress && (<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(localContacts.clinicAddress)}`} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition"><Navigation size={16} className="mr-2" />Navigation starten</a>)}
                            </div>
                        )}
                    </div>

                    {/* Important Numbers Section - RE-ADDED */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider ml-1">Wichtige Nummern</h3>
                        {(mode === 'conception'
                            ? [
                                { id: 'urologist', icon: Activity, label: 'Urologe', color: 'blue' },
                                { id: 'gyn', icon: Activity, label: 'Frauenarzt', color: 'rose' },
                                { id: 'counseling', icon: Phone, label: 'Beratung', color: 'indigo' },
                                { id: 'partner', icon: Heart, label: 'Partnerin', color: 'emerald' }
                            ]
                            : [
                                { id: 'midwife', icon: Phone, label: 'Hebamme', color: 'emerald' },
                                { id: 'doctor', icon: Activity, label: 'Kreißsaal / Arzt', color: 'indigo' },
                                { id: 'pediatrician', icon: Activity, label: 'Kinderarzt', color: 'blue' },
                                { id: 'taxi', icon: Phone, label: 'Taxi / Support', color: 'amber' }
                            ]
                        ).map(contact => (
                            <div key={contact.id} className="bg-white dark:bg-stone-900 p-4 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className={`bg-${contact.color}-100 dark:bg-${contact.color}-900/40 p-2 rounded-full mr-3 text-${contact.color}-600 dark:text-${contact.color}-400`}><contact.icon size={18} /></div>
                                    <div>
                                        <p className="text-xs text-stone-400 dark:text-stone-500 font-bold uppercase">{contact.label}</p>
                                        {editMode ? (
                                            <div className="flex flex-col space-y-1 mt-1">
                                                <input placeholder="Name" className="bg-stone-50 dark:bg-stone-800 p-1.5 rounded-lg text-sm w-32 text-stone-900 dark:text-stone-100" value={localContacts[`${contact.id}Name`] || ''} onChange={(e) => handleChange(`${contact.id}Name`, e.target.value)} />
                                                <input placeholder="Tel-Nr." className="bg-stone-50 dark:bg-stone-800 p-1.5 rounded-lg text-sm w-32 text-stone-900 dark:text-stone-100" value={localContacts[`${contact.id}Phone`] || ''} onChange={(e) => handleChange(`${contact.id}Phone`, e.target.value)} />
                                            </div>
                                        ) : (
                                            <p className="font-bold text-stone-700 dark:text-stone-300">{localContacts[`${contact.id}Name`] || '---'}</p>
                                        )}
                                    </div>
                                </div>
                                {!editMode && localContacts[`${contact.id}Phone`] && (<a href={`tel:${localContacts[`${contact.id}Phone`]}`} className="bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-600 transition"><Phone size={20} /></a>)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyOverlay;
