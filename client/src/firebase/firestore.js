import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import app from "./index";

const db = getFirestore(app);
export const FILES = "files";
export const FOLDERS = "folders";
export const MAIN_FOLDER = "root";
export const USERS = "users";

/**
 * Add a new document to the collection
 * @param {string} collectionName The name of the collection
 * @param {object} data The data to be added
 * @returns { Promise<DocumentReference<any>>} The document reference
 */
export const add = async (collectionName, data) => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef;
};

/**
 *
 * @param {string} collectionName The name of the collection
 * @param {string} docId The document id
 * @returns {Promise<DocumentSnapshot<DocumentData>>} The document snapshot
 */
export const getDocById = async (collectionName, docId) => {
  const docRef = await getDoc(doc(db, collectionName, docId));
  return docRef;
};

/**
 *  Get all documents from a collection
 *  @param {string} collectionName The name of the collection
 *  @param {string} name The name of the field to be queried
 *  @returns {Promise<QuerySnapshot<DocumentData>>} The query snapshot
 */
export const getByName = async (collectionName, name) => {
  const q = query(collection(db, collectionName), where("name", "==", name));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs;
};

/**
 * Add a new document to the collection
 * @param {string} collectionName The name of the collection
 * @param {string} docId The id of the document
 * @param {object} data The data to be added
 * @returns { Promise<DocumentReference<any>>} The document reference
 */
export const addWithId = async (collectionName, docId, data) => {
  const exist = await getDocById(collectionName, docId);
  if (exist.exists()) {
    throw new Error("firebase/already-exists");
  }
  const docRef = await setDoc(
    doc(db, collectionName, docId),
    {
      ...data,
      createdAt: serverTimestamp(),
    },
    { merge: false },
  );
  return docRef;
};

/**
 * Add a new document to the collection
 * @param {string} collectionName The name of the collection
 * @param {string} id The id of the document
 * @param {object} data The data to be added
 * @returns { Promise<DocumentReference<any>>} The document reference
 */
export const update = async (collectionName, id, data) => {
  return await setDoc(
    doc(db, collectionName, id),
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
};

/**
 * Delete a document from the collection
 * @param {string} collectionName The name of the collection
 * @param {string} id The id of the document
 * @returns {Promise<void>} A promise that resolves when the document is deleted
 */
export const deleteById = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};

// TODO buscar una forma elegante de pasar los datos del query
export const getOnSnapshot = (collectionName, queryData, snapshotFunction) => {
  const { type, from, to } = queryData;
  let constraints = [orderBy("createdAt", "desc")];
  constraints = from ? [...constraints, where("createdAt", ">=", new Date(from))] : constraints;
  constraints = to ? [...constraints, where("createdAt", "<=", new Date(to))] : constraints;
  constraints = type ? [...constraints, where("type", "==", type)] : constraints;

  const q = query(collection(db, collectionName), ...constraints);
  return onSnapshot(q, snapshotFunction);
};

export const onSnap = (collectionName, snapshotFunction) => {
  const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
  return onSnapshot(q, snapshotFunction);
};

export const onSnapDoc = (collectionName, docId, snapshotFunction) => {
  const q = doc(db, collectionName, docId);
  return onSnapshot(q, snapshotFunction);
};
