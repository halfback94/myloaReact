import React, { useState, useEffect, useCallback,useMemo }  from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import utils from '../../utils/utils';

function RaidrewardItemPriceList(props) {
    
    const rewardItemList = useMemo(() => {
        const raidItemkeys = Object.keys(props.rewardItemPrice);
        if( raidItemkeys && Array.isArray(raidItemkeys) ) {
            const raidrewardItemList = raidItemkeys.map((itemName, idx) => {
                return (
                    <RaidrewardItem key={idx} 
                        itemName={itemName} 
                        itemPrice={props.rewardItemPrice[itemName]} 
                    />
                );
            });

            return raidrewardItemList;
        }

        return [];
    }, [props.rewardItemPrice]);

    return (
        <div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header> 보상아이템 시세 </Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            {rewardItemList}
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

function RaidrewardItem(props) { 
    return (
        <Col md={6}>
            <Card body> {props.itemName} : {utils.moneyFormat(props.itemPrice)} G</Card>
        </Col >
    );
}

export default RaidrewardItemPriceList;