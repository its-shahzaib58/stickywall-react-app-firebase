import { DeleteOutlined, PlusCircleOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import { Badge, Col, ColorPicker, DatePicker, Divider, Empty, FloatButton, Form, Input, Modal, Row, Select, Spin, message } from 'antd'
import { Card, CardContent, CardHeader, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { Content } from 'antd/es/layout/layout';
import { firestore } from 'config/firebase';
import { useAuthContext } from 'contexts/AuthContext';
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

export default function StickyWall() {
  const { user } = useAuthContext();
  const [openModal, setModalOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const [isNoteLoading, setIsNoteLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noteName, setNoteName] = useState("");
  const [noteList, setNoteList] = useState("");
  const [noteDate, setNoteDate] = useState("");
  const [noteColor, setNoteColor] = useState("");
  const [noteDec, setNoteDec] = useState("");
  const [notes, setNotes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { Option } = Select;

  const noteObject = {
    id: Math.random().toString(36).slice(2),
    noteName,
    noteList,
    noteDate,
    noteColor,
    noteDec,
    userId: user.uid,
    createdAt: new Date(),
  }

  // Add Note
  const addTodo = async () => {
    setIsNoteLoading(true)
    if (noteName == "") {
      message.warning("Please enter note title");
      setIsNoteLoading(false)
      return;
    }
    if (noteList == "") {
      message.warning("Please select note list");
      setIsNoteLoading(false)
      return;
    }
    if (noteDate == "") {
      message.warning("Please select note date");
      setIsNoteLoading(false)
      return;
    }
    if (noteColor == "") {
      message.warning("Please select note colour");
      setIsNoteLoading(false)
      return;
    }
    if (noteDec == "") {
      message.warning("Please enter note description");
      setIsNoteLoading(false)
      return;
    }
    try {
      await setDoc(doc(firestore, "notes", noteObject.id), noteObject);
      message.success("Note added successfully")
      setModalOpen(false)
      setIsNoteLoading(false)
      getNotes()
    } catch (e) {
      message.error("Somthing went wrong adding a note!")
      setIsNoteLoading(false)
      return;
    }
  }
  // Get Note
  const getNotes = async () => {
    const q2 = query(collection(firestore, "notes"), where("userId", "==", user.uid));

    const array = []
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      array.push(doc.data())
    });
    setNotes(array)
    setLoading(false)
  }
  const getList = async () => {
    const q = query(collection(firestore, "lists"), where("userId", "==", user.uid));
    const q2 = query(collection(firestore, "lists"), where("userId", "==", "all"));

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
  const showShowModal = () => {
    setModalOpen(true)
    getList()
  }
  const hideModal = () => {
    setModalOpen(false)
  }
  // Delete Note
  const deleteNote = async (id) => {
    handleCloseNoteMenu()
    await deleteDoc(doc(firestore, "notes", id));
    message.success("Note deleted successfully")
    getNotes()
  }
  useEffect(() => {
    getNotes()
  }, [])

  const handleClickNoteMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseNoteMenu = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Modal
        title="Add New Sticky Note"
        width={700}
        style={{
          top: 20,
        }}
        confirmLoading={isNoteLoading}
        okText="Add"
        open={openModal}
        onOk={() => addTodo()}
        onCancel={() => hideModal()}
      >
        <Divider />
        <Form
          layout='vertical'
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label="Note Name"
                required
              >
                <Input placeholder='Enter note title' onChange={(e) => setNoteName(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Select note list"
                required
              >
                <Select
                  placeholder="Select a list"
                  allowClear
                  onChange={value => { setNoteList(value) }}
                  required
                >
                  {lists.map((list, i) => {
                    return (
                      <Option key={i} value={list.name}><Badge color={list.color} text={list.name} /></Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label="Note Date"
                required
              >
                <DatePicker onChange={(date, dateString) => { setNoteDate(dateString) }} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Select note colour"
                required
              >
                <ColorPicker onChange={(color, string) => setNoteColor(string)} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Note Description"
                required
              >
                <Input.TextArea placeholder='Enter note description' onChange={e => { setNoteDec(e.target.value) }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      
      
      <Content className='px-3'>
      <FloatButton
        shape="circle"
        type="primary"
        tooltip="Add a Note"
        style={{
          right: 50,

        }}
        icon={<PlusCircleOutlined className='fw-bold h5'/>}
        onClick={showShowModal}
      />
      {/* <Fab sx={
        {
          position: 'fixed',
          bottom: 20,
          right: 20,
        }
      }
        size="medium"
        color="primary" aria-label="add"
        onClick={showShowModal}
        >
        <PlusCircleOutlined style={{ fontSize: 25 }} />
      </Fab> */}
        <Divider>
          Your Note's
        </Divider>
        {
          loading == true ?
            <Spin tip="Loading..." size="large" className='my-5'>
              <div className="content" />
            </Spin>

            :
            <Row gutter={10}>
              {
                notes <= 0 ?
                  <Content >
                    <Empty />
                  </Content>
                  :
                  notes.map((note, i) => {
                    return (
                      <Col span={8} className='my-1' key={i}>
                        <Card style={{ backgroundColor: note.noteColor, height: "300px" }}>
                          <CardHeader
                            action={
                              <IconButton aria-label="settings">
                                <MoreOutlined onClick={handleClickNoteMenu} />
                                <Menu
                                  id="basic-menu"
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleCloseNoteMenu}
                                  MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                  }}
                                >
                                  <MenuItem onClick={handleCloseNoteMenu}>
                                    <ListItemIcon>
                                      <EditOutlined />
                                    </ListItemIcon>
                                    <ListItemText>Edit</ListItemText>
                                  </MenuItem>
                                  <MenuItem onClick={() => deleteNote(note.id)}>
                                    <ListItemIcon>
                                      <DeleteOutlined />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                  </MenuItem>
                                </Menu>
                              </IconButton>
                            }
                            title={note.noteName}
                            subheader={note.noteDate}

                          />
                          <CardContent className='scroll-hide' style={{ height: "150px" }}>
                            <Typography variant="body2" color="text.secondary">
                              {note.noteDec}
                            </Typography>
                            <div className='p-1'>
                              List: <b>{note.noteList}</b>
                              </div>
                          </CardContent>
                         
                        </Card>
                      </Col>
                    )
                  })}
            </Row>
        }
      </Content>
    </>
  )
}
