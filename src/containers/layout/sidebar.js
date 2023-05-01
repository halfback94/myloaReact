import React , { useMemo, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Row from 'react-bootstrap/esm/Row';
import SidebarEvent from '../../components/layout/sidebarEventBox';
import SidebarNotice from '../../components/layout/sidebarNotice';

function Sidebar(props) {

    useEffect(() => {
        return () => {
        }
    },);

    const row1 = useMemo( () => ({ margin: "0px", }) , []);

    return (
        <aside className="bd-sidebar">
            <Collapse in={props.openSidebar}>
                <div className="offcanvas-lg offcanvas-start" id="bdSidebarEvent">
                    <div className="offcanvas-header border-bottom">
                        <h5 className="offcanvas-title" id="bdSidebarOffcanvasLabel"></h5>
                        <Button type="button" className="btn-close" onClick={() => props.onClickSidebarToggle()}></Button>
                    </div>
                    <div className="offcanvas-body">
                        <Row xs={1} md={1} lg={1} xl={1} style={row1}>
                            <SidebarEvent />
                            <br />
                            <br />
                            <SidebarNotice />
                        </Row>
                    </div>
                </div>
            </Collapse>
        </aside>
    );
}

export default Sidebar;
