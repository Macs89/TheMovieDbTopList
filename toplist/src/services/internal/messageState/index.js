import store, { actions } from './reducers';

function MessageState() {
  const getErrorMessage = (error) => async (dispatch) => {
    dispatch(actions.receiveError(error));
  };

  return Object.freeze({
    getErrorMessage,
    store,
  });
}

MessageState.$inject = [];
MessageState.$name = 'messageState';
MessageState.$type = 'service';

export default MessageState;
