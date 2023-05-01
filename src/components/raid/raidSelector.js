import React, {useEffect} from 'react';
import Form from 'react-bootstrap/Form';

import BootStrapSelect from  '../bootStrap/bootStrapSelect';

function RaidSelector(props) {

    const makeOptions = () => {
        const raidInfokeys = Object.keys(props.raidInfo);
        const result = raidInfokeys.map((key, keyIdx) => {
            return ( <option key={keyIdx+1} value={key}> {key} </option> );
        });

        return result;
    }

    return (
        <Form.Select id={props.id} name={props.name} aria-label={props.name} onChange={props.onchangeRaidSelect}>
            <option key="0" value=""> 레이드 </option>
            {makeOptions()}
        </Form.Select>
    );
}

export default RaidSelector;