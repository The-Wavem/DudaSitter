import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { db } from './firebase';

const galleryCollection = collection(db, 'gallery');
const testimonialsCollection = collection(db, 'testimonials');
const aboutDocRef = doc(db, 'settings', 'about');
const contactDocRef = doc(db, 'settings', 'contact');

const defaultGallery = [
  {
    id: 'sitter-1',
    service: 'Sitter',
    url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=900&h=900',
  },
  {
    id: 'sitter-2',
    service: 'Sitter',
    url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=900&h=900',
  },
  {
    id: 'walker-1',
    service: 'Walker',
    url: 'https://images.unsplash.com/photo-1422565096762-bdb997a56a43?auto=format&fit=crop&q=80&w=900&h=900',
  },
  {
    id: 'walker-2',
    service: 'Walker',
    url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=900&h=900',
  },
];

const defaultTestimonials = [
  {
    id: 'testimonial-1',
    text: 'Sempre muito cuidadosa e atenciosa. Meu pet ficou tranquilo e feliz durante todo o período.',
    name: 'Mariana S.',
    pet: 'Tutora do Theo',
  },
  {
    id: 'testimonial-2',
    text: 'Passeios organizados e cheios de carinho. Recebi fotos e atualizações o tempo todo.',
    name: 'Carlos M.',
    pet: 'Tutor da Luna',
  },
  {
    id: 'testimonial-3',
    text: 'Profissional extremamente confiável. Recomendo para quem quer segurança e atenção de verdade.',
    name: 'Fernanda A.',
    pet: 'Tutora do Billy',
  },
];

const defaultAboutData = {
  age: '22 anos',
  semester: '5º período',
  bio: 'Eu sempre fui apaixonada por animais e, com o tempo, transformei esse carinho em profissão.\n\nHoje, aos {age}, curso Medicina Veterinária no {semester} e levo comigo a responsabilidade de cuidar de cada pet com atenção, respeito e muito amor.\n\nMinha rotina é guiada pelo compromisso de oferecer segurança, bem-estar e tranquilidade para os tutores e seus companheiros de quatro patas.',
  mission: 'Oferecer um cuidado ético, acolhedor e seguro para que cada pet se sinta protegido e cada tutor tenha tranquilidade na sua ausência.',
};

const defaultContactData = {
  whatsapp: '21972229509',
  instagram: 'dudasitter',
  introText: 'Me conte sobre o seu pet e o serviço que você precisa. Vou responder o mais rápido possível para entendermos juntos a melhor forma de cuidado.',
};

function normalizeGalleryImage(imageDoc, index) {
  const data = imageDoc.data();

  return {
    id: imageDoc.id ?? `gallery-${index}`,
    service: data.service ?? 'Sitter',
    url: data.url ?? '',
  };
}

function normalizeTestimonial(testimonialDoc, index) {
  const data = testimonialDoc.data();

  return {
    id: testimonialDoc.id ?? `testimonial-${index}`,
    text: data.text ?? '',
    name: data.name ?? '',
    pet: data.pet ?? '',
  };
}

export async function getGallery() {
  const snapshot = await getDocs(query(galleryCollection, orderBy('createdAt', 'desc')));
  const items = snapshot.docs.map(normalizeGalleryImage);
  return items.length > 0 ? items : defaultGallery;
}

export async function addGalleryImage(url, service) {
  await addDoc(galleryCollection, {
    url,
    service,
    createdAt: new Date().toISOString(),
  });
}

export async function deleteGalleryImage(id) {
  await deleteDoc(doc(db, 'gallery', id));
}

export async function getTestimonials() {
  const snapshot = await getDocs(query(testimonialsCollection, orderBy('createdAt', 'desc')));
  const items = snapshot.docs.map(normalizeTestimonial);
  return items.length > 0 ? items : defaultTestimonials;
}

export async function addTestimonial(testimonialData) {
  await addDoc(testimonialsCollection, {
    ...testimonialData,
    createdAt: new Date().toISOString(),
  });
}

export async function deleteTestimonial(id) {
  await deleteDoc(doc(db, 'testimonials', id));
}

export async function getAboutData() {
  const snapshot = await getDoc(aboutDocRef);
  if (!snapshot.exists()) {
    return defaultAboutData;
  }

  return {
    ...defaultAboutData,
    ...snapshot.data(),
  };
}

export async function updateAboutData(aboutData) {
  await setDoc(aboutDocRef, aboutData, { merge: true });
}

export async function getContactData() {
  const snapshot = await getDoc(contactDocRef);
  if (!snapshot.exists()) {
    return defaultContactData;
  }

  return {
    ...defaultContactData,
    ...snapshot.data(),
  };
}

export async function updateContactData(contactData) {
  await setDoc(contactDocRef, contactData, { merge: true });
}
