import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    lng: 'es', // idioma inicial
    backend: {
      // Define loadPath como una función que devuelve la URL correspondiente
      loadPath: (lngs, namespaces) => {
        // Asumiendo que lngs es un arreglo y tomando el primer idioma
        const langCode = lngs[0];
        const numberForLang = getNumberLanguage(langCode);
        return `http://192.168.137.163:8082/TRANSLATION/translation/${numberForLang}`;
      },
    },
    interpolation: {
      escapeValue: false, // no necesitamos escapar HTML
    },
  });


const getNumberLanguage = (language) => {
  switch(language){
    case 'es' :
      return 1;
    case 'en':
      return 2;
    default:
       return 1;
  }
}

export default i18n;
