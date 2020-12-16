import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const ListView = ({listHeaderText, data, selectedChannel, onClick}) => {
    return (
        <List
        component="nav"
        aria-labelledby="channel-List"
        subheader={
            <ListSubheader component="div" id="nested-list-channels">
                <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <Typography>
                            {listHeaderText}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>
            </ListSubheader>
        }
        >
            {data && data.map((channel, index) => (
                <ListItem
                button
                key={index}
                selected={selectedChannel===channel.name}
                onClick={() => onClick(channel)}
                >
                    <ListItemText primary={channel.name} />
                </ListItem>
            ))}
        </List>
    )
}

export default ListView;