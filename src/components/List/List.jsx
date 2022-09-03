import { NavLink } from 'react-router-dom';
import classes from './List.module.css';
import RingLoader from "react-spinners/RingLoader";
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function List ({ list, page }) {
  const [loading, setLoading] = useState(true);

  const sourceRef = useRef(axios.CancelToken.source());
  useEffect(() => {
    const source = sourceRef.current;

    return () => {
      if (source) source.cancel('Landing Component got unmounted');
      setLoading(false)
    };
  });

  return (
    <ul className={classes.list} >
      <RingLoader
        color={"#ffffff"} loading={loading} css={{
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      }} size={70} />
      {
        list && page === 'films' && (
          list.map((films, index) => {
            return <li
              key={index}
              className={classes.list__item}>
              <NavLink to={`/films/${(films.url).match(/[0-9]+/)}`}  className={classes.list__films}>
                <div className={classes.title}>{films.title}</div>
                <div className={classes.list__text}>Director: {films.director}</div>
                <div className={classes.list__text}>Release date: {films.release_date}</div>
                <div className={classes.details__image}>
                  <img src={require(`../../assets/images/films/${(films.url).match(/[0-9]+/)}.jpg`)} alt="" />
                </div>
              </NavLink>
            </li>;
          })
        )
      }
    </ul>
  );
}