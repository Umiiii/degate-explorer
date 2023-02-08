import React from "react";
import Toggle from 'react-toggle'
import "react-toggle/style.css"

const APISourceToggle: React.FC = () => {
  const [apiUsingLoopring, setApiUsingLoopring] = React.useState(true)
  React.useEffect(() => {
    setApiUsingLoopring(window.localStorage.getItem('apiUsingLoopring') === 'false' ? false : true)
  }, []);
  return (
    <label className="border-b border-t p-2 lg:border-none lg:p-0" style={{display: 'flex'}}>
      <Toggle
        checked={apiUsingLoopring}
        onChange={() => {
          window.localStorage.setItem('apiUsingLoopring', !apiUsingLoopring ? 'true' : 'false')
          setApiUsingLoopring(!apiUsingLoopring)
        }} 
        />
      <span style={{
        marginLeft: '4px',
        fontSize: '12px',
      }}> API Source: {apiUsingLoopring ? 'Loopring' : 'Subgraph'}</span>
    </label>
  );
};

export default APISourceToggle;
