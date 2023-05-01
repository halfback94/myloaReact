
import React, { useState, useEffect, useCallback }  from 'react';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

import BootStrapBtton from '../bootStrap/bootStrapBtton';

function DailyContentTaps(props) {

    const getDefaultTap = useCallback(() => {
        const keyList = Object.getOwnPropertyNames(props.contentList);

        if(keyList.length > 0 ) {
            return keyList[0];
        } 
        
        return null;
    }, [props.contentList]);

    const makeTaps = () => {
        let result = [];
        const keyList = Object.getOwnPropertyNames(props.contentList);

        for (let i = 0; i < keyList.length; i++) {
            result.push(
                <Tab eventKey={keyList[i]} title={keyList[i]} key={i} >
                    <TodayContentTapItem content={props.contentList[keyList[i]]}/>
                </Tab>
            );
        }

        return result;
    }

    return (
        <Accordion defaultActiveKey="0">
            <div className="d-grid gap-2 d-lg-flex justify-content-lg-end tmargin10">
                <TodayContentTapToggleButten eventKey="0">상세 정보</TodayContentTapToggleButten>
            </div>
            <hr />
            <Accordion.Collapse eventKey="0">
                <Tabs className="mb-2" defaultActiveKey={getDefaultTap()} >
                    {makeTaps()}
                </Tabs>
            </Accordion.Collapse>
        </Accordion>
    );
}

function TodayContentTapToggleButten({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, null, );
  
    return (
        //<Button type="button" className="btn btn-dark p-lg-0 lg-2 lg-md-0 text-decoration-none bd-toc-toggle d-lg-none" onClick={decoratedOnClick}>
        <Button type="button" className="btn btn-dark text-decoration-none bd-toc-toggle " onClick={decoratedOnClick}>
            {children}
        </Button>
    );
}

function TodayContentTapItem(props) {
    const makeTapItem = () => {
        if(props.content && Array.isArray(props.content)) {
            const contentList = props.content.map((contentItem, idx) => {
                return (
                    <Accordion.Item eventKey={idx} key={idx}>
                        <Accordion.Header> 
                            <Image 
                                style={contentIconStyle}
                                rounded="true"
                                src={contentItem.ContentsIcon} 
                            />
                             {contentItem.ContentsName}
                        </Accordion.Header>
                        <Accordion.Body>
                            <small> 참여 가능 아이템 레벨 : {contentItem.MinItemLevel}</small>
                            <ListGroup>
                                {makeStartTimeList(idx)}
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                );
            });

            return contentList;
        }

        return [];
    }

    const makeStartTimeList = (idx) => {
        if(props.content[idx].StartTimes && Array.isArray(props.content[idx].StartTimes)) {
            const startTimeList = props.content[idx].StartTimes.map((startTime, idx) => {
                return (<ListGroup.Item key={idx}>{new Date(startTime).toLocaleTimeString()}</ListGroup.Item>);
            });

            return startTimeList;
        }

        return [];
    }

    return (
        <Accordion defaultActiveKey="0">
            {makeTapItem()}
        </Accordion>
    );
}

const contentIconStyle = {
    width: 30,
    height: 30,
};

export default DailyContentTaps;