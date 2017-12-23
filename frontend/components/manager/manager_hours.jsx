import React from 'react';
import { connect } from 'react-redux';
import * as ManagerUtil from '../../util/manager_util';
import * as SearchUtil from '../../util/search_util';
import ManagerField from './field';
import ManagerLi from './manager_li';

class ManagerHours extends React.Component {
// export default ({ restaurant, state, change, click, save }) => {
  const getHour = hour => {
    let targeted;
    const openClose = ['open', 'close'].map(el => {
      const listKey = `hours-${hour.day}-${el}-${hour[el]}`;
      const matched = state.idx === listKey;
      const text = SearchUtil.formatHoursMinutes(hour[el]);
      targeted = targeted ? targeted : (state.selecting && matched);

      return ManagerField({
          targeted: targeted && matched,
          id: listKey,
          text: text,
          change: change,
          click: click,
        });
    });

    const article = (
      <article className='horizontal'>
        <span className='manager-text'>{ hour.day }</span>
        <span className='manager-text'>from</span>
        { openClose[0] }
        <span className='manager-text'>to</span>
        { openClose[1] }
      </article>
    );

    return ManagerLi({
        article: article,
        id: hour.day,
        targeted: targeted,
        cName: 'horizontal',
        click: click,
        save: save,
      });
  }

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const times = days.map(day => getHour(restaurant.hours.find(el => el.day === day)));

  const check = ManagerUtil.checkTarget(state);
  const errors = (check && check === 'hours') ? restaurant.errors : '';

  return ManagerUtil.createSection({
    errors,
    id: 'Hours of Operation',
    title: 'Restaurant Hours',
    liElements: times,
  });
}

const mapStateToProps = state => ({
  hours: state.restaurant.hours
});

const mapDispatchToProps = dispatch => ({
  updateHour: hour => dispatch(updateHour(hour)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerHours);
