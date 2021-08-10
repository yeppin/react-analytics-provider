import * as React from "react";

interface IProps {
  text: string;
}

const SampleComponent = (props: IProps) => {
  const { text } = props;
  const [value] = React.useState("Ready to use React Hook!");
  return (
    <>
    <div>{value}</div>
    <div style={{ backgroundColor: "black", color: "white" }}>{text}</div>
    </>
  );
};

export default SampleComponent;
