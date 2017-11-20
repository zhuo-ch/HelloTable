export const mergeSeating = (seatings, newSeating) => {
  let newSeatings = Object.assign([], seatings);
  if (newSeating.id) {
    newSeatings = newSeatings.map(el => el.id === newSeating.id ? newSeating : el);
  } else {
    newSeatings.push(newSeating);
  }

  return newSeatings;
}

export const mergeHours = (hours, newHour) => {
  let newHours = Object.assign([], hours);
  newHours = newHours.map(el => el.id === newHour.id ? newHour : el);

  return newHours
}
