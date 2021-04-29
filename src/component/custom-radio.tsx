import { primaryColor } from '../global';
import {
    createStyles,
    withStyles,
    Theme
  } from "@material-ui/core/styles";
  import Radio from '@material-ui/core/Radio';
const CssRadio = withStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#bbb',
      '&$checked': {
        color: primaryColor,
      },
    },
    checked: {},
  })
)(Radio);

const CustomRadio = ({...props}) => {
    return <CssRadio {...props} />
}

export default CustomRadio