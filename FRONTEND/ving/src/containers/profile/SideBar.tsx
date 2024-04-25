import React from 'react'
import * as styles from './index.css'
import { columnbox, rowbox } from '@/styles/box.css'

export default function SideBar() {

  const users = [
    {"user_id" : 1 , "nickname" : "상범갓", "photo" : 'https://picsum.photos/id/1/200/300'},
    {"user_id" : 2 , "nickname" : "상범신", "photo" : 'https://picsum.photos/id/1/200/300'},
    {"user_id" : 3 , "nickname" : "상범갓그자체", "photo" : 'https://picsum.photos/id/1/200/300'},
    {"user_id" : 4 , "nickname" : "상범신그자체", "photo" : 'https://picsum.photos/id/1/200/300'},
    {"user_id" : 5 , "nickname" : "상범god", "photo" : 'https://picsum.photos/id/1/200/300'},
    {"user_id" : 6 , "nickname" : "상범omg", "photo" : 'https://picsum.photos/id/1/200/300'},
    {"user_id" : 7 , "nickname" : "갓상범", "photo" : 'https://picsum.photos/id/1/200/300'},
  ]

  return (
    <div className="menu">
      <label htmlFor="expand-menu"><div>랭킹</div></label>
      <input type="checkbox" id="expand-menu" name="expand-menu" />
      <ul className={styles.rankOutBox}>
      {users.map((user) => (
        <li key={user.user_id} className={styles.rankList}>
          <div className={`${rowbox} ${styles.rankListBox}`}>
            <div className={styles.rankNumber}>
              {user.user_id}
            </div>
            <div>
              <img src={user.photo} className={styles.rankerImage}></img>
            </div>
            <div className={`${columnbox}`}>
              <a href="#" className="item">
                <div>
                  <p>{user.nickname}</p>
                </div>
              </a>
            </div>
          </div>
        </li>
      ))}
      </ul>
    </div>
  )
}
