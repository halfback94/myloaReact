import React, { useState, useEffect }  from 'react';
import BootStrapCard from '../bootStrap/bootStrapCard';
import utils from '../../utils/utils';

function ChallengeGuardianRaids() {
    const [guardianRaids, setGuardianRaids] = useState([]);

    useEffect(() => {
        if( guardianRaids.length == 0 ) getGuardianRaids();
        return () => {
        }
    },);

    const getGuardianRaids = async () => {
        callApi().then(data => {
            if(data.Raids.length > 0) setGuardianRaids(() => data.Raids);
        }).catch((err) => {
            //console.log("getGuardianRaids err: " + err); 
        });
    }

    const callApi = async () => {
        const response = await fetch(utils.getApiServer() + '/api/challengeGuardianRaids', {
            method: "POST",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: ""
        });
        return await response.json();
    };

    const makeGuardianRaidList = () => {
        const result = guardianRaids.map((raid, raidIdx) => {
            return (
                <BootStrapCard key={raidIdx}
                    className='bg-dark text-white'
                    image={raid.Image}
                    imgOverlay={true}
                    title={raid.Name}
                />
            );
        });

        return result;
    }

    return (
        <div className="tmargin10">
            <BootStrapCard
                title='도전 가디언 토벌'
                content={makeGuardianRaidList()}
            />
        </div>
    );
}

export default ChallengeGuardianRaids;