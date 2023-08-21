import { FETCH_VEHICLES_SUCCESS, FETCH_VEHICLES_FAILURE, ADD_BID, FILTER_VEHICLES_BY_BRAND, CLEAR_BIDS ,REMOVE_BID} from './actions';
// Add a new action type and action creator for adding a bid

const initialState = {
    vehicles: [],// vehicle state
    error: null,
    bids: [], // Add bids state
};

const vehiclesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_VEHICLES_SUCCESS:
            return {
                ...state,
                vehicles: action.payload,
                error: null,
            };
        case FETCH_VEHICLES_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case ADD_BID: {
            const { vehicleId, name, currency, image, amount } = action.payload;

            // Basic validation check: Ensure the vehicle exists in the state
            const existingVehicle = state.vehicles.find(vehicle => vehicle.id === vehicleId);
            if (!existingVehicle) {
                console.error(`Vehicle with ID ${vehicleId} not found.`);
                return state;
            }

            // Perform additional validation as needed
            if (amount <= 0) {
                console.error(`Invalid bid amount: ${amount}`);
                return state;
            }

            // If all checks pass, add the bid to the state
            const newBid = {
                vehicleId,
                name,
                currency,
                image,
                amount,
            };

            return {
                ...state,
                bids: [...state.bids, newBid],
            };
        };
        case CLEAR_BIDS:
            return {
                ...state,
                bids: [], // Clear the bids array
            };
        case REMOVE_BID:
            const updatedBids = state.bids.filter((bid) => bid.vehicleId !== action.payload);
            return {
                ...state,
                bids: updatedBids,
            };
        case FILTER_VEHICLES_BY_BRAND: {
            const brand = action.payload;
            if (brand === 'All') {
                return {
                    ...state,
                    filteredVehicles: null,
                };
            }
            const filteredVehicles = brand;

            return {
                ...state,
                filteredVehicles,
            };
        };
        default:
            return state;
    }
};


export default vehiclesReducer;