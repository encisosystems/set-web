import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) 
  .use(initReactI18next) 
  .init({
    fallbackLng: 'es',
    lng: "es", 
    backend: {
      loadPath: 'http://mi-dominio.com/ruta-al-backend/traducciones/{{lng}}',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;