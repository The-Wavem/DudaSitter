import { useEffect, useState } from 'react';
import Hero from '@/sections/home/Hero';
import WhyChoose from '@/sections/home/WhyChoose';
import Services from '@/sections/home/Services';
import GalleryModal from '@/sections/home/GalleryModal';
import Testimonials from '@/sections/home/Testimonials';
import { getGallery, getTestimonials } from '@/services/cmsAPI';

export default function Home() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeServiceFilter, setActiveServiceFilter] = useState('Sitter');
  const [galleryImages, setGalleryImages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadHomeContent = async () => {
      try {
        const [nextGallery, nextTestimonials] = await Promise.all([getGallery(), getTestimonials()]);

        if (!isActive) {
          return;
        }

        setGalleryImages(nextGallery);
        setTestimonials(nextTestimonials);
      } catch (error) {
        console.error('Erro ao carregar conteúdo da home:', error);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadHomeContent();

    return () => {
      isActive = false;
    };
  }, []);

  const openGallery = async (service) => {
    setActiveServiceFilter(service);
    const nextGallery = await getGallery();
    setGalleryImages(nextGallery);
    setGalleryOpen(true);
  };

  const filteredImages = galleryImages.filter((image) => image.service === activeServiceFilter);

  return (
    <>
      <Hero />
      <WhyChoose />
      <Services onOpenGallery={openGallery} />
      {!isLoading && <Testimonials testimonials={testimonials} />}
      {!isLoading && (
        <GalleryModal
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          service={activeServiceFilter}
          images={filteredImages}
        />
      )}
    </>
  );
}