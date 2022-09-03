import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import classes from './FilmsByCharacter.module.css';
import RingLoader from 'react-spinners/RingLoader';
import retrieveList from '../../../logic/retrieve-list';

export default function FilmsByCharacter (props) {

  const { id } = useParams();
  const [films, setFilms] = useState(null);
  const [loading, setLoading] = useState(true);

  const sourceRef = useRef(axios.CancelToken.source());
  useEffect(() => {
    const source = sourceRef.current;
    const getFilms = async () => {
      setLoading(false);
      const dataFilms = await retrieveList(props.films);
      setLoading(false);
      setFilms(dataFilms);
    };
    getFilms();

    return () => {
      if (source) source.cancel('Landing Component got unmounted');
      setFilms(null);
      setLoading(false);
    };
  }, [id, props.films]);

  return (
    <>
      <div className={classes.list__title}>Related film:</div>
      <RingLoader
        color={'#ffffff'}
        loading={loading}
        css={{
          display: 'block',
          margin: '0 auto',
        }}
        size={70}/>
      <div
        className={classes.list}>
        {
          films && (
            films.map((films, index) => {
              return <div
                key={index}
                className={classes.list__item}>
                <NavLink
                  to={`/films/${(films.url).match(/[0-9]+/)}`}
                  className={classes.list__films}>
                  <div className={classes.title}>{films.title}</div>
                  <img
                    src={require(`../../../assets/images/films/${(films.url).match(/[0-9]+/)}.jpg`)}
                    alt=""
                    className={classes.list__image}/>
                </NavLink>
              </div>;
            })
          )
        }
      </div>
    </>
  );
}

