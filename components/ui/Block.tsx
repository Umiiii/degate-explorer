import React from 'react';
import styled from '@emotion/styled';
import getTrimmedTxHash from '../../utils/getTrimmedTxHash';

const TransactionBlock = ({ 
block,
  theme = 'green'
}) => {
  const blockSize = 150; // Base size in pixels

  const styles = {
    container: {
      width: `${blockSize}px`,
      padding: '15px',
      borderRadius: '8px',
      backgroundColor: theme === 'green' ? '#2d4b2d' : '#4b3d7a',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      position: 'relative',
      transform: 'translate3d(0, 0, 0)', // Forces GPU acceleration
      '&::after': {
        content: '""',
        width: `${blockSize}px`,
        height: `${blockSize * 0.192}px`,
        position: 'absolute',
        top: `${blockSize * -0.192}px`,
        left: `${blockSize * -0.16}px`,
        backgroundColor: '#232838',
        transform: 'skew(40deg)',
        transformOrigin: 'top',
        transition: 'transform 1s, left 1s',
        zIndex: -1,
      },
      '&::before': {
        content: '""',
        width: `${blockSize * 0.16}px`,
        height: `${blockSize}px`,
        position: 'absolute',
        top: `${blockSize * -0.096}px`,
        left: `${blockSize * -0.16}px`,
        backgroundColor: '#191c27',
        zIndex: -1,
        transform: 'skewY(50deg)',
        transformOrigin: 'top',
        transition: 'transform 1s, left 1s',
      }
    },
    title: {
      fontSize: '16px',
      fontWeight: 700,
      textAlign: 'center'  as const,
    },
    text: {
      margin: '0',
      fontSize: '16px',
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center'  as const,
    },
    btcAmount: {
      margin: '5px 0',
      fontSize: '20px',
      fontWeight: 700,
    },
    transactionCount: {
      fontSize: '13px',
      color: 'rgba(255, 255, 255, 0.7)',
    },
    timeStamp: {
      fontSize: '11px',
      color: 'rgba(255, 255, 255, 0.7)',
      textAlign: 'center'  as const,
    },
    operatorName: {
      fontSize: '12px',
      marginTop: 'auto',
      display: 'flex',
      textAlign: 'center'  as const,
      justifyContent: 'center'  as const,
      gap: '5px',
    
    }
  };

  // To apply these styles, you'll need a CSS-in-JS solution like styled-components or @emotion/styled
  // Here's how to use it with styled-components:

  const StyledBlock = styled.div`
    width: ${blockSize}px;
    padding: 15px;
    border-radius: 8px;
    background-color: ${props => props.theme === 'green' ? '#2d4b2d' : '#4b3d7a'};
    color: white;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
    transform: translate3d(0, 0, 0);

    &::after {
      content: "";
      width: ${blockSize}px;
      height: ${blockSize * 0.192}px;
      position: absolute;
      top: ${blockSize * -0.192}px;
      left: ${blockSize * -0.16}px;
      background-color: #232838;
      transform: skew(40deg);
      transform-origin: top;
      transition: transform 1s, left 1s;
      z-index: -1;
    }

    &::before {
      content: "";
      width: ${blockSize * 0.16}px;
      height: ${blockSize}px;
      position: absolute;
      top: ${blockSize * -0.096}px;
      left: ${blockSize * -0.16}px;
      background-color: #191c27;
      z-index: -1;
      transform: skewY(50deg);
      transform-origin: top;
      transition: transform 1s, left 1s;
    }
  `;

  return (
    <StyledBlock theme={theme}>
      <div style={styles.title}>
        #{block.id} 
      </div>
      <div style={styles.text}>
        {block.transactionCount} / {block.blockSize} Txs
      </div>
      {/* <div style={styles.text}>{getTrimmedTxHash(block.txHash, 5)}</div> */}
    
      <div style={styles.operatorName}>
        Operator User #{block.operatorAccount.id? block.operatorAccount.id:-1}
      </div>
      <div style={styles.timeStamp}>
        {getTimeAgo(block.timestamp)}
      </div>
    </StyledBlock>
  );
};

const getTimeAgo = (timestamp) => {
    // return X minutes ago
    const minutes = Math.floor((new Date().getTime() - timestamp*1000) / 60000);
    return `${minutes} minutes ago`;
};
const getTimeFromNow = (timestamp) => {
    return new Date(timestamp*1000).toLocaleString();
    
  };
export default TransactionBlock;