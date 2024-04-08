import React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import flagES from '../../ES.png';
import flagUS from '../../US.png';

export const LanguageDropdown = ({ dropdownOpen, toggle, selectedLanguage, handleChange }) => {
  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret style={{ color: '#ffffff', background: 'linear-gradient(45deg, #287ddd, #ffffff)', border: 'none' }}>
          {selectedLanguage === 'Español' ? (
            <img src={flagES} alt="ES" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          ) : null}
          {selectedLanguage === 'Inglés' ? (
            <img src={flagUS} alt="US" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          ) : null}
          {selectedLanguage}
        </DropdownToggle>
        <DropdownMenu style={{ background: 'linear-gradient(45deg, #287ddd, #ffffff)' }}>
          <DropdownItem onClick={() => handleChange('1')} style={{ color: '#ffffff', border: 'none' }} id="1">
            <img src={flagES} alt="ES" style={{ width: '20px', height: '20px', marginLeft: '7px' }} /> Español
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => handleChange('2')} style={{ color: '#ffffff', border: 'none' }} id="2">
            <img src={flagUS} alt="US" style={{ width: '20px', height: '20px', marginLeft: '0.1px' }} /> Inglés
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};