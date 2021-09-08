const socket = io();
let usersList = []

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const userId = uuidv4()

socket.emit('addUser', userId)

socket.on('getUsers', (users) => {
    console.log('users: ', users);
    usersList = users
})

const compileMsg = () => {
    let senderId = userId
    let receiverId = document.getElementById('recievers').value
    let text = document.getElementById('msg').value

    const msgData = {
        senderId,
        receiverId,
        text
    }

    console.log(msgData);
    return msgData
}

const sendMessage = () => socket.emit('sendMessage', compileMsg())

// const sendMessage = () => {
//     let reciever = document.getElementById('recievers').value
//     let message = document.getElementById('msg').value

//     console.log(reciever);
//     console.log(message);
// }

const refresh = () => {
    let recievers = document.getElementById('recievers');

    for (let i = recievers.options.length; i >= 0; i--) {
        recievers.remove(i);
    }

    usersList.forEach((user) => {
        if (user.userId !== userId) {
            recievers.options[recievers.options.length] = new Option(`User ${user.userId}`, user.userId);
        }
    })
}

socket.on('getMessage', (messageData) => {
    const {
        senderId,
        text
    } = messageData

    console.log(`${senderId} : ${text}`);
})

document.getElementById('sendMes').addEventListener('click', sendMessage)
document.getElementById('refresh').addEventListener('click', refresh)