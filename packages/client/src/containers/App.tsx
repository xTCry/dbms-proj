import React, { useCallback, useEffect, useState } from 'react';
import { Resource, AdminContext, AdminUI, ListGuesser, useDataProvider } from 'react-admin';

import { Routes } from '../routes';
import { history } from '../store';
import * as Providers from '../Providers';
import * as Resources from '../Resources';
import { Dashboard } from '../components/Dashboard';
import { NotFound } from '../components/NotFound/NotFound';
import { Layout } from '../components/Layout';
import { LoginWithTheme } from '../components/Login';

const ResourcesComponent = () => {
    const [resourcesState, setResources] = useState({
        resources: [Resources.roleResource],
    });

    const fetchResourcesRoles = useCallback(async () => {
        let resAr = Object.values(Resources);
        for (let res of resAr) {
            await res?.loadRoles();
        }
        setResources({ resources: resAr });
    }, []);

    useEffect(() => {
        fetchResourcesRoles();
    }, []);

    const { resources } = resourcesState;
    return (
        <>
            <AdminUI
                layout={Layout}
                customRoutes={Routes}
                dashboard={Dashboard}
                catchAll={NotFound}
                title="YControl Panel"
                loginPage={LoginWithTheme}
                disableTelemetry
            >
                {resources.map((res, i) => (
                    <Resource {...res.format()} key={i} />
                ))}
            </AdminUI>
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
};

const App = () => (
    <>
        <AdminContext history={history} {...Providers}>
            <ResourcesComponent />
        </AdminContext>
    </>
);

export default App;
