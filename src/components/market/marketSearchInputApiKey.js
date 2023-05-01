import React, { useState, useEffect }  from 'react';
import utils from '../../utils/utils';
import BootStrapInput from '../bootStrap/bootStrapInput';

function MarketSearchInputApiKey(props) {
    const savedApikey = utils.readLocalStorage('apiKey');

    return (
        <BootStrapInput 
            spanText="API Key"
            className={props.className}
            id="apiKey"
            name="apiKey"
            ariaLabel="API"
            value={savedApikey}
        />);
};

export default MarketSearchInputApiKey;