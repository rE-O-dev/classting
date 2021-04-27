import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import CustomButton from '../component/custom-button';

export default function Main() {
    const history = useHistory();

    const [voteList, setVoteList] = useState(() => {
        const list = localStorage.getItem("voteList");
        if(list) {
            return JSON.parse(list);
        } else {
            return null;
        }
    })


    return (
        <MainWrap>
            <h3>메인페이지</h3>
            <ul className="voteList">
            {
                voteList !== null && (
                    voteList.map((vote: any, idx: number) => {
                        return (
                            <li className="voteItem" key={idx}>
                                {vote.title}
                            </li>
                        )
                    })
                )
            }
            </ul>

            <div className="buttonWrap">
                <CustomButton onClick={() => {
                    history.push("/login");
                }}>
                    로그인
                </CustomButton>

                <CustomButton onClick={() => {
                    history.push("/create");
                }}>
                    투표 생성
                </CustomButton>
            </div>
        </MainWrap>
    )
}

const MainWrap = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    
    .buttonWrap {
        & > button:last-child {
            margin-left: 16px;
        }
    }

`