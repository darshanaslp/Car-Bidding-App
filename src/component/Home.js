import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVehiclesAction, filterVehiclesByBrandAction } from '../redux/actions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { addBid } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

import ReactPaginate from 'react-paginate';

const Home = () => {
    const vehicles = useSelector(state => state.vehicles);
    const filteredVehicles = useSelector(state => state.filteredVehicles);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const vehiclesPerPage = 5;

    // Add state for selected brand
    const [selectedBrand, setSelectedBrand] = useState('All');
    const brands = ['All', ' Volkswagen', 'Audi', 'Ford', 'Mercedes', 'BMW'];

    useEffect(() => {
        dispatch(fetchVehiclesAction());
    }, [dispatch]);


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
            await dispatch(addBid(vehicleId, vehicle.name, vehicle.details.image, vehicle.details.currency, bidAmount));

            resetForm();

            // Navigate to the Bid page after successful submission
            navigate('/bid');
            toast.success('Bid submitted successfully');
        } catch (error) {
            toast.error(`Bid submission error: ${error.message}`);
        }
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
                <div className="col-md-2">
                    <h4>Filter by Brand</h4>
                    <select
                        value={selectedBrand}
                        onChange={(e) => handleBrandFilterChange(e.target.value)}
                        className="form-select"
                    >
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row pt-3">
                {(currentVehicles).map((vehicle) => (
                    <div className="col-sm-3" key={vehicle.id}>
                        <div className="card border-info">
                            <img className="card-img-top" src={vehicle.details.image} alt={vehicle.details.brand} />
                            <div className="card-body">
                                <Link to={`/vehicle/${vehicle.id}`}>
                                    <h5 className="card-title">{vehicle.name}</h5>
                                </Link>
                                <p className="card-text">{vehicle.details.description}</p>
                                <p className="card-text">Price: {vehicle.details.currency} {vehicle.details.price}</p>
                            </div>
                            <div className="card-footer">


                                {/* Bidding Form */}
                                <Formik
                                    initialValues={{ bidAmount: '', vehicleId: vehicle.id }} // Initialize vehicleId
                                    validationSchema={Yup.object({
                                        bidAmount: Yup.number()
                                            .typeError('Bid amount must be a number')
                                            .integer('Bid amount must be an integer')
                                            .min(vehicle.details.price + 1, `Bid must be higher than ${vehicle.details.currency} ${vehicle.details.price + 1}`)
                                            .required('Required'),
                                    })}
                                    onSubmit={handleSubmitBid}
                                >
                                    {({ isValid, touched }) => (
                                        <Form>
                                            <div className="form-group">
                                                <Field
                                                    type="number"
                                                    name="bidAmount"
                                                    placeholder="Enter bid amount"
                                                    className="form-control"
                                                />
                                                <ErrorMessage name="bidAmount" component="div" className="text-danger" />
                                            </div>
                                            <button type="submit" className="btn btn-primary" disabled={!isValid || !touched.bidAmount}>
                                                Submit Bid
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                pageCount={Math.ceil((filteredVehicles || vehicles).length / vehiclesPerPage)}
                onPageChange={handlePageChange}
                size={'lg'}
                color={'primary'}
                shape={'rounded'} 
            />
        </div>
    );
};

export default Home;