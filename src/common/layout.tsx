import { useContext } from 'react';

import { Context } from '../context';

import styled from 'styled-components';

import Alert from '../component/alert';

const Layout = (props: {children: JSX.Element}) => {
    const { state, action } = useContext(Context);
    return (
        <LayoutWrap>
            {
                state.alertStatus.status && (
                    <Alert />
                )
            }
            <div>
                {props.children}
            </div>
        </LayoutWrap>
    )

}

export default Layout;


const LayoutWrap = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
`