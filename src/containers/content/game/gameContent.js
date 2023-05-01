import React, { useState, useEffect, Suspense, lazy  }  from 'react';
import {Hr} from '../../../components/myloaComponents';

import ChallengeAbyssDungeon from '../../../components/game/challengeAbyssDungeon';
import ChallengeGuardianRaids from '../../../components/game/challengeGuardianRaids';
import DailyAssignment from '../../../components/game/dailyAssignment';

function GameContent(props) {

    useEffect(() => {
        return () => {
        }
    }, []);

    return ( 
        <Suspense Suspense fallback={<p> Loading... </p>}>
        <div className="bd-content ps-lg-2">
            <div className="row">
                <div className="col-md-7" >
                    <DailyAssignment />
                </div>
                <div className="col-md-5" >
                    <ChallengeAbyssDungeon />
                    <Hr />
                    <ChallengeGuardianRaids />
                </div>
            </div>   
        </div>
        </Suspense>
    );
}

export default GameContent;
