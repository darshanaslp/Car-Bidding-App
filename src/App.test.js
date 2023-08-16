import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

// Import your mock vehicle data here
const mockVehicleData = [
  // ... your mock vehicle data here ...
];

// Mock the API request to fetch vehicles
mock.onGet('http://157.245.61.32:7979/vehicles').reply(200, mockVehicleData);

test('renders learn react link', async () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();

  // Wait for the API request to be completed
  await waitFor(() => {
    // You can add more specific assertions here based on your app's behavior
    // For example, check if a vehicle card is rendered
    const vehicleCard = screen.getByText(/Vehicle Name/i);
    expect(vehicleCard).toBeInTheDocument();
  });
});
