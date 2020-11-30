import Bottle from 'bottlejs';
import Http from './services/external/http';

const bottle = new Bottle();

bottle.register(Http);
export default bottle.container;
