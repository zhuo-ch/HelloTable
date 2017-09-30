import React from 'react';

const ThankYou = ({ resetCurrentModal }) => {
  const text = 'Thank you. Your review has been submitted.';

  return (
    <div className='review-form-container thank-you-container'>
      { text }
      <button className='button' onClick={ resetCurrentModal }>Close</button>
    </div>
  );
}

export default ThankYou;
