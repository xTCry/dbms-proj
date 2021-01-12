import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';

export const NotFound = () => (
    <Card>
        <Title title="Не найдено" />
        <CardContent>
            <h1>404: Страница не найдена</h1>
        </CardContent>
    </Card>
);
