import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web



import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'; // Import Redux Logger
import vehiclesReducer from './reducers';
import { fetchVehiclesAction } from './actions';

// Create the Redux Logger instance
const logger = createLogger();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['bids'], // Specify which reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, vehiclesReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, logger) // Add logger middleware
);

let persistor = persistStore(store);


store.dispatch(fetchVehiclesAction()); // Dispatch the action to fetch data initially

export {store , persistor};