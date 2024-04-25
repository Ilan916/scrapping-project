import React from 'react'

function ImpactIndicator({ impact }) {
  let color;
  switch (impact) {
    case 'critical':
      color = '#ef4444';
      break;
    case 'serious':
      color = '#f97316';
      break;
    case 'moderate':
      color = '#f59e0b';
      break;
    default:
      color = 'transparent';
  }
  return (
    <span
    className="inline-block mr-2 rounded-full"
    style={{ width: '10px', height: '10px', backgroundColor: color }}
    aria-label={`Impact ${impact}`}
  />
  )
}

export default ImpactIndicator
