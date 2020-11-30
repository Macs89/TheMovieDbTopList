import Bottle from 'bottlejs';
import DataBase from './services/external/dataBase';
import Http from './services/external/http';

const bottle = new Bottle();

bottle.register(Http);
bottle.register(DataBase);
export default bottle.container;
