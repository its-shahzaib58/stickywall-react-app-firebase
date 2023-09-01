
import {Col, Row} from 'antd';
import {Route, Routes, } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
// Components
import Sider from '../Components/Sider';
import Header from '../Components/Header';
import Profile from './Profile'
import StickyWall from '../Home/StickyWall'
import Upcoming from '../Home/Upcoming'
import Today from '../Home/Today'
import Calcendar from '../Home/Calcendar'
import List from './List';

export default function Home() {
  return (
    <div className="main-app">
     <Row 
     style={{
      height:'100vh',
      padding:20
    }}
     >
      {/* Sider */}
      <Col span={6} className='bg-light'
        style={{
          borderRadius:'20px',
          alignItems:'center',
          padding:5,
        }}
        >
        <Sider/>

        </Col>
        <Col span={18} className='bg-white px-2'>
          {/* Header */}
          <Row className='bg-white border-shadows' 
          style={{
            height:'80px',
            borderRadius:'20px',
            alignItems:'center',
            padding:10,
          }}
          >
            <Header />
          </Row>
          <Row className='mt-2 border-shadows scroll-hide'
          style={{
            height:'80vh',
            borderRadius:'20px',
            padding:10,
          }}
          >
          <Content>
          <Routes>
            <Route path='/upcoming' element={<Upcoming/>}/>
            <Route path='/today' element={<Today/>}/>
            <Route path='/calendar' element={<Calcendar/>}/>
            <Route path='/list/:id' element={<List/>}/>
            <Route path='/' element={<StickyWall/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
          </Content>
          </Row>
        </Col>
     </Row>
    </div>
  )
}
