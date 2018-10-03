import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UploadFile from './UploadFile';
import UploadList from './UploadList';

const Router = props => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/uploads" component={UploadFile} />
      <Route path="/uploads/:uploadId" component={UploadList} />
    </Switch>
  </BrowserRouter>
);

export default Router;
