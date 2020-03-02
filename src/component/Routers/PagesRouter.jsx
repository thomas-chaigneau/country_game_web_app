// @flow
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import HomePage from '../Pages/HomePage/HomePage';
import ChooseGamesPage from '../Pages/ChooseGamesPage/ChooseGamesPage';
import Games from '../Pages/Games/Games';

const pages = [
    {
        path: '/',
        component: () => <HomePage />,
    },
    {
        path: '/games',
        subPath: [
            {
                path: '/',
                component: () => <ChooseGamesPage />,
            },
            {
                path: '/population',
                component: () => <Games gameName="population" />,
            },
            {
                path: '/borders',
                component: () => <Games gameName="borders" />,
            },
        ],
    },
];

const PagesRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                {pages.map(page => {
                    if (!page.subPath) {
                        return <Route key={page.path} exact path={page.path} render={page.component} />;
                    }
                    return page.subPath.map(subPath => {
                        const fullPath = `${page.path}${subPath.path}`;
                        return <Route key={page.path} exact path={fullPath} render={subPath.component} />;
                    });
                })}
                <Route component={() => <p>404</p>} />
            </Switch>
        </BrowserRouter>
    );
};

export default PagesRouter;
