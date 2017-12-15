import React from 'react';
import * as ManagerUtil from '../../util/manager_util';
import ManagerLi from './manager_li';
import ManagerField from './field';

export default ({ restaurant, state, change, save, click }) => {
  const details = ['name', 'phone', 'address', 'cuisine', 'site'].map((key, idx) => {
    const listKey = `${key}`;
    const targeted = state.selecting && state.idx === listKey;
    // const detail = this.getField(targeted, listKey, restaurant[key]);
    const detail = (
      <ManagerField
          targeted={ targeted }
          id={ listKey }
          text={ restaurant[key] }
          change={ change }
          click={ click }
          />
    );
    const article = (
      <article className='horizontal'>
        { `${key.charAt(0).toUpperCase() + key.slice(1, key.length)}:  ` }
        { detail }
      </article>
    );

    return (
      <ManagerLi
        article={ article }
        key={ listKey }
        targeted={ targeted }
        cName='horizontal'
        save={ save }
        click={ click }
        />
    );
  });

  const check = ManagerUtil.checkTarget(state);
  const errors = (check && check !== 'hours' && check !== 'seatings') ? restaurant.errors : '';

  return  ManagerUtil.createSection({
    errors,
    id: 'Details',
    title: 'Details',
    liElements: details,
  });
}
