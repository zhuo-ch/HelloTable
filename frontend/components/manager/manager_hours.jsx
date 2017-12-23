import React from 'react';
import { connect } from 'react-redux';
import { updateHour } from '../../actions/hours_actions';
import { resetCurrentModal } from '../../actions/modal_actions';
import * as ManagerUtil from '../../util/manager_util';
import * as SearchUtil from '../../util/search_util';
import ManagerField from './field';
import ManagerLi from './manager_li';

class ManagerHours extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selecting: false, idx: '', value: '' };
    this.handleClick = this.handleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
// export default ({ restaurant, state, change, click, save }) => {
  handleClick(e) {
    if (e) {
      e.preventDefault();
      this.setState({ idx: e.currentTarget.id });
    }

    this.setState({ selecting: this.state.selecting ? false : true });
    this.props.hours.errors
      ? this.props.clearErrors()
      : '';
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.currentTarget.value });
  }

  handleSave(idx) {
    this.props.setCurrentModal({ hidden: false, type: 'spinner' });
    let hour = merge({}, this.props.hours.find(el => el.day === idx[1]));
    hour[idx[2]] = ManagerUtil.to24(this.state.value);
    hour[idx[2]] ? this.props.updateHour(hour).then(() => this.handleClick()) : this.handleHourError();
  }

  handleHourError() {
    this.props.resetCurrentModal();
    const error = { responseJSON: ['Please use 12 hour format (example: 10:30AM, 3:45PM)']};
    this.props.setError(error);
  }

  getField(key, text, targeted) {
    return ManagerField({
        targeted: targeted,
        id: key,
        text: text,
        change: this.handleChange,
        click: this.handleClick,
      });
  }

  getFields(hour) {
    let targeted;
    const openClose = ['open', 'close'].map(el => {
      const listKey = `hours-${hour.day}-${el}-${hour[el]}`;
      const matched = this.state.idx === listKey;
      const text = SearchUtil.formatHoursMinutes(hour[el]);
      targeted = targeted ? targeted : (this.state.selecting && matched);

      return this.getField(listKey, text, targeted && matched);
    });
    openClose.targeted = targeted && matched;

    return openClose;
  }

  getArticle(hour) {
    return (
      <article className='horizontal'>
        <span className='manager-text'>{ hour.day }</span>
        <span className='manager-text'>from</span>
        { hour[0] }
        <span className='manager-text'>to</span>
        { hour[1] }
      </article>
    );
  }

  getHoursItem(hour) {
    const item = this.getFields(hour);
    const article = this.getArticle(item);

    return ManagerLi({
        article: article,
        id: hour.day,
        targeted: item.targeted,
        cName: 'horizontal',
        click: this.handleClick,
        save: this.handleSave,
      });
  }

  getHoursList() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const times = days.map(day => getHour(this.props.hours.find(el => el.day === day)));

    return times.map(time => this.getHoursItem(time));
  }

  getHoursSection() {
    const hoursList = this.getHoursList();

    return ManagerUtil.createSection({
      errors: this.props.hours.errors ? this.props.hours.errors : '',
      id: 'Hours of Operation',
      title: 'Restaurant Hours',
      liElements: hoursList,
    });
  }

  render() {
    const hoursSection = this.getHoursSection();

    return hoursSection;
  }
}

const mapStateToProps = state => ({
  hours: state.hours,
});

const mapDispatchToProps = dispatch => ({
  updateHour: hour => dispatch(updateHour(hour)),
  resetCurrentModal: () => dispatch(resetCurrentModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerHours);
