
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store/store.js'

import { Home } from './pages/Home.jsx'
import { AppHeder } from './cmps/AppHeader.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { About } from './pages/About.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { ReviewExplore } from './pages/ReviewExplore.jsx'
import { UserDetails } from './pages/UserDetails.jsx'

export function RootCpm() {
    return (
        <Provider store={store}>
            <Router>
                <section >
                    <AppHeder />
                    <main className=' main-layout'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/toy" element={<ToyIndex />} />
                            <Route path="/toy/:toyId" element={<ToyDetails />} />
                            <Route path="/toy/add" element={<ToyEdit />} />
                            <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                            <Route path="/review" element={<ReviewExplore />} />
                            <Route path="/user/:userId" element={<UserDetails />} />
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}