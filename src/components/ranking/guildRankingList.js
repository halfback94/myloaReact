import React, { useState, useEffect }  from 'react';

import utils from '../../utils/utils';
import Card from 'react-bootstrap/Card';

/**
 * 로아 API 길드 정보를 출력
 * https://developer-lostark.game.onstove.com/getting-started#API-GUILDS
 * @param { guild: {
 *              GuildName : string, 
 *              GuildMessage: string,
 *              Rank: number, 
 *              MasterName : string,             
 *              Rating: number, 
 *              MemberCount: number,
 *              MaxMemberCount: number,
 *              UpdatedDate : date
 *          }} props 
 * @returns 
 */
function Guild(props) {
    return(
        <Card style={{marginBottom : '10px'}}>
            <Card.Body>
                <Card.Title>{props.guild.GuildName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"> 길드 랭킹 : {props.guild.Rank}위 (Rating : {props.guild.Rating}) </Card.Subtitle>
                <Card.Text>
                    {props.guild.GuildMessage}
                </Card.Text>
                <Card.Text>
                    인원수 : {props.guild.MemberCount} / {props.guild.MaxMemberCount}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                update : {utils.dateFormat(props.guild.UpdatedDate)}
            </Card.Footer>
        </Card>
    );
}

/**
 * 각 서버별 길드 랭킹순 리스트 출력
 * @param {{rank: []}} props 
 * @returns 
 */
function GuildRankingList(props) {
    if(props.rank && Array.isArray(props.rank)) {
        const guildLsit = props.rank.map((guild, idx) => {
            return (
                <Guild key={idx} guild={guild}/>
            );
        })
    
        return guildLsit;
    }
    
    return null;
}

export default GuildRankingList;