import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { fetchVehicles } from './service/vehicleService'; // Update with your service file
import Home from './Home'; // Update with the correct path to your Home component

jest.mock('axios');

describe('Home Component', () => {
  const API_URL = 'http://157.245.61.32:7979';

  
  it('fetches vehicles and displays them', async () => {
    const mockVehicles = [
      { id: 1, name: 'Vehicle 1', details: { /* ... */ } },
      { id: 2, name: 'Vehicle 2', details: { /* ... */ } },
      // ... more mock vehicle data
    ];

    axios.get.mockResolvedValue({ data: mockVehicles });

    render(<Home />);

    await waitFor(() => {
      mockVehicles.forEach((vehicle) => {
        expect(screen.getByText(vehicle.name)).toBeInTheDocument();
      });
    });
  });

  it('handles bidding form submission', async () => {
    const mockVehicles = [
      { id: 1, name: 'Vehicle 1', details: { /* ... */ } },
      // ... more mock vehicle data
    ];

    axios.get.mockResolvedValue({ data: mockVehicles });

    render(<Home />);

    await waitFor(() => {
      mockVehicles.forEach((vehicle) => {
        expect(screen.getByText(vehicle.name)).toBeInTheDocument();
      });
    });

    const bidAmount = 1000; // Example bid amount
    const vehicleId = 1;    // Example vehicle ID

    fireEvent.change(screen.getByPlaceholderText('Enter bid amount'), {
      target: { value: bidAmount },
    });

    fireEvent.click(screen.getByText('Submit Bid'));

    expect(axios.post).toHaveBeenCalledWith(
      `${API_URL}/bids`,
      { vehicleId, bidAmount }
    );
    expect(screen.getByPlaceholderText('Enter bid amount')).toHaveValue('');
  });
});