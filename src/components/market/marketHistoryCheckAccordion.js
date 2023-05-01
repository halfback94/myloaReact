import React, { useState, useEffect, useCallback }  from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

function CheckAccordionList(props) {
    
    const makeCheckAccordionList = () => {
        if(props.checkList && Array.isArray(props.checkList)) {
            const checkBoxList = props.checkList.map((checkItem, idx) => {
                if( props.div && idx > 0 && (idx%props.div == 0)) return (<hr key={idx*100} />);
                
                return (
                    <Form.Check inline key={idx} 
                        label={checkItem.name}
                        name={props.checkName}
                        type="checkbox"
                        value={checkItem.name}
                        onClick={() => {props.onClick();}}
                    />
                )
            });

            return checkBoxList;
        }

        return [];
    }

    return (
        <Accordion.Item eventKey={props.accordionIdx}>
            <Accordion.Header>{props.title}</Accordion.Header>
            <Accordion.Body>
                {makeCheckAccordionList()}
            </Accordion.Body>
        </Accordion.Item>
    );
}



function MarketHistoryCheckAccordion(props) {
    if(props.categories && Array.isArray(props.categories)) {
        const checkAccordionList = props.categories.map((category, idx) => {
            return (
                <CheckAccordionList key={idx}
                    accordionIdx={idx}
                    checkName="itemName"
                    title={category.name}
                    checkList={category.list}
                    div={category.div}
                    onClick={props.onClick}
                />
            );
        });

        return ( <Accordion> {checkAccordionList} </Accordion> );
    }

    return [];
}

export default MarketHistoryCheckAccordion;