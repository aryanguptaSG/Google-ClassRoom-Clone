import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "axios"

export default function ShareSomething({ shareModal, CloseshareModal, classid, Teacher ,setRefresh}) {
    const [Title, setTitle] = useState(null);
    const [Content, setContent] = useState(null);
    const [Links, setLinks] = useState(null);
    const [File, setFile] = useState(null);
    const [FileType, setFileType] = useState(null);

    const urlify= (text)=>{
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function(url) {
          return '<a href="' + url + '" target="_blank">' + url + '</a>';
        })
      }

    const sendMaterial = (e) => {
        e.preventDefault();
        if (Title.trim().length > 0 && Content.trim().length > 0) {
            if (File) {
                if (FileType) {
                    const formdata = new FormData()
                    formdata.append("media", File[0])
                    axios.post("http://localhost:3001/material/uploadmedia", formdata).then(result => {
                        console.log(result.data.url)
                        const data = {
                            title: Title,
                            content: urlify(Content),
                            link: Links,
                            mediaurl: result.data.url,
                            mediatype: FileType,
                            class: classid,
                            teacher: Teacher,
                            message: [],
                            authToken: localStorage.getItem("authToken")
                        }
                        axios.post("http://localhost:3001/material/addmaterial", data).then(result => {
                            console.log(result.data)
                        }).catch(err => {
                            console.log(err)
                        })

                        CloseshareModal();

                    }).catch(err => {
                        console.warn(err, "this is err")
                    })
                }
                else {
                    alert("please select type of file which you selected.")
                }
            }
            else {
                const data = {
                    title: Title,
                    content: urlify(Content),
                    link: Links,
                    mediaurl: null,
                    mediatype: FileType,
                    class: classid,
                    teacher: Teacher,
                    message: [],
                    authToken: localStorage.getItem("authToken")
                }
                axios.post("http://localhost:3001/material/addmaterial", data).then(result => {
                    console.log(result.data)
                }).catch(err => {
                    console.log(err)
                })

                CloseshareModal();

            }
        }
        else {
            alert("Title And Content Fields are required")
        }
        setRefresh(true);
    }

    return (
        <Modal show={shareModal} onHide={CloseshareModal}>
            <Modal.Header closeButton>
                <Modal.Title>Share With Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={sendMaterial}>
                    <Form.Group >
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={(e) => {
                            setTitle(e.target.value)
                        }} required type="text" placeholder="example: Assignment or Quiz or Study  Material or Announcement" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Write Something To Share</Form.Label>
                        <Form.Control onChange={(e) => {
                            setContent(e.target.value)
                        }} required type="text" as='textarea' rows={3} placeholder="Write Here..." />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Add a link if you want to share</Form.Label>
                        <Form.Control onChange={(e) => {
                            setLinks(e.target.value)
                        }} type="text" placeholder="link" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Choose a file if you want to share</Form.Label>
                        <Form.File type="file" onChange={(e) => {
                            setFile(e.target.files)
                        }} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Please Select The Type of File Which You Have Choosed</Form.Label>
                        <Form.Control onChange={
                            (e) => { setFileType(e.target.value) }
                        } required as="select">
                            <option>Select</option>
                            <option>Pdf</option>
                            <option>Image</option>
                            <option>Video</option>
                            <option>Audio</option>
                        </Form.Control>
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={CloseshareModal} >
                            Close</Button>
                        <Button type="submit" variant="primary">
                            Send</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
