import { useState, useEffect } from "react";

import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
} from "@chakra-ui/react";

import styles from "./stylee.module.css";

const steps = [
  { title: "First", description: "Personal Info" },
  { title: "Second", description: "Contact Info" },
  { title: "Third", description: "Password" },
];

function StepperComp(props) {
  const [index, setIndex] = useState(props.index);

  let { activeStep, setActiveStep } = useSteps({
    index: index,
    count: steps.length,
  });

  useEffect(() => {
    setIndex(props.index);
    setActiveStep(props.index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.index]);

  return (
    <div className={`${styles.stepper}`}>
      <Stepper index={activeStep} className="my-3">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default StepperComp;
