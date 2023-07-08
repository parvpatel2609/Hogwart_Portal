import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast'

const Layout = ({ children, title }) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title> {title} </title>
            </Helmet>

            <main>
                <Toaster />
                {children}
            </main>
        </>
    )
}

export default Layout