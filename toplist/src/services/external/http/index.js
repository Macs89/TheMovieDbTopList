const url = require('url');

function Http() {
  function getQueryString(qs = {}) {
    return url.format({ query: qs });
  }

  async function send(url, options) {
    try {
      const result = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
      });
      if (!result) {
        return {
          success: false,
          status_message: 'We are sorry, but something went wrong',
        };
      }
      if (!result.ok) {
        return result.json();
      }
      return result.json();
    } catch (e) {
      console.log(e);
    }
  }

  async function get(url, query) {
    const result = await send(`${url}${getQueryString(query)}`, {
      method: 'GET',
    });
    return result;
  }

  return Object.freeze({
    get,
  });
}

Http.$inject = [];
Http.$name = 'http';
Http.$type = 'service';
module.exports = Http;
