
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store/store.js'

import { Home } from './pages/Home.jsx'
import { AppHeder } from './cmps/AppHeader.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'

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
                            <Route path="/toy/:toyId" element={<ToyDetails />} />
                        </Routes>
                    </main>

                </section>
            </Router>
        </Provider>
    )
}