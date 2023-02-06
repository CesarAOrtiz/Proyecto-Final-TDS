import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  sendEmailVerification,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import app from "./index";

const auth = getAuth(app);

export async function logout() {
  return await signOut(auth);
}

export async function login(email, password) {
  await logout();
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signup(email, password) {
  const currentUser = auth.currentUser;
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  // await sendEmailVerification(user);
  await auth.updateCurrentUser(currentUser);
  return user;
}

export async function sendVerificationEmail(user) {
  return await sendEmailVerification(user);
}

export async function resetPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}

export function onAuth(callback, onError, onCompleted) {
  return onAuthStateChanged(auth, callback, onError, onCompleted);
}

export async function setEmail(email) {
  return await updateEmail(auth.currentUser, email);
}

export async function setPassword(password) {
  return await updatePassword(auth.currentUser, password);
}

export async function reauthenticate(password) {
  const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
  return await reauthenticateWithCredential(auth.currentUser, credential);
}
