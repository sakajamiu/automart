import React, { useEffect } from 'react'
import styles from './index.module.css'
import DesktopView from './components/DesktopView'
import { getAllCar } from '../../reducers/carReducer'
import { useDispatch } from 'react-redux'
import useMediaQuery from '../../utilities/mediaQuery'
import  MobileView from './components/mobileView'

export const Dashboard  = ( ) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCar())
  }, [dispatch])
  return (
    <div className={styles.dashboard}>
      {
        isMobile? <MobileView/>:  <DesktopView/>
      }

    </div>
  )
}