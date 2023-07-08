import React from 'react'
import Layout from '../components/Layout/Layout'

const Invalid_password = () => {
    return (
        <Layout>
            <div className="px-4 py-5 my-5 text-center">
                <a id="logo" href="https://ahduni.edu.in/"><img src="image/au_logo.png" alt="Hogwarts School Logo" /></a>
                <h3 className="display-5 fw-bold text-body-emphasis">404 Error</h3>
                <div className="col-lg-6 mx-auto alert-danger alert">
                    <p className="lead mb-4 " /><h4>Invalid Email ID or Password!</h4><p />
                </div>
            </div>
        </Layout>
    )
}

export default Invalid_password;