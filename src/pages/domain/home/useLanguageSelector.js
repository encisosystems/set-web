import { useState } from 'react';

export const useLanguageSelector = (onLanguageChange) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('es-ES');

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleLanguageChange = (id) => {
    if (id === '1') {
      setSelectedLanguage('Español');
      onLanguageChange('es-ES');
    } else if (id === '2') {
      setSelectedLanguage('Inglés');
      onLanguageChange('en-US');
    }
  };

  return { dropdownOpen, toggle, selectedLanguage, setSelectedLanguage, handleLanguageChange };
};