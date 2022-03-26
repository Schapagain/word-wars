import {io } from 'socket.io-client';
const serverURL = "http://localhost:5000/"
const socket = io(serverURL,{
    query: "foo=bar"
});
