import React from 'react';
import { Route } from 'react-router-dom';

import Configuration from './Configuration/Configuration';
// import Segments from './segments/Segments';

export const Routes = [
    <Route exact path="/configuration" render={() => <Configuration />} />,
    // <Route exact path="/segments" render={() => <Segments />} />,
];