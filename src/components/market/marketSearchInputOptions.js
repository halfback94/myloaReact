import React, { useState, useEffect }  from 'react';
import Form from 'react-bootstrap/Form';

function MarketSearchInputOptions(props) {
    const makeMarketSearchOptions = () => {
        if(null == props.options || Object.keys(props.options).length == 0) return null;
        
        return (
            <>
                <MarketSearchOptions key="0" id='Classes' name="Classes" text="클래스" list={props.options["Classes"]} />
                <MarketSearchOptions key="1" id='ItemTiers' name="ItemTiers" text="티어" list={props.options["ItemTiers"]} />
                <MarketSearchOptions key="2" id='ItemGrades' name="ItemGrades" text="등급" list={props.options["ItemGrades"]} />
            </>
        );
    }

    return (
        <div>
            {makeMarketSearchOptions()}
        </div>
    );
}

function MarketSearchOptions(props) {

    const makeOptions = () => {
        if(props.list && Array.isArray(props.list)) {
            const options = props.list.map((item, idx) => {
                return (<option key={idx+1} value={item}> {item} </option>);
            });

            return options;
        }

        return [];
    }

    return (
        <Form.Select id={props.id} name={props.name} aria-label={props.name}>
            <option key="0" value=""> 전체 {props.text} </option>
            {makeOptions()}
        </Form.Select>
    );
}

export default MarketSearchInputOptions;