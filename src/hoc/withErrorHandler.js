import React, { Fragment } from 'react';

import Snackbar from '../components/Snackbar/Snackbar';
import useHttpError from '../hooks/http-error';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error] = useHttpError(axios)

    return (
      <Fragment>
        <Snackbar isError="#f44336" show={error} >
          {error ? error.message : null}
        </Snackbar>
        <WrappedComponent {...props} />
      </Fragment>
    );
  }; 
};

export default withErrorHandler;
