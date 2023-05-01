import React, { useState, useEffect, useCallback }  from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RaidrewardPhase from './raidRewardPhase';

function RaidRewardGold(props) {
    const makeRewardGold = () => {
        if(props.totalOpenGold)
            return (
                <Row> 
                    <Col xs={4} sm={4} md={2}>
                        <Card style={{height: '100%'}}>
                            <Card.Body className='d-flex align-items-center text-center'>
                                <Card.Text className='textt-center'>
                                    합계
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={8} sm={8} md={10}>
                        <Row>
                            <Col xs={12} sm={12} md={6}>
                                <Card>
                                    <Card.Header>
                                        <strong> 클리어 골드 : {props.totalGold} G </strong>
                                    </Card.Header>
                                </Card>
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                                <Card>
                                    <Card.Header>
                                        <strong> 더보기 골드 : {props.totalOpenGold} G </strong>
                                    </Card.Header>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            );

        return null;
    };


    return makeRewardGold();
}


function RaidrewardTable(props) {
    const makeRaidPhase = () => {
        const raidPhaseName = Object.keys(props.raidInfo);
        const raidPhaseList = raidPhaseName.map((phaseName, phaseIdx) => {
            return (
                <RaidrewardPhase 
                    key={phaseIdx}
                    phase={phaseName}
                    phaseInfo={props.raidInfo[phaseName]}
                    raidRewardList={props.raidRewardList[phaseName].itemList}
                    rewardItemPrice={props.rewardItemPrice}
                />
            );
        });

        return raidPhaseList;
    }

    const makeRaidTotalGold = () => {
        let tot = {gold: 0, opengold: 0};
        const raidPhaseName = Object.keys(props.raidInfo);
        raidPhaseName.forEach((phaseName) => {
            tot.gold += props.raidInfo[phaseName].gold;
            tot.opengold += props.raidInfo[phaseName].opengold;
        });

        if(tot.opengold > 0)
            return (
                <RaidRewardGold
                    totalGold={tot.gold}
                    totalOpenGold={tot.opengold}
                />
            );
        
        return null;
    }

    return (
        <Card body>
            <div>
                <strong> {props.raidRewardList.name} </strong>
                <br/>
            </div>
            {makeRaidPhase()}
            {makeRaidTotalGold()}
        </Card>
    );
}

export default RaidrewardTable;