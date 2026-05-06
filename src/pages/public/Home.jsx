import { useEffect, useState } from 'react';
import Hero from '@/sections/home/Hero';
import WhyChoose from '@/sections/home/WhyChoose';
import Services from '@/sections/home/Services';
import GalleryModal from '@/sections/home/GalleryModal';
import Testimonials from '@/sections/home/Testimonials';
import { getGallery, getTestimonials } from '@/lib/utils';

export default function Home() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeServiceFilter, setActiveServiceFilter] = useState('Sitter');
  const [galleryImages, setGalleryImages] = useState([]);
  const [testimonials] = useState(() => getTestimonials());

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setGalleryImages(getGallery());
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const openGallery = (service) => {
    setActiveServiceFilter(service);
    setGalleryImages(getGallery());
    setGalleryOpen(true);
  };

  const filteredImages = galleryImages.filter((image) => image.service === activeServiceFilter);

  return (
    <>
      <Hero />
      <WhyChoose />
      <Services onOpenGallery={openGallery} />
      <Testimonials testimonials={testimonials} />
      <GalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        service={activeServiceFilter}
        images={filteredImages}
      />
    </>
  );
}