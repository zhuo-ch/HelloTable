import React from 'react';
import { Sticky, StickyContainer } from 'react-sticky';

export default ({ sections, handleClick }) => {
  const bar = sections.map((el, idx) =>{
    return (
      <article
        key={ idx }
        className='bold'
        onClick={ handleClick }>
        <h3>{ el }</h3>
      </article>
    );
  });

  return (
    <Sticky>
      { bar }
    </Sticky>
  )
}
