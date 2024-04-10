import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { BsTranslate } from "react-icons/bs";

function Dropdownn({ onLanguageChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Establece el idioma por defecto a español
  const [selectedLanguage, setSelectedLanguage] = useState("ES");

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    onLanguageChange(languageCode === "Español/Spanish" ? "ES" : "US");
  }

  useEffect(() => {
    // Notifica al componente padre el idioma por defecto al montar el componente
    onLanguageChange("ES");
    setDropdownOpen(false);
  }, [selectedLanguage]);

  return (
      <div style={{ position: 'absolute', top: 10, left: 10 }}>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret style={{ color: '#000000', border: 'none', backgroundColor: "#ffffff" }}>
            <BsTranslate style={{ marginRight: '5px', fontSize: "20px" }} />
            {selectedLanguage}
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

export default Dropdownn;
