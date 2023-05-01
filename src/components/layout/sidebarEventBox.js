import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';

import utils from '../../utils/utils';

function SidebarEvent(props) {
    const [eventList, setState] = useState([]);

    useEffect(() => {
        if( eventList.length == 0 ) {
            callApi()
                .then(data => { if(data.length > 0) setState(() => data); })
                .catch((err) => { console.log("err : " + err); });
        }
    });

    const callApi = async () =>{
        const response = await fetch(utils.getApiServer() + '/api/sidebarEvent', { 
            method: "POST",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: "" 
        } );
        return await response.json();
    };

    const currentEventCarouselImg = useMemo(() => {
        let result = eventList.map((event, eventIdx) => {
            return (
                <Carousel.Item key={eventIdx}>
                    <a target="_blank" href={event.Link} className="bd-links-link d-inline-block link-dark rounded">
                        <img className="d-block w-100" src={event.Thumbnail} alt="..." />
                    </a>
                </Carousel.Item>
            );
        });

        return result;
    }, [eventList]);

    const currentEventList = useMemo(() => {
        const result = eventList.map((event, eventIdx) => {
            return (
                <ListGroup.Item key={eventIdx} as="li">
                    <a target="_blank" href={event.Link} className="bd-links-link d-inline-block link-dark rounded">
                        {event.Title}
                    </a>
                </ListGroup.Item>
            );
        });

        return result;
    }, [eventList]);

    return (
        <Col>
            <nav className="bd-links w-100">
                <strong className="bd-links-heading d-flex w-100 align-items-center fw-semibold">
                현재 진행중인 이벤트
                </strong>
                <hr className="d-none d-md-block my-2" />
                <Carousel>
                    {currentEventCarouselImg}
                </Carousel>
                <hr className="d-none d-md-block my-2" />
                <ListGroup as="ul" className="list-unstyled fw-normal pb-2 small">
                    {currentEventList}
                </ListGroup>
            </nav>
        </Col>
    );
}

export default SidebarEvent;
