import React from 'react'
import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
    const error = useRouteError(); // useRouter Hook To Handle Errors
  return (
    <div id="error-page card shadow border-0">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
