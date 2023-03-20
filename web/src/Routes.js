// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import DefaultLayout from 'src/layouts/DefaultLayout/DefaultLayout'
import DefaultLayoutNoHeaderOrFooter from 'src/layouts/DefaultLayoutNoHeaderOrFooter/DefaultLayoutNoHeaderOrFooter'
import AllContextProviders from 'src/providers'

const Routes = () => {
  return (
    <Router>
      <AllContextProviders>
        <Set wrap={DefaultLayoutNoHeaderOrFooter}>
          <Route path="/login" page={LoginPage} name="login" />
        </Set>
        <Set wrap={DefaultLayout}>
          <Private unauthenticated="login">
            <Route path="/profile" page={ProfilePage} name="profile" />
            <Route path="/" page={LoginPage} name="home" />
          </Private>
          <Route path="/redirect/{type}" page={RedirectPage} name="redirect" />
          <Route notfound page={NotFoundPage} />
        </Set>
      </AllContextProviders>
    </Router>
  )
}

export default Routes
