import { primaryColor } from '../global';
import {
    createStyles,
    withStyles,
    Theme
  } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
const CssProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
    },
    bar: {
      borderRadius: 5,
      backgroundColor: primaryColor
    }
  })
)(LinearProgress);

const CustomProgress = ({...props}) => {
    return <CssProgress {...props} variant="determinate" />
}

export default CustomProgress