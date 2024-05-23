import React from 'react'

export default function Footer() {

    const year = new Date().getFullYear()

    return (
        <footer className='py-3'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="mb-0 text-info text-center">Event Planner WebApp &copy; {year}. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
