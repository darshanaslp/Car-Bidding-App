import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addBid } from '../redux/actions';

import { useNavigate } from 'react-router-dom';

const VehicleDetails = () => {
    const { vehicleId } = useParams();
    const vehicles = useSelector(state => state.vehicles);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const vehicle = vehicles.find(v => v.id === vehicleId);

    if (!vehicle) {
        return <p>Vehicle not found.</p>;
    }

    const handleSubmitBid = (values, { resetForm }) => {
        const { bidAmount } = values;
        dispatch(addBid(vehicleId, vehicle.details.brand, vehicle.details.image, vehicle.details.currency, bidAmount));
        resetForm();
        navigate('/bid');
    };
    

    const { details } = vehicle;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <img className="card-img-top" src={vehicle.details.image} alt={vehicle.details.brand} />
                        <div className="card-body">
                            <h5 className="card-title">{vehicle.details.brand}</h5>
                            <p className="card-text">{vehicle.details.description}</p>
                            <p className="card-text">Price: {vehicle.details.currency} {vehicle.details.price}</p>
                            <div
                                className="color-box"
                                style={{ backgroundColor: details.color, width: '30px', height: '30px', borderRadius: '4px' }}
                            ></div>
                        </div>
                        <div className="card-footer">
                            <Formik
                                initialValues={{ bidAmount: '' }}
                                validationSchema={Yup.object({
                                    bidAmount: Yup.number()
                                        .typeError('Bid amount must be a number')
                                        .integer('Bid amount must be an integer')
                                        .min(vehicle.details.price + 1, `Bid must be higher than ${vehicle.details.currency} ${vehicle.details.price + 1}`)
                                        .required('Bid Required'),
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
            </div>
        </div>
    );
};

export default VehicleDetails;