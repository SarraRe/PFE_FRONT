import React from 'react';
import {
  Grid,
  makeStyles
} from '@material-ui/core';
import softwareImg from '../../../Assets/SoftwareHome.jpg'
import Zoom from 'react-reveal/Zoom';
import Page from 'src/components/Page';



const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url("${softwareImg}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: "cover",
    width: '100vw',
    height: `90.3vh`,
    alignItems: "center",
    color: 'white',
    backgroundAttachment: "fixed",
    overflowY: 'hidden',
},
  root: {
    overflowY: 'hidden'
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
        <Grid
          container
        >
            <div className={classes.background}>
            <br/><br/>
            <Zoom right cascade collapse>
           <h1 style={{fontSize:'100px' , textAlign:'center' , marginTop:'180px', color:'#white'}}>Dashboard de contrôle </h1>
           </Zoom>
           </div>
          </Grid>
    </Page>
  );
};

export default Dashboard;
