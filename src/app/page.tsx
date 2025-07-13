'use client';

import { useState, useEffect, useRef } from 'react';
import { firestore } from '@/utils/firebaseConfig';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  updateDoc,
  addDoc,
} from 'firebase/firestore';

interface Envelope {
  id: string;
  name: string;
  balance: number;
}

export default function HomePage() {
  const [income, setIncome] = useState(0);
  const [envelopes, setEnvelopes] = useState<Envelope[]>([]);
  const [newIncome, setNewIncome] = useState('');
  const [newEnvelope, setNewEnvelope] = useState('');

  const keys = useRef<string[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [greeting, setGreeting] = useState('');
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening');
    setEmoji(hour < 12 ? '🌞' : hour < 18 ? '☀️' : '🌙');

    const onKey = (e: KeyboardEvent) => {
      keys.current.push(e.key.toLowerCase());
      if (keys.current.length > 5) keys.current.shift();
      if (keys.current.join('') === 'admin') {
        window.location.href = '/login-secret-login-for-admins97F4B2NXQ';
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    loadIncome();
    loadEnvelopes();
  }, []);

  const loadIncome = async () => {
    const docRef = doc(firestore, 'income', 'total');
    const snap = await getDoc(docRef);
    if (snap.exists()) setIncome(snap.data().amount);
  };

  const loadEnvelopes = async () => {
    const snap = await getDocs(collection(firestore, 'envelopes'));
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Envelope[];
    setEnvelopes(data);
  };

  const handleAddIncome = async () => {
    const amount = parseFloat(newIncome);
    if (isNaN(amount) || amount <= 0) return;
    const newTotal = income + amount;
    await setDoc(doc(firestore, 'income', 'total'), { amount: newTotal });
    setIncome(newTotal);
    setNewIncome('');
  };

  const handleCreateEnvelope = async () => {
    if (!newEnvelope.trim()) return;
    const ref = await addDoc(collection(firestore, 'envelopes'), {
      name: newEnvelope.trim(),
      balance: 0,
    });
    setEnvelopes([...envelopes, { id: ref.id, name: newEnvelope.trim(), balance: 0 }]);
    setNewEnvelope('');
  };

  const handleTransfer = async (env: Envelope, amt: number) => {
    if (amt > income) return;
    const newIncome = income - amt;
    const newBalance = env.balance + amt;
    await Promise.all([
      updateDoc(doc(firestore, 'income', 'total'), { amount: newIncome }),
      updateDoc(doc(firestore, 'envelopes', env.id), { balance: newBalance }),
    ]);
    setIncome(newIncome);
    setEnvelopes(envelopes.map(e => (e.id === env.id ? { ...e, balance: newBalance } : e)));
  };

  const handleSpend = async (env: Envelope, amt: number) => {
    if (amt > env.balance) return;
    const newBalance = env.balance - amt;
    await updateDoc(doc(firestore, 'envelopes', env.id), { balance: newBalance });
    setEnvelopes(envelopes.map(e => (e.id === env.id ? { ...e, balance: newBalance } : e)));
  };

  const longPress = {
    onTouchStart: () => setTouchStart(Date.now()),
    onTouchEnd: () => {
      if (touchStart && Date.now() - touchStart > 600) {
        window.location.href = '/login-secret-login-for-admins97F4B2NXQ';
      }
      setTouchStart(null);
    },
  };

  return (
    <>
      {/* HERO */}
      <section
        {...longPress}
        className="flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 bg-gradient-to-br from-[#3B82F6] to-[#0F172A] text-white"
      >
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight max-w-3xl mb-4 drop-shadow-lg">
          {greeting} {emoji}, welcome to Quickstack!
        </h1>
        <p className="mt-2 max-w-xl text-lg text-white/80 mb-6">
          A fullstack starting point built with precision, speed, and Firebase.
        </p>
        <div className="inline-flex items-center gap-2 bg-white text-[#0F172A] rounded-full px-7 py-3 font-semibold">
          ⚡ Powered by Firebase, Tailwind, and UploadThing
        </div>
      </section>

      {/* LIVE APP AREA */}
      <main className="p-6 max-w-3xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold">💸 Envelope Budgeting App</h2>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-lg font-semibold">Unallocated Income: ${income.toFixed(2)}</p>
          <div className="mt-2 flex gap-2">
            <input
              value={newIncome}
              onChange={e => setNewIncome(e.target.value)}
              type="number"
              placeholder="Amount"
              className="border px-2 py-1 rounded w-40"
            />
            <button onClick={handleAddIncome} className="bg-green-600 text-white px-4 py-1 rounded">
              + Add Income
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="font-medium">Create New Envelope</p>
          <div className="mt-2 flex gap-2">
            <input
              value={newEnvelope}
              onChange={e => setNewEnvelope(e.target.value)}
              placeholder="Envelope Name"
              className="border px-2 py-1 rounded w-64"
            />
            <button onClick={handleCreateEnvelope} className="bg-blue-600 text-white px-4 py-1 rounded">
              + Create
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">📂 Envelopes</h3>
          {envelopes.length === 0 ? (
            <p className="italic text-gray-500">No envelopes yet.</p>
          ) : (
            <div className="grid gap-4">
              {envelopes.map(env => (
                <div key={env.id} className="bg-white p-4 rounded shadow">
                  <h4 className="text-lg font-bold">{env.name}</h4>
                  <p className="mb-2">Balance: ${env.balance.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const amt = parseFloat(prompt('Transfer amount to envelope?') || '0');
                        if (!isNaN(amt) && amt > 0) handleTransfer(env, amt);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                    >
                      ➕ Transfer
                    </button>
                    <button
                      onClick={() => {
                        const amt = parseFloat(prompt('Spend amount from envelope?') || '0');
                        if (!isNaN(amt) && amt > 0) handleSpend(env, amt);
                      }}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      💳 Spend
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
