import React from 'react';
import * as ManagerUtil from '../../util/manager_util';

const AddTable = ({ saveHandler, cancelHandler, changeHandler }) => {
  return (
    <div className='review-form-container'>
      <section className='user-show-res-header horizontal'><h2>Add Tables</h2></section>
      <section>
        Number of seats:
      </section>
      <section>
        {
          ManagerUtil.createInput({
            key: 'newSeats',
            id: 'newSeats',
            cName: 'editable-input',
            onChange: changeHandler,
          })
        }
      </section>
      <section>
        Maximum tables:
      </section>
      <section>
        {
          ManagerUtil.createInput({
            key: 'newTables',
            id: 'newTables',
            cName: 'editable-input',
            onChange: changeHandler,
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
