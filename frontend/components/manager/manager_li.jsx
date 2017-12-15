import React from 'react';
import * as ManagerUtil from '../../util/manager_util';

export default ({ article, key, targeted, cName, remove, save, click }) => {
  let alternate;

  if (targeted) {
    alternate = ManagerUtil.getEditButtons({
      onSave: save,
      onCancel: click,
      cName: 'horizontal'});
  } else if (remove) {
    alternate = (
      <article className='horizontal' id={ key }>
        { ManagerUtil.createButton('Remove', remove) }
      </article>);
  } else {
    alternate = ManagerUtil.getBlankArticle('horizontal');
  }

  return (
    <li key={ key } className={ cName }>
      { article }
      { alternate }
    </li>
  )
}
