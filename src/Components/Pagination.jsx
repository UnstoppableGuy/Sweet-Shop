import React from 'react'
import { useState } from 'react';
import { selectCurrentPage, setCurrentPage} from '../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';

export const Pagination = () => {

    const LEFT_PAGE = 'LEFT';
    const RIGHT_PAGE = 'RIGHT';
    const pageInfo = useSelector(selectCurrentPage);
    const dispatch = useDispatch();
    const currentPage = pageInfo.currentPage;
    const pageLimit = pageInfo.pageLimit;
    const pageNeighbors = 2;
    const totalPages = Math.ceil(pageInfo.totalRecords / pageLimit);


    const range = (from, to, step = 1) =>{
        let i = from;
        const range = [];

        while(i<=to){
            range.push(i);
            i+=step;
        }

        return range;
    }

    const fetchPageNumbers = () => {
        const totalPagesPerCurrentPage = (pageNeighbors * 2) + 3;
        const totalBlocks = totalPagesPerCurrentPage + 2;

        if(totalPages > totalBlocks){
            const startPage = Math.max(2, currentPage - pageNeighbors);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);
            let pages = range(startPage, endPage);

            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalPagesPerCurrentPage - (pages.length + 1);
        

            switch (true) {
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }
        
                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }
        
                case (hasLeftSpill && hasRightSpill):
                
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }

            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    }

    const gotoPage = page => {
        const offset = (page - 1) * pageLimit;

        dispatch(setCurrentPage(page));
    }

    const handleClick = page => evt => {
        evt.preventDefault();
        gotoPage(page);
      }
    
    const handleMoveLeft = evt => {
        evt.preventDefault();
        gotoPage(currentPage - pageNeighbors * 2);
    }
    
    const handleMoveRight = evt => {
        evt.preventDefault();
        gotoPage(currentPage + pageNeighbors * 2);
    }
    
    const pages = fetchPageNumbers();

    return (
        <div className="pagination-wrapper">
            <ul className='pagination'>
                {
                    pages.map((page, index) => {
                        if(page === LEFT_PAGE)
                            return (
                                <li key={index} className = 'pagination-item'>
                                    <div  className='pagination-link-arr' 
                                        href='#' 
                                        aria-label='Previous'
                                        onClick={handleMoveLeft}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                                            <path class="cls-1" d="M15.12,15.53,25,5.66a1,1,0,0,1,1.41,1.41l-9.06,9.06,8.8,8.8a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.42,0l-9.61-9.61A.85.85,0,0,1,15.12,15.53Z"/>
                                            <path class="cls-1" d="M5.54,15.53l9.88-9.87a1,1,0,1,1,1.41,1.41L7.77,16.13l8.8,8.8a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.41,0L5.54,16.73A.85.85,0,0,1,5.54,15.53Z"/>
                                        </svg>
                                    </div>
                                </li>
                            )

                        if(page === RIGHT_PAGE)
                            return (
                                <li key={index} className = 'pagination-item'>
                                    <div  className='pagination-link-arr' 
                                        onClick={handleMoveRight}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                                            <path class="cls-1" d="M16.88,15.53,7,5.66A1,1,0,0,0,5.59,7.07l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.42,0l9.61-9.61A.85.85,0,0,0,16.88,15.53Z"/>
                                            <path class="cls-1" d="M26.46,15.53,16.58,5.66a1,1,0,0,0-1.41,1.41l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.41,0l9.62-9.61A.85.85,0,0,0,26.46,15.53Z"/>
                                        </svg>
                                    </div>
                                </li>
                            )
                        
                        return (
                            <li key={index} className={`pagination-item${ currentPage === page ? ' active' : ''}`}>
                                <div className="pagination-link" href="#" onClick={handleClick(page) }>{ page }</div>
                            </li>
                        );

                    })
                }
            </ul>
        </div>
    )
}
