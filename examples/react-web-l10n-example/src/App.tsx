// @ts-nocheck
import * as React from 'react';
import module2 from '@lem92/yarn-module2';
import './index.css';

class App extends React.Component {

    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        console.log('module2', module2())
    }

    render() {

        return (
            <div className='app'>
                <p className='text'>test</p>
            </div>
        );
    }
}

export default App;