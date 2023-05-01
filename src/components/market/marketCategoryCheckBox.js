import React, { useState, useEffect, useCallback }  from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

/** 카테고리 체크박스 생성 */
function MarketCategoryCheckBox(props) {
    return (
        <Card>
            <Card.Body>
                * 확인을 원하는 항목들을 체크해 주시고 검색 버튼을 눌러주세요
                <br /> 
                <MarketCategoryCheckList 
                    checkboxName={props.checkboxName}    
                    categorieNames={props.categorieNames}
                    categories={props.categories}
                    onClick={props.onClick}
                />
            </Card.Body>
        </Card>
    );
};

/** 카테고리 입력받아 체크 리스트 생성 */
function MarketCategoryCheckList(props) {
    if(props.checkboxName && props.categories && Array.isArray(props.categories) && props.categorieNames) {
        const checkList = props.categories.map((category, idx) => {
            return (
                <Form.Check inline type="checkbox" key={idx} 
                    name={props.checkboxName}    
                    label={props.categorieNames[idx]}
                    value={props.categorieNames[idx]}
                    defaultChecked={category}
                    onClick={props.onClick}
                />
            );
        });

        return checkList;
    }

    return [];
}

export default MarketCategoryCheckBox;