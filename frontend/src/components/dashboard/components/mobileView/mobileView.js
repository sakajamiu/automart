import React  from 'react'
import { Row, Col } from 'react-bootstrap'
import { ReactComponent as Logo } from '../../../../images/logo.svg'
import { useDispatch } from 'react-redux'
import UserProfile from '../UserProfile'
import styles from './index.module.css'
import SideBar from '../SideBar'
import Search from '../Search'
import Cars from '../Cars'
import { getAllCar } from '../../../../reducers/carReducer'

export const mobileView  = () => {
  const dispatch = useDispatch()
  const fetchCars = () => {
    dispatch(getAllCar())
  }
  return(
    <div>
      <Row className={styles.Row1}>
        <Col xs ={4} className={styles.col1}><SideBar/></Col>
        <Col xs = {4}><Logo className={styles.logo} onClick={fetchCars}/></Col>
        <Col xs={4} className={styles.col3}><UserProfile/></Col>
      </Row>
      <Row className={styles.Row2}>
        <Col className={styles.col}>
          <Search/>
        </Col>
      </Row>
      <Row className={styles.Row3}>
        <Col className={styles.colCar}>
          <Cars/>
        </Col>

      </Row>
    </div>
  )
}
