import React, { useState, ReactNode } from 'react'
import '../styles/Modal.css'

interface ModalProps {
  children: ReactNode
  showModal: boolean
  setShowModal: (value: boolean) => void
}

const Modal = ({ children, showModal, setShowModal }: ModalProps) => {
  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-button-container">
              <button className="close" onClick={closeModal}>
                &times;
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default Modal
