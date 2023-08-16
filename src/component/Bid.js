import React from 'react';
import { useSelector,useDispatch  } from 'react-redux';
import { clearBidsAction,removeBidAction } from '../redux/actions';

import {toast } from 'react-toastify';

const Bid = () => {
  const bids = useSelector(state => state.bids);
  const dispatch = useDispatch();

  // Calculate the total price of all bids
  const totalPrice = bids.reduce((total, bid) => total + bid.amount, 0);

   // Function to handle clearing bids
   const handleClearBids = () => {
    dispatch(clearBidsAction()); // Dispatch the clearBidsAction to clear bids
    toast.success(`clear all Bidd successfully`);
  };

  const handleRemoveBid = (vehicleId) => {
    dispatch(removeBidAction(vehicleId));
    toast.success(`remove bidd sucesfully`);
  };

  return (
    <div className="container mt-4">
    <h2>Bidding Information</h2>
    <div className="row">
      {bids.map((bid) => (
        <div className="col-sm-3" key={bid.vehicleId}>
          <div className="card">
          <img className="card-img-top" src={bid.image} alt={bid.brand} />
            <div className="card-body">
              <h5 className="card-title">{bid.name}</h5>
              <p className="card-text">Bid Amount: {bid.currency} {bid.amount}</p>
            </div>
            <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveBid(bid.vehicleId)}
                >
                  Remove
                </button>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-4">
      <h4>Total Price: {totalPrice}</h4>
      <button className="btn btn-danger mb-2" onClick={handleClearBids}>
        Clear All Bids
      </button>
    </div>
  </div>
  );
};

export default Bid;