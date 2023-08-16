import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'; // Import Redux Logger
import vehiclesReducer from './reducers';
import { fetchVehiclesAction } from './actions';

// Create the Redux Logger instance
const logger = createLogger();

const store = createStore(
  vehiclesReducer,
  applyMiddleware(thunk, logger) // Add logger middleware
);

store.dispatch(fetchVehiclesAction()); // Dispatch the action to fetch data initially

export default store;