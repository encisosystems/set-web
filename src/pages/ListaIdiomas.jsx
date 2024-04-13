import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { BsTranslate } from "react-icons/bs";

function ListadoIdiomas({ onLanguageChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("1");

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
            {selectedLanguage === "1" ? "Español/Spanish" : "Inglés/English"}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => handleLanguageChange("1")} style={{ border: 'none' }}>
              Español/Spanish
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => handleLanguageChange("2")} style={{ border: 'none' }}>
              Inglés/English
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
  );
}

export default ListadoIdiomas;
