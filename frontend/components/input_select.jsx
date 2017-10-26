export default inputSelect = options => {
  const selecting = options.selecting ? '' : 'hidden';

  const inputs = options.items.map((item, idx)=> {
    return (
      <li
        className={ targeted(idx, options.targetIdx) }
        key={ idx }
        value={ idx}
        onClick={ options.handleClick }>
        { item } { options.text }
      </li>
    )
  })
}

const targeted = (idx, targetIdx, type) => {
  return idx === targetIdx ? `highlight ${ type }` : type;
}
