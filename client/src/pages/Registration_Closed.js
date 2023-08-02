import React from 'react'
import Layout from '../components/Layout/Layout'

const Registration_Closed = () => {
  return (
    <Layout title={"Registration Closed-Hogwart Portal"}>
            <div className="px-4 py-5 my-5 text-center">
                <a id="logo"><img src="/image/hogwart_school_logo.png" alt="Hogwarts School Logo" /></a>
                <h3 className="display-5 fw-bold text-body-emphasis">404 Error</h3>
                <div className="col-lg-6 mx-auto alert-danger alert">
                    <p className="lead mb-4"><h4>Registration is closed</h4></p>
                </div>
            </div>
    </Layout>
  )
}

export default Registration_Closed;