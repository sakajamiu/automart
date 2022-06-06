import React from 'react'
import { Row, Card } from 'react-bootstrap'
import styles from './index.module.css'
import Notification from '../../../../utilities/alert'
import { useSelector } from 'react-redux'
import CarDetails  from '../CarDetails'
import DeleteCar from '../DeleteCar'

export const Cars = () => {
  const car = useSelector(state => state.cars)
  const user = useSelector(state => state.login)

  function currencyFormat(num) {
    return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  return (
    <Row className={styles.cardRow}>
      <Notification/>
      {
        car.map(car =>
          <Card key ={car.id} className={styles.card}>
            <h6 className={styles.cardTitle}>{car.brand} - {car.name}</h6>
            <Card.Img src={`/api/images/${car.photo}`} alt='img' className={styles.cardImg}/>
            <p className={styles.p}>
              <span>Mileage: {car.mileage}KM</span>
              <span className={styles.cardSpanRight}>Location: {car.location}</span>
            </p>
            <p className={styles.p}>
              Transmission: {car.transmission}
            </p>
            <p>{currencyFormat(Number(car.price))}
              {
                user.id === car.user.id ?<DeleteCar id ={car.id}/>
                  :
                  <CarDetails id={ car.id }/>
              }
            </p>
          </Card>
        )
      }
    </Row>
  )
}