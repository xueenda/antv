import React from 'react';
import ReactDOM from 'react-dom';
import enquire from 'enquire.js';
import Banner from './Banner';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import SEEConfAd from './SEEConfAd';
import moment from 'moment';
import './home.index.less';

function enquireScreen(cb) {
    /* eslint-disable no-unused-expressions */
    // and (min-width: 320px)
    enquire.register('only screen and (max-width: 768px)', {
        match: () => {
            cb && cb(true);
        },
        unmatch: () => {
            cb && cb();
        },
    });
    /* eslint-enable no-unused-expressions */
}

let isMobile;
enquireScreen((b) => {
    isMobile = b;
});


class Home extends React.PureComponent {
    state = {
        isMobile,
    };

    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: !!b,
            });
        });
    }

    render() {
        const content = [];
        const SEE_CONF_DATE = moment('2018-01-07');
        const now = moment();
        if (now < SEE_CONF_DATE) {
            content.push(<SEEConfAd/>);
        }
        return (
            content.concat([
                <Banner key="banner" isMobile={this.state.isMobile}/>,
                <Page1 key="page1"/>,
                <Page2 key="page2"/>,
                <Page3 key="page3"/>,
                <Page4 key="page4" isMobile={this.state.isMobile}/>,
                <Page5 key="page5"/>,
            ])
        );
    }
}

ReactDOM.render(<Home/>, document.getElementById('react-content'));