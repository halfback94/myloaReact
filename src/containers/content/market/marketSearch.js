import React, { useState, useEffect, useCallback, useMemo }  from 'react';
import Card from 'react-bootstrap/Card';
import utils from '../../../utils/utils';

import MarketSearchInputText from '../../../components/market/marketSearchInputText';
import MarketSearchInputApiKey from '../../../components/market/marketSearchInputApiKey';
import MarketSearchInputOptions from '../../../components/market/marketSearchInputOptions';
import MarketSearchInputCategory from '../../../components/market/marketSearchInputCategory';
import MarketSearchResult from '../../../components/market/marketSearchResult'; 
import MarketSearchPagenation from '../../../components/market/marketSearchPagenation';

function MarketSearch (props) {

    const [options, setOptions] = useState(null);
    const [searchResult, setSearchResult] = useState(null);

    useEffect(() => {
        if(null == options || Object.keys(options).length == 0) getMarketOptions();
        return () => {
        }
    });

    const saveApiKey = useCallback(() => {
        const key = document.getElementById('apiKey');
        if(key && key.value && key.value.length > 0) utils.writeLocalStorage('apiKey', key.value);
    }, []);

    const getMarketOptions = () => {
        callMarketOptionsApi().then(data => {
            saveApiKey();
            if(Object.keys(data).length > 0) setOptions(() => data);
        }).catch((err) => {
            //console.log("err: " + err);
        });
    };

    const callMarketOptionsApi = useCallback( async () => {
        const response = await fetch(utils.getApiServer() +  '/api/marketOptions', {
            method: "POST",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: ""
        });
        const data = await response.json();
        return data;
    }, []);

    const onClickSearch = useCallback( async () => {
        const searchOption = getSearchOption();
        if(searchOption.apiKey.length > 0) {
            callApiSearch(searchOption).then(data => {
                if(Object.keys(data).length > 0) setSearchResult(() => data);
            }).catch((err) => { /*console.log("err : " + err);*/ });
        }
    }, []);

    const onClickPageMove = useCallback( async (idx) => {
        if(0 == idx) return;

        let searchOption = getSearchOption();
        if(searchOption.apiKey.length > 0) {
            searchOption.reqJson.PageNo = idx;
            callApiSearch(searchOption).then(data => {
                if(Object.keys(data).length > 0) setSearchResult(() => data);
            }).catch((err) => { /*console.log("err : " + err);*/ });
        }
    }, []);

    const callApiSearch = useCallback( async (searchOption) => {
        const response = await fetch(utils.getApiServer() + '/api/marketSearch', {
            method: "POST",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({reqData : searchOption}),
        });
        return await response.json();
    }, []);

    const getSearchOption = useCallback(() => {
        let searchOption = {
            apiKey : "",
            reqJson : {
                "Sort": "PRICE",
                "CategoryCode": 0,
                "CharacterClass": "",
                "ItemTier": 0,
                "ItemGrade": "",
                "ItemName": "",
                "PageNo": 0,
                "SortCondition": "DESC"
            }
        };
        
        const apiKey = document.getElementById('apiKey');
        if(apiKey && apiKey.value.length > 0) {
            searchOption.apiKey = apiKey.value;
        } else {
            return null;
        }

        const selectClass = document.getElementById('Classes');
        const selectTier = document.getElementById('ItemTiers');
        const selectGrade = document.getElementById('ItemGrades');
        const text = document.getElementById('searchText');
        const radioCategory = document.querySelector('input[name="categoryItem"]:checked');
        
        if(selectClass && selectClass.value.length > 0) searchOption.reqJson.CharacterClass = selectClass.value;
        if(selectTier && selectTier.value > 0 && selectTier.value <= 3 ) searchOption.reqJson.ItemTier = selectTier.value;
        if(selectGrade && selectGrade.value.length > 0) searchOption.reqJson.ItemGrade = selectGrade.value;
        if(text && text.value && text.value.length > 0) searchOption.reqJson.ItemName = text.value;
        if(radioCategory) searchOption.reqJson.CategoryCode = radioCategory.value;
        
        return searchOption;
    }, []);

    const searchDetail = useMemo(() => {
        return (
            <Card body>
                <strong>* </strong> 사용자가 개인적으로 API 키를 발급받아야 사용할 수 있는 기능입니다.
                <br />
                API 사용량에 제한이 있어 따로 사용량 추가 신청을 하지 않으시면 1분에 100회까지만 검색이 가능합니다.
                <br />
                구매후 거래가능 횟수가 0 이거나 거래 횟수제한이 없는 항목들 해당 정보가 보이지 않습니다. 
                <br />
                <p className="fs-4 fw-bold">카테고리를 반드시 선택해 주세요</p>
                <br />
                API 키 발급 : <a href="https://developer-lostark.game.onstove.com/clients/create" target="_blank">https://developer-lostark.game.onstove.com/clients/create</a>
                <br />
                유투브에서 "아이스팽 5배" 를 검색하시면 방법이 잘 나와있습니다.
                <br />
                발급받은 API키를 입력해주세요
                <br />
                <MarketSearchInputApiKey />
            </Card>
        );
    }, []);

    return (
        <div className="bd-content ps-lg-2">
            <div>
                <h2>거래소 검색</h2>
            </div>
            <br />
                {searchDetail}
            <hr />
            <MarketSearchInputOptions options={options} />
            <hr />
            <MarketSearchInputCategory options={options} />
            <hr />
            <MarketSearchInputText searchResult={searchResult} onClickSearch={onClickSearch} />
            <hr />
            <MarketSearchResult searchResult={searchResult} />
            <hr />
            <MarketSearchPagenation 
                targetId="searchText"
                onClickPageMove={onClickPageMove}
                searchResult={searchResult}
            />
        </div>
    );   
}

export default MarketSearch;
