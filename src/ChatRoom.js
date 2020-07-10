import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SendIcon from '@material-ui/icons/Send';
import { 
    Typography, 
    List, 
    ListItem, 
    ListItemText, 
    Drawer, 
    Divider, 
    TextField, 
    IconButton, 
    Paper, 
    ListSubheader, 
    Grid,
    Button,  
} from '@material-ui/core';

import socketIOClient from "socket.io-client";
import ListView from './components/ListView';
const ENDPOINT = "http://127.0.0.1:3001";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    appBarBottom: {
        top: 'auto',
        bottom: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
    },
    paper: {
        paddingBottom: 50,
        width: '100%',
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
      // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    input: {
        backgroundColor: theme.palette.common.white
    },
    sendButton: {
        marginLeft:'auto',
        marginRight: 'auto'
    }
}));

let socket;

const ChatRoom = () => {
    const classes = useStyles();
    const [channels, setChannels] = useState(['Public']);
    const [directMessages, setDirectMessages] = useState(['Jone Doe']);
    const [selectedChannel, setSelectedChannel] = useState("Public");
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [username, setUserName] = useState("Richard Chaidez");

    useEffect(() => {
        socket = socketIOClient(ENDPOINT);
        socket.on('connect', () => {
            console.log(socket.id);
        });
    }, [ENDPOINT]);
    
    useEffect(() => {
        socket.on("new message", (message) => {
            const recievedMessage = {
                primary: "Testing",
                secondary: message
            };
            setAllMessages(allMessages => [...allMessages,recievedMessage]);
        });
        socket.on('disconnect', (reason) => {
            if(reason === 'io server disconnect'){
                socket.connect();
            }//else it'll try to reconnect on its own.
        });
    }, []);

    const sendMessage = () => {
        socket.emit("new message", message);
        setMessage("");
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography align="center" variant="h6" noWrap>
                        {selectedChannel}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
            anchor="left"
            >
                <Button> 
                    {username}
                </Button>
                <Divider />
                <ListView
                listHeaderText="Channels"
                data={channels}
                selectedChannel={selectedChannel}
                onClick={(text) => setSelectedChannel(text)}
                />
                <Divider />
                <ListView
                listHeaderText="Direct Messages"
                data={directMessages}
                selectedChannel={selectedChannel}
                onClick={(text) => setSelectedChannel(text)}
                />
            </Drawer>
            <Grid container>
                <Grid item xs={12}>
                    <Paper square elevation={0} className={classes.paper}>
                        <List>
                        {allMessages.map(({primary, secondary }, index) => (
                            <React.Fragment key={index}>
                            {index === 0 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
                            <ListItem button>
                                <ListItemText primary={primary} secondary={secondary} />
                            </ListItem>
                            </React.Fragment>
                        ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
            <AppBar position="fixed" className={classes.appBarBottom}>
                <Toolbar>
                    <div style={{width: "90%"}}>
                        <TextField 
                        fullWidth={true} 
                        id="message" 
                        label="Start typing" 
                        variant="filled"
                        classes={{
                            root: classes.input
                        }}
                        value={message}
                        onChange={handleMessageChange}
                        onKeyPress={(ev) => {
                            if(ev.key === "Enter"){
                                sendMessage()
                            }
                        }}
                        />
                    </div>
                    <IconButton 
                    aria-label="send-message" 
                    className={classes.sendButton} 
                    onClick={sendMessage}
                    >
                        <SendIcon fontSize="large"/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ChatRoom;