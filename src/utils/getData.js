import axios from 'axios';

const getData = async (url) => {
  try {
    const res = await axios.get(url)
    return await res.data
  } catch (err) {
    if (axios.isCancel(err)) console.log('axios cancel');
    else console.log(err);
  }
}

export default getData;