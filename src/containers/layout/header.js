import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import NavHeader from '../../components/layout/navHeader';

function Header(props) {
    const [navOpen, setNavOpen] = useState(props.openSidebar);

    useEffect(() => {
        if(window.innerWidth >= 992 ) setNavOpen(true);
        return () => {
        }
    },[]);

    const onClickNavToggle = useCallback(() => {
        setNavOpen(!navOpen);
    }, [navOpen]);

    const onClickNavClose = useCallback(() => {
        if(window.innerWidth < 992) setNavOpen(false);
    }, []);

    const sidbarButton = useMemo(() => {
        return (
            <Button type="button" bsPrefix="null"
                className="navbar-toggler p-2"
                onClick={props.onClickSidebarToggle}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="bi" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z">
                    </path>
                </svg>
                <span className="d-none fs-6 pe-1">sidbarButton</span>
            </Button>
        );
    }, []);

    const  navHeaderHomeButton = useMemo(() => {
        return (
            <a className="navbar-brand p-0 me-0 me-lg-2" aria-label="Bootstrap" onClick={() => props.moveContent("gameContent")} href= "#mainContent" >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                </svg>
            </a>
        );
    },[]);

    const navHeaderButton = useMemo(() => {
        return (
            <Button type="button" bsPrefix="null"
                className="navbar-toggler d-flex d-lg-none order-3 p-2"
                onClick={onClickNavToggle}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
            </Button>
        );
    }, []);

    const navHeader = useMemo(() => {
        return (
            <NavHeader
                moveContent={props.moveContent}
                navOpen={navOpen}
                onClickNavToggle={onClickNavToggle}
                onClickNavClose={onClickNavClose}
            />
        );
    }, [props.moveContent, navOpen, onClickNavToggle, onClickNavClose]);

    return (
        <header className="navbar navbar-expand-lg navbar-dark bd-navbar sticky-top bg-dark">
            <Nav className="container-xxl bd-gutter flex-wrap flex-lg-nowrap" bsPrefix="null">
                <div className="bd-navbar-toggle text-bg-dark">
                     {sidbarButton}
                </div>
                {navHeaderHomeButton}
                <div className="d-flex">
                    {navHeaderButton}
                </div>
                {navHeader}
            </Nav>
        </header>
    );
}

export default Header;
