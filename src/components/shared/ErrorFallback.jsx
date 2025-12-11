import React from 'react';
import { RefreshCw, Trash2, Home } from 'lucide-react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {

    // Safety clear function
    const hardReset = () => {
        if (window.confirm("Achtung: Das löscht deine lokalen App-Daten, um den Fehler zu beheben. Du beginnst von vorne.")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-stone-900 w-full max-w-md p-8 rounded-[40px] shadow-xl text-center border-4 border-stone-200 dark:border-stone-800">
                <div className="mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-6">
                    <img src="/mascot/papa_sad.png" alt="Papa Sad" className="w-full h-full object-contain" />
                </div>

                <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-2">Ups, Papa-Panne!</h2>
                <p className="text-stone-500 dark:text-stone-400 mb-6">
                    Da ist uns wohl die Windel geplatzt. Ein unerwarteter Fehler ist aufgetreten.
                </p>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl mb-6 text-left overflow-hidden">
                        <p className="text-[10px] text-red-500 font-mono break-all">
                            {error.message}
                        </p>
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
                    >
                        <RefreshCw size={18} /> Neustart versuchen
                    </button>

                    <button
                        onClick={hardReset}
                        className="w-full bg-transparent border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-stone-50 dark:hover:bg-stone-800 transition"
                    >
                        <Trash2 size={18} /> App zurücksetzen
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800">
                    <p className="text-xs text-stone-400">
                        Keine Sorge, das beste Feature an Kindern (und Apps) ist: Sie verzeihen Fehler.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorFallback;
