import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  searchField: {
    height: 40,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    paddingLeft: theme.spacing(1),
    boxSizing: 'border-box',
  },
  input: {
    '&::-webkit-input-placeholder': {
      color: theme.palette.common[54],
    },
  },
}));

export default useStyles;
