function DataBase(http) {
  const api_key = '6bb84dbd0258b0a96a58285f5b741d4a';
  const baseUrl = 'https://api.themoviedb.org/3/';
  const dataPerPage = 20;

  async function getTopRatedMovies(filters) {
    const { page } = filters;
    const url = `${baseUrl}movie/top_rated`;
    const query = { api_key, page };
    const result = await http.get(url, query);
    return result;
  }

  async function getMovieDetails(id) {
    const url = `${baseUrl}movie/${id}`;
    const query = { api_key, append_to_response: 'credits' };
    const result = await http.get(url, query);
    return result;
  }

  async function getConfiguration() {
    const url = `${baseUrl}configuration`;
    const result = await http.get(url, { api_key });
    return result;
  }

  return Object.freeze({
    getTopRatedMovies,
    getConfiguration,
    getMovieDetails,
    dataPerPage,
  });
}

DataBase.$inject = ['http'];
DataBase.$name = 'dataBase';
DataBase.$type = 'service';
export default DataBase;
