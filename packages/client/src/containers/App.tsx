import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';

import { Routes } from '../routes';
import { history } from '../store';
import * as Providers from '../Providers';
import * as Resources from '../Resources';
import { Dashboard } from '../components/Dashboard';
import { NotFound } from '../components/NotFound/NotFound';
import { Layout } from '../components/Layout';
import { LoginWithTheme } from '../components/Login';

class App extends Component {
    render() {
        return (
            <Admin
                title="Educational Panel"
                history={history}
                {...Providers}
                customRoutes={Routes}
                layout={Layout}
                loginPage={LoginWithTheme}
                catchAll={NotFound}
                dashboard={Dashboard}
            >
                {permissions => Object.values(Resources).map((res, i) => (
                    <Resource {...res(permissions)} key={i} />
                ))}
            </Admin>
        );
    }
}

export default App;
