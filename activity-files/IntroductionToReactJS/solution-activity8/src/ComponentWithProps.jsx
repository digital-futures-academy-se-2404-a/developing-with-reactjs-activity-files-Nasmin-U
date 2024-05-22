import PropTypes from 'prop-types';

const ComponentWithProps = props => {
  return (
    <>
      <h1>{props.header}</h1>
      <p>{props.content}</p>
      <p data-testid="numberPara">This is a number from props: {props.number}</p>
      <p>This is a display of a prop that doesn't exist: {props.nonexistent}</p>
    </>
  );
}

ComponentWithProps.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};

ComponentWithProps.defaultProps = {
  header: `Header from defaults`,
  content: `Content from defaults`,
  number: 100
};

export default ComponentWithProps;