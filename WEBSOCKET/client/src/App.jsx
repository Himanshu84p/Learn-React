import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Button,
  Container,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function App() {
  //used ref bcz multiple times rendering
  const socketRef = useRef();
  // const [socket, setSocket] = useState(io("http://localhost:8080"));

  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [privateRoom, setPrivateRoom] = useState("");
  const [socketID, setSocketID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socketRef.current.emit("message", { message, room });
    setMessage("");
  };

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    socketRef.current.emit("private-room", privateRoom);
  };

  useEffect(() => {
    // Initialize the socket connection stroring in the ref
    socketRef.current = io("http://localhost:8080");

    const socket = socketRef.current;
    //socket connection method
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log("connected to the socket", socket.id);
    });

    //listening the welcome method
    socket.on("welcome", (data) => {
      console.log(data);
    });

    //listening the receive-message method
    socket.on("receive-message", (msg) => {
      setAllMessages((prevMessages) => [...prevMessages, msg]);
      console.log("received message: ----", msg);
    });

    // disconnect after reloading the page cleanup function
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ height: 150 }} />
        <Typography varient="h6" component="div" gutterBottom>
          {socketID}
        </Typography>

        {/* form for join the room with room name  */}
        <form onSubmit={handleRoomSubmit}>
          <TextField
            value={privateRoom}
            onChange={(e) => setPrivateRoom(e.target.value)}
            id="outlined-basic"
            label="Private Room"
            variant="outlined"
          />
          <Button variant="contained" color="primary" type="submit">
            Join
          </Button>
        </form>

        {/* form for sending message to the particular room  */}
        <form onSubmit={handleSubmit}>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="outlined-basic"
            label="Message"
            variant="outlined"
          />
          <TextField
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            id="outlined-basic"
            label="Room"
            variant="outlined"
          />
          <Button variant="contained" color="primary" type="submit">
            Send
          </Button>
        </form>

        {/* {printing all the messages } */}
        <Stack spacing={2}>
          {allMessages?.map((msg, index) => (
            <ListItem key={index}>{msg}</ListItem>
          ))}
        </Stack>
      </Container>
    </>
  );
}

export default App;
