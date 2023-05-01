import React, { useState, useEffect }  from 'react';
import BootStrapCard from '../bootStrap/bootStrapCard';
import utils from '../../utils/utils';

function ChallengeAbyssDungeon() {
    const [dungeons, setDungeons] = useState([]);

    useEffect(() => {
        if( dungeons.length == 0 ) getDungeons();
        return () => {
        }
    },);

    const getDungeons = async () => {
        callApi().then(data => {
            if(data.length > 0) setDungeons(() => data)
        }).catch((err) => {
            //console.log("getDungeons err: " + err);
        });
    }

    const callApi = async () => {
        const response = await fetch(utils.getApiServer() + '/api/challengeAbyssDungeons', {
            method: "POST",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: ""
        });
        return await response.json();
    };

    const makeDungeonList = () => {
        const result = dungeons.map((dungeon, dungeonIdx) => {
            return (
                <BootStrapCard key={dungeonIdx}
                    className='bg-dark text-white'
                    image={dungeon.Image}
                    imgOverlay={true}
                    title={dungeon.Name}
                />
            );
        });

        return result;
    }

    return (
        <div className="tmargin10">
            <BootStrapCard
                title='도전 어비스 던전'
                content={makeDungeonList()}
            />
        </div>
    );
}

export default ChallengeAbyssDungeon;