export const fetchHour = id => {
  return $.ajax({
    method: 'GET',
    url: `api/hours/${id}`,
  });
}

export const updateHour = hour => {
  return $.ajax({
    method: 'PATCH',
    data: { hour },
  });
}
