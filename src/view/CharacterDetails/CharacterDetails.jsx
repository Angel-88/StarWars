import { useState, useEffect, useRef } from 'react';

import getData from '../../utils/getData';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import classes from './/CharacterDetails.module.css';
import defaultImage from '../../assets/images/default.jpg';
import FilmsByCharacter from './FilmsByCharacter/FilmsByCharacter';

export default function DetailsFilm () {
  const { id } = useParams();
  const [people, setPeople] = useState(null);
  const [imgPeople, setImgPeople] = useState(require(`../../assets/images/characters/${id}.jpg`));

  const sourceRef = useRef(axios.CancelToken.source());
  useEffect(() => {
    const source = sourceRef.current;
    const getCharacter = async () => {
      const dataPeople = await getData(`https://swapi.dev/api/people/${id}/`);
      setPeople(dataPeople);
    };
    getCharacter();

    return () => {
      if (source) source.cancel('Landing Component got unmounted');
      setPeople(null);
    };
  }, [id]);

  return (
    <>
      {
        people && (
          <>
            <div className={classes.wrapper}>
              <div className={classes.details}>
                <div
                  className={classes.details__image}>
                  <img
                    src={imgPeople ? imgPeople : defaultImage}
                    onError={() => setImgPeople(defaultImage)}
                    alt=""/>
                </div>
                <div className={classes.details__info}>
                  <div className={classes.details__name}>{people.name}</div>
                  <div className={classes.details__text}>
                    <span>Height: </span>{people.height}
                  </div>
                  <div className={classes.details__text}>
                    <span>Mass: </span>{people.mass}
                  </div>
                  <div className={classes.details__text}>
                    <span>Hair color: </span>{people.hair_color}
                  </div>
                  <div className={classes.details__text}>
                    <span>Skin color: </span>{people.skin_color}
                  </div>
                  <div className={classes.details__text}>
                    <span>Eye color: </span>{people.eye_color}
                  </div>
                  <div className={classes.details__text}>
                    <span>Birth year: </span>{people.birth_year}
                  </div>
                  <div className={classes.details__text}>
                    <span>Gender: </span>{people.gender}
                  </div>
                </div>
              </div>
              <FilmsByCharacter films={people.films}/>
            </div>
          </>
        )
      }

    </>
  );
}
