import classes from './CharactersByFilm.module.css';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import retrieveList from '../../../logic/retrieve-list';
import RingLoader from 'react-spinners/RingLoader';

export default function CharactersByFilm (props) {

  const { id } = useParams();
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(true);

  const sourceRef = useRef(axios.CancelToken.source());
  useEffect(() => {
    const source = sourceRef.current;
    const getCharacters = async () => {
      setLoading(true);
      const dataCharacters = await retrieveList(props.characters);
      setLoading(false);
      setCharacters(dataCharacters);
    };
    getCharacters();

    return () => {
      if (source) source.cancel('Landing Component got unmounted');
      setCharacters(null);
      setLoading(false);
    };
  }, [id, props.characters]);
  return (

    <>
      <div className={classes.title}>Characters:</div>
      <div
        className={classes.list}>
        <RingLoader
          color={'#ffffff'}
          loading={loading}
          css={{
            display: 'block',
            margin: '0 auto',
            borderColor: 'red',
          }}
          size={70}/>
        {
          characters && (
            characters.map((people, index) => {
              return <div
                key={index}
                className={classes.list__item}>
                <NavLink
                  to={`/people/${(people.url).match(/[0-9]+/)}`}
                  className={classes.details__name}>
                  <img
                    src={require(`../../../assets/images/characters/${(people.url).match(/[0-9]+/)}.jpg`)}
                    alt=""
                    className={classes.details__image}/>
                  <div>{people.name}</div>
                </NavLink>
              </div>;
            })
          )
        }
      </div>
    </>
  );
}