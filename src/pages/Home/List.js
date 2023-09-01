import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import { Badge, Col, Divider, Empty, FloatButton, Form, Input, Modal, Row, Select, Spin, message } from 'antd'
import { Card, CardContent, CardHeader, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { Content } from 'antd/es/layout/layout'
import { firestore } from 'config/firebase';
import { useAuthContext } from 'contexts/AuthContext';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';

export default function List() {
  const param = useParams();
  const listId = param.id;
  const { user } = useAuthContext();
  const [notes, setNotes] = useState([]);
  const [noteListName, setNoteListName] = useState("");
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // Delete Note
  const deleteNote = async (id) => {
    handleCloseNoteMenu()
    await deleteDoc(doc(firestore, "notes", id));
    message.success("Note deleted successfully")
    getNotes()
  }
  const getListName = async () => {
    const q2 = query(collection(firestore, "lists"),
      where("id", "==", listId)
    );
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
     setNoteListName(doc.data().name)
    });
  }
// Get Note
const getNotes = async () => {
    const q2 = query(collection(firestore, "notes"),
      where("noteList", "==", noteListName),
      where("userId", "==", user.uid)
    );
    const array = []
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      array.push(doc.data())
    });
    setNotes(array)
    setLoading(false)
  }
  useEffect(() => {
    getNotes()
    getListName()
  }, [notes])
  const handleClickNoteMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseNoteMenu = () => {
    setAnchorEl(null);
  };
  return (

    <Content className='p-3'>
      <Divider>
        {noteListName}
      </Divider>
      {
        loading == true ?
          <Spin tip="Loading..." size="large" className='my-5'>
            <div className="content" />
          </Spin> :
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
