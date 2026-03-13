import React from 'react';
import './ClientLogos.css';

// Importing the SVG logos
import ifsLogo from '../assets/IFS_logo.svg';
import jblLogo from '../assets/JBL_logo.svg';
import kasasaLogo from '../assets/Kasasa_logo.svg';
import retailmenotLogo from '../assets/RetailMeNot_logo.svg';
import tricorbraunLogo from '../assets/Tricorbraun_logo.svg';
import offersComLogo from '../assets/offers-com_logo.svg';

const logos = [
  { src: ifsLogo, alt: 'IFS' },
  { src: jblLogo, alt: 'JBL' },
  { src: kasasaLogo, alt: 'Kasasa' },
  { src: retailmenotLogo, alt: 'RetailMeNot' },
  { src: tricorbraunLogo, alt: 'TricorBraun' },
  { src: offersComLogo, alt: 'Offers.com' },
];

const ClientLogos = () => {
  return (
    <section className="client-logos-section">
      <div className="container">
        <h2 className="client-logos-title">Brands I've Helped Build</h2>
        <div className="logos-container">
          {logos.map((logo, index) => (
            <img key={index} src={logo.src} alt={logo.alt} className="client-logo" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;