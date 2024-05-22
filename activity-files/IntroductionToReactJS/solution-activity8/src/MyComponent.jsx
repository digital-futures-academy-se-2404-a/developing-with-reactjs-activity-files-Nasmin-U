import AnotherComponent from "./AnotherComponent"

const MyComponent = () => {
  return (
    <>
      <h1>Hello World</h1>
      <AnotherComponent />
      <MyClassComponent />
      <ComponentWithProps />
      <ComponentWithProps content="Content from props" number={10} />
    </>
  );
}

export default MyComponent;