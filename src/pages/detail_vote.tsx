import { useMemo, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { Context } from '../context'

import styled from 'styled-components';

import CustomProgress from '../component/custom-progress'
import { dateFormatter } from '../lib';

import Deadline from '../component/dead-line'

import CustomRadio from '../component/custom-radio'
import CustomButton from '../component/custom-button';

const VoteDetail = () => {
    const history = useHistory();
    const location = useLocation();

    const { state } = useContext(Context);

    const [selectedValue, setSelectedValue] = useState<number>(-1);

    const idx = useMemo(() => {
        return Number(location.search.split("?num=").join(""));
    }, [])
    
    const voteItem = useMemo(() => {
        const voteList = localStorage.getItem("voteList");
        if(voteList) {
            return JSON.parse(voteList)[idx];
        } else {
            return null;
        }
    }, []);

    const totalCnt = useMemo(() => {
        if(voteItem !== null) {
            return voteItem.items.reduce((prev: any, cur: any) => {
                return prev + cur.cnt.length;
            }, 0);
        } else {
            return 0;
        }
    }, [])

    const isVote = useMemo(() => {
        if(voteItem !== null) {
            return voteItem.items.some((item: any) => {
                return item.cnt.find((v: any) => {
                    return v === state.user
                });
            });
        } else {
            return true;
        }
    }, [])

    const isEnd = useMemo(() => {
        if(voteItem !== null) {
            return new Date(voteItem.deadLine).getTime() < new Date().getTime()
        } else {
            return true;
        }
    }, [])

    if(voteItem === null) {
        return (
            <div>
                undefined
            </div>    
        )
    } else {
        return (
            <Detail>
                <div className="info">
                    <div className="titleWrap">
                        <Deadline date={voteItem.deadLine} />
                        <span className="title">{voteItem.title}</span>
                    </div>
                    <span className="user">?????????: {voteItem.user}</span>
                    <span className="dateTime">
                        ????????????: {dateFormatter(voteItem.startTime, "YYYY-MM-DD HH:mm")} ~ {dateFormatter(voteItem.deadLine, "YYYY-MM-DD HH:mm")}
                    </span>
                </div>
                <ul className="voteItems">
                    {voteItem.items.map((item: any, idx: number) => {
                        return (
                            <li key={idx} className="voteItem">
                                {
                                    state.user && isEnd === false && isVote === false && (
                                        <CustomRadio checked={selectedValue === idx} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setSelectedValue(parseInt(e.target.value))
                                        }}
                                        value={idx}
                                        />
                                    )
                                }
                                <div className="categoryWrap">
                                    <p className="category">{
                                        item.cnt.find((cnt: any) => {
                                            return cnt === state.user;
                                        }) ? "<?????????>" : ""
                                    } {item.title} <span>{item.cnt.length}???</span></p>
                                    <CustomProgress value={
                                        totalCnt > 0 ? item.cnt.length / totalCnt * 100 : 0
                                    } />
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <p className="totalCnt">
                    ??????: {totalCnt}???
                </p>
                
                    <div className="buttonWrap">
                        {
                        state.user && isEnd === false && isVote === false && (
                            <CustomButton onClick={() => {
                                const voteList = localStorage.getItem("voteList");
                                if(voteList) {
                                    const jsonArray = JSON.parse(voteList);
                                    voteItem.items[selectedValue].cnt.push(state.user);
                                    const tempArray = jsonArray.map((v: any, index: number) => {
                                        if(index === idx) {
                                            return voteItem
                                        } else {
                                            return v
                                        };
                                    })

                                    localStorage.setItem("voteList", JSON.stringify(tempArray));
                                    history.goBack();
                                }
                            }}>
                                ????????????
                            </CustomButton>
                        )}
                        <CustomButton onClick={() => {
                            history.goBack();
                        }}>
                            ??????
                        </CustomButton>
                    </div>
            </Detail>
        )
    }

}

const Detail = styled.div`
    .info {
        span {
            display: block;
            margin-bottom: 8px;
        }
        .titleWrap {
            display: flex;
            .title {
                margin-left: 8px;
            }
        }

        .user, .dateTime {
            font-size: 12px;
            color: #bbb;
        }
    }

    .voteItems {
        margin-top: 30px;
        padding: 16px;
        font-size: 12px;
        border: 1px solid #ddd;
        border-radius: 12px;
        .voteItem {
            display: flex;
            &:not(:first-child) {
                margin-top: 16px;
            }
            .categoryWrap {
                width: 100%;
                .category {
                    display: flex;
                    justify-content: space-between;
        
                    span {
                        color: #bbb;
                    }
        
                    margin-bottom: 8px;
                }
            }
        }
    }
    
    .totalCnt {
        margin-top: 16px;
        font-size: 12px;
        color: #bbb;
        text-align: right;
    }

    .buttonWrap {
        margin-top: 30px;
        text-align: center;

        button+button {
            margin-left: 16px;
        }
    }
    
`


export default VoteDetail;