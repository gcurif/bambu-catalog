import { Item } from './../model/schema';
// lib/firebase.ts
import { FilterSchemaItem, User } from "@/model/schema";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  onAuthStateChanged,
  signInAnonymously,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";
import { verifyPassword } from "./crypt";

const firebaseConfig = {
  apiKey: "AIzaSyD0XeO-uTg2bVnfXVqvOCq9yfhVAdNGCn4",
  authDomain: "bambu-catalog.firebaseapp.com",
  projectId: "bambu-catalog",
  storageBucket: "bambu-catalog.firebasestorage.app",
  messagingSenderId: "1032706899935",
  appId: "1:1032706899935:web:0fe7e494f407b68b660e6a",
};

// App & services
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// En RN usa initializeAuth con persistencia
const auth =
  getApps().length &&
  (() => {
    try {
      return getAuth(app);
    } catch {
      return null;
    }
  })()
    ? getAuth(app)
    : initializeAuth(app);

export const db = getFirestore(app);

// ---- Memoized auth init (una sola vez) ----
let authReadyPromise: Promise<void> | null = null;

async function ensureAuthOnce(): Promise<void> {
  if (authReadyPromise) return authReadyPromise;

  authReadyPromise = new Promise<void>((resolve, reject) => {
    const unsub = onAuthStateChanged(
      auth,
      async (user) => {
        try {
          if (!user) {
            await signInAnonymously(auth);
          }
          unsub();
          resolve();
        } catch (e) {
          unsub();
          reject(e);
        }
      },
      (err) => {
        unsub();
        reject(err);
      }
    );
  });

  return authReadyPromise;
}

function withAuth<Args extends any[], R>(fn: (...args: Args) => Promise<R>) {
  return async (...args: Args): Promise<R> => {
    await ensureAuthOnce();
    return fn(...args);
  };
}

export const getSchema = withAuth(async (): Promise<FilterSchemaItem[]> => {
  const snap = await getDocs(collection(db, "schemas"));
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() } as FilterSchemaItem))
    .sort((a, b) => a.order - b.order);
});

export async function getSchemaItemById(id: string): Promise<FilterSchemaItem | null> {
  const docRef = doc(db, "schemas", id);
  const snap = await getDoc(docRef);

  if (!snap.exists()) return null;

  return { id: snap.id, ...snap.data() } as FilterSchemaItem;
}




export const getUser = withAuth(async (user): Promise<User[]> => {
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("username", "==", user), limit(1));

  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as User);
});

export const getUserByUsrNameAndPass = withAuth(
  async (username: string, password: string) => {
    const users: User[] = await getUser(username);
    if (!users || users.length === 0) return null;
    const valid = await verifyPassword(password, users[0].password);
    if (!valid) return null;
    return users[0];
  }
);

export const addItem = withAuth(
  async (item: Item) => {
    console.log("Adding item:", item);
    const docRef = await addDoc(collection(db, "items"), item);
    return docRef.id;
  }
);

export async function findAllItems() : Promise<any[]> {
  const snap = await getDocs(collection(db, "items"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}


export async function findItemById(id: string): Promise<Item | null> {
  const docRef = doc(db, "items", id);
  const snap = await getDoc(docRef);

  if (!snap.exists()) return null;

  return { id: snap.id, ...snap.data() } as Item;
}
