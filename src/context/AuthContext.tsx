import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Bet, EventRSVP, HorseInquiry } from '../types/auth';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  firebaseSignOut, 
  onAuthStateChanged,
  doc,
  collection,
  setDoc,
  getDoc,
  onSnapshot,
  query,
  where,
  handleFirestoreError,
  OperationType,
  FirebaseUser
} from '../firebase/config';

interface SignupParams {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isFirebaseReady: boolean;
  login: (emailOrUsername: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (params: SignupParams) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  loginWithSocial: (provider: 'Google' | 'Apple') => Promise<{ success: boolean; provider: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  updateWallet: (amount: number, type: 'deposit' | 'withdraw') => { success: boolean; error?: string };
  bets: Bet[];
  placeBet: (bet: Omit<Bet, 'id' | 'placedAt' | 'status'>) => { success: boolean; error?: string };
  settleRaceWinner: (raceId: string, winningHorseId: string) => void;
  eventRSVPs: EventRSVP[];
  rsvpEvent: (rsvp: Omit<EventRSVP, 'id' | 'ticketCode' | 'reservedAt'>) => EventRSVP;
  inquiries: HorseInquiry[];
  submitInquiry: (inquiry: Omit<HorseInquiry, 'id' | 'submittedAt' | 'status'>) => HorseInquiry;
  authModalOpen: boolean;
  authModalInitialTab: 'in' | 'up';
  openAuthModal: (tab?: 'in' | 'up') => void;
  closeAuthModal: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial demo accounts with 0 initial balance
const DEFAULT_USERS: Array<User & { password: string }> = [
  {
    id: 'user_abebe',
    name: 'Abebe Bikila',
    email: 'abebe@ethr.et',
    phone: '+251 91 123 4567',
    role: 'owner',
    balance: 0,
    createdAt: '2026-01-15',
    password: 'password123',
    kycVerified: true
  },
  {
    id: 'user_selam',
    name: 'Selamawit Desta',
    email: 'selam@ethr.et',
    phone: '+251 92 888 7766',
    role: 'bettor',
    balance: 0,
    createdAt: '2026-02-01',
    password: 'password123',
    kycVerified: true
  },
  {
    id: 'user_kassahun',
    name: 'Kassahun Tadesse',
    email: 'kassahun@ethr.et',
    phone: '+251 93 456 7890',
    role: 'breeder',
    balance: 0,
    createdAt: '2026-02-14',
    password: 'password123',
    kycVerified: false
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('ethr_session_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [bets, setBets] = useState<Bet[]>(() => {
    try {
      const saved = localStorage.getItem('ethr_user_bets');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'bet_001',
        raceId: 'r1',
        raceName: 'Addis Gold Cup (G1)',
        horseId: 'h1',
        horseName: 'Gold Mane (የወርቅ ጋማ)',
        odds: 2.4,
        stake: 500,
        potentialPayout: 1200,
        status: 'won',
        placedAt: '2026-11-06 14:30'
      },
      {
        id: 'bet_002',
        raceId: 'r2',
        raceName: 'Entoto Highland Sprint',
        horseId: 'h2',
        horseName: 'Selam Empress (ሰላም)',
        odds: 3.8,
        stake: 300,
        potentialPayout: 1140,
        status: 'pending',
        placedAt: '2026-11-08 10:15'
      }
    ];
  });

  const [eventRSVPs, setEventRSVPs] = useState<EventRSVP[]>(() => {
    try {
      const saved = localStorage.getItem('ethr_user_events');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'rsvp_001',
        eventId: 'evt-1',
        eventTitle: 'Addis Ababa Gold Cup Gala & Royal Pavilion',
        eventDate: 'Saturday, Nov 15, 2026',
        location: 'Jan Meda Racecourse, Royal Pavilion',
        tier: 'Royal Paddock VIP Pass',
        guests: 2,
        ticketCode: 'ETHR-JM2026-8841',
        reservedAt: '2026-11-05'
      }
    ];
  });

  const [inquiries, setInquiries] = useState<HorseInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('ethr_user_inquiries');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalInitialTab, setAuthModalInitialTab] = useState<'in' | 'up'>('in');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('ethr_session_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ethr_session_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ethr_user_bets', JSON.stringify(bets));
  }, [bets]);

  useEffect(() => {
    localStorage.setItem('ethr_user_events', JSON.stringify(eventRSVPs));
  }, [eventRSVPs]);

  useEffect(() => {
    localStorage.setItem('ethr_user_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Helper to remove undefined properties before sending to Firestore
  const cleanFirestoreData = (data: Record<string, any>): Record<string, any> => {
    const clean: Record<string, any> = {};
    for (const [k, v] of Object.entries(data)) {
      if (v !== undefined) {
        clean[k] = v;
      }
    }
    return clean;
  };

  // Firebase Auth State Listener & Real-time Firestore Sync
  useEffect(() => {
    let unsubscribeUserDoc: (() => void) | undefined;
    let unsubscribeBets: (() => void) | undefined;
    let unsubscribeRsvps: (() => void) | undefined;
    let unsubscribeInquiries: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      setIsFirebaseReady(true);
      if (fbUser) {
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const userSnap = await getDoc(userDocRef);

          let currentProfile: User;
          if (userSnap.exists()) {
            currentProfile = userSnap.data() as User;
          } else {
            // First time Google login - provision new user document with 0 ETB initial balance
            const initialDoc: Record<string, any> = {
              id: fbUser.uid,
              name: fbUser.displayName || 'ETHR Royal Member',
              email: fbUser.email || `${fbUser.uid}@member.ethr.et`,
              role: 'bettor',
              balance: 0,
              createdAt: new Date().toISOString().split('T')[0],
              kycVerified: true
            };
            if (fbUser.photoURL) {
              initialDoc.avatar = fbUser.photoURL;
            }
            await setDoc(userDocRef, initialDoc);
            currentProfile = initialDoc as User;
          }

          setUser(currentProfile);

          // Real-time Firestore listener for User document
          unsubscribeUserDoc = onSnapshot(userDocRef, (snapshot) => {
            if (snapshot.exists()) {
              setUser(snapshot.data() as User);
            }
          }, (err) => {
            handleFirestoreError(err, OperationType.GET, `users/${fbUser.uid}`);
          });

          // Real-time listener for User Bets subcollection
          const betsColRef = collection(db, 'users', fbUser.uid, 'bets');
          unsubscribeBets = onSnapshot(betsColRef, (snapshot) => {
            const remoteBets: Bet[] = [];
            snapshot.forEach((d) => remoteBets.push(d.data() as Bet));
            if (remoteBets.length > 0) {
              setBets(remoteBets.sort((a, b) => b.placedAt.localeCompare(a.placedAt)));
            }
          }, (err) => {
            handleFirestoreError(err, OperationType.LIST, `users/${fbUser.uid}/bets`);
          });

          // Real-time listener for User RSVPs subcollection
          const rsvpsColRef = collection(db, 'users', fbUser.uid, 'rsvps');
          unsubscribeRsvps = onSnapshot(rsvpsColRef, (snapshot) => {
            const remoteRsvps: EventRSVP[] = [];
            snapshot.forEach((d) => remoteRsvps.push(d.data() as EventRSVP));
            if (remoteRsvps.length > 0) {
              setEventRSVPs(remoteRsvps);
            }
          }, (err) => {
            handleFirestoreError(err, OperationType.LIST, `users/${fbUser.uid}/rsvps`);
          });

          // Real-time listener for User Inquiries
          const inqQuery = query(collection(db, 'inquiries'), where('userId', '==', fbUser.uid));
          unsubscribeInquiries = onSnapshot(inqQuery, (snapshot) => {
            const remoteInqs: HorseInquiry[] = [];
            snapshot.forEach((d) => remoteInqs.push(d.data() as HorseInquiry));
            if (remoteInqs.length > 0) {
              setInquiries(remoteInqs.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)));
            }
          }, (err) => {
            handleFirestoreError(err, OperationType.LIST, 'inquiries');
          });

        } catch (error) {
          console.error('Error hydrating Firebase user:', error);
        }
      } else {
        if (unsubscribeUserDoc) unsubscribeUserDoc();
        if (unsubscribeBets) unsubscribeBets();
        if (unsubscribeRsvps) unsubscribeRsvps();
        if (unsubscribeInquiries) unsubscribeInquiries();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUserDoc) unsubscribeUserDoc();
      if (unsubscribeBets) unsubscribeBets();
      if (unsubscribeRsvps) unsubscribeRsvps();
      if (unsubscribeInquiries) unsubscribeInquiries();
    };
  }, []);

  const openAuthModal = (tab: 'in' | 'up' = 'in') => {
    setAuthModalInitialTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const getUsersDatabase = (): Array<User & { password: string }> => {
    try {
      const saved = localStorage.getItem('ethr_registered_users');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_USERS;
  };

  const saveUsersDatabase = (usersList: Array<User & { password: string }>) => {
    localStorage.setItem('ethr_registered_users', JSON.stringify(usersList));
  };

  // Sign In with email/password (or demo accounts)
  const login = async (emailOrUsername: string, password: string, rememberMe: boolean = true) => {
    await new Promise((res) => setTimeout(res, 400));
    const cleanInput = emailOrUsername.trim().toLowerCase();
    const dbUsers = getUsersDatabase();

    const matched = dbUsers.find(
      (u) =>
        (u.email.toLowerCase() === cleanInput || u.name.toLowerCase() === cleanInput) &&
        u.password === password
    );

    if (matched) {
      const { password: _, ...sessionUser } = matched;
      setUser(sessionUser);

      // Attempt to mirror demo user profile into Firestore for persistent cloud storage
      try {
        const userDocRef = doc(db, 'users', sessionUser.id);
        await setDoc(userDocRef, sessionUser, { merge: true });
      } catch (err) {
        // Fallback gracefully if offline
      }

      if (rememberMe) {
        localStorage.setItem('ethr_remember_email', sessionUser.email);
      } else {
        localStorage.removeItem('ethr_remember_email');
      }

      closeAuthModal();
      showToast(`Welcome back, ${sessionUser.name}!`);
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password. You can also sign in instantly with Google or use a 1-Click Demo account.' };
  };

  // Sign Up with email/password
  const signup = async (params: SignupParams) => {
    await new Promise((res) => setTimeout(res, 500));
    const dbUsers = getUsersDatabase();

    const cleanEmail = params.email.trim().toLowerCase();
    const exists = dbUsers.some((u) => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return { success: false, error: 'An account with this email address already exists. Please sign in or use Google.' };
    }

    const newUser: User & { password: string } = {
      id: `user_${Date.now()}`,
      name: params.name.trim(),
      email: cleanEmail,
      phone: params.phone?.trim() || '+251 90 000 0000',
      role: params.role,
      balance: 0,
      createdAt: new Date().toISOString().split('T')[0],
      password: params.password,
      kycVerified: false
    };

    const updatedDb = [...dbUsers, newUser];
    saveUsersDatabase(updatedDb);

    const { password: _, ...sessionUser } = newUser;
    setUser(sessionUser);

    // Save to Firestore
    try {
      const userDocRef = doc(db, 'users', sessionUser.id);
      await setDoc(userDocRef, sessionUser);
    } catch (err) {
      // Local fallback
    }

    closeAuthModal();
    showToast(`Welcome to ETHR, ${sessionUser.name}! Your royal paddock account is active.`);
    return { success: true };
  };

  // Real Google Authentication via Firebase
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;

      const userDocRef = doc(db, 'users', fbUser.uid);
      const userSnap = await getDoc(userDocRef);

      let profile: User;
      if (userSnap.exists()) {
        profile = userSnap.data() as User;
      } else {
        const initialDoc: Record<string, any> = {
          id: fbUser.uid,
          name: fbUser.displayName || 'ETHR Royal Member',
          email: fbUser.email || `${fbUser.uid}@member.ethr.et`,
          role: 'bettor',
          balance: 0,
          createdAt: new Date().toISOString().split('T')[0],
          kycVerified: true
        };
        if (fbUser.photoURL) {
          initialDoc.avatar = fbUser.photoURL;
        }
        await setDoc(userDocRef, initialDoc);
        profile = initialDoc as User;
      }

      setUser(profile);
      closeAuthModal();
      showToast(`Welcome to the Royal Paddock, ${profile.name}! Signed in via Google.`);
      return { success: true };
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      const msg = error.code === 'auth/popup-closed-by-user' 
        ? 'Sign-in window closed before completing.' 
        : error.message || 'Google sign-in was cancelled or encountered an issue.';
      showToast(msg);
      return { success: false, error: msg };
    }
  };

  // Social SSO handler (Routes 'Google' to real Firebase Google Auth)
  const loginWithSocial = async (provider: 'Google' | 'Apple') => {
    if (provider === 'Google') {
      const res = await loginWithGoogle();
      return { success: res.success, provider: 'Google' };
    }

    // Simulated Apple ID for iOS members
    await new Promise((res) => setTimeout(res, 500));
    const socialUser: User = {
      id: `sso_apple_${Date.now()}`,
      name: 'Almaz Tefera',
      email: 'almaz.tefera@icloud.com',
      role: 'bettor',
      balance: 0,
      createdAt: new Date().toISOString().split('T')[0],
      kycVerified: true
    };

    setUser(socialUser);
    closeAuthModal();
    showToast(`Signed in successfully via Apple ID! Welcome Almaz.`);
    return { success: true, provider: 'Apple' };
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch {}
    setUser(null);
    showToast('Signed out of Ethiopian Horse Racing. Imperial paddock session closed.');
  };

  const resetPassword = async (email: string) => {
    await new Promise((res) => setTimeout(res, 500));
    return {
      success: true,
      message: `A secure password reset link has been dispatched to ${email}. Check your inbox or spam folder.`
    };
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);

    // Sync to Firestore if authenticated with Firebase
    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, 'users', user.id);
        await setDoc(userDocRef, cleanFirestoreData(updated), { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${user.id}`);
      }
    }

    // Also update in local database
    const dbUsers = getUsersDatabase();
    const idx = dbUsers.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      dbUsers[idx] = { ...dbUsers[idx], ...updates };
      saveUsersDatabase(dbUsers);
    }
    showToast('Member profile successfully updated.');
  };

  const updateWallet = (amount: number, type: 'deposit' | 'withdraw') => {
    if (!user) return { success: false, error: 'Must be signed in to manage wallet.' };
    if (type === 'withdraw' && user.balance < amount) {
      return { success: false, error: 'Insufficient wallet balance.' };
    }

    const newBalance = type === 'deposit' ? user.balance + amount : user.balance - amount;
    updateProfile({ balance: newBalance });
    showToast(`${type === 'deposit' ? 'Deposited' : 'Withdrew'} ${amount.toLocaleString()} ETB in official racing credit.`);
    return { success: true };
  };

  const placeBet = (betData: Omit<Bet, 'id' | 'placedAt' | 'status'>) => {
    if (!user) {
      openAuthModal('in');
      return { success: false, error: 'Please sign in to place a race wager.' };
    }
    if (user.balance < betData.stake) {
      return { success: false, error: `Insufficient funds. Your current balance is ${user.balance} ETB.` };
    }

    const newBalance = user.balance - betData.stake;
    const betId = `bet_${Date.now()}`;
    const newBet: Bet = {
      ...betData,
      id: betId,
      status: 'pending',
      placedAt: new Date().toLocaleString('en-US', { hour12: false })
    };

    updateProfile({ balance: newBalance });
    setBets((prev) => [newBet, ...prev]);

    // Persist Bet to Firestore under /users/{userId}/bets/{betId}
    if (auth.currentUser) {
      const betDocRef = doc(db, 'users', user.id, 'bets', betId);
      setDoc(betDocRef, {
        ...newBet,
        userId: user.id
      }).catch((err) => {
        handleFirestoreError(err, OperationType.CREATE, `users/${user.id}/bets/${betId}`);
      });
    }

    showToast(`Wager confirmed on ${betData.horseName}! Stake: ${betData.stake} ETB @ ${betData.odds}x`);
    return { success: true };
  };

  const settleRaceWinner = (raceId: string, winningHorseId: string) => {
    setBets((prev) =>
      prev.map((bet) => {
        if (bet.raceId === raceId && bet.status === 'pending') {
          const won = bet.horseId === winningHorseId;
          if (won && user) {
            updateWallet(bet.potentialPayout, 'deposit');
          }

          const updatedBet: Bet = {
            ...bet,
            status: won ? 'won' : 'lost'
          };

          // Update in Firestore
          if (auth.currentUser && user) {
            const betDocRef = doc(db, 'users', user.id, 'bets', bet.id);
            setDoc(betDocRef, { status: updatedBet.status }, { merge: true }).catch((err) => {
              handleFirestoreError(err, OperationType.UPDATE, `users/${user.id}/bets/${bet.id}`);
            });
          }

          return updatedBet;
        }
        return bet;
      })
    );
  };

  const rsvpEvent = (rsvpData: Omit<EventRSVP, 'id' | 'ticketCode' | 'reservedAt'>) => {
    if (!user) {
      openAuthModal('in');
      throw new Error('Must be signed in to reserve an event pass');
    }

    const code = `ETHR-TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    const rsvpId = `rsvp_${Date.now()}`;
    const newRSVP: EventRSVP = {
      ...rsvpData,
      id: rsvpId,
      ticketCode: code,
      reservedAt: new Date().toISOString().split('T')[0]
    };

    setEventRSVPs((prev) => [newRSVP, ...prev]);

    // Persist RSVP to Firestore under /users/{userId}/rsvps/{rsvpId}
    if (auth.currentUser) {
      const rsvpDocRef = doc(db, 'users', user.id, 'rsvps', rsvpId);
      setDoc(rsvpDocRef, {
        ...newRSVP,
        userId: user.id
      }).catch((err) => {
        handleFirestoreError(err, OperationType.CREATE, `users/${user.id}/rsvps/${rsvpId}`);
      });
    }

    showToast(`VIP Pass confirmed for ${rsvpData.eventTitle}! Pass Code: ${code}`);
    return newRSVP;
  };

  const submitInquiry = (inquiryData: Omit<HorseInquiry, 'id' | 'submittedAt' | 'status'>) => {
    const inquiryId = `inq_${Date.now()}`;
    const newInquiry: HorseInquiry = {
      ...inquiryData,
      id: inquiryId,
      submittedAt: new Date().toLocaleString(),
      status: 'Received'
    };

    setInquiries((prev) => [newInquiry, ...prev]);

    // Persist to Firestore /inquiries/{inquiryId}
    if (auth.currentUser && user) {
      const inqDocRef = doc(db, 'inquiries', inquiryId);
      const dataToSave = cleanFirestoreData({
        ...newInquiry,
        userId: user.id,
        userName: user.name,
        userEmail: user.email
      });
      setDoc(inqDocRef, dataToSave).catch((err) => {
        handleFirestoreError(err, OperationType.CREATE, `inquiries/${inquiryId}`);
      });
    }

    showToast(`Official inquiry for ${inquiryData.horseName} submitted. Registrar will review.`);
    return newInquiry;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isFirebaseReady,
        login,
        signup,
        loginWithGoogle,
        loginWithSocial,
        logout,
        resetPassword,
        updateProfile,
        updateWallet,
        bets,
        placeBet,
        settleRaceWinner,
        eventRSVPs,
        rsvpEvent,
        inquiries,
        submitInquiry,
        authModalOpen,
        authModalInitialTab,
        openAuthModal,
        closeAuthModal,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
