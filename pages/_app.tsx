import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ApolloProvider } from '@apollo/client';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react'
import SearchForm from '../components/SearchForm';
import '../styles/globals.scss';
import DarkModeToggle from '../components/DarkModeToggle';
import ConsentContextProvider from '../components/ConsentContextProvider';
import apolloClient from '../graphql';
import APISourceToggle from '../components/APISourceToggle';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [showNav, setShowNav] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  let isHomePage = false;
  if (router && router.pathname === '/') {
    isHomePage = true;
  }

  React.useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setDarkMode(true);
    }
  });

  const toggleDarkMode = () => {
    if (darkMode) {
      localStorage.setItem('darkMode', 'false');
      document.documentElement.classList.remove('dark');
    } else {
      localStorage.setItem('darkMode', 'true');
      document.documentElement.classList.add('dark');
    }
    setDarkMode((val) => !val);
    setShowNav(false);
  };
  
  return (
    <ApolloProvider client={apolloClient}>

      <ConsentContextProvider>
      <Analytics />
        <main className="w-screen h-screen text-loopring-gray dark:text-loopring-dark-gray overflow-x-hidden">
          <Head>
            <title>Degate Layer2 Explorer</title>
            <link rel="icon" href="/favicon.png" />
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-T2XBBHN2H4"></script>
              <script>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag(String.fromCharCode(106,115), new Date());`}
                {/* gtag('config', 'G-T2XBBHN2H4'); */}
                gtag(String.fromCharCode(99,111,110,102,105,103), String.fromCharCode(71,45,84,50,88,66,66,72,78,50,72,52));
                
              </script>
          </Head>
          
          <div className="bg-yellow-100 dark:bg-yellow-800 px-4 py-2 text-center">
            <p className="text-yellow-800 dark:text-yellow-100 text-sm">
              ⚠️ This is not an official explorer and all data is parsed from on-chain data only. Results are not guaranteed to be accurate. 
              The official Degate explorer is <a href="https://dgscan.io" target="_blank" rel="noopener noreferrer" className="underline font-bold">dgscan.io</a>
            </p>
          </div>

          <header className="bg-white w-screen px-4 py-2 dark:bg-loopring-dark-background">
            <div className="container h-full w-full lg:w-11/12 m-auto flex md:items-center justify-between">
              <Link href="/">
                <a className="h-full flex items-center w-3/6 cursor-pointer">
                  <Image
                    src={darkMode ? '/logo.png' : '/logo.png'}
                    width="100"
                    height="100"
                    className="h-full"
                    alt="Loopring Logo"
                  />
                </a>
              </Link>
              {showNav && (
                <div
                  className="fixed bg-black bg-opacity-30 h-full w-full top-0 left-0 lg:hidden"
                  onClick={() => setShowNav(false)}
                />
              )}
              <button onClick={() => setShowNav(true)} className="lg:hidden">
                <div className="h-1 w-6 bg-loopring-blue dark:bg-white m-1" />
                <div className="h-1 w-6 bg-loopring-blue dark:bg-white m-1" />
                <div className="h-1 w-6 bg-loopring-blue dark:bg-white m-1" />
              </button>
              <nav
                className={`flex-1 flex flex-col lg:flex-row lg:justify-between text-loopring-blue fixed w-3/4 h-full lg:static bg-white top-0 -right-2 text-xl lg:text-base transition-transform duration-500 transform lg:transform-none ${
                  showNav ? 'translate-x-0' : 'translate-x-full'
                } dark:bg-loopring-dark-background dark:text-loopring-dark-gray z-20`}
              >
                <Link href="/">
                  <a className="border-b border-t p-2 lg:border-none lg:p-0" onClick={() => setShowNav(false)}>
                    Home
                  </a>
                </Link>
                <Link href="https://docs.degate.com/what-is-degate/master">
                  <a
                    target="_blank"
                    className="border-b border-t p-2 lg:border-none lg:p-0"
                    onClick={() => setShowNav(false)}
                  >
                    About Degate
                  </a>
                </Link>
                <Link href="https://app.degate.com/">
                  <a
                    target="_blank"
                    className="border-b border-t p-2 lg:border-none lg:p-0"
                    onClick={() => setShowNav(false)}
                  >
                    Degate App
                  </a>
                </Link>
                <div> API Source: Subgraph   </div>
                {/*<APISourceToggle />*/}
                <button onClick={toggleDarkMode} className="self-start p-2 lg:p-0">
                 <DarkModeToggle isDarkModeOn={darkMode} />
                </button>
              </nav>
            </div>
          </header>
          <div className="w-full min-h-page dark:bg-loopring-dark-background">
            {isHomePage ? (
              <div className="px-10 py-8 bg-loopring-blue pb-20 dark:bg-loopring-dark-darkBlue">
                <div className="lg:w-11/12 m-auto">
                  <h1 className="text-4xl text-white">Degate zkRollup Explorer</h1>
                  <SearchForm className="flex md:w-3/5 mt-4" />
                </div>
              </div>
            ) : (
              <div className="px-4 lg:px-10 py-1 bg-loopring-blue dark:bg-loopring-dark-darkBlue">
                <SearchForm className="lg:float-right flex w-full lg:w-3/5 mx-0 my-4 lg:m-4 " />
                <div className="clear-right" />
              </div>
            )}
            <Component {...pageProps} />
          </div>
        </main>
      </ConsentContextProvider>
    </ApolloProvider>
    
  );
};

export default MyApp;
