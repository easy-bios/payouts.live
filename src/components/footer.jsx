import React from "react";
import { Button, ButtonGroup } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    color: 'white',
    padding: '0 30px',
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // borderRadius: 3,
    // border: 0,
    // height: 48,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
})(Button);

const Footer = (props) => {
  const { setBuyins } = props;

  const incrementPayouts = () => setBuyins((prev) => prev + 1);
  const decrementPayouts = () => setBuyins((prev) => prev - 1);

  return (
    <div className="footer">
      <div>
        <ButtonGroup>
          <StyledButton onClick={decrementPayouts}>Buyin - </StyledButton>
          <StyledButton onClick={incrementPayouts}> + Buyin</StyledButton>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Footer;
