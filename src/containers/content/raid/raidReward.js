import React, { useState, useEffect, useCallback, useMemo }  from 'react';

import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import utils from '../../../utils/utils';

import RaidSelector from '../../../components/raid/raidSelector';
import RaidrewardTable from '../../../components/raid/raidRewardTable';
import RaidrewardItemPriceList from '../../../components/raid/raidrewardItemPriceList';

import BootStrapCard from '../../../components/bootStrap/bootStrapCard';

function RaidReward() {
    const [raidInfo, setRaidInfo] = useState({});
    const [raidRewardList, setRaidRewardList] = useState({});
    const [rewardItemPrice, setRewardItemPrice] = useState({});

    useEffect(() => {
        if( null == raidInfo || Object.keys(raidInfo).length == 0 ) getRaidInfo();
        if( null == rewardItemPrice || Object.keys(rewardItemPrice).length == 0 ) getRewardItemPrice();
        return () => {
        }
    }, []);
 
    const getRaidInfo = async () => {
        callApiRaidInfo().then(data => {
            if(Object.keys(data).length > 0) setRaidInfo(() => data);
        }).catch((err) => { });
    }

    const callApiRaidInfo = async () => {
        const response = await fetch(utils.getApiServer() + '/api/raidInfo', {
            method: "POST",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: ""
        });
        return await response.json();
    };

    const getRewardItemPrice = async () => {
        callApiRewardItemPrice().then(data => {
            if(Object.keys(data).length > 0) setRewardItemPrice(() => data)
        }).catch((err) => { });
    }

    const callApiRewardItemPrice = async () => {
        const response = await fetch(utils.getApiServer() + '/api/raidRewardItemPrice', {
            method: "POST",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: ""
        });
        return await response.json();
    };

    const getRaidRewardList = async (raidIdxs) => {
        callApiRaidRewardList(raidIdxs).then(data => {
            if(data) setRaidRewardList(() => data);
        }).catch((err) => { });
    }

    const callApiRaidRewardList = async (raidName) => {
        const response = await fetch(utils.getApiServer() + '/api/raidRewardList', {
            method: "POST",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ raidname: raidName })
        });
        return await response.json();
    };

    const onchangeRaidSelect = useCallback(() => {
        const selectRaid = document.getElementById('raidSelector');
        if(selectRaid && selectRaid.value.length > 0 && Object.keys(raidInfo).length > 0 ) {
            getRaidRewardList(selectRaid.value);
        }
    }, [raidInfo]);

    const makeRewardTable = () => {
        if( Object.keys(raidRewardList).length > 0 )
            return (
                <RaidrewardTable 
                    raidInfo={raidInfo[raidRewardList.name]}
                    raidRewardList={raidRewardList}
                    rewardItemPrice={rewardItemPrice}
                />
            );

        return null;
    }

    /**
     * 보상아이템 시세 계산 방법
     */
    const raidRewardItemPriceDetail = useMemo(() => {
        const content = (
            <>
                <strong> 로스트아크 오픈 API(/markets/items/*)로 제공받은 가장 최근의 평균 거래가를 기준으로 계산합니다.</strong>
                <br/>
                * 소수점2자리로 반올림하기 때문에 약간의 오차가 발생할 수 있습니다.
                <br/>
                * 엘릭서는 연성하지 않고 분해하였을때 나오는 재료를 판매하는 기준으로 계산되었습니다.
                <br/><br/>
                - 명예의 파편 : 명예의 파편 주머니(대)/1500
                <br/>
                - 선명한 지혜의 엘릭서 : 선명한 지혜의 정수*6
                <br/>
                - 선명한 지혜의 기운 : (선명한 지혜의 엘릭서 - 100) / 4
                <br/>
                - 빛나는 지혜의 엘릭서 : 빛나는 지혜의 정수*6
                <br/>
                - 선명한 지혜의 기운 : (빛나는 지혜의 엘릭서 - 250) / 4
            </>
        );
    
        return (            
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header> 보상아이템 시세 계산 방법 </Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            <BootStrapCard content={content}/>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }, []);

    /**
     * 아이템 손익 체크 관련 알람
     */
    const raidrewardItemPriceAlert = useMemo(() => {
        return (
            <Alert variant='secondary'>
                * 기본적으로 재료가격에 반영되는 항목은 파괴석류, 수호석류, 돌파석류, 엘릭서 관련 재료입니다.
                <br />
                * 명예의 파편은 기본적으로 재료가격에 반영되지 않습니다. 필요하신 재료 항목이 기본값과 다를시 수동으로 체크 부탁드립니다.
            </Alert>
        );
    }, []);
    
    return (
        <div className="bd-content ps-lg-2">
            <div>
                <h2>레이드 보상</h2>
            </div>
            <br />
            <RaidSelector id="raidSelector" name="raidSelector"
                raidInfo={raidInfo}
                onchangeRaidSelect={onchangeRaidSelect}
            />
            <br />
            <RaidrewardItemPriceList rewardItemPrice={rewardItemPrice} />
            <br />
            {raidRewardItemPriceDetail}
            <br />
            {raidrewardItemPriceAlert}
            <br />
            {makeRewardTable()}
        </div>
    );
}

export default RaidReward;