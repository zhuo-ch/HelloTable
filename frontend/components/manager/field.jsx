import * as ManagerUtil from '../../util/manager_util';

export default ({ targeted, id, text, change, click}) => {
  if (targeted) {
    return ManagerUtil.createInput({
      cName: 'editable-input',
      placeHolder: text,
      changeHandler: change,
      key: id,
      id
    });
  } else {
    return ManagerUtil.createSpan({
      key: id,
      cName: 'editable-text',
      text: text,
      clickHandler: click,
    });
  }
}
