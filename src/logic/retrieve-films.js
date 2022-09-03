import getData from "../utils/getData"
import { initialFilmsUrl } from '../constants';


const retrieveFilms = async () => await getData(initialFilmsUrl)

export default retrieveFilms