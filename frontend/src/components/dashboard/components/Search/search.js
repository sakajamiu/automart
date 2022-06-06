import React from 'react'
import { Form } from 'react-bootstrap'
import styles from './index.module.css'
import { FaSearch } from 'react-icons/fa'
import { searchCar, getAllCar } from '../../../../reducers/carReducer'
import { useDispatch } from 'react-redux'
export const Search = () => {
  const dispatch = useDispatch()
  const search = (event) => {
    dispatch(searchCar(event.target.value))
    if(event.target.value.length === 0){
      dispatch(getAllCar())
    }

  }
  return (
    <Form className={styles.form}>
      <div>
        <FaSearch className={styles.searchIcon}/>
        <Form.Control
          type='text'
          placeholder='search by car brand e.g BMW, Tesla'
          className={styles.input}
          onChange ={search}
        />
      </div>
    </Form>
  )
}