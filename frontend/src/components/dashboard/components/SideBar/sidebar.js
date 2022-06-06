import React, { useState } from 'react'
import { Offcanvas, Row }  from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import styles from './index.module.css'
import { useSelector } from 'react-redux'
import SellCar from '../SellCar'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import UserCar from '../UserCar'
import LogOut from '../../../../utilities/logOut'

export const sideBar = () => {
  const [show, setShow] = useState(false)
  const user = useSelector(state => state.login)
  const [showCar, setShowCar] = useState ( true)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <FaBars variant="primary" onClick={handleShow} className={styles.icon}/>
      <Offcanvas show={show} onHide={handleClose} className={styles.offCanvas}>
        <Offcanvas.Header closeButton className={styles.title}>
          <Offcanvas.Title> Hi, {user.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row className={styles.Row}>
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
          <Row className={styles.row} onClick={handleClose}>
            {showCar? <UserCar/>: null}
          </Row>
          <Row className={styles.row}>
            <LogOut/>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}