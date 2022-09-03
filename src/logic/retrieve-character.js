import getData from "../utils/getData"
import { initialPeopleUrl } from "./../constants/index"


const retrieveCharacter = async () => await getData(initialPeopleUrl)

export default retrieveCharacter