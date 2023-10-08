import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Tooltip, message } from 'antd'
import Search from 'antd/es/input/Search'
import { firestore } from 'config/firebase';
import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
const { Option } = Select;
const initState = { courseName: '', courseId: '', courseDes: '' }

export default function Courses() {
    const [form] = Form.useForm();
    const [isSubmitLoading, setSubmitLoading] = useState(false);
    const [state, setState] = useState(initState);
    const [courseStatus, setCourseStatus] = useState('')
    const [open, setOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const handleChange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }
    const getCourse = async () => {
        const querySnapshot = await getDocs(collection(firestore, "courses"));
        const coursesArray = []
        querySnapshot.forEach((doc) => {
            coursesArray.push(doc.data())

            setCourses(coursesArray)
        });
    }
    const handleSubmit = async () => {

        const { courseName, courseId, courseDes } = state
        const courseData = {
            id: '',
            courseName,
            courseId,
            courseStatus,
            courseDes,
            createdAt: new Date(),
        }
        console.log(courseData)
        if (courseData.courseName === "") {
            message.warning("Please enter course name")
            return;
        }
        if (courseData.courseId === "") {
            message.warning("Please enter course id")
            return;
        }
        if (courseData.courseStatus === "") {
            message.warning("Please select course status")
            return;
        }
        if (courseData.courseDes === "") {
            message.warning("Please enter course description")
            return;
        }
        setSubmitLoading(true)
        try {
            const docRefAdd = await addDoc(collection(firestore, "courses"), courseData);
            // Update the timestamp field with the value from the server
            const docRef = doc(firestore, 'courses', docRefAdd.id);
            const updateID = await updateDoc(docRef, {
                id: docRef.id
            });
            message.success('Course added successfully');
            setSubmitLoading(false)
            form.resetFields();
        } catch (error) {
            setSubmitLoading(false)
            console.log(error)
        }

    }

    useEffect(() => {
        getCourse()
    }, [])
    return (
        <div className='course-main'>
            <div className="top-side">
                <div className="search">
                    <Search
                        placeholder="Search courses"

                        style={{
                            width: 300,
                        }}
                    />
                </div>
                <div className="add">
                    <Button type="primary" onClick={showDrawer} size='middle' icon={<i className="bi bi-clipboard2-plus"></i>}>
                        Add New Course
                    </Button>
                </div>
            </div>
            <div className="main-side">
                <div className="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Course Name</th>
                                <th scope="col">Course ID</th>
                                <th scope="col">Course Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                courses.map((course, i) => {
                                    return(
                                        <tr key={i}>
                                            <th scope="row">{i+1}</th>
                                            <td>{course.courseName}</td>
                                            <td>{course.courseId}</td>
                                            <td>{course.courseDes}</td>
                                            <td style={{fontSize:'14px'}}>{course.courseStatus=="active"?<Tooltip  title="Active"> <i class="bi bi-check-circle text-success"></i> </Tooltip> : <Tooltip title="Unactive"> <i class="bi bi-x-circle text-danger"></i> </Tooltip>}</td>
                                            <td>
                                            <Space>
                                            <Space>
                                                        <Button type="dashed"  icon={<DeleteOutlined />}  danger />
                                                        <Button type="dashed"   icon={<EditOutlined />} />
                                                    </Space>
                                            </Space>
                                            </td>
                                        </tr>)
                                    
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <Drawer
                title="Add a new course"
                width={620}
                onClose={onClose}
                open={open}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button style={{ backgroundColor: '#62BC47' }} onClick={handleSubmit} type="primary" loading={isSubmitLoading}>
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical"
                    form={form}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="courseName"
                                label="Course Name"
                                rules={[
                                    {
                                        required: true,

                                    },
                                ]}
                            >
                                <Input name="courseName" value={state.courseName} onChange={handleChange} placeholder="Please enter course name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="courseId"
                                label="Course ID"
                                rules={[
                                    {
                                        required: true,

                                    },
                                ]}
                            >
                                <Input name='courseId' value={state.courseId} onChange={handleChange} placeholder="Please enter course id" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose the type',
                                    },
                                ]}
                            >
                                <Select name="courseStatus" onChange={(value) => setCourseStatus(value)} placeholder="Please choose the course status">
                                    <Option value="active">Active</Option>
                                    <Option value="unactive">Unactive</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="courseDes"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'please enter course description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} value={state.courseDes} name='courseDes' onChange={handleChange} placeholder="Please enter course description" />
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Drawer>
        </div>
    )
}
