import React from 'react';
import { Sticky, StickyContainer } from 'react-sticky';

export default ({ sections, handleClick }) => {
  const bar = sections.map((el, idx) =>{
    return (
      <article
        key={ idx }
        className='about-description'
        onClick={ handleClick }>
        { el }
      </article>
    );
  });

  return (
    <Sticky>
      { bar }
    </Sticky>
  )
}
