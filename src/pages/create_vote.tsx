import { useState, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import { Context } from '../context';

import CustomButton from '../component/custom-button';
import CustomInput from '../component/custom-input';

const CreateVote = () => {
    
    const history = useHistory();

    const { action } = useContext(Context);

    const [title, setTitle] = useState("");
    const [items, setItems] = useState(["", "", ""]);
    

    const inspection = useCallback(() => {
        switch(true) {
            case title === "":
                callAlert({
                    status: true,
                    msg: "제목을 입력해주세요."
                });
                return false;
            case items.some(v => v === ""):
                callAlert({
                    status: true,
                    msg: "항목을 모두 입력해 주세요."
                })
                return false;
            default:
                return true;
        }
        
    }, [title, items]);

    const saveVote = useCallback(() => {
        if(inspection()) {
            const voteList = localStorage.getItem("voteList");
            
            if(voteList) {
                const jsonVoteList = JSON.parse(voteList)
                jsonVoteList.push({title, items});
                localStorage.setItem("voteList", JSON.stringify(jsonVoteList));
            } else {
                const jsonString = JSON.stringify([{title, items}]);
                localStorage.setItem("voteList", jsonString);
            }
        }
    }, [title, items]);

    const callAlert = useCallback((props) => {
        action.setAlertStatus({...props})
    }, [])

    return (
        <VoteForm>
            <CustomInput className="title" id="title" value={title} label={"제목"} onChange={(e: any) => {
                setTitle(e.target.value);
            }} />
            <VoteItems>
                {
                    items.map((item, idx) => {
                        return (
                            <div key={idx} className="item">
                                <CustomInput id={`item_${idx}`} label={`항목 ${idx+1}`} onChange={(e: any) => {
                                    items[idx] = e.target.value;
                                    setItems([...items]);
                                }} value={item} />
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
                            setItems([...items, ""])
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

    .title {
        width: 280px;
        margin: auto;
    }
`;

const VoteItems = styled.div`
    display: flex;
    flex-direction: column;
    
    align-items: center;

    & > div {
        margin-top: 12px;
    }

    & > button {
        margin-top: 16px;
    }

    .item {
        display: flex;
        width: 280px;

        & > button {
            margin-left: 16px;
        }

        & > div {
            min-width: 200px;
            width: 280px;
        }
    }

    .buttonWrap {
        display: flex;
        justify-content: space-between;
        width: 280px;
    }
`

