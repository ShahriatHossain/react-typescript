import styled from 'styled-components';

// container
export const Container = styled.div`
    border: 2px solid #ccc;
    padding: 20px;
    margin-top: 10px;
`;

// titles wrapper div
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
// for thumb
export const Thumb = styled.img`
    width: 100px;
    height: 100px;
`;
// for title
export const Title = styled.div`
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 400;
`;
// for description
export const Description = styled.div`
    margin-bottom: 10px;
    height: 20px;
    overflow: hidden;
`;
// for description
export const Address = styled.div`
    margin-bottom: 10px;
`;