import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#84bcb4'
    },
    secondary: {
      main: '#ffffff'
    }
  },
  // NOTE:https://mui.com/material-ui/api/button/#css
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: 'white'
        },
        containedSecondary: {
          color: '#84bcb4'
        },
        sizeMedium: {
          width: 130,
          height: 40
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // fieldset: {
          //   borderColor: "blue",
          // },
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #f4f4f4 inset'
          }
        },
        underline: {
          /* default */
          '&:before': {
            border: 'none'
          },
          /* hover */
          '&&:hover:before': {
            borderBottom: 'none'
          },
          /* focused */
          '&:after': {
            borderBottom: 'none'
          }
        }
      }
    }
  }
})
