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

export function getTestimonials() {
  return defaultTestimonials;
}

const defaultAboutData = {
  age: '22 anos',
  semester: '5º período',
  bio: 'Eu sempre fui apaixonada por animais e, com o tempo, transformei esse carinho em profissão.\n\nHoje, aos {age}, curso Medicina Veterinária no {semester} e levo comigo a responsabilidade de cuidar de cada pet com atenção, respeito e muito amor.\n\nMinha rotina é guiada pelo compromisso de oferecer segurança, bem-estar e tranquilidade para os tutores e seus companheiros de quatro patas.',
  mission: 'Oferecer um cuidado ético, acolhedor e seguro para que cada pet se sinta protegido e cada tutor tenha tranquilidade na sua ausência.',
};

export function getAboutData() {
  return defaultAboutData;
}