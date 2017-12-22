import React from 'react';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import { setCurrentModal } from '../../actions/modal_actions';
import { createSeating, updateSeating, removeSeating, clearErrors } from '../../actions/seating_actions';
import * as ManagerUtil from '../../util/manager_util';
import * as SearchUtil from '../../util/search_util';
import ManagerField from './field';
import ManagerLi from './manager_li';
import AddTable from './add_table';

class ManagerSeatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selecting: false, idx: '', value: '', };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAddTables = this.handleAddTables.bind(this);
    this.handleRemoveTable = this.handleRemoveTable.bind(this);
  }

  handleClick(e) {
    if (e) {
      e.preventDefault();
      this.setState({ idx: e.currentTarget.id });
    }

    this.setState({ selecting: this.state.selecting ? false : true });
    this.props.seatings.errors
      ? this.props.clearErrors()
      : '';
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.currentTarget.value });
  }

  handleSave() {
    const idx = this.state.idx.split('-');
    const i = idx[1];
    const type = idx[2];
    this.props.setCurrentModal({ hidden: false, type: 'spinner' });
    let seating = merge({}, this.props.seatings[i]);
    seating[type] = parseInt(this.state.value);
    this.props.updateSeating(seating).then(() => this.handleClick());
  }

  handleAddTables() {
    this.props.setCurrentModal({
      hidden: false,
      type: 'addTable',
    });
  }

  handleRemoveTable(e) {
    e.preventDefault();
    const id = e.currentTarget.parentElement.id;
    this.props.removeSeating(this.props.seatings[id].id);
  }

  getField(text, key, targeted) {
    return ManagerField({
        targeted: targeted,
        id: key,
        text: text,
        change: this.handleChange,
        click: this.handleClick,
      });
  }

  getFields(item, idx) {
    let targeted;
    const seating = ['max_tables', 'seats'].map(el  => {
      const key = `seatings-${idx}-${el}`;
      const text = item[el];
      const matched = this.state.idx === key;
      targeted = targeted ? targeted : (this.state.selecting && matched);

      return this.getField(text, key, targeted);
    });
    seating.targeted = targeted;

    return seating;
  }

  getArticle(seating) {
    return (
      <article className='horizontal'>
        { seating[0] }
        <span className='manager-text'>tables of</span>
        { seating[1] }
      </article>
    )
  }

  getSeatingsItem(item, idx) {
    const seating = this.getFields(item, idx);
    const article = this.getArticle(seating);
    const newLi = ManagerLi({
        article,
        id: idx,
        targeted: seating.targeted,
        cName: 'horizontal',
        remove: seating.targeted ? false : this.handleRemoveTable,
        save: this.handleSave,
        click: this.handleClick,
      });

    return newLi;
  }

  getSeatingsList() {
    const seatingsList = this.props.seatings.map((el, idx) => this.getSeatingsItem(el, idx));

    return seatingsList;
  }

  getSeatingsSection() {
    const seatings = this.getSeatingsList();
    const addOn = ManagerUtil.createButton('Add Tables', this.handleAddTables);

    return ManagerUtil.createSection({
      errors: this.props.seatings.errors,
      id: 'Tables',
      title: 'Restaurant Tables',
      liElements: seatings,
      titleAddon: addOn,
    });
  }

  render() {
    const seatingsSection = this.getSeatingsSection();

    return seatingsSection;
  }
}

const mapStateToProps = state => ({
  seatings: state.seatings,
});

const mapDispatchToProps = dispatch => ({
  updateSeating: seating => dispatch(updateSeating(seating)),
  removeSeating: seating => dispatch(removeSeating(seating)),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSeatings);
