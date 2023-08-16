import axios from 'axios';

const API_URL = 'http://157.245.61.32:7979';

//get vehevles
export const fetchVehicles = () => {
  return axios.get(`${API_URL}/vehicles`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};


//api get filter
export const filterVehiclesByBrand = (brand) => {
  return axios.get(`${API_URL}/vehicles?details.brand=${brand}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};