import React from 'react';

const PhotoSection = ({photos}) => {
  if (photos.length > 0) {
    return (
      <div className='photo-section show-section'>
        <section>
            <h2>Restaurant Photos</h2>
        </section>
        <ul className='splash-images'>
          {
            photos.map((img, idx) => {
              return <li key={idx} className='splash-img section-img'><img src={img}/></li>
            })
          }
        </ul>
      </div>
    )
  } else {
    return (<div></div>);
  }
}

export default PhotoSection;
