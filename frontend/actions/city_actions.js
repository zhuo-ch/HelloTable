import * as CityAPIUtil from '../util/city_api_util';

export const RECEIVE_ALL_CITIES = 'RECEIVE_ALL_CITIES';
export const RECEIVE_CITY = 'RECEIVE_CITY';

export const fetchAllCities = () => dispatch => {
  return CityAPIUtil.fetchAllCities()
    .then((cities) => dispatch(receiveAllCities(cities)));
}

export const fetchCity = cityId => dispatch => {
  return CityAPIUtil.fetchCity(cityId)
    .then((city) => dispatch(receiveCity(city)));
}

const receiveAllCities = cities => ({
  type: RECEIVE_ALL_CITIES,
  cities,
})

const receiveCity = city => ({
  type: RECEIVE_CITY,
  city,
})
