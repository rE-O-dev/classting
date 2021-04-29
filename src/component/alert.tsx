import React, { useContext, useCallback } from "react";

import styled, { css, keyframes } from "styled-components";

import { primaryColor } from '../global';

import { Context } from "../context";

export default function AlertComponent() {
    const { state, action } = useContext(Context);
    const { alertStatus } = state;

    const CreateMarkup = useCallback(() => {
        if(alertStatus.msg) {
            return <div dangerouslySetInnerHTML={{ __html: alertStatus.msg }}></div>
        } else {
            return <> </>;
        }
    }, [alertStatus.msg]);

    return (
        <Layer
            onClick={() => {
                action.setAlertStatus({
                    status: false,
                });
            }}
            >
            <div
                className="wrapper"
                onClick={(e) => {
                e.stopPropagation();
                }}
            >
                {alertStatus.title && (
                <div className="title">
                    <h4>{alertStatus.title}</h4>
                </div>
                )}
                {alertStatus.msg && (
                <>
                    {alertStatus.renderType === "HTML" ? (
                        <CreateMarkup />
                    ) : (
                    <p>{alertStatus.msg}</p>
                    )}
                </>
                )}

                <button
                className="common-btn"
                onClick={() => {
                    if(state.alertStatus.callback) {
                      state.alertStatus.callback();
                    }

                    action.setAlertStatus({
                      status: false,
                    });
                }}
                >
                {alertStatus.btn ? alertStatus.btn : "확인"}
                </button>
            </div>
        </Layer>
  );
}

const Layer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  ${(props: any) =>
    props.animation &&
    css`
      animation: ${BACK} ${props.animation.sec ? props.animation.sec + "s" : 0.4 + "s"};
    `}
  h4 {
    margin: 0;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    position: fixed;
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;
    ${(props: any) => {
      return (
        props.animation &&
        css`
          animation: ${props.animation.from} ${props.animation.sec ? props.animation.sec + "s" : 0.4 + "s"};
        `
      );
    }}
    transform: translateY(-80%);
    .title {
      width: 100%;
      border-bottom: 1px solid #e0e0e0;
      text-align: center;
      h4 {
        margin: 16px 0;
      }
    }
  }
  .common-btn {
    width: 100%;
    margin-top: 30px;
    padding: 12px 0;
    background-color: ${primaryColor};
    border: 0px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
  }
  @keyframes TOP {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(-80%);
      opacity: 1;
    }
  }
  @keyframes LEFT {
    0% {
      transform: translate(-100%, -80%);
      opacity: 0;
    }
    100% {
      transform: translate(0, -80%);
      opacity: 1;
    }
  }
  @keyframes RIGHT {
    0% {
      transform: translate(100%, -80%);
      opacity: 0;
    }
    100% {
      transform: translate(0, -80%);
      opacity: 1;
    }
  }
  @keyframes BOTTOM {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(-80%);
      opacity: 1;
    }
  }
  @keyframes CENTER {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const BACK = keyframes`
    0% {
      background-color: rgba(0, 0, 0, 0);
    }
    100% {
      background-color: rgba(0, 0, 0, 0.7);
    }
  `;