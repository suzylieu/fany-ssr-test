import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import routes from './routes';
import store from './redux';

const theme = createMuiTheme({
  palette: {
    primary:{
      main: '#f37024',
      contrastText: '#FFFFFF'
    }
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);