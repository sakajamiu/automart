import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import styles from './index.module.css'
import { FaChevronRight, FaTimes } from 'react-icons/fa'
import { createCar } from '../../../../reducers/carReducer'
import { useDispatch } from 'react-redux'

function MyVerticallyCenteredModal(props) {
  const [ newCar, setNewCar] = useState(
    {
      brand : '',
      name: '',
      mileage:'',
      transmission: '',
      location: '',
      description: '',
      price: '',
      photo: '',
    }
  )
  const dispatch =  useDispatch()

  const handleChange = (e) => {
    setNewCar({ ...newCar,[e.target.name] : e.target.value })
  }
  const handlePhoto = (e) => {
    setNewCar({ ...newCar, photo: e.target.files[0] })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('brand', newCar.brand)
    formData.append('name', newCar.name)
    formData.append('mileage',newCar.mileage)
    formData.append('transmission', newCar.transmission)
    formData.append('location', newCar.location)
    formData.append('description', newCar.description)
    formData.append('price', newCar.price)
    formData.append('photo', newCar.photo)
    dispatch(createCar(formData))
    setNewCar({ brand: '', name: '',mileage:'',transmission:'',location:'',description:'',price:'' })
  }
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered

    >
      <Modal.Body className={styles.modal}>
        <p><FaTimes onClick={props.onHide} className={styles.close}/></p>
        <Form className={styles.form} encType ='multipart/form-data' onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type ='text'
              size='sm'
              placeholder='e.g Toyota, Audi, BMW, Honda'
              name='brand'
              value = {newCar.brand}
              onChange = {handleChange}
              required= {true}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type ='text'
              size='sm'
              placeholder='e.g CR-V(2009), accord, sienna'
              name='name'
              value = {newCar.name}
              onChange = {handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mileage</Form.Label>
            <Form.Control
              type ='number'
              size='sm'
              placeholder='enter the car Mileage in KM e.g 10000'
              name='mileage'
              value={newCar.mileage}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Transmission</Form.Label>
            <Form.Control
              type ='text'
              size='sm'
              placeholder='e.g manual, automatic'
              name='transmission'
              value={newCar.transmission}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type ='text'
              size='sm'
              placeholder='e.g Lagos, Abuja, Enugu'
              name='location'
              value = {newCar.location}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as ='textarea'
              size='sm'
              placeholder='descripe the car'
              name='description'
              value={newCar.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type ='number'
              size='sm'
              placeholder='enter the selling price'
              name='price'
              value={newCar.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Photo</Form.Label>
            <Form.Control
              type ='file'
              placeholder='enter the car brand'
              accept=".jpeg, .jpg, .png"
              name='photo'
              onChange={handlePhoto}
              required
            />
          </Form.Group>
          <Button variant='success'type='submit' className={styles.button} onClick ={props.onHide}> Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export const SellCar =  () => {
  const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <div  onClick={() => setModalShow(true)}>
          Sell Car <FaChevronRight className={styles.icon}/>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}