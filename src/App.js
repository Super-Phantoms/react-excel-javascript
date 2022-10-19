import './App.css';
import { Grid } from '@mui/material';
import LeftView from './components/LeftView';
import RightView from './components/RightView';



function App() {
  return (
    <div className="App">
      <Grid container columnGap={1} columns={13}>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <LeftView />
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <RightView />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
