import React, { useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { ReactComponent as Logo } from '../../.././../images/logo.svg'
import styles from './index.module.css'
import SellCar from '../SellCar'
import Cars from '../Cars'
import UserProfile from '../UserProfile'
import UserCar from '../UserCar'
import Search from '../Search'
import LogOut from '../../../../utilities/logOut'
import { useDispatch } from 'react-redux'
import { getAllCar } from '../../../../reducers/carReducer'

export const DesktopView = () => {
  const [showCar, setShowCar] = useState ( true)
  const dispatch = useDispatch()
  const fetchAllCars = () => {
    dispatch(getAllCar())
  }
  return(
    <div className={styles.container}>
      <Row>
        <Col md ={3} className ={styles.col1} onClick = {() => fetchAllCars()}>
          <Logo className={styles.logo} /> Auto Mart
        </Col>
        <Col md ={6} className ={styles.col2}>
          <Search/>
        </Col>
        <Col md = {3} className ={styles.col3}>
          <UserProfile/>
          <LogOut className={styles.logOut}/>
        </Col>
      </Row>
      <Row>
        <Col md = {3} className ={styles.Col}>
          <Row className={styles.row}>
            <SellCar/>
          </Row>
          <Row
            onClick={() => setShowCar(!showCar)}
            className={styles.row}
          >
            <p>  Your car  { showCar ?
              <FaChevronUp className={styles.divIcon}/>
              :
              <FaChevronDown className={styles.divIcon}/>}</p>

          </Row>
          <Row className={styles.row}>
            {showCar? <UserCar/>: null}
          </Row>

        </Col>
        <Col className={styles.colCar}>
          <Cars/>
        </Col>
      </Row>
    </div>
  )
}