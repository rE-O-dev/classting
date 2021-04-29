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
            {props.children}
        </LayoutWrap>
    )

}

export default Layout;


const LayoutWrap = styled.div`
    max-width: 460px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
`