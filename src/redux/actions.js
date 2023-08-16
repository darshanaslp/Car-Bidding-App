import { fetchVehicles,filterVehiclesByBrand } from '../service/vehicleService'; // Import the service function

//fetch vehical details
export const FETCH_VEHICLES_SUCCESS = 'FETCH_VEHICLES_SUCCESS';
export const FETCH_VEHICLES_FAILURE = 'FETCH_VEHICLES_FAILURE';

//add bids
export const ADD_BID = 'ADD_BID';

// Define the action type
export const CLEAR_BIDS = 'CLEAR_BIDS';

export const REMOVE_BID = 'REMOVE_BID';

// filtering vehicles
export const FILTER_VEHICLES_BY_BRAND = 'FILTER_VEHICLES_BY_BRAND';

export const fetchVehiclesSuccess = (vehicles) => ({
  type: FETCH_VEHICLES_SUCCESS,
  payload: vehicles,
});

export const fetchVehiclesFailure = (error) => ({
  type: FETCH_VEHICLES_FAILURE,
  payload: error,
});

export const fetchVehiclesAction = () => {
  return (dispatch) => {
    fetchVehicles()
      .then((response) => {
        dispatch(fetchVehiclesSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchVehiclesFailure(error.message));
      });
  };
};

export const addBid = (vehicleId, brand, image, currency, amount) => ({
  type: ADD_BID,
  payload: { vehicleId, brand, image, currency, amount },
});


// Action creator to clear bids
export const clearBidsAction = () => ({
  type: CLEAR_BIDS,
});

export const removeBidAction = (vehicleId) => ({
  type: REMOVE_BID,
  payload: vehicleId,
});

// export const filterVehiclesByBrandAction = (brand) => {
//   return {
//     type: FILTER_VEHICLES_BY_BRAND,
//     payload: brand,
//   };
// };

export const filterVehiclesByBrandAction = (brand) => {
  if(brand === "All"){
    return {
          type: FILTER_VEHICLES_BY_BRAND,
          payload: brand,
        };
  }else{
    return (dispatch) => {
      filterVehiclesByBrand(brand)
        .then((response) => {
          dispatch({
            type: FILTER_VEHICLES_BY_BRAND,
            payload: response, // Assuming the API returns filtered vehicle data
          });
        })
        .catch((error) => {
          console.error('Error filtering vehicles by brand:', error);
        });
    };
  }
};

