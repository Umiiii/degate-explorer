import React from "react";
import Image from "next/image";
import AppLink from "../AppLink";
import getDateString from "../../utils/getDateString";
import getTokenAmount from "../../utils/getTokenAmount";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";

interface IBatchSpotTradeProps {
  transaction: any;
  isPending?: boolean;
}

const BatchSpotTrade: React.FC<IBatchSpotTradeProps> = ({
  transaction,
  isPending = false,
}) => {
  const [priceDirectionAtoB, setPriceDirectionAtoB] =
    React.useState<boolean>(true);
  const {
    block,
    accountA,
    accountB,
    accountC,
    accountD,
    accountE,
    accountF,
    tokenA,
    tokenB,
    bindToken,
    accountBFirstTokenID,
    accountBSecondTokenID,
    accountCFirstTokenID,
    accountCSecondTokenID,
    accountDFirstTokenID,
    accountDSecondTokenID,
    accountEFirstTokenID,
    accountESecondTokenID,
    accountFFirstTokenID,
    accountFSecondTokenID,
    accountAFirstTokenAmountExchange,
    accountASecondTokenAmountExchange,
    accountAThirdTokenAmountExchange,
    accountBFirstTokenAmountExchange,
    accountBSecondTokenAmountExchange,
    accountCFirstTokenAmountExchange,
    accountCSecondTokenAmountExchange,
    accountDFirstTokenAmountExchange,
    accountDSecondTokenAmountExchange,
    accountEFirstTokenAmountExchange,
    accountESecondTokenAmountExchange,
    accountFFirstTokenAmountExchange,
    accountFSecondTokenAmountExchange,
    data,
  } = transaction;
  return (
    <>
      {block && (
        <tr className="border dark:border-loopring-dark-darkBlue">
          <td className="p-2 lg:w-1/5">Block #</td>
          <td>
            <AppLink path="block" block={block.id}>
              {block.id}
            </AppLink>
          </td>
        </tr>
      )}
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Status</td>
        <td>
          {isPending ? (
            <span className="italic">Pending</span>
          ) : (
            <div className="flex items-center ">
              <Image src={"/green-tick.svg"} height={20} width={20} />{" "}
              <span className="ml-2">{getDateString(block.timestamp)}</span>
            </div>
          )}
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Transaction Type</td>
        <td>Batch Spot Trade</td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Account 1</td>
        <td>
          <AppLink
            path="account"
            accountId={accountA.id}
            address={accountA.address}
          >
            <span className="hidden lg:block">
              {accountA.address || accountA.id}
            </span>
            <span className="lg:hidden">
              {accountA.address
                ? getTrimmedTxHash(accountA.address, 10, true)
                : accountA.id}
            </span>
          </AppLink>
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Account 2</td>
        <td>
          <AppLink
            path="account"
            accountId={accountB.id}
            address={accountB.address}
          >
            <span className="hidden lg:block">
              {accountB.address || accountB.id}
            </span>
            <span className="lg:hidden">
              {accountB.address
                ? getTrimmedTxHash(accountB.address, 10, true)
                : accountB.id}
            </span>
          </AppLink>
        </td>
      </tr>
      {accountC.id > 0 && (
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Account 3</td>
        <td>
          <AppLink
            path="account"
            accountId={accountC.id}
            address={accountC.address}
          >
            <span className="hidden lg:block">
              {accountC.address || accountC.id}
            </span>
            <span className="lg:hidden">
              {accountC.address
                ? getTrimmedTxHash(accountC.address, 10, true)
                : accountC.id}
            </span>
          </AppLink>
        </td>
      </tr>)}
      {accountD.id > 0 && (
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Account 4</td>
        <td>
          <AppLink
            path="account"
            accountId={accountD.id}
            address={accountD.address}
          >
            <span className="hidden lg:block">
              {accountD.address || accountD.id}
            </span>
            <span className="lg:hidden">
              {accountD.address
                ? getTrimmedTxHash(accountD.address, 10, true)
                : accountD.id}
            </span>
          </AppLink>
        </td>
      </tr>)}
      {accountE.id > 0 && (
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Account 5</td>
        <td>
          <AppLink
            path="account"
            accountId={accountE.id}
            address={accountE.address}
          >
            <span className="hidden lg:block">
              {accountE.address || accountE.id}
            </span>
            <span className="lg:hidden">
              {accountE.address
                ? getTrimmedTxHash(accountE.address, 10, true)
                : accountE.id}
            </span>
          </AppLink>
        </td>
      </tr>
      )}
      {accountF.id > 0 && (
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Account 6</td>
        <td>
          <AppLink
            path="account"
            accountId={accountF.id}
            address={accountF.address}
          >
            <span className="hidden lg:block">
              {accountF.address || accountF.id}
            </span>
            <span className="lg:hidden">
              {accountF.address
                ? getTrimmedTxHash(accountF.address, 10, true)
                : accountF.id}
            </span>
          </AppLink>
        </td>
      </tr>)}
      
      {data && (
        <tr className="border dark:border-loopring-dark-darkBlue">
          <td className="p-2">Transaction Data</td>
          <td>
            <div className="break-all bg-gray-100 dark:bg-loopring-dark-darkBlue h-32 overflow-auto m-2 rounded p-2 text-gray-500">
              {data}
            </div>
          </td>
        </tr>
      )}
      
      <div className="px-6 py-4 border-b dark:border-gray-800">
        <h2 className="text-lg font-medium">User Token Balances</h2>
      </div><td>
      <div className="dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden">
      
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">User</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                {tokenA.symbol}
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                {tokenB.symbol}
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                {bindToken.symbol}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">       
        
              <AppLink
                path="account"
                accountId={accountA.id}
                address={accountA.address}
              >
                <span className="hidden lg:block">
                  {accountA.address || accountA.id}
                </span>
                <span className="lg:hidden">
                  {accountA.address
                    ? getTrimmedTxHash(accountA.address, 10, true)
                    : accountA.id}
                </span>
              </AppLink>
              </td>
              
              <td className="px-4 py-3 text-right text-sm font-medium">
                  {parseInt(accountAFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountAFirstTokenAmountExchange, tokenA.decimals)}</div>)}
                  {parseInt(accountAFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountAFirstTokenAmountExchange, tokenA.decimals)}</div>)}
                  {/* {parseInt(accountAFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)} */}

              </td>
              <td className="px-4 py-3 text-right text-sm font-medium">
              {parseInt(accountASecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountASecondTokenAmountExchange, tokenB.decimals)}</div>)}
              {parseInt(accountASecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountASecondTokenAmountExchange, tokenB.decimals)}</div>)}
              {/* {parseInt(accountASecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)} */}
              </td>
              <td className="px-4 py-3 text-right text-sm font-medium ">
              {parseInt(accountAThirdTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountAThirdTokenAmountExchange, bindToken.decimals)}</div>)}
              {parseInt(accountAThirdTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountAThirdTokenAmountExchange, bindToken.decimals)}</div>)}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">     <AppLink
                path="account"
                accountId={accountB.id}
                address={accountB.address}
              >
                <span className="hidden lg:block">
                  {accountB.address || accountB.id}
                </span>
                <span className="lg:hidden">
                  {accountB.address
                    ? getTrimmedTxHash(accountB.address, 10, true)
                    : accountA.id}
                </span>
              </AppLink>
              </td>
              <td className="px-4 py-3 text-right text-sm font-medium">
                {accountBFirstTokenID == tokenA.id && parseInt(accountBFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountBFirstTokenAmountExchange, tokenA.decimals)}</div>)}
                {accountBFirstTokenID == tokenA.id && parseInt(accountBFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountBFirstTokenAmountExchange, tokenA.decimals)}</div>)}
                {accountBFirstTokenID == tokenA.id && parseInt(accountBFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

                {accountBSecondTokenID == tokenA.id && parseInt(accountBSecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountBSecondTokenAmountExchange, tokenA.decimals)}</div>)}
                {accountBSecondTokenID == tokenA.id && parseInt(accountBSecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountBSecondTokenAmountExchange, tokenA.decimals)}</div>)}
                {accountBSecondTokenID == tokenA.id && parseInt(accountBSecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}
              </td>
              <td className="px-4 py-3 text-right text-sm font-medium">
                {accountBSecondTokenID == tokenB.id && parseInt(accountBSecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountBSecondTokenAmountExchange, tokenB.decimals)}</div>)}
                {accountBSecondTokenID == tokenB.id && parseInt(accountBSecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountBSecondTokenAmountExchange, tokenB.decimals)}</div>)}
                {accountBSecondTokenID == tokenB.id && parseInt(accountBSecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

                {accountBFirstTokenID == tokenB.id && parseInt(accountBFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountBFirstTokenAmountExchange, tokenB.decimals)}</div>)}
                {accountBFirstTokenID == tokenB.id && parseInt(accountBFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountBFirstTokenAmountExchange, tokenB.decimals)}</div>)}
                {accountBFirstTokenID == tokenB.id && parseInt(accountBFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}
                </td>
              <td className="px-4 py-3 text-right text-sm font-medium">
                {accountBSecondTokenID == bindToken.id && parseInt(accountBSecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountBSecondTokenAmountExchange, bindToken.decimals)}</div>)}
                {accountBSecondTokenID == bindToken.id && parseInt(accountBSecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountBSecondTokenAmountExchange, bindToken.decimals)}</div>)}
                {accountBSecondTokenID == bindToken.id && parseInt(accountBSecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

                {accountBFirstTokenID == bindToken.id && parseInt(accountBFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountBFirstTokenAmountExchange, bindToken.decimals)}</div>)}
                {accountBFirstTokenID == bindToken.id && parseInt(accountBFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountBFirstTokenAmountExchange, bindToken.decimals)}</div>)}
                {accountBFirstTokenID == bindToken.id && parseInt(accountBFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}
              </td>
            </tr>
            {accountC.id > 0 && (
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">  <AppLink
                path="account"
                accountId={accountC.id}
                address={accountC.address}
              >
                <span className="hidden lg:block">
                  {accountC.address || accountC.id}
                </span>
                <span className="lg:hidden">
                  {accountC.address
                    ? getTrimmedTxHash(accountC.address, 10, true)
                    : accountC.id}
                </span>
              </AppLink></td>
              <td className="px-4 py-3 text-right text-sm font-medium">
              {accountCFirstTokenID == tokenA.id && parseInt(accountCFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountCFirstTokenAmountExchange, tokenA.decimals)}</div>)}
              {accountCFirstTokenID == tokenA.id && parseInt(accountCFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountCFirstTokenAmountExchange, tokenA.decimals)}</div>)}
              {accountCFirstTokenID == tokenA.id && parseInt(accountCFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

              {accountCSecondTokenID == tokenA.id && parseInt(accountCSecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountCSecondTokenAmountExchange, tokenA.decimals)}</div>)}
              {accountCSecondTokenID == tokenA.id && parseInt(accountCSecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountCSecondTokenAmountExchange, tokenA.decimals)}</div>)}
              {accountCSecondTokenID == tokenA.id && parseInt(accountCSecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}
              </td>

              <td className="px-4 py-3 text-right text-sm font-medium">
              {accountCSecondTokenID == tokenB.id && parseInt(accountCSecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountCSecondTokenAmountExchange, tokenB.decimals)}</div>)}
              {accountCSecondTokenID == tokenB.id && parseInt(accountCSecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountCSecondTokenAmountExchange, tokenB.decimals)}</div>)}
              {accountCSecondTokenID == tokenB.id && parseInt(accountCSecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

              {accountCFirstTokenID == tokenB.id && parseInt(accountCFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountCFirstTokenAmountExchange, tokenB.decimals)}</div>)}
              {accountCFirstTokenID == tokenB.id && parseInt(accountCFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountCFirstTokenAmountExchange, tokenB.decimals)}</div>)}
              {accountCFirstTokenID == tokenB.id && parseInt(accountCFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}
              </td>

              <td className="px-4 py-3 text-right text-sm font-medium">
              {accountCSecondTokenID == bindToken.id && parseInt(accountCSecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountCSecondTokenAmountExchange, bindToken.decimals)}</div>)}
              {accountCSecondTokenID == bindToken.id && parseInt(accountCSecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountCSecondTokenAmountExchange, bindToken.decimals)}</div>)}
              {accountCSecondTokenID == bindToken.id && parseInt(accountCSecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

              {accountCFirstTokenID == bindToken.id && parseInt(accountCFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountCFirstTokenAmountExchange, bindToken.decimals)}</div>)}
              {accountCFirstTokenID == bindToken.id && parseInt(accountCFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountCFirstTokenAmountExchange, bindToken.decimals)}</div>)}
              {accountCFirstTokenID == bindToken.id && parseInt(accountCFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}
              </td>
            </tr>)}
            {accountD.id > 0 && (
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">  <AppLink
                path="account"
                accountId={accountD.id}
                address={accountD.address}
              >
                <span className="hidden lg:block">
                  {accountD.address || accountD.id}
                </span>
                <span className="lg:hidden">
                  {accountD.address
                    ? getTrimmedTxHash(accountD.address, 10, true)
                    : accountD.id}
                </span>
              </AppLink></td>
              <td className="px-4 py-3 text-right text-sm font-medium">
              {accountDFirstTokenID == tokenA.id && parseInt(accountDFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountDFirstTokenAmountExchange, tokenA.decimals)}</div>)}
              {accountDFirstTokenID == tokenA.id && parseInt(accountDFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountDFirstTokenAmountExchange, tokenA.decimals)}</div>)}
              {accountDFirstTokenID == tokenA.id && parseInt(accountDFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

              {accountDSecondTokenID == tokenA.id && parseInt(accountDSecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountDSecondTokenAmountExchange, tokenA.decimals)}</div>)}
              {accountDSecondTokenID == tokenA.id && parseInt(accountDSecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountDSecondTokenAmountExchange, tokenA.decimals)}</div>)}
              {accountDSecondTokenID == tokenA.id && parseInt(accountDSecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}
              </td>
              <td className="px-4 py-3 text-right text-sm font-medium ">
              {accountDSecondTokenID == tokenB.id && parseInt(accountDSecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountDSecondTokenAmountExchange, tokenB.decimals)}</div>)}
              {accountDSecondTokenID == tokenB.id && parseInt(accountDSecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountDSecondTokenAmountExchange, tokenB.decimals)}</div>)}
              {accountDSecondTokenID == tokenB.id && parseInt(accountDSecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

              {accountDFirstTokenID == tokenB.id && parseInt(accountDFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountDFirstTokenAmountExchange, tokenB.decimals)}</div>)}
              {accountDFirstTokenID == tokenB.id && parseInt(accountDFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountDFirstTokenAmountExchange, tokenB.decimals)}</div>)}
              {accountDFirstTokenID == tokenB.id && parseInt(accountDFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}
              </td>
              <td className="px-4 py-3 text-right text-sm font-medium">
              {accountDSecondTokenID == bindToken.id && parseInt(accountDSecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountDSecondTokenAmountExchange, bindToken.decimals)}
              {accountDSecondTokenID == bindToken.id && parseInt(accountDSecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountDSecondTokenAmountExchange, bindToken.decimals)}</div>)}
              {accountDSecondTokenID == bindToken.id && parseInt(accountDSecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

              {accountDFirstTokenID == bindToken.id && parseInt(accountDFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountDFirstTokenAmountExchange, bindToken.decimals)}</div>)}
              {accountDFirstTokenID == bindToken.id && parseInt(accountDFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountDFirstTokenAmountExchange, bindToken.decimals)}</div>)}
              {accountDFirstTokenID == bindToken.id && parseInt(accountDFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}
              </div>)}

              </td>
              </tr>
              )}
              {accountE.id > 0 && (
                <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">  <AppLink
                  path="account"
                  accountId={accountE.id}
                  address={accountE.address}
                >
                  <span className="hidden lg:block">
                    {accountE.address || accountE.id}
                  </span>
                  <span className="lg:hidden">
                    {accountE.address
                      ? getTrimmedTxHash(accountE.address, 10, true)
                      : accountE.id}
                  </span>
                </AppLink></td>
                <td className="px-4 py-3 text-right text-sm font-medium">
                      {accountEFirstTokenID == tokenA.id && parseInt(accountEFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountEFirstTokenAmountExchange, tokenA.decimals)}</div>)}
                      {accountEFirstTokenID == tokenA.id && parseInt(accountEFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountEFirstTokenAmountExchange, tokenA.decimals)}</div>)}
                      {accountEFirstTokenID == tokenA.id && parseInt(accountEFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

                      {accountESecondTokenID == tokenA.id && parseInt(accountESecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountESecondTokenAmountExchange, tokenA.decimals)}</div>)}
                      {accountESecondTokenID == tokenA.id && parseInt(accountESecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountESecondTokenAmountExchange, tokenA.decimals)}</div>)}
                      {accountESecondTokenID == tokenA.id && parseInt(accountESecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium">
                      {accountESecondTokenID == tokenB.id && parseInt(accountESecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountESecondTokenAmountExchange, tokenB.decimals)}</div>)}
                      {accountESecondTokenID == tokenB.id && parseInt(accountESecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountESecondTokenAmountExchange, tokenB.decimals)}</div>)}
                      {accountESecondTokenID == tokenB.id && parseInt(accountESecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

                      {accountEFirstTokenID == tokenB.id && parseInt(accountEFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountEFirstTokenAmountExchange, tokenB.decimals)}</div>)}
                      {accountEFirstTokenID == tokenB.id && parseInt(accountEFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountEFirstTokenAmountExchange, tokenB.decimals)}</div>)}
                      {accountEFirstTokenID == tokenB.id && parseInt(accountEFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

                </td>
                <td className="px-4 py-3 text-right text-sm font-medium">
                      {accountESecondTokenID == bindToken.id && parseInt(accountESecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountESecondTokenAmountExchange, bindToken.decimals)}</div>)}
                      {accountESecondTokenID == bindToken.id && parseInt(accountESecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountESecondTokenAmountExchange, bindToken.decimals)}</div>)}
                      {accountESecondTokenID == bindToken.id && parseInt(accountESecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

                      {accountEFirstTokenID == bindToken.id && parseInt(accountEFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountEFirstTokenAmountExchange, bindToken.decimals)}</div>)}
                      {accountEFirstTokenID == bindToken.id && parseInt(accountEFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountEFirstTokenAmountExchange, bindToken.decimals)}</div>)}
                      {accountEFirstTokenID == bindToken.id && parseInt(accountEFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

                </td>
                </tr>
                )}
                {accountF.id > 0 && (
                <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">  <AppLink
                  path="account"
                  accountId={accountF.id}
                  address={accountF.address}
                >
                  <span className="hidden lg:block">
                    {accountF.address || accountF.id}
                  </span>
                  <span className="lg:hidden">
                    {accountF.address
                      ? getTrimmedTxHash(accountF.address, 10, true)
                      : accountF.id}
                  </span>
                </AppLink></td>
                <td className="px-4 py-3 text-right text-sm font-medium">
                      {accountFFirstTokenID == tokenA.id && parseInt(accountFFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountFFirstTokenAmountExchange, tokenA.decimals)}</div>)}
                      {accountFFirstTokenID == tokenA.id && parseInt(accountFFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountFFirstTokenAmountExchange, tokenA.decimals)}</div>)}
                      {accountFFirstTokenID == tokenA.id && parseInt(accountFFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

                      {accountFSecondTokenID == tokenA.id && parseInt(accountFSecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountFSecondTokenAmountExchange, tokenA.decimals)}</div>)}
                      {accountFSecondTokenID == tokenA.id && parseInt(accountFSecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountFSecondTokenAmountExchange, tokenA.decimals)}</div>)}
                      {accountFSecondTokenID == tokenA.id && parseInt(accountFSecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium">
                      {accountFSecondTokenID == tokenB.id && parseInt(accountFSecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountFSecondTokenAmountExchange, tokenB.decimals)}</div>)}
                      {accountFSecondTokenID == tokenB.id && parseInt(accountFSecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountFSecondTokenAmountExchange, tokenB.decimals)}</div>)}
                      {accountFSecondTokenID == tokenB.id && parseInt(accountFSecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

                      {accountFFirstTokenID == tokenB.id && parseInt(accountFFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountFFirstTokenAmountExchange, tokenB.decimals)}</div>)}
                      {accountFFirstTokenID == tokenB.id && parseInt(accountFFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountFFirstTokenAmountExchange, tokenB.decimals)}</div>)}
                      {accountFFirstTokenID == tokenB.id && parseInt(accountFFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium">
                      {accountFSecondTokenID == bindToken.id && parseInt(accountFSecondTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountFSecondTokenAmountExchange, bindToken.decimals)}</div>)}
                      {accountFSecondTokenID == bindToken.id && parseInt(accountFSecondTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountFSecondTokenAmountExchange, bindToken.decimals)}</div>)}
                      {accountFSecondTokenID == bindToken.id && parseInt(accountFSecondTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}

                      {accountFFirstTokenID == bindToken.id && parseInt(accountFFirstTokenAmountExchange) >0 &&(<div className="text-green-500">+{getTokenAmount(accountFFirstTokenAmountExchange, bindToken.decimals)}</div>)}
                      {accountFFirstTokenID == bindToken.id && parseInt(accountFFirstTokenAmountExchange) <0 &&(<div className="text-red-500">{getTokenAmount(accountFFirstTokenAmountExchange, bindToken.decimals)}</div>)}
                      {accountFFirstTokenID == bindToken.id && parseInt(accountFFirstTokenAmountExchange) === 0 &&(<div className="text-gray-500">0</div>)}
                </td>
                
                </tr>
                )}


          </tbody>
        </table>
      </div>
    </div>
      </td>
    
    </>
   
  );
  
};

export default BatchSpotTrade;
