import React, { useEffect, useState } from 'react';
import { Resource, AdminContext, AdminUI, LoadingPage } from 'react-admin';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import { Routes } from '../routes';
import { history } from '../store';
import * as Providers from '../Providers';
import * as Resources from '../Resources';
import { Dashboard } from '../components/Dashboard';
import { NotFound } from '../components/NotFound/NotFound';
import { Layout } from '../components/Layout';
import { LoginWithTheme } from '../components/Login';
import { getUserRole } from '../modules/UserModule';

const ResourcesComponent = () => {
    const [resources, setResources] = useState([Resources.roleResource.format()]);
    const [loading, setLoading] = useState(true);
    // @ts-ignore
    const { token, soGood } = useSelector((state) => state.UserModule);

    useEffect(() => {
        const fetchResourcesRoles = async () => {
            setLoading(true);
            const permissions = getUserRole();
            let resAr = Object.values(Resources);
            for (let res of resAr) {
                await res?.loadRoles();
            }
            setResources(resAr.map((r) => r.format(permissions)));
            setLoading(false);
        };

        fetchResourcesRoles();
    }, [Resources, token]);

    return loading && soGood ? (
        <Route
            path="/"
            key="loading"
            // @ts-ignore
            render={() => <LoadingPage />}
        />
    ) : (
        <AdminUI
            layout={Layout}
            customRoutes={Routes}
            dashboard={Dashboard}
            catchAll={NotFound}
            title="YControl Panel"
            loginPage={LoginWithTheme}
            disableTelemetry
        >
            {resources.map((res, i) => {
                console.log('[exec resource] props', getUserRole(), res.name);
                return <Resource {...res} key={i} />;
            })}
        </AdminUI>
    );
};

const App = () => (
    <>
        <AdminContext history={history} {...Providers}>
            <ResourcesComponent />
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
                <strong>v1.0.0-beta.19</strong>
            </div>
        </AdminContext>
    </>
);

export default App;
