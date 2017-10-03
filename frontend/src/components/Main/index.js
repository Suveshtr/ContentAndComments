import React  from 'react'
import { Route, Switch } from 'react-router-dom'
import Posts from '../Posts'

class Main extends React.Component {

    
    render() {
        console.log("Main called", this.props.hasPostFetched)
        return (
            <div>
                <Switch>
                    <Route  path='/:category?' component={Posts} />                    
                </Switch>
            </div>
            
        )

    }
}

export default Main