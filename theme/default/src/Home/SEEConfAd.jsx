import TweenOne from 'rc-tween-one';
import {
    notification
} from 'antd';
import {
    Link
} from 'react-router';

console.log(window.innerWidth);

class SEEConfAd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: {
                position: 'relative',
                height: window.innerWidth / 1440 * 500,
                top: 0,
                repeat: 0,
                duration: 1000
            }
        }
    }

    componentDidMount() {
        const openNotification = () => {
            const args = {
                message: 'See Conf 首届蚂蚁金服体验科技大会',
                description: <a target='_blank' href='https://seeconf.alipay.com/'
                                style={{color: '#108ee9'}}>点击进入</a>,
                icon: <img src="https://gw.alipayobjects.com/zos/rmsportal/wYfEimhPlttSsAKyiTzR.png"
                           style={{width: '24px', height: '24px'}}/>,
                duration: 0,
                style: {
                    right: 24,
                    top: 60,
                    width: 360
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
        const link = 'https://seeconf.alipay.com/';
        return (
            <TweenOne
                animation={this.state.animation}
                paused={this.props.paused}
                style={{
                    height: 0
                }}
                className="see-conf-banner">
                <a target='_blank' href={link}>
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/srgGWDMwzIsmDIlJDrXk.png"/>
                </a>
            </TweenOne>
        );
    }
}

export default SEEConfAd;