import React from 'react';
import ImpactIndicator from '../ImpactIndicator/ImpactIndicator';

// Fonction pour obtenir la pondération de l'impact
const getImpactWeight = (impact) => {
  const weights = {
    'critical': 3,
    'serious': 2,
    'moderate': 1,
    'minor': 0,
  };
  return weights[impact] || 0;
};

const ErrorList = ({ errors, onSelectError }) => {
  // Trier les erreurs par gravité d'impact avant de les afficher
  const sortedErrors = errors && errors.length > 0
    ? errors.sort((a, b) => getImpactWeight(b.impact) - getImpactWeight(a.impact))
    : [];

  return (
    <ul>
      {sortedErrors.map((error, index) => (
        <li key={index} 
            onClick={() => onSelectError(error)} 
            className="cursor-pointer hover:bg-gray-200 py-2 px-2 flex justify-between items-center">
          <div className='max-w-80 mr-4'>
            {error.help} {/* Utilisez truncate pour gérer les textes trop longs */}
          </div>
          <ImpactIndicator impact={error.impact} />
        </li>
      ))}
    </ul>
  );
};

export default ErrorList;
