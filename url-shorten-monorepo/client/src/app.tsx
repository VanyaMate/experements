import {
    PageNotification,
} from './widget/notification/PageNotification/PageNotification.tsx';
import { Router, Route, LocationProvider } from 'preact-iso';
import { HomePage } from './pages/home/HomePage.tsx';
import { InfoPage } from './pages/info/InfoPage.tsx';


export function App () {
    return (
        <LocationProvider>
            <main>
                <PageNotification/>
                <Router>
                    <Route path={ '/' } component={ HomePage }/>
                    <Route path={ '/info/:id' } component={ InfoPage }/>
                </Router>
            </main>
        </LocationProvider>
    );
}
