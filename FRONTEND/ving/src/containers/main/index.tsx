
import MainPage from './MainPage'
import Logout from '../auth/Logout'
import Chat from '@/components/Chat'
import * as styles from './index.css'

export default function Main() {

  return (
    <div>
      <div className={styles.test}>
        <MainPage />
        <Chat />        
      </div>
      {/* <Logout /> */}
    </div>
  )
}