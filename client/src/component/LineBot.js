import React, { useEffect, useState } from 'react'
import socket from '../api/socket'
import {
    Container,
    Toast
} from 'react-bootstrap'
import qrcode from '../asset/qrcode.png'
import icon from '../asset/profile.png'
const LineBot = () => {

    const [msg, setMsg] = useState([])
    useEffect(() => {
        socket.on('chat', res => {
            setMsg([...msg, res])
        })



    }, [msg])

    return (
        <Container style={{ paddingTop: '20px' }}>
            <h3>Assign : Line Bot</h3>
            <div style={{ border: '1px solid #bbb', width: '230px', marginTop: '10px', marginBottom: '10px' }}></div>
            <p>Please create a small project using Line messaging API for getting a notification when your Line Bot can not answer a question to the customer more than 10 second </p>
            <p>LINEID @781psfbv Word working สวัสดี, ยังมีสินค้านี้ไหม, ร้านอยู่ไหน, รับ</p>
            <img src={qrcode} alt="" width="150" height="150"></img>



            <div className="chatroom">
                <div className="chatroom-header">
                    DOSCG_APP
                    <svg id='close' width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                        <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                    </svg>
                </div>
                <div className="chatroom-body">
                    <div className="date">Today</div>
                    {
                        msg.map((m) => {
                            if (m.sender === 'Admin') {
                                return (
                                    <div className="chatroom-item you" key={Math.random()} >
                                        <div className="photo">
                                            <img src={icon} alt="" style={{ width: '50px' }} />
                                        </div>
                                        <div className="balloon" style={{ color: 'black', backgroundColor: 'white' }} >{m.msg}</div>
                                    </div>
                                )
                            }
                            else if (m.sender === 'Customer') {
                                return (
                                    <div className="chatroom-item me" key={Math.random()}>
                                        <div className="balloon">{m.msg}</div>
                                    </div>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                </div>
                <div className='chatroom-footer'>
                    Type something on your phone...
                </div>
            </div>

            {
                msg.map((m) => {
                    if (m.sender === 'Notify') {
                        return (
                            <Toast key={Math.random()} style={{ position: 'absolute', right: 10, top: 10, borderColor: 'red' }} >
                                <Toast.Header style={{ color: 'red' }}>
                                    <strong className="mr-auto">{m.sender}</strong>
                                </Toast.Header>
                                <Toast.Body>{m.msg}</Toast.Body>
                            </Toast>
                        )
                    }
                    return null
                })
            }


        </Container >
    )
}

export default LineBot