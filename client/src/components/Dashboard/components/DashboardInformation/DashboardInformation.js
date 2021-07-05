import React from 'react';

import './DashboardInformation.css';

const DashboardInformation = ({ username }) => {
  return (
    <div className='dashboard_info_text_container'>
      <span className='dashboard_info_text_title'>
        Buna {username}, bun venit in intalniri.
      </span> 
      <span className='dashboard_info_text_description'>
      Alege o pregatire activa de jos, sau incepe un apel cu o persoana activa

      </span>
    </div>
  );
};

export default DashboardInformation;
