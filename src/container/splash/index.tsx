import { useEffect, useState } from 'react';
import splash1 from '@/assets/image/splash1.png';
import splash2 from '@/assets/image/splash2.png';
import $ from './splash.module.scss';

export default function SplashLayout() {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [splash1, splash2];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % 2);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={$.layout}>
      <img src={images[imageIndex]} alt="Splash" />
    </div>
  );
}