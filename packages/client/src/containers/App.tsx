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
            <>
                <Admin
                    title="YControl Panel"
                    history={history}
                    {...Providers}
                    customRoutes={Routes}
                    layout={Layout}
                    loginPage={LoginWithTheme}
                    catchAll={NotFound}
                    dashboard={Dashboard}
                >
                    {(permissions) =>
                        Object.values(Resources).map((res, i) => <Resource {...res(permissions)} key={i} />)
                    }
                </Admin>
                <div
                    style={{
                        position: 'fixed',
                        right: 0,
                        bottom: 0,
                        left: 0,
                        zIndex: 100,
                        padding: 6,
                        backgroundColor: '#efefef',
                        textAlign: 'center',
                    }}
                >
                    <strong>v1.0.0</strong>
                </div>
            </>
        );
    }
}

export default App;
