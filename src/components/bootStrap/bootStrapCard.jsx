import React, { useState, useEffect }  from 'react';
import Card from 'react-bootstrap/Card';
/**
 * react-bootstrap Card 컴포넌트 생성
 * @param {String} props.title
 * @param {String} props.subTitle
 * @param {String} props.text
 * @param {String} props.content
 * @param {String} props.image
 * @returns 
 */
function BootStrapCard(props) {

    const makeImg = () => {
        if(props.image) return (<Card.Img variant="top" src={props.image} />);
        return null;
    };

    const makeTitle = () => {
        if(props.title) return (<Card.Title as="small"><b>{props.title}</b></Card.Title>);
        return null;
    }

    const makeSubTitle = () => {
        if(props.subTitle) 
            return (
                <Card.Subtitle className={props.subTitleClassName}>
                    {props.subTitle}
                </Card.Subtitle>
            );
        return null;
    }

    const makeCardText = () => {
        if(props.text) return (<Card.Text> {props.text} </Card.Text>);
        return null;
    }

    const makeCardContent = () => {
        if(props.content) return props.content
        return null;
    }

    const makeCardBody = () => {
        const cardBody = (
            <Card.Body>
                {makeTitle()}
                {makeSubTitle()}
                {makeCardText()}
                {makeCardContent()}
            </Card.Body>
        );

        if(props.imgOverlay) {
            return ( <Card.ImgOverlay> {cardBody} </Card.ImgOverlay> );
        }

        return cardBody;

    };

    return (
        <Card className={props.className}>
            {makeImg()}
            {makeCardBody()}
        </Card>
    );
}

export default BootStrapCard;