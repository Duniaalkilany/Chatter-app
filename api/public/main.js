const options = {
    transports: ['websocket'],
};
const socket = io('localhost:8800/', options);

socket.on('message', (message) => {
    console.log(message);
});