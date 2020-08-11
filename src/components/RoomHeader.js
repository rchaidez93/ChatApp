import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useAuth from '../hooks/useAuth';
import { makeStyles, Icon } from '@material-ui/core';

const drawerWidth = 300;
const useStyles = makeStyles(() => ({
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    }
}));

const RoomHeader = ({room,}) => {
    const classes = useStyles();
    const auth = useAuth();

    return(
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography align="center" variant="h6" noWrap>
                    {room}
                </Typography>
                <IconButton onClick={() => auth.logout()}>
                    < ExitToAppIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default RoomHeader;