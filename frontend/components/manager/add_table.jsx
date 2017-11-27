import React from 'react';
import * as ManagerUtil from '../../util/manager_util';

const AddTable = ({ saveHandler, cancelHandler, changeHandler, errors }) => {
  debugger
  return (
    <div className='review-form-container manager-add-table'>
      <section className='user-show-res-header horizontal'><h2>Add Tables</h2></section>
      <section className='errors'>{ errors }</section>
      <section>
        Number of seats:
      </section>
      <section>
        {
          ManagerUtil.createInput({
            key: 'seats',
            id: 'seats',
            cName: 'editable-input',
            changeHandler,
          })
        }
      </section>
      <section>
        Maximum tables:
      </section>
      <section>
        {
          ManagerUtil.createInput({
            key: 'max_tables',
            id: 'max_tables',
            cName: 'editable-input',
            changeHandler,
          })
        }
      </section>
       {
         ManagerUtil.getEditButtons({
           onSave: saveHandler,
           onCancel: cancelHandler,
           cName: 'horizontal',
         })
       }
    </div>
  );
}

export default AddTable;
