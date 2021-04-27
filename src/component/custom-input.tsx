import { TextField, withStyles } from '@material-ui/core';
import { primaryColor } from '../global';



const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: `${primaryColor}`
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: `${primaryColor}`,
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: `${primaryColor}`,
        },
      },
    },
})(TextField);


const CustomInput = ({...props}) => {
    return (
        <CssTextField {...props} />
    )
}


export default CustomInput;