import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import flagES from './ES.png'; // Importa la imagen de la bandera para ES
import flagUS from './US.png'; // Importa la imagen de la bandera para US

function Dropdownn({ onLanguageChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Language");

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const accionprueba = (id) => {
    setSelectedLanguage("ES");
    onLanguageChange(id); 
  }

  const accionprueba2 = (id) => {
    setSelectedLanguage("US");
    onLanguageChange(id);
  }

  useEffect(() => {
    setDropdownOpen(false);
  }, [selectedLanguage]);

  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret style={{ color: '#ffffff', background: 'linear-gradient(45deg, #287ddd, #ffffff)', border: 'none' }}>
          {selectedLanguage === "ES" ? <img src={flagES} alt="ES" style={{ width: '20px', height: '20px', marginRight: '8px' }} /> : null}
          {selectedLanguage === "US" ? <img src={flagUS} alt="US" style={{ width: '20px', height: '20px', marginRight: '8px' }} /> : null}
          {selectedLanguage}
        </DropdownToggle>
        <DropdownMenu style={{ background: 'linear-gradient(45deg, #287ddd, #ffffff)' }}>
          <DropdownItem
            onClick={() => accionprueba("1")} // Pasa el ID como parámetro
            style={{ color: '#ffffff', border: 'none' }}
            id="1"
            
          >
            <img src={flagES} alt="ES" style={{ width: '20px', height: '20px', marginLeft: '7px' }} /> ES
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            onClick={() => accionprueba2("2")} // Pasa el ID como parámetro
            style={{ color: '#ffffff', border: 'none' }}
            id="2"
          >
            <img src={flagUS} alt="US" style={{ width: '20px', height: '20px', marginLeft: '0.1px' }} /> US
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default Dropdownn;
