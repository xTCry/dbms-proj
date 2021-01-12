import React from 'react';
import { useSelector } from 'react-redux';
import { Layout as ReactLayout, Sidebar } from 'react-admin';

import { AppState } from '../types';
import { darkTheme, lightTheme } from './themes';

import AppBar from './AppBar/AppBar';
// import Menu from '../../components/Menu/Menu';

const CustomSidebar = (props: any) => <Sidebar {...props} size={200} />;

export const Layout = (props: any) => {
    const theme = useSelector((state: AppState) => (state.ThemeModule.theme === 'dark' ? darkTheme : lightTheme));

    return (
        <ReactLayout
            {...props}
            appBar={AppBar}
            sidebar={CustomSidebar}
            // menu={Menu}
            theme={theme}
        />
    );
};
