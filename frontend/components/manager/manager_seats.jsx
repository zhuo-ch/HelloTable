import React from 'react';
import { connect } from 'react-redux';
import { setCurrentModal } from '../../actions/modal_actions';
import { createSeating, updateSeating, removeSeating } from '../../actions/seating_actions';
import * as ManagerUtil from '../../util/manager_util';
import * as SearchUtil from '../../util/search_util';
import ManagerField from './field';
import ManagerLi from './manager_li';
import AddTable from './add_table';

class ManagerSeatings extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAddTables = this.handleAddTables.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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
    this.props.setCurrentModal({ hidden: false, type: 'spinner' });
    let seating = merge({}, this.props.restaurant.seatings[idx[1]]);
    seating[idx[2]] = parseInt(this.state.value);
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
    this.props.removeSeating(this.props.restaurant.seatings[id].id);
  }
// export default ({ restaurant, state, change, click, save, addTables, handleRemove }) => {
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
    const seating = ['max_tables', 'seats'].map(el  => {
      const key = `seatings-${idx}-${el}`;
      const text = seating[el];
      const matched = state.idx === key;
      targeted = targeted ? targeted : (state.selecting && matched);
      return this.getField(text, key, targeted);
    });

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
    let targeted;
    const seating = this.getFields(item, idx);
    const article = this.getArticle(seating);

    const newLi = ManagerLi({
        article: article,
        id: idx,
        targeted: targeted,
        cName: 'horizontal',
        remove: targeted ? false : this.handleRemoveTable,
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
    const seatings = getSeatingsList();
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSeatings);
