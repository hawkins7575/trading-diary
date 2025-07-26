import { useState } from 'react'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalData, setModalData] = useState(null)

  const openModal = (data = null) => {
    setModalData(data)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalData(null)
  }

  return {
    isOpen,
    modalData,
    openModal,
    closeModal
  }
}

export const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [confirmData, setConfirmData] = useState({})

  const confirm = ({ title, message, onConfirm, confirmText, cancelText }) => {
    return new Promise((resolve) => {
      setConfirmData({
        title,
        message,
        confirmText,
        cancelText,
        onConfirm: () => {
          onConfirm?.()
          resolve(true)
          setIsOpen(false)
        },
        onCancel: () => {
          resolve(false)
          setIsOpen(false)
        }
      })
      setIsOpen(true)
    })
  }

  const closeModal = () => {
    confirmData.onCancel?.()
  }

  return {
    isOpen,
    confirmData,
    confirm,
    closeModal
  }
}

export const useAlertModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [alertData, setAlertData] = useState({})

  const alert = ({ title, message, type = 'info' }) => {
    setAlertData({ title, message, type })
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    alertData,
    alert,
    closeModal
  }
}