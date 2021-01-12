import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Title } from 'react-admin';
import { withTranslate, Translate } from 'ra-core';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { changeTheme } from '../../modules/ThemeModule';
import { AppState, ThemeName } from '../../types';

interface IConfiguration {
    theme: ThemeName;
    changeTheme: Function;
    classes: any;
    translate: Translate;
    // locale: string;
    // setLocale: Function;
}

const styles = theme => ({
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
});

class Configuration extends Component<IConfiguration> {
    props: { theme: any; changeTheme: any; classes: any; translate: any; };
    render() {
        const { theme, changeTheme, classes, translate/* , locale */ } = this.props;
        const setHandler = (lang) => () => {
            // saveLang(lang);
            // setLocale(lang);
        };

        return (
            <Card>
                <Title title={'Конфигурация'} />
                <CardContent>
                    <div className={classes.label}>{translate('bo.theme.name')}</div>
                    <Button
                        variant="contained"
                        className={classes.button}
                        color={theme === 'light' ? 'primary' : 'default'}
                        onClick={() => changeTheme('light')}
                    >
                        {translate('bo.theme.light')}
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.button}
                        color={theme === 'dark' ? 'primary' : 'default'}
                        onClick={() => changeTheme('dark')}
                    >
                        {translate('bo.theme.dark')}
                    </Button>
                </CardContent>

                {/* <CardContent>
                    <div className={classes.label}>{translate('bo.language')}</div>
                    <Button
                        variant="contained"
                        className={classes.button}
                        color={locale === 'ru' ? 'primary' : 'default'}
                        onClick={setHandler('ru')}
                    >
                        рус
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.button}
                        color={locale === 'en' ? 'primary' : 'default'}
                        onClick={setHandler('en')}
                    >
                        eng
                    </Button>
                </CardContent> */}
            </Card>
        );
    }
}

// const withSetLocale = (Component: any) => (props: any) => {
//     const setLocale = useSetLocale();
//     return <Component setLocale={setLocale} {...props} />;
// };

export default withRouter(
    connect(
        (state: AppState) => ({
            theme: state.ThemeModule.theme,
        }),
        { changeTheme }
    )(withStyles(styles)(withTranslate((Configuration))))
);
