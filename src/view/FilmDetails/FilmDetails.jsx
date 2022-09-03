import { useState, useEffect, useRef } from 'react';

import getData from '../../utils/getData';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import classes from './/FilmDetails.module.css';
import defaultImage from '../../assets/images/default.jpg';
import CharactersByFilm from './CharactersByFilm/CharactersByFilm';

export default function FilmDetails () {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [imgSrc, setImgSrc] = useState(require(`../../assets/images/films/${id}.jpg`));

  const sourceRef = useRef(axios.CancelToken.source());
  useEffect(() => {
    const source = sourceRef.current;
    const getFilm = async () => {
      const dataFilm = await getData(`https://swapi.dev/api/films/${id}/`);
      setFilm(dataFilm);
    };
    getFilm();

    return () => {
      if (source) source.cancel('Landing Component got unmounted');
      setFilm(null);
    };
  }, [id]);

  return (
    <>
      {
        film && (
          <>
            <div className={classes.wrapper}>
              <div className={classes.details}>
                <div className="details__image">
                  <img
                    src={imgSrc ? imgSrc : defaultImage}
                    onError={() => setImgSrc(defaultImage)}
                    alt=""/>
                </div>
                <div className={classes.details__info}>
                  <div className={classes.details__title}>{film.title}</div>
                  <div className={classes.details__text}>
                    <span>Episode: </span>{film.episode_id}
                  </div>
                  <div className={classes.details__text}>
                    <span>Director: </span>{film.director}
                  </div>
                  <div className={classes.details__text}>
                    <span>Producer: </span>{film.producer}
                  </div>
                  <div className={classes.details__text}>
                    <span>Release date: </span>{film.release_date}
                  </div>
                  <div className={classes.details__text}>
                    <span>Opening crawl: </span>{film.opening_crawl}
                  </div>
                </div>
              </div>
              <CharactersByFilm characters={film.characters}/>
            </div>
          </>
        )
      }
    </>
  );
}
