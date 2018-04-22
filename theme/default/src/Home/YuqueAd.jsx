import TweenOne from 'rc-tween-one';
import {
    notification
} from 'antd';
import {
    Link
} from 'react-router';

const AD_LINK = 'http://www.anijue.com/p/q/yuque423/pages/home/index.html?chInfo=ch_yuquebooks__chsub_antv';

class SEEConfAd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: {
                position: 'relative',
                height: window.innerWidth / 1440 * 80,
                top: 64,
                repeat: 0,
                duration: 1000
            }
        };
    }

    componentDidMount() {
        const openNotification = () => {
            const args = {
                message: '你写书单、语雀买单',
                description: <a target='_blank' href={AD_LINK}
                                style={{color: '#108ee9'}}>点击进入</a>,
                icon: <img src="https://gw.alipayobjects.com/zos/rmsportal/CTfFnlpReiwSVlAQIJUj.png"
                           style={{width: '48px', height: '48px'}}/>,
                duration: 0,
                style: {
                    top: 60,
                    width: '100%'
                },
            };
            notification.open(args);
        };
        let self = this;
        this.coverTimeout = setTimeout(() => {
            self.setState({
                animation: {
                    // position: 'absolute',
                    height: 0,
                    repeat: 0,
                    duration: 1000
                }
            });
        }, 3000);
        this.noticeTimeout = setTimeout(() => {
            openNotification();
        }, 4000);
    }

    componentWillUnmount() {
        clearTimeout(this.coverTimeout);
        clearTimeout(this.noticeTimeout);
    }

    render() {
        return (
            <TweenOne
                animation={this.state.animation}
                paused={this.props.paused}
                style={{
                    height: 0
                }}
                className="see-conf-banner">
                <a target='_blank' href={AD_LINK}>
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/bpKcpwimYnZMTarUxCEd.png"/>
                </a>
            </TweenOne>
        );
    }
}

export default SEEConfAd;