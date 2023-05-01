import React, { useState, useEffect }  from 'react';
import Button from 'react-bootstrap/Button'

import BootStrapInput from '../bootStrap/bootStrapInput';


function MarketSearchInputText(props) {
    const apiLimit = (props.searchResult && props.searchResult.success ? "API Limit : " + props.searchResult.header : "");

    return (
        <BootStrapInput id="searchText" name="searchText"
            spanText={apiLimit}
            ariaLabel="검색"
        >
            <Button variant="outline-secondary" onClick={props.onClickSearch}>
                검색
            </Button>
        </BootStrapInput>
    );
}

export default MarketSearchInputText;