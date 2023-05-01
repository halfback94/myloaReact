import React, { useState, useEffect }  from 'react';
import Pagination from 'react-bootstrap/Pagination';

function MarketSearchPagenation(props) {  

    const idxFirst = () => {
        if(props.searchResult && props.searchResult.success) return 1;
        return 0;
    }

    const idxPrev = () => {
        if(props.searchResult && props.searchResult.success) 
            return ( props.searchResult.data.PageNo > 1 ? props.searchResult.data.PageNo-1 : 0 );
        return 0;
    }

    const idxNext = () => {
        if(props.searchResult && props.searchResult.success) {
            const maxPage = getMaxPage();
            return ( props.searchResult.data.PageNo < maxPage ? props.searchResult.data.PageNo+1 : 0);
        }
        return 0;
    }

    const idxLast = () => {
        if(props.searchResult && props.searchResult.success) {
            return getMaxPage();
        }
        return 0;
    }

    const getMaxPage = () => {
        if(props.searchResult && props.searchResult.success) {
            let maxPage = Math.floor(props.searchResult.data.TotalCount/props.searchResult.data.PageSize)+1;
            if(props.searchResult.data.TotalCount%props.searchResult.data.PageSize == 0) maxPage--;
    
            return maxPage;
        }
        return null;
    }

    const getHerfUrl = () => {
        if(props.targetId) return "#" + props.targetId;

        return "";
    }

    const makeCurrentPageNo = () => {
        if(props.searchResult && props.searchResult.success) {
            return(
                <Pagination.Item href={getHerfUrl()}> {props.searchResult.data.PageNo} / {getMaxPage()} </Pagination.Item>
            );
        }
        return null;
    } 

    return (
        <div className='d-flex justify-content-center'>
            <Pagination>
                <Pagination.First href={getHerfUrl()} onClick={()=> props.onClickPageMove(idxFirst())} />
                <Pagination.Prev href={getHerfUrl()} onClick={()=> props.onClickPageMove(idxPrev())} />
                {makeCurrentPageNo()}
                <Pagination.Next href={getHerfUrl()} onClick={()=> props.onClickPageMove(idxNext())} />
                <Pagination.Last href={getHerfUrl()} onClick={()=> props.onClickPageMove(idxLast())} />
            </Pagination>
        </div>
    );
}

export default MarketSearchPagenation;