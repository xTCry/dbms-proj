import React from 'react';
import { Route } from 'react-router-dom';

import Configuration from './Configuration/Configuration';
import ClientReport from './ClientReport/ClientReport';

export const Routes = [
    <Route exact path="/configuration" render={() => <Configuration />} />,
    <Route exact path="/report/client" render={() => <ClientReport />} />,
];