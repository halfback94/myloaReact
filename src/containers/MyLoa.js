import React, { useState, Suspense, useEffect, useCallback, useMemo } from 'react';
import Header from './layout/header';
import Sidebar from './layout/sidebar';
import Info from './layout/info';
import Main from './content/main';
import Footer from './layout/footer';

function MyLoa(props) {
    const [contentName, setContentName] = useState("gameContent");
    const [openSidebar, setOpenSidebar] = useState( window.innerWidth >= 992 );
    
    const contentNameList = [
        "gameContent",
        "marketCategary",
        "marketHistory",
        "marketSearch",
        "raidreward",
        "guildranking",
    ];

    useEffect(() => {
        return () => {
        }
    },);

    const moveContent = useCallback((content_name) => {
        if(checkContentNameList(content_name)) setContentName(content_name);
    }, []);

    const checkContentNameList = useCallback((content_name) => {
        let existedName = false;
        contentNameList.forEach((contantName) => {
            if(contantName === content_name) {
                existedName = true;
                return false;
            }
        });

        return existedName;
    }, []);

    const onClickSidebarToggle = useCallback(() => {
        setOpenSidebar(!openSidebar);
    }, [openSidebar]);

    const memMainContent = useMemo(() => {
        return contentName;
    }, [contentName]);

    return (
        <>
            <Header 
                moveContent={moveContent}
                openSidebar={openSidebar}
                onClickSidebarToggle={onClickSidebarToggle}
            />
            <div className="container-xxl bd-gutter mt-3 my-md-4 bd-layout">
                <Sidebar
                    openSidebar={openSidebar}
                    onClickSidebarToggle={onClickSidebarToggle}
                />
                <main className="bd-main order-1">
                    <Info />
                    <Main contentName={memMainContent}/>
                </main>
            </div>
            <Footer />
        </>
    );
}

export default MyLoa;
