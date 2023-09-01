import { Descriptions, Divider } from 'antd'
import { useAuthContext } from 'contexts/AuthContext'
import React from 'react'

export default function Profile() {
    const {user} = useAuthContext();
    console.log(user.displayName)
    
  return (
    <div className='p-4'>
      <Divider style={{fontSize:20}}>
        User Info
      </Divider>
      <span style={{fontSize:14}}>Username: <b style={{fontSize:24}}>{user.displayName}</b></span>
      <br/>
      <span style={{fontSize:14}}>Email: <b style={{fontSize:24}}>{user.email}</b></span>
    </div>
  )
}
