import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const VehicleCard = ({ vehicle, handleSubmitBid, defaultBrandImages }) => {
  return (
    <div className="col-sm-3" key={vehicle.id}>
      <div className="card border-info">
        <img className="card-img-top" src={vehicle.details.image || defaultBrandImages[vehicle.details.brand]} alt={vehicle.details.brand} />
        <div className="card-body">
          <Link to={`/vehicle/${vehicle.id}`}>
            <h5 className="card-title">{vehicle.name}</h5>
          </Link>
          <p className="card-text">{vehicle.details.description}</p>
          <p className="card-text">Price: {vehicle.details.currency} {vehicle.details.price}</p>
        </div>
        <div className="card-footer">
          <Formik
            initialValues={{ bidAmount: '', vehicleId: vehicle.id }}
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
  );
};

export default VehicleCard;