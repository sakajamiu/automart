import React, { useState } from 'react'
import { Modal, Button,Image } from 'react-bootstrap'
import styles from './index.module.css'
import {  FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { PaystackButton } from 'react-paystack'

function MyVerticallyCenteredModal(props) {
  // eslint-disable-next-line no-undef
  const  publicKey = process.env.REACT_APP_API_KEY
  const amount = props.car.price * 100
  function currencyFormat(num) {
    return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  const componentProps = {
    email: props.user.email,
    amount,
    publicKey,
    text: 'Pay Now',
    onSuccess: () => {
      alert('Thanks for doing business with us! Come back soon!!')
      props.onHide()
    },
    onClose: () => {
      alert('Wait! Don\'t leave :(')
      props.onHide()
    },
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered

    >
      <Modal.Body className={styles.modal}>
        <p><FaTimes onClick={props.onHide} className={styles.close}/></p>
        <div >
          <div className={styles.imageDiv}>
            <Image src={`api/images/${props.car.photo}`} alt='img' fluid/>
          </div>
          <div>
            <h4 className={styles.h4}>{props.car.brand}</h4>
            <h1 className={styles.h1}>{props.car.name}</h1>
            <p className={styles.p}>{props.car.description}</p>
          </div>
          <p>Price:  {currencyFormat(Number(props.car.price))}</p>
          <PaystackButton {...componentProps} className={styles.paystackButton} />

        </div>

      </Modal.Body>
    </Modal>
  )
}

export const Car =  ({ id }) => {
  const [modalShow, setModalShow] = useState(false)
  const car = useSelector(({ cars }) => cars.find(car => car.id === id))
  let user = useSelector(state => state.login)



  return (
    <>
      <Button onClick = {() => setModalShow(true)} className={styles.cardButton}>More Details </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        car = {car}
        user = { user}
      />
    </>
  )
}