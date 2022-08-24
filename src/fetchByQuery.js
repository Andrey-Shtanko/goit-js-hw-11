import axios from 'axios';

export default async function fetchByQuery(query, page) {
  const API_KEY = `29357448-0203ad34ff6f16514b0291a92`;
  return await axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
}
