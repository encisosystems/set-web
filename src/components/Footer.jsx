import React from "react";

const Footer = () => {
  return (
    <div style={{textAlign:"center",display:"flex",justifyContent:"center",flexDirection:"column"}}>
      <div>
        <a style={{marginRight:"15px"}} href="">FAQs</a>
        <a style={{marginRight:"15px"}} href="">Politicas de Privacidad  </a>
        <a style={{marginRight:"15px"}} href="">Créditos</a>
       
      </div>
      <hr style={{margin:"15px auto",width:"50%"}} />
      <div>©2024 - Simple Estimation Tool.</div>
    </div>
    
  );
};

export default Footer;