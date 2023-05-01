import React, { useState, useEffect, useCallback, useMemo }  from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Masonry from 'react-masonry-component';
import utils from '../../utils/utils';

/**
 * 카테고리별 아이템 시세정보를 보여줌
 * @param {{prices: [], CategorieNames: []}} props 
 * @returns 
 */
function MarketCategoryPrice(props) {
    return (
        <div className="tmargin10 grid" style={{position: 'relative'}}>
            <Masonry columns={2} spacing={2}>
                <PriceCardList 
                    prices={props.prices}
                    CategorieNames={props.CategorieNames}
                />
            </Masonry>
        </div>
    );
};

/** 카테고리별로 아이템 가격 테이블을 출력 */
function PriceCardList(props) {
    if(props.prices && Array.isArray(props.prices)) {
        const pricceCardList = props.prices.map((price, idx) => {
            if(price.length > 0) {
                return (
                    <div className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6' key={idx}>
                        <PriceCard
                            categorieName={props.CategorieNames[idx]}
                            prices={price}
                        />
                    </div>
                );
            }

            return null;
        });

        return pricceCardList;
    }

    return [];
}

/** 하나의 카테고리에 해당하는 아이템들의 가격 정보 */
function PriceCard(props) {
    return (
        <Card className="margin10 pad10" >
            <Card.Body>
                <div className="d-flex align-items-center">
                    <strong>{props.categorieName}</strong>
                    <div className="spinner-border spinner-border-sm ms-auto" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    lastupdate : {props.prices[0].lastupdate}
                </div>
                <div>
                    <PriceCardTable itemList={props.prices}/>
                </div>
            </Card.Body>
        </Card>
    );
}

/** 아이템들의 가격을 테이블 형식으로 보여줌 */
function PriceCardTable(props) {
    
    const makeTableRows = () => {
        if( props.itemList && Array.isArray(props.itemList) ) {
            const tableRows = props.itemList.map((item, idx) => {
                const titleStr = "7일 평균 가격 : " + item.AvgPriceWeek + " G";
                const price = utils.moneyFormat(item.CurrentMinPrice) + " G";
                const spanClass = "badge rounded-pill " + makeSpanClass(item.CurrentMinPrice, item.AvgPriceWeek);
                
                return (
                    <tr key={idx} >
                        <th>{item.Name}</th>
                        <td>
                            <span className={spanClass} data-toggle="tooltip" title={titleStr}>
                                {price}
                            </span>
                        </td>
                    </tr>
                );
            });

            return tableRows;
        }

        return [<li className="list-group-item"> 검색 결과가 없습니다. 검색 조건을 다시 확인해 주세요. </li>];
    };

    return (
        <Table bordered hover>
            <thead></thead>
            <tbody>
                {makeTableRows()}
            </tbody>
        </Table>
    );
}

const makeSpanClass = (CurrentMinPrice, AvgPriceWeek) => {
    let className = "text-bg-light";
    if( CurrentMinPrice > AvgPriceWeek * 1.05) {
        className = "text-bg-danger";
    } else if ( CurrentMinPrice < AvgPriceWeek * 0.95 ) {
        className = "text-bg-info";
    }

    return className;
}

export default MarketCategoryPrice;