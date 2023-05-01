import React, { useState, useEffect }  from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

function MarketSearchInputCategory(porps) {
    const makeMarketSearchCategory = () => {
        if(null == porps.options || Object.keys(porps.options).length == 0) return null;

        return (<MarketSearchCategory categories={porps.options.Categories}/>);
    }

    return (
        <div>
            {makeMarketSearchCategory()}
        </div>
    );
}

function MarketSearchCategory(props) {

    const makeMarketSearchCategoryItem = () => {
        let result = [];
        for (let i = 0; i < props.categories.length; i++) {
            result.push(
                <MarketSearchCategoryItem key={i+1}
                    category={props.categories[i]}
                />
            );
            if(i < props.categories.length-1) result.push(<hr key={(i+1)*100} />);
        }

        return result;
    }

    return (
        <div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header> 카테고리 </Accordion.Header>
                    <Accordion.Body>
                        {makeMarketSearchCategoryItem()}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

function MarketSearchCategoryItem(props) {

    const makeRadioList = () => {
        if(props.category && Array.isArray(props.category.Subs)) {
            const checkList = props.category.Subs.map((checkItem, idx) =>{
                return (
                    <Form.Check inline key={idx+1} 
                        type="radio"
                        name="categoryItem"
                        label={checkItem.CodeName}
                        value={checkItem.Code}
                    />
                );
            });

            return checkList;
        }

        return [];
    }

    return (
        <fieldset className="row mb-3">
            <legend className="col-form-label col-sm-2 pt-0">{props.category.CodeName}</legend>
            <div className="col-sm-10">
                <Form.Check key={0}
                    inline
                    type="radio"
                    name="categoryItem"
                    label="전체"
                    value={props.category.Code}
                />
                {makeRadioList()}
            </div>
        </fieldset>
    );
}



export default MarketSearchInputCategory;