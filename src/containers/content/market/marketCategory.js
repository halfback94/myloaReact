import React, { useState, useEffect, useCallback, useMemo }  from 'react';
import Card from 'react-bootstrap/Card';
import {Hr} from '../../../components/myloaComponents';
import MarketCategoryPrice from '../../../components/market/marketCategoryPrice';
import MarketCategoryCheckBox from '../../../components/market/marketCategoryCheckBox';
import utils from '../../../utils/utils';

/** 카테고리별로 현재 아이템 시세정보를 보여줌 */
function MarketCategory (props) {

    const [prices, setPrice] = useState([[],[],[],[],[],[],[],[],[],[],[]]);
    const [categories, setCategorie] = useState([
        false, true, true, false, true,
        true, false, false, false, false, false
    ]);

    const CategorieNames = [
        "각인서", "재련 재료",
        "재련 추가 재료", "무기 진화 재료",
        "오레하", "기타 재료",
        "배틀 아이템 -회복형", "배틀 아이템 -공격형",
        "배틀 아이템 -기능성", "배틀 아이템 -버프형",
        "생활"
    ];

    const checkboxName = "marketCatagory";
    const threadInterval = 5*1000;
    let thread = null;

    useEffect(() => {
            if( null == thread ) getPrices();
            thread = setInterval( getPrices , threadInterval );
        return () => {
            clearInterval(thread);
        }
    }, [categories]);

    const updatecategories = useCallback(() => {
        const checkboxList = document.querySelectorAll('input[name="' + checkboxName + '"]');
        if(checkboxList.length === CategorieNames.length) {
            let newCategories = [];
            for ( let i = 0; i < checkboxList.length; i++ ) {
                newCategories.push(checkboxList[i].value === CategorieNames[i] && checkboxList[i].checked);
            }
    
            clearInterval(thread);
            setCategorie(() => newCategories);
        }
    }, []);

    const getPrices = () => {
        callApi().then(data => {
            if(data.length > 0) setPrice(() => data);
        }).catch((err) => { /*console.log("err : " + err);*/ });
    };

    const callApi = useCallback( async () => {
        const response = await fetch(utils.getApiServer() + '/api/marketCategory', {
            method: "POST",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ categories: categories })
        });
        return await response.json();
    }, [categories]);

    const marketCategoryDetail = useMemo(() => {
        return (
            <Card body>
                아이템 목록이 계속 나오지 않는 경우, 로스트아크 점검이 끝난 후에 다시 시도해주세요. 
                <br />
                <br /> 
                <span className="badge rounded-pill text-bg-info"> 000 G </span> : 7일 평균 가격에 비해 5% 이상 낮은 가격
                <br /> 
                <span className="badge rounded-pill text-bg-danger"> 000 G </span> : 7일 평균 가격에 비해 5% 이상 높은 가격
                <br />
                * PC로 접속하신 경우 마우스를 가져다가 대면 7일 평균 가격을 확인하실 수 있습니다.
                <Hr />
            </Card>
        );
    }, []);

    return (
        <div className="bd-content ps-lg-2">
            <div>
                <div>
                    <h2>실시간 거래소 시세 확인</h2>
                </div>
                <br />
                <div>
                    {marketCategoryDetail}
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end tmargin10">
                    <div className='col-md-12'>
                        <MarketCategoryCheckBox 
                            checkboxName={checkboxName}    
                            categorieNames={CategorieNames}
                            categories={categories}
                            onClick={updatecategories}
                        />
                    </div>
                </div>
                <div>
                    <MarketCategoryPrice
                        prices={prices}
                        CategorieNames={CategorieNames}
                    />
                </div>
            </div>   
        </div>
    );
    
}

export default MarketCategory;
