import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import { Typography, List, ListItem, ListItemText, Drawer, Divider, TextField, IconButton, Paper, ListSubheader, Grid,  } from '@material-ui/core';

import socketIOClient from "socket.io-client";
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
    grow: {
        flexGrow: 1,
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
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
      },
    input: {
        backgroundColor: theme.palette.common.white
    },
    sendButton: {
        marginLeft:'auto',
        marginRight: 'auto'
    }
}));

const messages = [
    {
      id: 1,
      primary: 'Brunch this week?',
      secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    },
]

const ChatRoom = () => {
    const classes = useStyles();
    const [channels, setChannels] = useState(['Everyone']);
    const [directMessages, setDirectMessages] = useState(['Jone Doe']);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FROMAPI", data => {
            console.log(data);
        })
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Permanent drawer
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
                <div className={classes.toolbar}>
                    You
                </div>
                <Divider />
                <List 
                component="nav"
                aria-labelledby="nested-list-channels"
                subheader={
                    <ListSubheader component="div" id="nested-list-channels">
                        <Grid container alignItems="center" justify="space-between">
                            <Grid item>
                                <Typography>
                                    Channels
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton>
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </ListSubheader>
                    }>
                {channels.map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
                <Divider />
                <List
                component="nav"
                aria-labelledby="nested-list-channels"
                subheader={
                    <ListSubheader component="div" id="nested-list-direct-messages">
                        <Grid container alignItems="center" justify="space-between">
                            <Grid item>
                                <Typography>
                                    Direct Messages
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton>
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </ListSubheader>
                    }>
                {directMessages.map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
            </Drawer>
            <Grid container>
                <Grid item xs={12}>
                    <Paper square elevation={0} className={classes.paper}>
                        <List>
                        {messages.map(({ id, primary, secondary, person }) => (
                            <React.Fragment key={id}>
                            {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
                            {id === 3 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>}
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
                        id="filled-basic" 
                        label="Start typing" 
                        variant="filled"
                        classes={{
                            root: classes.input
                        }}
                        />
                    </div>
                    <IconButton aria-label="send-message" className={classes.sendButton}>
                        <SendIcon fontSize="large"/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ChatRoom;