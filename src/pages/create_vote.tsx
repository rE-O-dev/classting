import { useState, useContext, useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import { Context } from '../context';

import CustomButton from '../component/custom-button';
import CustomInput from '../component/custom-input';

import { dateFormatter } from '../lib';

const CreateVote = () => {
    
    const history = useHistory();

    const { action, state } = useContext(Context);

    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState(dateFormatter(new Date(), 'YYYY-MM-DDTHH:mm'));
    const [deadLine, setDeadLine] = useState(dateFormatter(new Date(), 'YYYY-MM-DDTHH:mm'));
    const [items, setItems] = useState([{
            title: "",
            cnt: []
        },
        {
            title: "",
            cnt: []
        },
        {
            title: "",
            cnt: []
        }]);
    

    const inspection = useMemo(() => {
        switch(true) {
            case title === "":
                return {
                    status: true,
                    msg: "제목을 입력해주세요."
                };
            case items.some(v => v.title === ""):
                return {
                    status: true,
                    msg: "항목을 모두 입력해 주세요."
                }
            case new Date(startTime).getTime() >= new Date(deadLine).getTime():
                return {
                    status: true,
                    msg: "투표 시작시간은 투표 마감시간보다 작을 수 없습니다."
                }
            case new Date(deadLine).getTime() <= new Date().getTime():
                return {
                    status: true,
                    msg: "투표 마감시간은 현재시간보다 커야합니다."
                }
            default:
                return {
                    status: false
                };
        }
        
    }, [title, items, deadLine]);

    const saveVote = useCallback(() => {
        if(inspection.status === false) {
            const voteList = localStorage.getItem("voteList");
            
            if(voteList) {
                const jsonVoteList = JSON.parse(voteList)
                jsonVoteList.push({title, items, user: state.user, deadLine, startTime});
                localStorage.setItem("voteList", JSON.stringify(jsonVoteList));
            } else {
                const jsonString = JSON.stringify([{title, items, user: state.user, deadLine, startTime}]);
                localStorage.setItem("voteList", jsonString);
            }
            action.setAlertStatus({
                status: true,
                msg: "투표 저장에 성공했습니다.",
                callback: () => {
                    history.goBack();
                }
            })
        } else {
            callAlert(inspection)
        }
    }, [title, items, deadLine]);

    const callAlert = useCallback((props) => {
        action.setAlertStatus({...props})
    }, [])

    return (
        <VoteForm>
            <CustomInput className="title" id="title" value={title} label={"제목"} onChange={(e: any) => {
                setTitle(e.target.value);
            }} />

            <CustomInput
                id="startTime"
                label="투표 시작일"
                type="datetime-local"
                value={startTime}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e: any) => {
                    setStartTime(e.target.value);
                }}
            />

            <CustomInput
                id="deadLine"
                label="투표 마감일"
                type="datetime-local"
                value={deadLine}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e: any) => {
                    setDeadLine(e.target.value);
                }}
            />

            <VoteItems>
                {
                    items.map((item, idx) => {
                        return (
                            <div key={idx} className="item">
                                <CustomInput id={`item_${idx}`} label={`항목 ${idx+1}`} onChange={(e: any) => {
                                    items[idx].title = e.target.value;
                                    setItems([...items]);
                                }} value={item.title} />
                                {
                                    idx > 2 && (
                                        <CustomButton onClick={() => {
                                            setItems(
                                                items.filter((v, i) => {
                                                    return i === idx ? false : true
                                                })
                                            )
                                        }}>
                                            
                                            삭제
                                        </CustomButton>
                                    )
                                }
                                
                            </div>
                        )
                    })
                }
                <div className="buttonWrap">
                    <CustomButton onClick={() => {
                        if(items.length < 6) {
                            setItems([...items, {title: "", cnt: []}])
                        } else {
                            action.setAlertStatus({
                                status: true,
                                msg: "항목은 6개이상 추가가 불가능합니다."
                            })
                        }
                    }}>
                        항목 추가
                    </CustomButton>
                    
                    <CustomButton onClick={saveVote}>
                        투표 저장
                    </CustomButton>

                    <CustomButton onClick={() => {
                        history.goBack();
                    }}>
                        취소
                    </CustomButton>
                </div>
                
            </VoteItems>
        </VoteForm>
    )

}

export default CreateVote;

const VoteForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    
    padding: 30px;

    & > div {
        width: 400px;
        margin: auto;
    }

    & > div:not(:first-child) {
        margin-top: 12px;
    }
`;

const VoteItems = styled.div`
    display: flex;
    flex-direction: column;
    
    align-items: center;

    & > button {
        margin-top: 16px;
    }

    .item {
        display: flex;
        width: 400px;

        &:not(:first-child) {
            margin-top: 16px;
        }

        & > button {
            margin-left: 16px;
        }

        & > div {
            min-width: 200px;
            width: 400px;
        }
    }
`

