import { useEffect, useMemo, useState } from 'react';
import AboutHero from '@/sections/about/AboutHero';
import AboutStats from '@/sections/about/AboutStats';
import { getAboutData } from '@/services/cmsAPI';

export default function About() {
  const [data, setData] = useState({ bio: '', mission: '', age: '', semester: '' });

  useEffect(() => {
    let isActive = true;

    const loadAboutData = async () => {
      const nextData = await getAboutData();

      if (isActive) {
        setData(nextData);
      }
    };

    loadAboutData();

    return () => {
      isActive = false;
    };
  }, []);

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