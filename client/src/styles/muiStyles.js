import { makeStyles } from '@material-ui/core/styles';

export const useFormStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '25px 20px',
      [theme.breakpoints.up('md')]: {
        padding: '50px 250px',
      },
    },
    formTitle: {
      textAlign: 'center',
      marginBottom:"5%"
    },
    input: {
      display: 'flex',
      alignItems: 'flex-end',
      marginBottom:"2%"
    },
    inputIcon: {
      marginRight: 8,
    },
    buttonGroup: {
      marginTop: '5%',
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
);

export const useCardStyles = () => {
  return makeStyles(
    () => ({
      root: {
        marginTop: 20,
        marginBottom: 5,
        padding: 20,
      },
      cardTitle: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      endButtons: {
        display: 'flex',
        alignItems: 'center',
      },
      linkTitle: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap',
      },
      link: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.6em',
        color:"navy"
      },
      description: {
        marginTop: '0.8em',
        marginBottom: '1.2em',
      },
      edit: {
        color: '#7a8efe',
        fontSize: 16,
        textTransform: 'capitalize',
        '&:hover': {
          backgroundColor: '#dce1ff',
        },
        marginRight: 5,
      },
      addedTime: {
        marginTop: 8,
      },
      timestamp: {
        fontWeight: 'bold',
      },
    }),
  );
};

export const useNavStyles = makeStyles(
  () => ({
    navContainer: {
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    topLeftButton: {
      flexGrow: 1,
    },
    logoWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '300px',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
    },
    logoIcon: {
      marginRight: 5,
    },
    user: {
      marginRight: 10,
    },
    titleButton: {
      textTransform: 'capitalize',
      fontSize: 20,
      marginRight: 12,
    },
    navButtons: {
      '&:hover': {
        backgroundColor: '#88929c',
      },
    },
  }),
);

export const useTopPanelStyles = makeStyles(
  () => ({
    desktopButton: {
      margin: '3% 0px 1% 3%',
      background:'silver',
      color:'black'
    }
  })
);

export const useDeleteBtnStyles = makeStyles(
  () => ({
    deleteButton: {
      color: '#ff846e',
      textTransform: 'capitalize',
      fontSize: 16,
      '&:hover': {
        backgroundColor: '#ffe8e4',
      },
      marginRight: 5,
    },
  }),
  { index: 1 }
);

export const useRegisterLoginForm = makeStyles(
  (theme) => ({
    root: {
      minHeight: '100%',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '25px 20px',
      [theme.breakpoints.up('md')]: {
        padding: '50px 300px',
      },
    },
    formTitle: {
      textAlign: 'center',
      marginBottom:"5%",
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.6rem',
      },
    },
    submitButton: {
      marginTop: '3%'
    },
    input: {
      display: 'flex',
      alignItems: 'flex-end',
      marginBottom:"2%"
    },
    inputIcon: {
      marginRight: 8,
    },
    bottomText: {
      textAlign: 'center',
      marginTop: 8,
    },
  }),
);

export const useAlertStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      marginTop: 10,
    },
  })
);

export const useMainPaperStyles = makeStyles(
  () => ({
    root: {
      width: '100vW',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: '100vH',
    },
  })
);