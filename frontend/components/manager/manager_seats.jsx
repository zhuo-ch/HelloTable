import React from 'react';
import * as ManagerUtil from '../../util/manager_util';
import * as SearchUtil from '../../util/search_util';
import ManagerField from './field';
import ManagerLi from './manager_li';
import AddTable from './add_table';

export default ({ restaurant, state, change, click, save, addTables }) => {
  const getSeat = (seating, idx) => {
    let targeted;
    const maxSeats = ['max_tables', 'seats'].map(el  => {
      const key = `seatings-${idx}-${el}`;
      const text = seating[el];
      const matched = state.idx === key;
      targeted = targeted ? targeted : (state.selecting && matched);

      // return this.getField(targeted && matched, key, text);
      return (
        <ManagerField
          targeted={ targeted }
          id={ key }
          text={ text }
          change={ change }
          click={ click }
          />
      );
    });

    const article = (
        <article className='horizontal'>
          { maxSeats[0] }
          <span className='manager-text'>tables of</span>
          { maxSeats[1] }
        </article>
    );

    const remove = targeted ? false : true;

    // return this.getLi(article, idx, targeted, 'horizontal', remove);
    return (
      <ManagerLi
        article={ article }
        key={ idx }
        targeted={ targeted }
        cName='horizontal'
        remove={ remove }
        save={ save }
        click={ click }
        />
    );
  }

  const seatings = restaurant.seatings.sort(el => el.seats)
    .map((seating, idx) => getSeat(seating, idx));
  const check = ManagerUtil.checkTarget(state);
  const errors = (check && check === 'seatings') ? restaurant.errors : '';
  const addOn = ManagerUtil.createButton('Add Tables', addTables);

  return ManagerUtil.createSection({
    errors,
    id: 'Tables',
    title: 'Restaurant Tables',
    liElements: seatings,
    titleAddon: addOn,
  });
}
