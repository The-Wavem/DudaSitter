import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

const appointmentsCollection = collection(db, 'appointments');

function normalizeAppointment(appointmentDoc, index) {
  const data = appointmentDoc.data();

  return {
    id: appointmentDoc.id ?? `appointment-${index}`,
    tutorName: data.tutorName ?? '',
    petName: data.petName ?? '',
    service: data.service ?? '',
    date: data.date ?? '',
    startTime: data.startTime ?? '',
    endTime: data.endTime ?? '',
    notes: data.notes ?? '',
    status: data.status ?? 'scheduled',
  };
}

export async function getAppointments() {
  const snapshot = await getDocs(query(appointmentsCollection, orderBy('date', 'desc')));
  return snapshot.docs.map(normalizeAppointment);
}

export async function saveAppointment(appointmentData) {
  await addDoc(appointmentsCollection, {
    ...appointmentData,
    status: 'scheduled',
  });
}

export async function updateAppointmentStatus(id, status) {
  await updateDoc(doc(db, 'appointments', id), { status });
}
