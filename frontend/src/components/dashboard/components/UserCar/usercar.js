import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { FaChevronRight } from 'react-icons/fa'
import styles from './index.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getClickedCar } from '../../../../reducers/carReducer'

export const UserCar = () => {
  const car = useSelector(state => state.cars)
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()
  const clickedCar =(id) => {
    dispatch(getClickedCar(id))
  }

  const carPostedByUser = car.filter(car => car.user.id === user.id)
  return(
    <div>
      {carPostedByUser.length === 0?
        <p>you are yet to list car for sale</p>
        :
        <ListGroup as= 'ol' numbered>
          {
            carPostedByUser.map(car =>
              <ListGroup.Item as = 'li' className="d-flex justify-content-between align-items-start" key ={car.id} onClick={() => clickedCar(car.id)}>
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{car.brand}</div>
                  {car.name}
                </div>
                <FaChevronRight className={styles.carListIcon}/>

              </ListGroup.Item>)
          }
        </ListGroup>
      }
    </div>
  )
}