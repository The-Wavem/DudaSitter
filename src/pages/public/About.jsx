import { useMemo } from 'react';
import AboutHero from '@/sections/about/AboutHero';
import AboutStats from '@/sections/about/AboutStats';
import { getAboutData } from '@/lib/utils';

export default function About() {
  const data = getAboutData();

  const bioParagraphs = useMemo(() => {
    return data.bio.split('\n\n').map((paragraph) => paragraph.replace('{age}', data.age).replace('{semester}', data.semester));
  }, [data]);

  return (
    <>
      <AboutHero
        bioParagraphs={bioParagraphs}
        mission={data.mission}
        age={data.age}
        semester={data.semester}
      />
      <AboutStats semester={data.semester} />
    </>
  );
}