import React, { useState, useEffect }  from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import utils from '../../utils/utils';

function MarketSearchResult(props) {
    const makeMarketSearchResult = () => {
        if(props.searchResult && props.searchResult.success) return(<MarketSearchResultList data={props.searchResult.data}/>);
        return null;
    }

    return (
        <div id="searchResult">
            {makeMarketSearchResult()}
        </div>
    );
}

const ItemCss = {
    "에스더": { pClass : 'text-esther', imgClass : 'text-bg-esther'},
    "고대": { pClass : 'text-ancient', imgClass : 'text-bg-ancient'},
    "유물": { pClass : 'text-relics', imgClass : 'text-bg-relics'},
    "전설": { pClass : 'text-legend', imgClass : 'text-bg-legend'},
    "영웅": { pClass : 'text-hero', imgClass : 'text-bg-hero'},
    "희귀": { pClass : 'text-primary', imgClass : 'text-bg-primary'},
    "고급": { pClass : 'text-success', imgClass : 'text-bg-success'},
    "일반": { pClass : '', imgClass : ''},
};

function MarketSearchResultList(props) {

    const makeResultItems = () => {
        if(props.data.Items && Array.isArray(props.data.Items)) {
            const resultItems = props.data.Items.map((item, idx) => {
                const tmpImgClassName = "rounded float-start " + ItemCss[item.Grade].imgClass;
                return (
                    <ListGroup.Item key={idx}>
                        <div>
                            <img className={tmpImgClassName} width="46" src={item.Icon} />
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <p className={ItemCss[item.Grade].pClass}>{item.Name}</p>
                                <p> 구매후 거래 가능횟수 : {item.TradeRemainCount}</p>
                            </div>
                            <div className="col-4">
                                <p className="fs-6">거래 단위 : {item.BundleCount} </p>
                                <p className="fs-6"> {utils.moneyFormat(item.CurrentMinPrice)} G </p>
                            </div>
                        </div>
                    </ListGroup.Item>
                )
            });

            return resultItems;
        }

        return [];
    }

    return (
        <ListGroup>
            {makeResultItems()}
        </ListGroup>
    );
}



export default MarketSearchResult;