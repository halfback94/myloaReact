
import React, { useState, useEffect, useCallback }  from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import BootStrapBtton from '../bootStrap/bootStrapBtton';

function DailyContentList(props) {
    const makeDailyContentList = () => {
        if(props.contentList) {
            const keyList = Object.getOwnPropertyNames(props.contentList);
            const contentList = keyList.map((content, idx) => {
                return (
                    <DailyContentListItem key={idx} 
                        title={content} 
                        content={props.contentList[content]}
                    />
                );
            });
            
            return contentList;
        }

        return [];
    }

    return (
        <ListGroup variant="flush">
            {makeDailyContentList()}
        </ListGroup>
    );
}

function DailyContentListItem(props) {
    const [nextContent, setNextContent] = useState({});

    useEffect(() => {
        if( Object.keys(nextContent).length === 0 ) updateNextContent();
        return () => {
        }
    }, [nextContent]);

    const update = () => {
        updateNextContent();
    }

    const updateNextContent = () => {
        if(hasSubTitle()) {
            createNextContentWithSub();
        } else {
            createNextContent();
        }
    }

    const hasSubTitle = useCallback(() => {
        return (props.title === "모험 섬" || props.title === "섬" || props.title === "로웬");
    }, []);

    const createNextContent = () => {
        const now = new Date();
        let tmp = {
            startTime: null,
            contentsName: [],
            contentsReward: [],
        };

        props.content.forEach( (contentItem) => {
            for(let i = 0; i < contentItem.StartTimes.length; i++)
            {
                const tmpStartTime = new Date(contentItem.StartTimes[i]);
                if( now < tmpStartTime && (null == tmp.startTime || tmpStartTime < tmp.startTime))
                    tmp.startTime = tmpStartTime;
            } 
        });

        setNextContent(() => tmp);
    }

    const createNextContentWithSub = () => {
        const now = new Date();
        let tmp = {
            startTime: null,
            contentsName: [],
            contentsReward: [],
        };
        
        props.content.forEach( (contentItem) => {
            for(let i = 0; i < contentItem.StartTimes.length; i++)
            {
                const tmpStartTime = new Date(contentItem.StartTimes[i]);
                if( now < tmpStartTime )
                {
                    if( null == tmp.startTime || tmpStartTime.getTime() < tmp.startTime.getTime()) {
                        tmp.startTime = tmpStartTime;
                        tmp.contentsName = [contentItem.ContentsName];
                        tmp.contentsReward = [contentItem.Reward];
                    } else if(tmpStartTime.getTime() == tmp.startTime.getTime()) {
                        tmp.contentsName.push(contentItem.ContentsName);
                        tmp.contentsReward.push(contentItem.Reward);
                    }
                }
            } 
        });

        setNextContent(() => tmp);
    }

    const makeStartTime = () => {
        const time = ( null == nextContent.startTime ? "END" : nextContent.startTime.toTimeString().substr(0,5));

        return (
            <Row>
                <Col xs={6} sm={6} md={6}>
                    <div className="float-end">
                        <BootStrapBtton disabled={true}> {time} </BootStrapBtton>
                    </div>
                </Col>
                <Col xs={6} sm={6} md={6}>
                    <ContentTimer 
                        startTime={nextContent.startTime}
                        update={update}
                    />
                </Col>
            </Row>
        );
    }

    const makeSubContentList = () => {
        if(nextContent.contentsName && nextContent.contentsName.length > 0) {
            const subContentList = nextContent.contentsName.map((contentName, idx) => {
                if(props.title === "모험 섬") {
                    return (
                        <Row key={idx}>
                            <Col> {contentName} </Col>
                            <Col> {nextContent.contentsReward[idx]} </Col>
                        </Row>
                    );

                } else {
                    return (
                        <Row key={idx}>
                            <Col> {contentName} </Col>
                        </Row>
                    );
                }
            });

            return subContentList;
        }

        return null;
    };

    return (
        <ListGroup.Item>
            <Row>
                <Col> {props.title} </Col>
                <Col> {makeStartTime()} </Col>
            </Row>
            {makeSubContentList()}
        </ListGroup.Item>
    );
}

function ContentTimer(props) {
    const [remainTime, setRemainTime] = useState(null);
    let thread = null;
    const threadInterval = 1000;

    useEffect(() => {
        clearInterval(thread);
        if(new Date() >= props.startTime) {
            props.update();
        } else {
            thread = setInterval( updateRemainTime , threadInterval );
        }

        return () => {
            clearInterval(thread);
        }
    }, [props.startTime]);

    const updateRemainTime = () => {
        if(null != props.startTime ) {
            const tmpRemainTime = Math.floor((props.startTime.getTime() - new Date().getTime())/1000);
            const remainHour = Math.floor(tmpRemainTime/(60*60));
            const remainMin = Math.floor(tmpRemainTime/60) - remainHour*60;
            const remainSec = tmpRemainTime%60;

            if(remainSec < 0) {
                props.update();
            } else {
                setRemainTime(() => timerFormat(remainHour) + ":" + timerFormat(remainMin) + ":" + timerFormat(remainSec));
            }
        }
    }

    if(null != props.startTime && null != remainTime ) {
        return (
            <BootStrapBtton disabled={true}> {remainTime} </BootStrapBtton>
        );
    }

    return null;
}

const timerFormat = (number) => {
    return ( number < 10 ? "0"+ number : number);
};

export default DailyContentList;