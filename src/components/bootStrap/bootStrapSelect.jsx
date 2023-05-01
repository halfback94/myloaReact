import React, { useEffect, useState, useCallback } from 'react';
import Form from 'react-bootstrap/Form';

function BootStrapSelect(props) {
	const [value, setValue] = useState(props.value ? props.value : "");

	useEffect(() => {
		// if(value.length > 0 && props.onChange && typeof props.onChange === 'function')
		// 	props.onChange(value);
        return () => {
        }
    }, []);

	const handleChange = useCallback((event) => {
		if(props.onChange && typeof props.onChange === 'function')
			props.onChange(event.target.value);
		setValue(event.target.value);
	}, [props.onChange]);
 
	const id = (props.id ? props.id : "");
	const name = (props.name ? props.name : "");
	const ariaLabel = (props.ariaLabel ? props.ariaLabel : "");
	const size = (props.size ? props.size : "");

	return (
		<Form.Select id={id} name={name} aria-label={ariaLabel} size={size} value={value} onChange={handleChange}>
			{props.children}
		</Form.Select>
	);
};

export default BootStrapSelect;