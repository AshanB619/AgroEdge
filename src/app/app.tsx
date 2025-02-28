import { useEffect, useState } from 'react';
import '../styles/globals.css'; 

function MyApp({ Component, pageProps }: any) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); 

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark'); 
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); 
  }, [theme]);

  return <Component {...pageProps} />;
}

export default MyApp;
