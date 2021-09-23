import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import {
  Button,
  Congratulation,
  FormWrapper,
  IconWrapper,
  StepCounter,
  StepInfo, StepItem,
  StepsWrap,
  Title,
  TodoWrapper
} from "./Progress.styles";
import {
  GetProgressDocument,
  Step,
  useGetProgressQuery,
  useInitiateProgressMutation,
  useUpdateProgressMutation
} from "../codegen/generated/graphql";


const Progress: React.FC = () => {
  const { data } = useGetProgressQuery();

  const [steps, setSteps] = useState<[Step] | []>([]);
  const [isProgressCompleted, setProgressCompleted] = useState<boolean>(false);
  const [randomText, setRandomText] = useState<string | undefined>(undefined);

  const [updateProgress] = useUpdateProgressMutation();
  const [initiateProgressMutation] = useInitiateProgressMutation({
    refetchQueries: [{query: GetProgressDocument}],
    awaitRefetchQueries: true,
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const todoId = evt.target.name;
    const stepId = evt.target.dataset.step || '';
    const value = evt.target.checked;

    updateProgress({
      variables: {
        step: {
          todoId: todoId,
          stepId:  stepId,
          value: value
        }
      }
    }).catch((err) => console.log(err));
  }

  const initStartup = useCallback(async () => {
    await initiateProgressMutation();
  },[data])

  useEffect(() => {
    (async function getFact() {
      if (data) {
        const progressCompleted = data.getProgress.every((val: { completed: boolean; }) => val.completed);

        setSteps(data.getProgress as [Step]);
        setProgressCompleted(progressCompleted);

        if (progressCompleted && data.getProgress) {
          const result = await axios(
              'https://uselessfacts.jsph.pl/random.json',
          );

          setRandomText(result.data.text)
        }
      }
    })();
  }, [data]);

  if(data && !data.getProgress.length) {
    return (
      <Congratulation>
        <h1> Today is best day to make your great Startup! </h1>
        <br/>
        <Button onClick={initStartup}>Do it!</Button>
      </Congratulation>
    )
  }

  if (isProgressCompleted) {
    // When all phases are completed, display a random fact from 'https://uselessfacts.jsph.pl/random.json'
    return (
      <Congratulation>
        <h1> Congratulation! </h1>
        <br/>
        <p>{randomText}</p>
        <br/>
        <Button onClick={initStartup}>Do it again!</Button>
      </Congratulation>
    )
  }

  return (
    <StepsWrap>
      <FormWrapper>
        <Title>My startup progress</Title>
        {steps.map((step: Step, index) => {
          return (
              <StepItem key={step.id} >
                <StepInfo>
                  <StepCounter>
                    <p>{index + 1}</p>
                  </StepCounter>
                  <Title>{step.title}</Title>
                  {step.completed && <IconWrapper><FontAwesomeIcon icon={faCheck} size="2x" /></IconWrapper>}
                </StepInfo>
                {step?.todo.map((todo) => {
                  return (
                      <TodoWrapper key={todo.id}>
                        <input name={todo.id} data-step={step.id} type="checkbox"  onChange={handleChange} checked={todo.completed}/>
                        {todo.title}
                      </TodoWrapper>)
                })}
              </StepItem>);
        })}
      </FormWrapper>
    </StepsWrap>
  );
}

export default Progress;
