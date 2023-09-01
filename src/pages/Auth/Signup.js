import { Button, Col, Divider, Form, Input, Row, message } from 'antd'
import React, {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {auth, firestore} from '../../config/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore"; 


export default function Signup() {
  const [form] = Form.useForm()
  const [isProccessing, setIsProccessing] = useState(false)
  const navigate = useNavigate();
  const [values,setValue] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const hundleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsProccessing(true)
      const { fullname, email, password } = values
      createUserWithEmailAndPassword(auth, email, password)
      .then(async(getUser) => {
        const user = getUser.user;
        await updateProfile(user,{
          displayName: fullname
        })
        
        const storeUser = {
          uid:user.uid,
          fullname:user.displayName,
          email:user.email,
          photoURL:user.photoURL,
          createdAt:user.metadata.creationTime
        }
        createUser(storeUser)
        setIsProccessing(false)
        message.success("Create an account successfully")
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
  const createUser = async (user) => {
    try {
      await setDoc(doc(firestore, "users",user.uid), user);
    } catch (e) {
      console.error("Error adding document: ", e);
      return;
    }

  }
  return (
    <div className='auth-page'>
      <div className="auth-box col-5 rounded">
      <h3 className='text-center'>Create an Account</h3>
      <Form layout='vertical' form={form}>
        <Form.Item 
      label="Full Name"
      name="fullname"
      rules={[
        {
          required: true,
          message: 'Please input your full name',
        },
      ]}
      
      >
      <Input placeholder="Enter your full name" 
      onChange={e=>setValue((prev)=>({...prev,fullname:e.target.value}))} />
      </Form.Item>

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
      <Input placeholder="Enter your email"
      onChange={e=>setValue((prev)=>({...prev,email:e.target.value}))} />
      </Form.Item>
      <Row gutter={16}>
      <Col xs={24} lg={12}>
      <Form.Item 
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input password',
        },
      ]}
      
      >
      <Input.Password placeholder="Enter password" 
      onChange={e=>setValue((prev)=>({...prev,password:e.target.value}))}
      />
      </Form.Item>
      </Col>
      <Col xs={24} lg={12}>
      <Form.Item 
      label="Confirm Password"
      name="confirmPassword"
      rules={[
        {
          required: true,
          message: 'Please input confirm password',
        },
      ]}
      
      >
      <Input.Password placeholder="Enter confirm password" 
      onChange={e=>setValue((prev)=>({...prev,confirmPassword:e.target.value}))}/>
      </Form.Item>
      </Col>
      </Row>
      <Row>
        <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }}>
        <Form.Item>
        <Button type="primary" htmlType='submit' className='w-100' loading={isProccessing} onClick={hundleSubmit}>Sign Up</Button>
      </Form.Item>
        </Col>
      </Row>
      </Form>
      </div>
      <div className="mt-2 col-5 border-1 border-secondary rounded" style={{borderStyle:'dashed'}}>
        <Divider>Already have an account? <Link to="/auth/login">Login.</Link></Divider>
      </div>
    </div>
  )
}
