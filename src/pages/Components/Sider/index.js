
import { useAuthContext } from '../../../contexts/AuthContext'
import { Badge, Button, Col, ColorPicker, Divider, Form, Input, List, Menu, Modal, Row, Skeleton, Tooltip, Typography, message } from 'antd';
import { signOut } from 'firebase/auth';
import { auth, firestore } from '../../../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarOutlined, DeleteOutlined, DoubleRightOutlined, FileOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusCircleOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

const initialState = { listName: '', };
export default function Sider() {
    const { dispatch, user } = useAuthContext();
    const [lists, setLists] = useState([]);
    const [addList, setAddList] = useState("");
    const [listColor, setListColor] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [state, setState] = useState(initialState)
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const hideModal = () => {
        setOpenModal(false)
    }
    const showModal = () => {
        setOpenModal(true)
    }
    const key = addList.toLowerCase()
    // Add List
    const { listName, } = state;
    const listData = {
        id: Math.random().toString(36).slice(2),
        name: listName,
        color: listColor,
        userId: user.uid,
        createdAt: new Date()
    }
    const addListFunction = async () => {
        try {
            await setDoc(doc(firestore, "lists", listData.id), listData);
            hideModal()
            setState(initialState)
        } catch (e) {
            console.error("Error adding document: ", e);
            return;
        }
    }
    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
        console.log(listData)
    }
    // Get Lists
    const getList = async () => {
        const q = query(collection(firestore, "lists"), where("userId", "==", "all"));
        const q2 = query(collection(firestore, "lists"), where("userId", "==", user.uid));

        const array = []
        const querySnapshot = await getDocs(q);
        const querySnapshot2 = await getDocs(q2);
        querySnapshot.forEach((doc) => {
            array.push(doc.data())
        });
        querySnapshot2.forEach((doc) => {
            array.push(doc.data())
        });
        setLists(array)

    }
    // Show Lists
    useEffect(() => {
        getList()
    }, [lists])
    // Delete List
    const deleteList = async (id) => {
        await deleteDoc(doc(firestore, "lists", id));
    }
    // Logout
    const handleLogout = () => {
        signOut(auth).then(() => {
            message.success("Thanks for visit our site")
            dispatch({ type: 'SET_LOGGED_OUT' });
            navigate('/auth/login')

        }).catch((error) => {
            message.error(error.message)
        });
    }
    return (
        <div className='p-2'>

            <div>
                <Divider style={{ fontSize: 24 }}>
                    Menu
                </Divider>
            </div>
            <Typography.Title level={5}>
                TASKS
            </Typography.Title>
            <Menu className='bg-light'
                onClick={({ key }) => {
                    navigate(key)
                }}
                style={{
                    fontSize: '14px',

                }}
                items={[
                    {
                        label: 'Upcoming',
                        key: '/upcoming',
                        icon: <DoubleRightOutlined />,
                    },
                    {
                        label: 'Today',
                        key: '/today',
                        icon: <MenuUnfoldOutlined />,
                    },
                    {
                        label: 'Calendar',
                        key: '/calendar',
                        icon: <CalendarOutlined />,
                    },
                    {
                        label: 'Sticky Wall',
                        key: '/',
                        icon: <FileOutlined />,
                    },

                ]} />

            {/* Lists */}
            <Typography.Title level={5}>
                LISTS
            </Typography.Title>
            <div className="list-div scroll-hide p-1" style={{ height: '90px' }}>
                {
                    lists == "" ?
                        <Skeleton active />
                        :
                        <ul className="list-group ">
                            {lists.map((list, i) => {
                                return (
                                    <div key={i} className=''>
                                        <li className="list-group-item d-flex justify-content-between align-items-center mt-1 rounded bg-light " style={{ height: '40px' }}>
                                            <Link to={`/list/${list.id}`}>
                                                <Badge color={list.color} text={list.name} />
                                            </Link>
                                            {
                                                list.userId !== "all" ?
                                                    <span onClick={() => deleteList(list.id)} className="badge bg-primary rounded-pill" ><DeleteOutlined style={{ fontSize: 14, cursor: 'pointer' }} /></span>
                                                    : <></>
                                            }
                                        </li>
                                    </div>
                                )
                            })}
                        </ul>
                }
            </div>
            <Modal
                title="Add New List"
                open={openModal}
                onOk={addListFunction}
                onCancel={hideModal}
                okText="Add"
                cancelText="Cancel"
            >
                <Divider />
                <Form layout='vertical'>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Enter list title:" required>
                                <Input placeholder='Enter list title' value={state.listName} name='listName' onChange={handleChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7} className=''>
                            <Form.Item label="Select list colour:" required>
                                <ColorPicker value={listColor} onChange={(color, string) => setListColor(string)} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Button block type='dashed' onClick={showModal} className='mt-4'>Add New List</Button>
            <Divider />
            {/* Options */}
            <Menu className='bg-light'
                onClick={({ key }) => {
                    if (key === 'logout') {
                        handleLogout()
                    } else {
                        navigate(key)
                    }
                }}
                style={{
                    fontSize: '15px',
                    marginTop: 0
                }}
                items={[
                    {
                        label: 'Profile',
                        key: '/profile',
                        icon: <UserOutlined />,

                    },
                    {
                        label: 'Logout',
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        danger: true
                    }
                ]} />
        </div>
    )
}
