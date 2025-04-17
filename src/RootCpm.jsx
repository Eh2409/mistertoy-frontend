
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { Home } from './pages/Home.jsx'
import { AppHeder } from './cmps/AppHeader.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { store } from './store/store.js'

export function RootCpm() {
    return (
        <Provider store={store}>
            <Router>
                <section >
                    <AppHeder />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/toy" element={<ToyIndex />} />
                        </Routes>
                    </main>

                </section>
            </Router>
        // </Provider>
    )
}