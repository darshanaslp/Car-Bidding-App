import React from 'react';
import ReactPaginate from 'react-paginate';

const VehiclePagination = ({ pageCount, handlePageChange }) => {
  return (
    <div className='pt-2'>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        containerClassName={'pagination'}
        activeClassName={'active'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        activeLinkClassName={'active'}
        pageClassName={'page-link'}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default VehiclePagination;