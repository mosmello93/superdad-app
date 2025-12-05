import React, { useState } from 'react';
import { X, MapPin, Navigation, Phone, Activity } from 'lucide-react';

const EmergencyOverlay = ({ contacts, updateContact, closeEmergency }) => {
    const [editMode, setEditMode] = useState(false);
    const [localContacts, setLocalContacts] = useState(contacts);
    const handleSave = () => { updateContact(localContacts); setEditMode(false); };
    const handleChange = (field, value) => { setLocalContacts({ ...localContacts, [field]: value }); };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" onClick={closeEmergency}></div>
            <div className="bg-[#F5F5F0] w-full max-w-md h-[85vh] sm:h-[auto] rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300 relative">
                {/* Header */}
                <div className="bg-white p-6 pb-4 border-b border-stone-100 flex justify-between items-center sticky top-0 z-10">
                    <div><h2 className="text-2xl font-bold text-stone-800">Notfall-Infos</h2><p className="text-stone-500 text-xs">Alles griffbereit wenn's losgeht.</p></div>
                    <button onClick={closeEmergency} className="bg-stone-100 p-2 rounded-full hover:bg-stone-200 transition"><X size={20} className="text-stone-600" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Edit Button */}
                    <div className="flex justify-end">
                        <button onClick={editMode ? handleSave : () => setEditMode(true)} className={`px-4 py-2 rounded-xl text-xs font-bold transition ${editMode ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-600'}`}>
                            {editMode ? 'Speichern' : 'Bearbeiten'}
                        </button>
                    </div>

                    {/* Clinic Section */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100">
                        <div className="flex items-center mb-4"><MapPin size={18} className="text-rose-500 mr-2" /><h3 className="font-bold text-stone-700">Die Klinik</h3></div>
                        {editMode ? (
                            <div className="space-y-3">
                                <input placeholder="Name der Klinik" className="w-full bg-stone-50 p-3 rounded-xl text-sm" value={localContacts.clinicName || ''} onChange={(e) => handleChange('clinicName', e.target.value)} />
                                <input placeholder="Adresse für Navi" className="w-full bg-stone-50 p-3 rounded-xl text-sm" value={localContacts.clinicAddress || ''} onChange={(e) => handleChange('clinicAddress', e.target.value)} />
                            </div>
                        ) : (
                            <div>
                                <p className="font-bold text-lg text-stone-800">{localContacts.clinicName || 'Klinik noch nicht eingetragen'}</p>
                                <p className="text-sm text-stone-500 mb-4">{localContacts.clinicAddress || 'Adresse fehlt'}</p>
                                {localContacts.clinicAddress && (<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(localContacts.clinicAddress)}`} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition"><Navigation size={16} className="mr-2" />Navigation starten</a>)}
                            </div>
                        )}
                    </div>

                    {/* Important Numbers Section - RE-ADDED */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider ml-1">Wichtige Nummern</h3>
                        {[{ id: 'midwife', icon: Phone, label: 'Hebamme', color: 'emerald' }, { id: 'doctor', icon: Activity, label: 'Kreißsaal / Arzt', color: 'indigo' }, { id: 'taxi', icon: Phone, label: 'Taxi / Support', color: 'amber' }].map(contact => (
                            <div key={contact.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className={`bg-${contact.color}-100 p-2 rounded-full mr-3 text-${contact.color}-600`}><contact.icon size={18} /></div>
                                    <div>
                                        <p className="text-xs text-stone-400 font-bold uppercase">{contact.label}</p>
                                        {editMode ? (
                                            <div className="flex flex-col space-y-1 mt-1">
                                                <input placeholder="Name" className="bg-stone-50 p-1.5 rounded-lg text-sm w-32" value={localContacts[`${contact.id}Name`] || ''} onChange={(e) => handleChange(`${contact.id}Name`, e.target.value)} />
                                                <input placeholder="Tel-Nr." className="bg-stone-50 p-1.5 rounded-lg text-sm w-32" value={localContacts[`${contact.id}Phone`] || ''} onChange={(e) => handleChange(`${contact.id}Phone`, e.target.value)} />
                                            </div>
                                        ) : (
                                            <p className="font-bold text-stone-700">{localContacts[`${contact.id}Name`] || '---'}</p>
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
