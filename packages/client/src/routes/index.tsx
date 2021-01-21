import React from 'react';
import { Route } from 'react-router-dom';

import Configuration from './Configuration/Configuration';
import Profile from './Profile/Profile';

export const Routes = [
    <Route exact path="/configuration" render={() => <Configuration />} />,
    <Route exact path="/profile" render={() => <Profile />} />,
];