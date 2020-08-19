const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const cors = require('cors')
const appRoute = require('./routes/index');
const path = require('path')

app.use(express.static(path.join(__dirname, 'client/build')))

// Anything that doesn't match the above, send back the index.html file

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


require('dotenv').config({ path: './config/.env' })

/* 
    use 
*/
app.use(cors())




app.get('/', (req, res) => {
    res.send("Hello World")
})



app.use('/', appRoute)





/*
 
    Run server on port 3001 with expressJs
 
*/

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
    console.log(`Listening to port:${port}`)
})




/*

    Import SocketIO for listening requestion and response message from line to the client 

*/


const socketIo = require('socket.io');
const io = socketIo.listen(server);
const line = require('@line/bot-sdk');
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};
const client = new line.Client(config);

app.post('/notify', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then(result => {
            res.sendStatus(200)
        })
})

/*

    function handle event when someone request message to Chatbot line and reply message too

*/

function handleEvent(event) {


    // This case will response message to user

    const replyMessage = ({ replyToken, message, source }, msg) => {
        io.sockets.emit('chat', { sender: 'Customer', msg: message.text, replyToken: replyToken })
        return client.replyMessage(replyToken, {
            type: message.type,
            text: msg
        }).then(() => {
            io.sockets.emit('chat', { sender: 'Admin', msg: msg, replyToken })
            QuickReply(source.userId)
            return "Completed"
        }).catch(() => {
            QuickReply(source.userId)
            return "Failed"
        })
    }

    // This case will response message to admin Chatbot (it's me)

    const notifyToAdmin = ({ source, timestamp, message, replyToken }) => {
        io.sockets.emit('chat', { sender: 'Customer', msg: message.text, replyToken: replyToken })
        client.getProfile(source.userId)
            .then((profile) => {
                const count = setInterval(() => {
                    if (timestamp + 10000 < Date.now()) {
                        var msg = `คุณ ${profile.displayName}\nได้พิมว่า "${message.text}"\nเวลา ${new Date(timestamp)}`
                        clearInterval(count)
                        io.sockets.emit('chat', { sender: 'Notify', msg: msg, replyToken })
                        QuickReply(source.userId)
                        return client.pushMessage('U37b1fbfd62954951633c322b25b621f0', {
                            type: 'text',
                            text: msg
                        })
                    }
                }, 1000)
            })
            .catch((err) => {
                QuickReply(source.userId)
            });
    }

    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }



    switch (event.message.text) {
        case "สวัสดี":
            return replyMessage(event, "สวัสดีครับมีอะไรให้ช่วยไหมครับ?")
        case "ยังมีสินค้านี้ไหม":
            return replyMessage(event, "สินค้าจำนวนจำกัด รีบสั่งนะครับ ^^")
        case "ร้านอยู่ไหน":
            return replyMessage(event, "เซ็นทรัลบางนาครับ")
        case "รับ":
            return replyMessage(event, "กรุณาโอนเงินภายในวันนี้และแนบสลิป")
        default:
            return notifyToAdmin(event)
    }
}

function QuickReply(userId) {
    client.pushMessage(userId, {
        type: 'text',
        text: 'โปรดเลือกคำสั่ง',
        quickReply: {
            items: [
                {
                    type: 'action',
                    imageUrl: "",
                    action: {
                        type: "message",
                        label: "สวัสดี",
                        text: "สวัสดี"
                    }
                },
                {
                    type: 'action',
                    imageUrl: "",
                    action: {
                        type: "message",
                        label: "ยังมีสินค้านี้ไหม",
                        text: "ยังมีสินค้านี้ไหม"
                    }
                },
                {
                    type: 'action',
                    imageUrl: "",
                    action: {
                        type: "message",
                        label: "ร้านอยู่ไหน",
                        text: "ร้านอยู่ไหน"
                    }
                },
                {
                    type: 'action',
                    imageUrl: "",
                    action: {
                        type: "message",
                        label: "รับ",
                        text: "รับ"
                    }
                }
            ]
        }
    })
}


/*

    Socket.oi listening message from server and response to client

*/

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('chat', (msg) => {
        // console.log(msg)
    })
});

app.use(bodyparser.json())

