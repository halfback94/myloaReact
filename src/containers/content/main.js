import React, { useState, Suspense, useEffect, useCallback, useMemo } from 'react';
import GameContent from './game/gameContent';
import MarketCategory from './market/marketCategory';
import MarketHistory from './market/marketHistory';
import MarketSearch from './market/marketSearch';
import RaidReward from './raid/raidReward';
import GuildRanking from './ranking/guildRanking';

function Main (props) {
    useEffect(() => {
        return () => {
        }
    });

    const mainContent =  useMemo(() => {
        return (
            {
                "gameContent" : <GameContent />,
                "marketCategary": <MarketCategory />,
                "marketHistory": <MarketHistory />,
                "marketSearch": <MarketSearch />,
                "raidreward" : <RaidReward />,
                "guildranking" : <GuildRanking />,
            } [props.contentName]
        );
    }, [props.contentName]);

    return (
        <div className="bd-content ps-lg-2" id="mainContent">
            {mainContent}
        </div>
    );
    
}

export default Main;
