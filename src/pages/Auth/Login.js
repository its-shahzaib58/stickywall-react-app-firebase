import { Button, Col, Divider, Form, Input, Row, message } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {auth} from '../../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
export default function Login() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isProccessing, setIsProccessing] = useState(false)
  const [values,setValue] = useState({
    email: '',
    password: '',
  });
  // Login
  const hundleLogin = async () => {
    try {
      const values = await form.validateFields();
      setIsProccessing(true)
      const {email, password } = values
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsProccessing(false)
        message.success("Login successfully")
        navigate('/')
      })
      .catch((error) => {
        setIsProccessing(false)
        message.error(error.message)
    // ..
  });
    } catch (errorInfo) {
      message.error("Please fill up all fields.")
      setIsProccessing(false)
      return;
    }
   
  };
  return (
    <div className='auth-page'>
      <div className="auth-box col-4 rounded">
      <Divider>WELCOME OUR SITE</Divider>
      <h3 className='text-center'>Please Login</h3>
      <Form layout='vertical' form={form}>

      <Form.Item 
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email',
        },
      ]}
      
      >
      <Input placeholder="Enter your email" onChange={e=>setValue((prev)=>({...prev,email:e.target.value}))} />
      </Form.Item>
      <Col xs={24} lg={24}>
      <Form.Item 
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password',
        },
      ]}
      
      >
      <Input.Password placeholder="Enter password" onChange={e=>setValue((prev)=>({...prev,email:e.target.value}))} />
      </Form.Item>
      </Col>
      <Row>
        <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }}>
        <Form.Item>
        <Button type="primary" htmlType='submit' className='w-100' loading={isProccessing} onClick={hundleLogin}>Login</Button>
      </Form.Item>
        </Col>
      </Row>
      </Form>
      </div>
      <div className="mt-2 col-4 border-1 border-secondary rounded" style={{borderStyle:'dashed'}}>
        <Divider>New to our site? <Link to="/auth/reg">Create an account.</Link></Divider>
      </div>
    </div>
  )
}
