
import { Header } from 'antd/es/layout/layout'
import React from 'react'
import logo  from '../../../assets/img/logo.png'
export default function index() {
    
  return (
    <Header
          style={{
            padding: 20,
            background: "white",
            position:"sticky",
            display:'flex',
            alignItems:'center',
          }}
    >
    <img src={logo} alt="logo" className='img-fuild rounded-circle mx-2' style={{width:'50px',}}/><h5 className='text-center'>Sticky Wall</h5>
    </Header>
  )
}
