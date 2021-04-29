import { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { Context } from '../context'

import styled from 'styled-components';

import CustomButton from '../component/custom-button';
import { dateFormatter } from '../lib';
import Deadline from '../component/dead-line';

export default function Main() {
    const history = useHistory();
    const { state, action } = useContext(Context); 

    const [voteList, setVoteList] = useState(() => {
        const list = localStorage.getItem("voteList");
        if(list) {
            return JSON.parse(list);
        } else {
            return null;
        }
    });

    return (
        <MainWrap>
            <h3>메인페이지</h3>
            {
                voteList !== null ? (
                    <ul className="voteList">
                        {voteList.map((vote: any, idx: number) => {
                            console.log(state.user, vote.user);
                            return (
                                <li className="voteItem" key={idx} onClick={() => {
                                    history.push(`/detail?num=${idx}`);
                                }}>
                                    <Deadline date={vote.deadLine} />
                                    <span className="title">
                                        {vote.title}
                                        <br />
                                        <span className="dateTime">
                                            {dateFormatter(vote.startTime, "YYYY-MM-DD HH:mm")} ~ {dateFormatter(vote.deadLine, "YYYY-MM-DD HH:mm")}
                                        </span>
                                    </span>
                                    <div className="voteItem__buttonWrap">
                                        {
                                            state.user === vote.user && 
                                                    
                                                    <CustomButton onClick={(e: any) => {
                                                        e.stopPropagation();
                                                        const filteredList = voteList.filter((v: any, i: number) => i !== idx);
                                                        if(filteredList.length > 0) {
                                                            localStorage.setItem("voteList", JSON.stringify(filteredList))
                                                        } else {
                                                            localStorage.removeItem("voteList");
                                                        }
                                                        setVoteList(filteredList);
                                                    }} color="secondary" >
                                                        삭제
                                                    </CustomButton>
                                                
                                        }
                                    </div>
                                    
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <p>
                        작성된 투표 리스트가 없습니다.
                    </p>
                )
            }
            

            <div className="buttonWrap">
                {
                    state.user !== null ? (
                        <CustomButton onClick={() => {
                            localStorage.removeItem("user");
                            action.setUser(null);
                        }}>
                            로그아웃
                        </CustomButton>
                    ) : (
                        <CustomButton onClick={() => {
                            history.push("/login");
                        }}>
                            로그인
                        </CustomButton>
                    )
                }
                
                {
                    state.user !== null &&
                    <CustomButton onClick={() => {
                        history.push("/create");
                    }}>
                        투표 생성
                    </CustomButton>
                }
            </div>
        </MainWrap>
    )
}



const MainWrap = styled.div`
    h3 {
        text-align: center;
    }

    .voteList {
        .voteItem {
            display: flex;
            align-items: center;
            
            margin-top: 4px;
            cursor: pointer;

            

            & > button {
                margin-left: 4px;
            }

            .title {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                flex: 1;
                margin: 0 8px;
                .dateTime {
                    font-size: 12px;
                    color: #bbb;
                }
            }
        }
    }

`