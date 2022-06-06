import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteCar, getAllCar } from '../../../../reducers/carReducer'
import styles from './index.module.css'

export const removeCar = ({ id }) => {
  const dispatch = useDispatch()
  const removeCar = () => {
    dispatch(deleteCar(id))
    dispatch(getAllCar())
  }


  return <Button variant='danger' onClick={() => removeCar()} className={styles.button}>Delete</Button>
}