import _ from 'lodash';
import { actions } from '../services/internal/messageState/reducers';

export const handleResponse = (options) => async (dispatch) => {
  const result = _.get(options, 'result');
  await dispatch(actions.resetErrors());
  if (!result) {
    dispatch(actions.receiveError(true));
    dispatch(actions.receiveMessage(_.get(options, 'message')));
  } else if (!_.get(result, 'success', true)) {
    dispatch(actions.receiveError(true));
    dispatch(actions.receiveError(_.get(result, 'status_message')));
  } else {
    const success = _.get(options, 'success');
    if (success) {
      await success();
    }
    return;
  }
};
