const galleryKey = 'dudaSitterGallery';

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

export function getGallery() {
  if (typeof window === 'undefined') {
    return defaultGallery;
  }

  try {
    const storedGallery = window.localStorage.getItem(galleryKey);
    if (!storedGallery) {
      return defaultGallery;
    }

    const parsedGallery = JSON.parse(storedGallery);
    return Array.isArray(parsedGallery) ? parsedGallery : defaultGallery;
  } catch {
    return defaultGallery;
  }
}

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

export function saveMessage(formData) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const nextMessages = getMessages();

    nextMessages.unshift({
      id: `message-${Date.now()}`,
      name: formData.name ?? '',
      petName: formData.petName ?? '',
      service: formData.service ?? '',
      message: formData.message ?? '',
      status: 'new',
      date: new Date().toISOString(),
    });

    window.localStorage.setItem(messagesKey, JSON.stringify(nextMessages));
  } catch {
    window.localStorage.setItem(
      messagesKey,
      JSON.stringify([
        {
          id: `message-${Date.now()}`,
          name: formData.name ?? '',
          petName: formData.petName ?? '',
          service: formData.service ?? '',
          message: formData.message ?? '',
          status: 'new',
          date: new Date().toISOString(),
        },
      ]),
    );
  }
}

const messagesKey = 'duda_messages';
const appointmentsKey = 'duda_appointments';
const testimonialsKey = 'duda_testimonials';
const aboutKey = 'duda_about_data';
const contactDataKey = 'duda_contact_data';

const defaultAppointmentList = [];

function readJson(key, fallbackValue) {
  if (typeof window === 'undefined') {
    return fallbackValue;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) return fallbackValue;
    const parsedValue = JSON.parse(rawValue);
    return parsedValue ?? fallbackValue;
  } catch {
    return fallbackValue;
  }
}

function writeJson(key, value) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getMessages() {
  return readJson(messagesKey, []).map((message, index) => ({
    id: message.id ?? `message-${index}`,
    name: message.name ?? '',
    petName: message.petName ?? '',
    service: message.service ?? '',
    message: message.message ?? '',
    status: message.status ?? 'new',
    date: message.date ?? message.createdAt ?? new Date().toISOString(),
  }));
}

export function markAsRead(id) {
  writeJson(messagesKey, getMessages().map((message) => (message.id === id ? { ...message, status: 'read' } : message)));
}

export function deleteMessage(id) {
  writeJson(messagesKey, getMessages().filter((message) => message.id !== id));
}

export function getAppointments() {
  return readJson(appointmentsKey, defaultAppointmentList).map((appointment, index) => ({
    id: appointment.id ?? `appointment-${index}`,
    tutorName: appointment.tutorName ?? '',
    petName: appointment.petName ?? '',
    service: appointment.service ?? '',
    date: appointment.date ?? '',
    startTime: appointment.startTime ?? '',
    endTime: appointment.endTime ?? '',
    notes: appointment.notes ?? '',
    status: appointment.status ?? 'scheduled',
  }));
}

export function saveAppointment(appointmentData) {
  writeJson(appointmentsKey, [
    ...getAppointments(),
    {
      id: `appointment-${Date.now()}`,
      ...appointmentData,
      status: 'scheduled',
    },
  ]);
}

export function updateAppointmentStatus(id, status) {
  writeJson(
    appointmentsKey,
    getAppointments().map((appointment) => (appointment.id === id ? { ...appointment, status } : appointment)),
  );
}

export function addGalleryImage(url, service) {
  writeJson(galleryKey, [
    ...getGallery(),
    {
      id: `gallery-${Date.now()}`,
      url,
      service,
    },
  ]);
}

export function deleteGalleryImage(id) {
  writeJson(galleryKey, getGallery().filter((image) => image.id !== id));
}

export function getTestimonials() {
  return readJson(testimonialsKey, defaultTestimonials).map((testimonial, index) => ({
    id: testimonial.id ?? `testimonial-${index}`,
    text: testimonial.text ?? '',
    name: testimonial.name ?? '',
    pet: testimonial.pet ?? '',
  }));
}

export function addTestimonial(testimonialData) {
  writeJson(testimonialsKey, [
    ...getTestimonials(),
    {
      id: `testimonial-${Date.now()}`,
      ...testimonialData,
    },
  ]);
}

export function deleteTestimonial(id) {
  writeJson(testimonialsKey, getTestimonials().filter((testimonial) => testimonial.id !== id));
}

export function getAboutData() {
  return readJson(aboutKey, defaultAboutData);
}

export function updateAboutData(aboutData) {
  writeJson(aboutKey, aboutData);
}

export function getContactData() {
  return readJson(contactDataKey, defaultContactData);
}

export function updateContactData(contactData) {
  writeJson(contactDataKey, contactData);
}