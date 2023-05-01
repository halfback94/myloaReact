import React, { useEffect, useState, useMemo, useCallback }  from 'react';
import utils from '../../../utils/utils';
import Card from 'react-bootstrap/Card';

import GuildRankingList from '../../../components/ranking/guildRankingList';
import BootStrapSelect from '../../../components/bootStrap/bootStrapSelect';

const serverList = ['루페온', '실리안', '아만', '카마인', '카제로스', '아브렐슈드', '카단', '니나브'];
const defaultServerName = serverList[7];

function GuildRanking(props) {
    const [rank, setRank] = useState([]);
    const [serverName, setServerName] = useState(defaultServerName);

    useEffect(() => {
        getGuildRank(serverName);
        return () => {
        }
    }, [serverName]);

    /** 서버명으로 길드 랭킹 요청 */
    const getGuildRank = async (serverName) => {
        callApiGuildRank(serverName).then(data => {
            if(data.length > 0) setRank(() => data);
        }).catch((err) => { /*console.log("err : " + err);*/ });
    };

    /** API 서버 통신 */
    const callApiGuildRank = useCallback(async (serverName) => {
        const response = await fetch(utils.getApiServer() + '/api/guildRanking', {
            method: "POST",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({serverName : serverName}),
        });
        return await response.json();
    },[]);

    /** 사용자가 선택된 서버의 길드 랭킹을 요청 */
    const onchangeSelector = useCallback((value) => {
        if(value && value.length > 0 ) setServerName(value);
    }, []);

    /** 서버 선택 */
    const guildRankingDetail = useMemo(() => {
        console.log(`GuildRanking guildRankingDetail`);
        const makeSelectList = serverList.map((serverName, idx) => {
            return (<option key={idx} value={serverName}> {serverName} </option>);
        });

        return (
            <Card body>
                <strong> 로스트아크 오픈 API(/guild/rankings)로 제공받은 목록을 표시합니다.</strong>
                <br />
                <br />
                <BootStrapSelect id="serverName" name="serverName" ariaLabel="서버 선택" value={serverName} onChange={onchangeSelector}>
                    {makeSelectList}
                </BootStrapSelect>
                <br />
            </Card>
        );
    },[]);

    return (
        <div className="bd-content ps-lg-2">
            <div>
                <h2>길드 랭킹 확인</h2>
            </div>
            <br />
                {guildRankingDetail}
            <br />
            <div>
                <GuildRankingList rank={rank}/>
            </div>
        </div>
    );  
}

export default GuildRanking;