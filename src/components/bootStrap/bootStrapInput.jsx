import React, { useState, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function BootStrapInput(props) {
    const [value, setValue] = useState(props.value ? props.value : "");
    
    const handleChange = useCallback((event) => {
        if(props.onChange && typeof props.onChange === 'function')
			props.onChange();
        setValue(event.target.value);
    }, [props.onChange]);


    const spanText = (props.spanText ? props.spanText : "");
    const id = (props.id ? props.id : "");
    const name = (props.name ? props.name : "");
    const ariaLabel = (props.ariaLabel ? props.ariaLabel : "");
    
    return (
        <InputGroup>
            <InputGroup.Text>{spanText}</InputGroup.Text>
            <Form.Control 
                type="text"
                id={id}
                name={name}
                placeholder={ariaLabel}
                aria-label={ariaLabel}
                value={value}
                onChange={handleChange}
            />
            {props.children}
        </InputGroup>
    );
}

export default BootStrapInput;