import styled from 'styled-components';

export const Congratulation = styled.div`
  width: 250px;
  margin: 0 auto;
  border: 25px solid #f2f2f2;
  padding: 10px;
`;

export const StepsWrap = styled.main`
  display: flex;
  height: auto;
  padding: 0;
  margin: 10px;
  align-items: center;
  justify-content: center;
`;

export const FormWrapper = styled.form`
  min-width: 250px;
  width: auto;
  padding: 10px 15px 10px 15px;
  border: 25px solid #f2f2f2;
`;

export const Title = styled.h3`
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap');
  font-family: 'Roboto Condensed', sans-serif;
`;

export const StepInfo = styled.div`
  > * {
    display: inline-block;
  }
`;

export const TodoWrapper = styled.label`
  height: 30px;
  display: block;
  
  > * {
    display: inline;
  }
  
  input[type=checkbox] {
    width: 20px;
    height: 20px;
    margin: .5em 1em 0 0;
  } 
`
export const StepCounter = styled.div`
  background: #282c34;
  border-radius: 100%;
  height: 2em;
  width: 2em;
  text-align: center;
  margin: 5px 15px 0 0;
  
  > p {
    margin-top: 0.2em;
    font-size: 1.2em;
    font-family: sans-serif;
    color: white;
  }
`
export const IconWrapper = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  float: right !important;
  
  &:after {
    content: "";
    clear: both;
  }
`;

export const StepItem = styled.fieldset`
  border: none;
  margin: 10px;
`

export const Button = styled.div `
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 40px;
  background: #0a91ab;
  color: white;
  font-weight: 900;

  :empty {
    display: none;
  }

  :hover {
    background: #065471;
    cursor: pointer;
  }

  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
