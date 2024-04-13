import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { BsTranslate } from "react-icons/bs";

function ListadoIdiomas({ onLanguageChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ES");

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    onLanguageChange(languageCode);
  }

  useEffect(() => {
    // Notifica al componente padre el idioma por defecto al montar el componente
    onLanguageChange(selectedLanguage);
  }, [onLanguageChange, selectedLanguage]);  // Incluye onLanguageChange en el array de dependencias

  return (
      <div style={{ position: 'absolute', top: 10, left: 10 }}>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret style={{ color: '#000000', border: 'none', backgroundColor: "#ffffff" }}>
            <BsTranslate style={{ marginRight: '5px', fontSize: "20px" }} />
            {selectedLanguage === "ES" ? "Español/Spanish" : "Inglés/English"}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => handleLanguageChange("ES")} style={{ border: 'none' }}>
              Español/Spanish
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => handleLanguageChange("EN")} style={{ border: 'none' }}>
              Inglés/English
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
  );
}

export default ListadoIdiomas;
