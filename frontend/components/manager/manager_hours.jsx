import React from 'react';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import { updateHour } from '../../actions/hours_actions';
import { setError, clearErrors } from '../../actions/manager_actions';
import { setCurrentModal, resetCurrentModal } from '../../actions/modal_actions';
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

  handleSave() {
    const idx = this.state.idx.split('-');
    this.props.setCurrentModal({ hidden: false, type: 'spinner' });
    let hour = merge({}, this.props.hours.find(el => el.day === idx[1]));
    debugger
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
    openClose.targeted = targeted;

    return openClose;
  }

  getArticle(hour, item) {
    return (
      <article className='horizontal'>
        <span className='manager-text'>{ hour.day }</span>
        <span className='manager-text'>from</span>
        { item[0] }
        <span className='manager-text'>to</span>
        { item[1] }
      </article>
    );
  }

  getHoursItem(hour) {
    const item = this.getFields(hour);
    const article = this.getArticle(hour, item);

    return ManagerLi({
        article: article,
        id: hour.day,
        targeted: item.targeted,
        cName: 'horizontal',
        click: this.handleClick,
        save: this.handleSave,
      });
  }

  getDays() {
    let times = [];

    if (this.props.hours.length > 0) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      times = days.map(day => this.props.hours.find(el => el.day === day));
    }

    return times;
  }

  getHoursList() {
    const days = this.getDays();

    return days.map(day => this.getHoursItem(day));
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
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
  resetCurrentModal: () => dispatch(resetCurrentModal()),
  setError: error => dispatch(setError(error)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerHours);
