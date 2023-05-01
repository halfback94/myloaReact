import React, { useState, useCallback }  from 'react';

import Button from 'react-bootstrap/Button';

function BootStrapBtton(props) {

    const [value, setValue] = useState(props.value ? props.value : "");
    
    const handleClick = useCallback((event) => {
        if(props.onClick && typeof props.onClick === 'function')
			props.onClick(event.target.value);
        setValue(event.target.value);
    }, [props.onClick]);

    const type = (props.type ? props.type : "button");
    const variant = (props.variant ? props.variant : "outline-dark");
    const size = (props.size ? props.size : "sm");
    const disabled = (props.disabled ? props.disabled : false );

    return (
        <Button type={type} variant={variant} size={size} disabled={disabled} value={value} onClick={handleClick}>
            {props.children}
        </Button>
    )
}

export default BootStrapBtton;