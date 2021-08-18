import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AnalyticsProvider, googleAnalytics} from '@every-analytics/react-analytics-provider';
import {fruitLogger} from './utils/fruitLogger';
import {Toaster} from 'react-hot-toast';
import {toaster} from './utils/toaster';

const persistentValues = {userNo: 123};

ReactDOM.render(
  <React.StrictMode>
    <AnalyticsProvider
      onInitialize={() => {
        googleAnalytics.initialize(process.env.REACT_APP_GA_TRACKING_ID!, persistentValues);
      }}
      onModalView={(name, params) => {
        console.info('✅GA: ModalView', name, params); // ModalView는 ga('send', 'pageview', path) 필요함
        fruitLogger.modalView(name, params);
        toaster.modalView(name, params);
      }}
      onPageView={params => {
        // NOTE: Google Analytics(GA4)는 기본적으로 페이지뷰가 적용됩니다 - 따로 추가 필요X
        const path = window.location.pathname + window.location.search;
        // NOTE: Google Analytics(GA4)는 기본적으로 페이지뷰가 적용됩니다 - 따로 추가 필요X
        fruitLogger.pageView(path, params);
        toaster.pageView(path, params);
      }}
      onEvent={(name, params) => {
        googleAnalytics.event(name, params);
        fruitLogger.event(name, params);
        toaster.event(name, params);
      }}
      onClick={(name, params) => {
        googleAnalytics.click(name, params);
        fruitLogger.click(name, params);
        toaster.click(name, params);
      }}
    >
      <App />
    </AnalyticsProvider>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }}
    />
  </React.StrictMode>,
  document.getElementById('root'),
);