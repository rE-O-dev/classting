import { useCallback, useState } from 'react';

import styled from 'styled-components';
import CustomButton from '../component/custom-button';
import CustomInput from '../component/custom-input';

const Login = () => {
    const [inputs, setInputs] = useState({
        id: "",
        pw: ""
    })
    
    const fetchLogin = useCallback(() => {
        import("../api/index.json")
            .then(data => {
                const result = data.USER.some(v => {
                    return v.id === inputs.id && v.pwd === inputs.pw;
                });

                if(result) {
                    
                } else {

                }
            })
            .catch(err => {
                console.error(err);
            })


    }, [inputs]);

    return (
        <LoginForm>
            <CustomInput id="id" value={inputs.id} label={"아이디를 입력해주세요."} onChange={(e: any) => {
                const { value, id } = e.target;
                setInputs({
                    ...inputs,
                    [id]: value
                });
                console.log(value, id);
            }} />
        
            <CustomInput id="pw" type="password" value={inputs.pw} label={"비밀번호를 입력해주세요."} onChange={(e: any) => {
                const { value, id } = e.target;
                setInputs({
                    ...inputs,
                    [id]: value
                });
                console.log(value, id);
            }} />

            <div className="buttonWrap">
                <CustomButton onClick={fetchLogin}>
                    로그인
                </CustomButton>
                <CustomButton>
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