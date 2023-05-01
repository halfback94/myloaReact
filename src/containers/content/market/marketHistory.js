import React, { useState, useEffect, useCallback }  from 'react';
import utils from '../../../utils/utils';

import MarketHistoryCheckAccordion from '../../../components/market/marketHistoryCheckAccordion';
import MarketHistroyChart from '../../../components/market/marketHistroyChart';

function MarketHistory(props) {
    const [categories, setCategories] = useState([]);
    const [checkedCategory, setCheckedCategory] = useState([]);
    const [priceHistory, setPriceHistory] = useState({});

    useEffect(() => {
        if( categories.length == 0 ) {
            getCategories();
        }

        return () => {
        }
    }, []);

    const getCategories = () => {
        callApiCategories().then(data => {
            if(data.length > 0) setCategories(() => data);
        }).catch((err) => { console.log("err : " + err); });
    };

    const callApiCategories = useCallback( async () => {
        const response = await fetch(utils.getApiServer() + '/api/marketHistroyCategory', {
            method: "POST",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: ""
        });
        return await response.json();
    }, []);

    const callApiHistroy = useCallback( async (itemName) => {
        const response = await fetch(utils.getApiServer() + '/api/marketHistroy', {
            method: "POST",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ itemName: itemName })
        });
        return await response.json();
    }, []);

    const updatecategories = useCallback( async () => {
        const selectorChecked = 'input[name="itemName"]:checked';
        const checkboxList = document.querySelectorAll(selectorChecked);

        let newCategories = [];
        for(let i = 0; i < checkboxList.length; i++) {
            if( newCategories.length < 10 ) {
                await checkHistoryData(checkboxList[i].value);
                newCategories.push(checkboxList[i].value);
            } else {
                break;
            }
        }

        setCheckedCategory(() => newCategories);
    }, []);

    const checkHistoryData = useCallback( async (itemName) => {
        if( utils.isEmpty(priceHistory[itemName]) ) {
            const categoryHistroy =  await callApiHistroy(itemName);
            setPriceHistory(prevState => ({ ...prevState, [itemName]: categoryHistroy }));
        }
    }, []);

    return (
        <div className="bd-content ps-lg-2">
            <div>
                <div>
                    <h2>거래소 시세 기록</h2>
                </div>
                <div className="chart-container">
                    <MarketHistroyChart 
                        checkedCategory={checkedCategory}
                        priceHistory={priceHistory}
                    />
                </div>
                <br/>
                <strong>* </strong> 체크는 한번에 10개의 항목만 가능합니다.
                <br/>
                시세 데이터 업데이트 : 00:10
                <div className="tmargin10">
                    <MarketHistoryCheckAccordion 
                        categories={categories}
                        onClick={updatecategories}
                    />
                </div>
            </div>   
        </div>
    );
}

export default MarketHistory;