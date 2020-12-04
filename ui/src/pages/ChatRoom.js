import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import io from "socket.io-client";
import ListView from '../components/ListView';
import RoomHeader from '../components/RoomHeader';

const ENDPOINT = "http://127.0.0.1:8080";
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
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
    const [channels] = useState(['Public']);
    const [directMessages] = useState(['Jone Doe']);
    const [selectedChannel, setSelectedChannel] = useState("Public");
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [username] = useState("Richard Chaidez");

    socket = io(ENDPOINT);
    
    useEffect(() => {
        
        socket.emit('join room', selectedChannel);

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
    }, [selectedChannel]);

    const sendMessage = () => {
        const testing = {
            room: selectedChannel,
            message
        }
        socket.emit("new message", testing);
        setMessage("");
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const handleChannelChange = (channel) => {
        socket.emit("leave room", selectedChannel);
        console.log(channel);
        socket.emit("join room", channel);
        setSelectedChannel(channel);
    }

    return (
        <div className={classes.root}>
            <RoomHeader
             room={selectedChannel}
            />
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
                onClick={(text) => {
                    handleChannelChange(text);
                }}
                />
                <Divider />
                <ListView
                listHeaderText="Direct Messages"
                data={directMessages}
                selectedChannel={selectedChannel}
                onClick={(text) => {
                    handleChannelChange(text);
                }}
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