import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import { Card, CardContent, CardHeader, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { Col, Divider, Empty, Row, Spin, Tooltip, message } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { firestore } from 'config/firebase';
import { useAuthContext } from 'contexts/AuthContext';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

export default function Today() {
  const { user } = useAuthContext();
  const dayjs = require('dayjs');
  const [notes, setNotes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [loading, setLoading] = useState(true);
  // const filterNotes = notes.filter((note => note.userId == user.uid ))
  // Delete Note
  const deleteNote = async (id) => {
    await deleteDoc(doc(firestore, "notes", id));
    message.success("Note deleted successfully")
    getTodayNotes()
    handleCloseNoteMenu()
  }
  // Get Notes
  const getTodayNotes = async () => {

    const q2 = query(collection(firestore, "notes"), where("noteDate", "==", dayjs(new Date()).format('YYYY-MM-DD')), where("userId", "==", user.uid));
    const array = []
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      array.push(doc.data())
      setLoading(false)
    });
    setNotes(array)
  }
  useEffect(() => {
    getTodayNotes()
  }, [notes])
  const handleClickNoteMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseNoteMenu = () => {
    setAnchorEl(null);
  };
  return (
    <Content className='px-3'>
      <Divider>
        Today Note's
      </Divider>
      {
        loading == true ?
          <Spin tip="Loading..." size="large" className='my-5'>
            <div className="content" />
          </Spin> :
          <Row gutter={10}>
            {
              notes == "" ?
                <Content >
                  <Empty />
                </Content>
                :
                notes.map((note, i) => {
                  return (
                    <Col span={8} className='my-1'>
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
                        </CardContent>
                      </Card>
                    </Col>
                  )
                })}

          </Row>
      }
    </Content>
    
  )
}
