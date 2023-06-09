import React from 'react';

function Footer() {
    return (
        <footer className="bd-footer py-4 py-md-5 mt-5 bg-light">
            <div className="container py-4 py-md-5 px-4 px-md-3">
                <div className="row">
                    <div className="col-lg-3 mb-3">
                        <a className="d-inline-flex align-items-center mb-2 link-dark text-decoration-none" aria-label="마이로아">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" className="d-block me-2"
                                viewBox="0 0 118 94" role="img">
                                <title>마이로아</title>
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
                                    fill="currentColor"></path>
                            </svg>
                            <span className="fs-5">마이로아</span>
                        </a>
                        <ul className="list-unstyled small text-muted">
                            <li className="mb-2">Made by 타작하는날.</li>
                            <li className="mb-2">Currently v1.0.0.</li>
                        </ul>
                    </div>
                    <div className="col-6 col-lg-2 offset-lg-1 mb-3">
                        <h5>지원</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">None</li>
                        </ul>
                    </div>
                    <div className="col-6 col-lg-2 mb-3">
                        <h5>Guild</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">니나브 - 교실</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
