import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

const messagesCollection = collection(db, 'messages');

function notifyMessagesUpdated() {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new Event('duda-messages-updated'));
}

function normalizeMessage(messageDoc, index) {
  const data = messageDoc.data();

  return {
    id: messageDoc.id ?? `message-${index}`,
    name: data.name ?? '',
    petName: data.petName ?? '',
    service: data.service ?? '',
    message: data.message ?? '',
    status: data.status ?? 'new',
    date: data.date ?? data.createdAt ?? new Date().toISOString(),
  };
}

export async function getMessages() {
  const snapshot = await getDocs(query(messagesCollection, orderBy('date', 'desc')));
  return snapshot.docs.map(normalizeMessage);
}

export async function saveMessage(formData) {
  await addDoc(messagesCollection, {
    name: formData.name ?? '',
    petName: formData.petName ?? '',
    service: formData.service ?? '',
    message: formData.message ?? '',
    status: 'new',
    date: new Date().toISOString(),
  });

  notifyMessagesUpdated();
}

export async function markAsRead(id) {
  await updateDoc(doc(db, 'messages', id), { status: 'read' });
  notifyMessagesUpdated();
}

export async function deleteMessage(id) {
  await deleteDoc(doc(db, 'messages', id));
  notifyMessagesUpdated();
}
