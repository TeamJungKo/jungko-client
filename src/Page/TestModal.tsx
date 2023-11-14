//modal test용 임시 페이지
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ProductDetail from '../Components/ProductDetail'; // Adjust the import path as necessary

const TestModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <Button variant="contained" onClick={handleOpenModal}>
        Open Product Details
      </Button>

      {/* ProductDetail modal */}
      <ProductDetail isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default TestModal;
