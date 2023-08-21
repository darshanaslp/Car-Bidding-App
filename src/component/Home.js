import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVehiclesAction, filterVehiclesByBrandAction } from '../redux/actions';

import { toast } from 'react-toastify';
import { addBid } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

import BrandFilter from './reuseble/BrandFilter';
import VehicleCard from './reuseble/VehicleCard';
import VehiclePagination from './reuseble/VehiclePagination';

const Home = () => {
    const vehicles = useSelector(state => state.vehicles);
    const filteredVehicles = useSelector(state => state.filteredVehicles);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const vehiclesPerPage = 5;

    // Add state for selected brand
    const [selectedBrand, setSelectedBrand] = useState('All');
    const brands = ['All', 'Volkswagen', 'Audi', 'Ford', 'Mercedes', 'BMW'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchVehiclesAction());
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false);
                toast.error(`Data fetch error: ${error.message}`);
            }
        };
        fetchData();
    }, [dispatch]);


    if (isLoading) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }


    // Handle brand filter change
    const handleBrandFilterChange = (brand) => {
        try {
            setSelectedBrand(brand);
            dispatch(filterVehiclesByBrandAction(brand));
            toast.success(`Filtered by ${brand}`);

        } catch (error) {
            toast.error(`Filter error: ${error.message}`);
        }
    };

    const handleSubmitBid = async (values, { resetForm }) => {
        try {
            const { bidAmount, vehicleId } = values;
            const vehicle = vehicles.find(v => v.id === vehicleId);

            // Dispatch the addBid action with necessary data
            await dispatch(addBid(vehicleId, vehicle.details.brand, vehicle.name, vehicle.details.image, vehicle.details.currency, bidAmount));

            resetForm();

            // Navigate to the Bid page after successful submission
            navigate('/bid');
            toast.success('Bid submitted successfully');
        } catch (error) {
            toast.error(`Bid submission error: ${error.message}`);
        }
    };


    //default image
    const defaultBrandImages = {
        Volkswagen: 'https://www.carlogos.org/logo/Volkswagen-logo-2000-1920x1080.png',
    };


    if (error) {
        return <p>Error: {error}</p>;
    }

    const indexOfLastVehicle = currentPage * vehiclesPerPage;
    const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
    const currentVehicles = (filteredVehicles || vehicles).slice(indexOfFirstVehicle, indexOfLastVehicle);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <BrandFilter
                    selectedBrand={selectedBrand}
                    handleBrandFilterChange={handleBrandFilterChange}
                    brands={brands}
                />
            </div>
            {/* Render vehicles */}
            {filteredVehicles && filteredVehicles.length === 0 ? (
                <div className="alert alert-warning mt-3" role="alert">
                    No cars available for the selected brand.
                </div>
            ) : (
                <div className="row pt-3">
                    {(currentVehicles).map((vehicle) => (
                        <VehicleCard
                            key={vehicle.id}
                            vehicle={vehicle}
                            handleSubmitBid={handleSubmitBid}
                            defaultBrandImages={defaultBrandImages}
                        />
                    ))}
                </div>
            )}
            {/* Render pagination */}
            <VehiclePagination 
            pageCount={Math.ceil((filteredVehicles || vehicles).length / vehiclesPerPage)} 
            handlePageChange={handlePageChange} 
            />
        </div>

    );
};

export default Home;