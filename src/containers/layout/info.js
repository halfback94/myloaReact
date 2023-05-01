import React from 'react';
import Card from 'react-bootstrap/Card';
import {Hr} from '../../components/myloaComponents';
import InfoAdv from '../../components/layout/InfoAdv';


function Info () {
    return (
        <React.Fragment>
            <div className="bd-intro pt-2 ps-lg-2">
            </div>
            <div className="bd-toc mt-3 mb-5 my-lg-0 ps-xl-3 mb-lg-5 text-muted">
                <Card>
                    <Card.Body>
                        <Card.Text>
                            이 사이트는 로스트아크 OPEN API를 사용하여 제작되었습니다.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Hr />
                {/* <InfoAdv /> */}
            </div>
        </React.Fragment>
    )
};

export default Info;