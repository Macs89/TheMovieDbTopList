import { createBrowserHistory } from 'history';

function History() {
  const browserHistory = createBrowserHistory();

  return browserHistory;
}

History.$name = 'history';
export default History;
