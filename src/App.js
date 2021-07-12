import React from 'react'
import { Router } from '@reach/router'

import Activities from "./pages/activities";
import CreateActivity from "./pages/createActivity";


const App = () => {
    return (
        <Router>
            <Activities path={'/'} exact />
            <CreateActivity path={'/create-activity'} />
        </Router>
    )
}

export default App