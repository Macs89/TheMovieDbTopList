import Bottle from 'bottlejs';
import Store from './store';
import MovieState from './services/internal/movieState';
import History from './history';
import DataBase from './services/external/dataBase';
import Http from './services/external/http';
import MessageState from './services/internal/messageState';

const bottle = new Bottle();

bottle.register(Store);
bottle.register(Http);
bottle.register(DataBase);
bottle.register(MovieState);
bottle.register(History);
bottle.register(MessageState);

export default bottle.container;
