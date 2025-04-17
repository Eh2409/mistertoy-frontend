
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store/store.js'

import { Home } from './pages/Home.jsx'
import { AppHeder } from './cmps/AppHeader.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'

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
                            <Route path="/toy/add" element={<ToyEdit />} />
                            <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                        </Routes>
                    </main>

                </section>
            </Router>
        </Provider>
    )
}