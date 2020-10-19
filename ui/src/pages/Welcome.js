import React from 'react'
import { Typography, Grid } from '@material-ui/core'

export default function Welcome(){
    return(
        <Grid container justify="center" alignItems="center">
            <Typography variant="h4">Welcome to WebChat!</Typography>
        </Grid>
    )
}