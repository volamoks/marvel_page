import { lazy, Suspense } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import { MainPage, SingleComicPage } from '../pages';
import ComicsList from '../comicsList/ComicsList';

const Page404 = lazy(() => import('../pages/404'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<span>Loading...</span>}>
                        <Routes>
                            <Route
                                end
                                path="/"
                                element={<MainPage />}
                            />
                            <Route
                                path="/comics"
                                element={<ComicsList />}
                            />
                            <Route
                                path="/comics/:comicId"
                                element={<SingleComicPage />}
                            />
                            <Route
                                path="*"
                                element={<Page404 />}
                            />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default App;
