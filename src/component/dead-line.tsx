import styled from 'styled-components';

const Deadline = (props: {date: string}) => {
    const deadline = new Date(props.date).getTime();
    const now = new Date().getTime();
    if(deadline > now) {
        return <Wrap className="deadline run">진행중</Wrap>
    } else {
        return <Wrap className="deadline dead">마감</Wrap>
    }
}

export default Deadline;


const Wrap = styled.span`
    &.deadline {
        display: inline-block;
        width: 48px;
        padding: 4px;
        border-radius: 16px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        &.run {
            background-color: #00c896;
        }

        &.dead {
            background-color: #ccc;
        }
    }
`