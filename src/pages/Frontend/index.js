import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Components
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Home from './Home'
// import About from './About'
import NoPage from './NoPage'
import Events from './Events'
import AllUsers from './AllUsers'
// import NoPage from './NoPage'

export default function Index() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/events" element={<Events/>} />
                    <Route path="/allusers" element={<AllUsers/>} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}
