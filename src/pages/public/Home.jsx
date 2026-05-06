import Hero from '@/sections/home/Hero';
import WhyChoose from '@/sections/home/WhyChoose';
import Services from '@/sections/home/Services';

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChoose />
      <Services onOpenGallery={(service) => console.log('Abrir galeria:', service)} />
    </>
  );
}