import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import {Hr} from '../myloaComponents';


function InfoAdvToggleButten({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, null, );
  
    return (
        <Button type="button" className="btn btn-dark p-lg-0 lg-2 lg-md-0 text-decoration-none bd-toc-toggle d-lg-none" onClick={decoratedOnClick}>
            {children}
        </Button>
    );
}


function InfoAdv () {
    return (
        <Accordion defaultActiveKey="0">
            {/* <div className="d-grid gap-2 d-lg-flex justify-content-lg-end tmargin10">
                <InfoAdvToggleButten eventKey="0">모집공고 접기</InfoAdvToggleButten>
            </div>
            <Hr />
            <Accordion.Collapse eventKey="0">
                <nav>
                    <Card>
                        <Card.Body>
                            <Card.Title><b>길드원 모집</b></Card.Title>
                            <Card.Text>
                                니나브 Lv. 21 [교실] <br />
                                1460↑ 단톡,디코必 <br />
                                (듣코가능) 본케만 <br />
                                군단장 같이 가실분 <br />
                                게임 재밌게 하실분 <br />
                                문의 : 타작하는날
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </nav>
            </Accordion.Collapse> */}
        </Accordion>
    );
    
}

export default InfoAdv;