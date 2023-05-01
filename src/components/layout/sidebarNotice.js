import React, { useState, useEffect, useMemo  } from 'react';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import utils from '../../utils/utils';

function SidebarNotice(props) {
    const [noticeList, setNotice] = useState([]);

    useEffect(() => {
        if( noticeList.length == 0 ) {
            callApi()
                .then(data => { if(data.length > 0) setNotice(() => data); })
                .catch((err) => { console.log("err : " + err); });
        }
    });

    const callApi = async () =>{
        const response = await fetch(utils.getApiServer() + '/api/sidebarNotice', { 
            method: "POST",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({type : '공지'}) 
        });
        return await response.json();
    };

    const makeNoticeList = useMemo(() => {
        const result = noticeList.map((notice, noticeIdx) => {
            if(noticeIdx > 5) return null;
        
            return (
                <ListGroup.Item key={noticeIdx} as="li">
                    <a target="_blank" href={notice.Link} className="bd-links-link d-inline-block link-dark rounded">
                        {notice.Title}
                    </a>
                </ListGroup.Item>
            );
        });

        return result;
    }, [noticeList]);


    return (
        <Col>
            <nav className="bd-links w-100">
                <strong className="bd-links-heading d-flex w-100 align-items-center fw-semibold">
                    로스트아크 공지
                </strong>
                <hr className="d-none d-md-block my-2" />
                <ListGroup as="ul" className="list-unstyled fw-normal pb-2 small">
                    {makeNoticeList}
                </ListGroup>
            </nav>
        </Col>
    );
}

export default SidebarNotice;
