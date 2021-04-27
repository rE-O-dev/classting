import { Button, darken, withStyles } from '@material-ui/core';
import { primaryColor } from '../global';

const CssButton = withStyles({
    root: {
        color: 'white',
        backgroundColor: primaryColor,
        '&:hover': {
          backgroundColor: darken(primaryColor, 0.2),
        },
      },
})(Button);

const CustomButton = ({...props}) => {
    return  <CssButton variant="contained" {...props} />
}

export default CustomButton;