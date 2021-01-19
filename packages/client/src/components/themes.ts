export const darkTheme = {
    palette: {
        primary: {
            main: '#d88914',
        },
        secondary: {
            main: '#18364e',
        },
        type: 'dark',
    },
};

export const lightTheme = {
    palette: {
        secondary: {
            light: '#da7646',
            main: '#da9665',
            dark: '#001064',
            contrastText: '#fff',
        },
        primary: {
            main: '#da6262',
        },
    },
    overrides: {
        MuiFilledInput: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                '&$disabled': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            },
        },
    },
};
