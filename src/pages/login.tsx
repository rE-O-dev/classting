import { useCallback, useState, useContext, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { Context } from '../context'

import styled from 'styled-components';
import CustomButton from '../component/custom-button';
import CustomInput from '../component/custom-input';

const Login = () => {
    const history = useHistory();

    const { action } = useContext(Context);


    const [inputs, setInputs] = useState({
        id: "",
        pw: ""
    });

    const inspection = useMemo(() => {
        if(inputs.id === "") {
            return {
                status: false,
                msg: "아이디를 입력해주세요."
            }
        } else if (inputs.pw === "") {
            return {
                status: false,
                msg: "비밀번호를 입력해주세요."
            }
        } else {
            return {
                status: true
            }
        }
    }, [inputs])
    
    const fetchLogin = useCallback(() => {
        
        if(inspection.status) {
            import("../api/index.json")
            .then(data => {
                const result = data.USER.some(v => {
                    return v.id === inputs.id && v.pwd === inputs.pw;
                });

                if(result) {
                    localStorage.setItem("user", inputs.id);
                    action.setUser(inputs.id);
                    history.goBack();                
                } else {
                    action.setAlertStatus({
                        status: true,
                        msg: "로그인에 실패했습니다."
                    });
                }
            })
            .catch(err => {
                console.error(err);
            });
        } else {
            action.setAlertStatus({
                status: true,
                msg: inspection.msg
            });
        }
        


    }, [inputs]);

    return (
        <LoginForm>
            <CustomInput id="id" value={inputs.id} label={"아이디를 입력해주세요."} onChange={(e: any) => {
                const { value, id } = e.target;
                setInputs({
                    ...inputs,
                    [id]: value
                });
            }} />
        
            <CustomInput id="pw" type="password" value={inputs.pw} label={"비밀번호를 입력해주세요."} onChange={(e: any) => {
                const { value, id } = e.target;
                setInputs({
                    ...inputs,
                    [id]: value
                });
            }} />

            <div className="buttonWrap">
                <CustomButton onClick={fetchLogin}>
                    로그인
                </CustomButton>
                <CustomButton onClick={() => history.goBack()}>
                    뒤로가기
                </CustomButton>
            </div>

        </LoginForm>
    )

}

export default Login;

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;

    padding: 12px;
`