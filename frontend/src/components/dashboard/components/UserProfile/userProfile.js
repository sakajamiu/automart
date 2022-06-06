import React from 'react'
import styles from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../../../reducers/signUpReducer'
import { FaUserEdit } from 'react-icons/fa'
import { Image , Form } from 'react-bootstrap'
import useMediaQuery from '../../../../utilities/mediaQuery'

export const UserProfile = () => {
  const dispatch = useDispatch()
  let user = useSelector(state => state.login)
  const handleFIle = React.useRef(null)
  const handleClick =  () => {
    handleFIle.current.click()
  }
  const handleSubmit = (e) => {
    const userPhoto = e.target.files[0]
    const formData = new FormData()
    formData.append('photo', userPhoto)
    dispatch(updateUser(formData))

  }
  const isMobile = useMediaQuery('(max-width: 768px)')

  return(
    <div className={styles.div}>
      {user!== null?
        user.photo === undefined ?
          <>
            <FaUserEdit className={styles.userIcon} onClick={handleClick} />
            <Form.Control
              type='file'
              accept="image/gif,image/jpeg,image/jpg,image/png"
              className={styles.inputForm}
              ref={handleFIle}
              onChange={handleSubmit} />
          </>
          :
          <Image src={`/api/images/${user.photo}`} alt ='img' fluid roundedCircle className={styles.userProfile}/>
        :null

      }

      {' '}
      {
        isMobile? null :
          <span className={styles.span}>{user ? user.name : null}</span>
      }

    </div>
  )
}