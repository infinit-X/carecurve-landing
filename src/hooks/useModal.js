import { useState, useCallback } from 'react';

export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [modalData, setModalData] = useState(null);

  const openModal = useCallback((data = null) => {
    setModalData(data);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Clear data after animation completes
    setTimeout(() => setModalData(null), 300);
  }, []);

  const toggleModal = useCallback((data = null) => {
    if (!isOpen) {
      openModal(data);
    } else {
      closeModal();
    }
  }, [isOpen, openModal, closeModal]);

  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
    toggleModal
  };
};
