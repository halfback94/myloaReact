import React, { useState, useEffect , Suspense }  from 'react';
import BootStrapCard from '../bootStrap/bootStrapCard';
import utils from '../../utils/utils';

import DailyContentList from './dailyContentList';
import DailyContentTaps from './dailyContentTaps';

function DailyAssignment() {
    const [contentList, setContentList] = useState({});

    useEffect(() => {
        if( Object.keys(contentList).length === 0 ) {
            getContentList();
        }
        return () => {
        }
    }, );

    const getContentList = async () => {
        callApi().then(data => {
            if(Object.keys(data).length > 0) setContentList(() => data);
        }).catch((err) => { console.log("err : " + err); });
    }

    const callApi = async () => {
        const response = await fetch(utils.getApiServer() + '/api/calendarToday', {
            method: "POST",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: ""
        });
        const data = await response.json();
        return data;
    };

    const makeTodayContent = () => {
        return (
            <>
                <DailyContentList contentList={contentList} />
                <DailyContentTaps contentList={contentList} />
            </>
        );
    };

    return (
        <div className="tmargin10">
            <BootStrapCard 
                title='오늘의 일정'
                subTitle= '로스트아크 일일 컨텐츠는 06:00을 기준으로 초기화 됩니다.'
                subTitleClassName='mb-2 text-muted'
                content={makeTodayContent()}
            />
        </div>
    );
}

export default DailyAssignment;