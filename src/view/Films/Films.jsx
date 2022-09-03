import axios from 'axios';
import List from '../../components/List/List';
import { useEffect, useRef, useState } from 'react';
import retrieveFilms from '../../logic/retrieve-films';

export default function Films () {
  const [filmList, setFilmsList] = useState([]);
  const sourceRef = useRef(axios.CancelToken.source());

  useEffect(() => {
    const source = sourceRef.current;
    const getFilms = async () => {
      const res = await retrieveFilms();
      setFilmsList(res.results);
    };

    getFilms();

    return () => {
      if (source) source.cancel('Landing Component got unmounted');
      setFilmsList([]);
    };
  }, []);

  return (
    <>
      {
        filmList && (
          <>
            <List
              list={filmList}
              page={'films'}/>
          </>
        )
      }
    </>
  );
}