import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import flagES from './../images/ES.png'; // Importa la imagen de la bandera para ES
import flagUS from './../images/US.png'; // Importa la imagen de la bandera para US

function Dropdownn({ onLanguageChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("es");

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    onLanguageChange(language)
  }

  useEffect(() => {
    setDropdownOpen(false);
  }, [selectedLanguage]);

  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret style={{ color: '#ffffff', background: 'linear-gradient(45deg, #287ddd, #ffffff)', border: 'none' }}>
          {selectedLanguage === "es" ? <img src={flagES} alt="ES" style={{ width: '20px', height: '20px', marginRight: '8px' }} /> : null}
          {selectedLanguage === "en" ? <img src={flagUS} alt="US" style={{ width: '20px', height: '20px', marginRight: '8px' }} /> : null}
          {selectedLanguage.toUpperCase()}
        </DropdownToggle>
        <DropdownMenu style={{ background: 'linear-gradient(45deg, #287ddd, #ffffff)' }}>
          <DropdownItem
            onClick={() => changeLanguage("es")} // Pasa el ID como parámetro
            style={{ color: '#ffffff', border: 'none' }}
            id="1"
            
          >
            <img src={flagES} alt="ES" style={{ width: '20px', height: '20px', marginLeft: '7px' }} /> ES
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            onClick={() => changeLanguage("en")} // Pasa el ID como parámetro
            style={{ color: '#ffffff', border: 'none' }}
            id="2"
          >
            <img src={flagUS} alt="US" style={{ width: '20px', height: '20px', marginLeft: '0.1px' }} /> EN
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default Dropdownn;
