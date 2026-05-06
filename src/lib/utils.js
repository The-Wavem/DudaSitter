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