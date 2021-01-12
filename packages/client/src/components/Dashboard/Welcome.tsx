import React, { FC } from 'react';
import { useTranslate } from 'react-admin';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles({
//     media: {
//         height: '18em',
//     },
// });

// const completedOrderURL = `https://marmelab.com/posters/beard-${parseInt((Math.random() * 10).toString(), 10) + 1}.jpeg`;

const Welcome: FC = () => {
    const translate = useTranslate();
    // const classes = useStyles();

    return (
        <Card>
            {/* <CardMedia image={completedOrderURL} className={classes.media} /> */}

            <CardContent>
                <Typography variant="h5" component="h2">
                    {translate('bo.dashboard.welcome.title')}
                </Typography>
                <Typography component="p">{translate('bo.dashboard.welcome.subtitle')}</Typography>
            </CardContent>

            <CardActions style={{ justifyContent: 'flex-end' }}>
                <Button href="#">
                    <CodeIcon style={{ paddingRight: '0.5em' }} />
                    {translate('ra.action.show')}
                </Button>
            </CardActions>
        </Card>
    );
};

export default Welcome;
