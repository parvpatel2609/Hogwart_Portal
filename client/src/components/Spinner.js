import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Spinner = () => {

    const [count, setCount ] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevalue) => --prevalue);
        }, 1000);
        count === 0 && navigate("/");
        return () => clearInterval(interval);
    }, [count, navigate]);


    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{height: "100vh"}}>
                <h1>Redirecting to you on login page of hogwart portal in {count} second</h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

        </>
    )
}

export default Spinner