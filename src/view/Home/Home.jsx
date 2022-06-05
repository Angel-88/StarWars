import classes from './Home.module.css';
import background from '../../assets/images/background.png';
import Films from '../Films/Films';

function Home () {

  return (
    <div>
      <div className={classes.background}>
        <h1 className={classes.backgroundTitle}>
          Plunge into the world of
          <span>Star Wars</span>
        </h1>
        <img
          src={background}
          alt="background"/>
      </div>
      <div>
        <Films/>
      </div>
    </div>
  );
}

export default Home;