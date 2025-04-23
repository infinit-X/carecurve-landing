import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Portal from './Portal';
import './Modal.css';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  size = 'medium',
  closeOnOverlayClick = true
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal containerId="modal-root">
      <AnimatePresence>
        <div className="modal-container" role="dialog" aria-modal="true">
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnOverlayClick ? onClose : undefined}
          />
          
          <motion.div
            ref={modalRef}
            className={`modal-content modal-${size}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="modal-header">
              {title && <h2 className="modal-title">{title}</h2>}
              <button 
                className="modal-close"
                onClick={onClose}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              {children}
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </Portal>
  );
};

export default Modal;
