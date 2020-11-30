import Bottle from 'bottlejs';
import MovieState from './services/internal/movieState';
import History from './history';
import DataBase from './services/external/dataBase';
import Http from './services/external/http';

const bottle = new Bottle();

bottle.register(Http);
bottle.register(DataBase);
bottle.register(MovieState);
bottle.register(History);
export default bottle.container;