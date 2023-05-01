import React, { useState, useEffect, useCallback }  from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import utils from '../../utils/utils';


function RaidrewardDefault(props) {
    const makeItemList = () => {
        let itemList = [];
        if(props.raidRewardList && props.raidRewardList.length > 0) {
            itemList = props.raidRewardList.map((item, idx) => {
                if(item.cnt > 0)
                    return ( <ListGroup.Item key={idx}> {item.itemname} {item.cnt}개 </ListGroup.Item> );
                
                return null;
            });
        }

        return itemList;
    };

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <strong>클리어 : {props.gold} G</strong>
                </Accordion.Header>
                <Accordion.Body>
                    <ListGroup variant="flush">
                        {makeItemList()}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

function RaidrewardOpen(props) {
    const [update, setUpdate] = useState([]);
    const [price, setPrice] = useState({});

    useEffect(() => {
        calPrice();
        return () => {
        }
    }, [props.raidRewardList]);

    const calPrice = () => {
        let tmpPrice = {};
        props.raidRewardList.forEach((item) => {
            tmpPrice[item.itemname] = props.rewardItemPrice[item.itemname] * item.cntopne;
        });

        setPrice(() => tmpPrice);
    }

    const getCheckedItemPrice = () => {
        let totPrice = 0;
        const checkedList = document.querySelectorAll('input[name="' + props.phase + '"]');
        for(let i = 0; i < checkedList.length; i++) {
            if(checkedList[i].checked && price[checkedList[i].value] ) totPrice += price[checkedList[i].value];
        }

        return totPrice;
    }

    const makeItemList = () => {
        let itemList = [];
        if(props.raidRewardList && props.raidRewardList.length > 0) {
            props.raidRewardList.forEach((item, idx) => {
                if(item.cntopne > 0) {
                    const labelText = item.itemname + " " + item.cntopne + "개";
                    const checked = (item.itemname == '명예의 파편' ? false : true);
                    itemList.push(
                        <tr key={idx}>
                            <td>
                                <Form.Check 
                                    type="checkbox"
                                    name={props.phase}
                                    value={item.itemname}
                                    label={labelText}
                                    defaultChecked={checked}
                                    onChange={oncheckedItem}
                                />
                            </td>
                            <td>
                                {utils.moneyFormat(price[item.itemname])} G
                            </td>
                        </tr>
                    ); 
                }
            });
        }
        
        itemList.push(
            <tr key={1000}>
                <td>합계</td>
                <td>{utils.moneyFormat(getCheckedItemPrice())} G</td>
            </tr>
        ); 

        return itemList;
    };

    const oncheckedItem = () => {
        setUpdate(() => !update);
    };

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <strong>
                        더보기 : -{props.opengold} G
                        <br />
                        재료 : {utils.moneyFormat(getCheckedItemPrice())} G
                    </strong>
                </Accordion.Header>
                <Accordion.Body>
                    <Table bordered hover size="sm" style={{margin: '0'}}>
                        <tbody>
                            {makeItemList()}
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

function RaidrewardPhase(props) {
    const makePhaseName = () => {
        if(props.phaseInfo.subname)
            return props.phaseInfo.subname;

        return "" + props.phase + "관문";
    };

    return (
        <Row style={{marginBottom : '10px'}}> 
            <Col xs={4} sm={4} md={2}>
                <Card style={{height: '100%'}} >
                    <Card.Body className='d-flex align-items-center text-center'>
                        <Card.Text className='textt-center'>
                            {makePhaseName()}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={8} sm={8} md={10}>
                <Row>
                    <Col xs={12} sm={12} md={6}>
                        <RaidrewardDefault
                            gold={props.phaseInfo.gold}
                            raidRewardList={props.raidRewardList}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                        <RaidrewardOpen
                            phase={props.phase}
                            opengold={props.phaseInfo.opengold}
                            raidRewardList={props.raidRewardList}
                            rewardItemPrice={props.rewardItemPrice}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default RaidrewardPhase;