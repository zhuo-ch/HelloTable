export const updateSeating = seating => {
  return $.ajax({
    method: 'Patch',
    url: `api/seatings/${seating.id}`,
    data: seating,
  });
}

export const createSeating = seating => {
  return $.ajax({
    method: 'POST',
    url: 'api/seatings',
    data: seating,
  })
}

export const removeSeating = id => {
  return $.ajax({
    method: 'DELETE',
    url: `api/seatings/${id}`,
  });
}
