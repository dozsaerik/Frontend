import React from "react";
import {Toast} from "flowbite-react";

interface Props {
    timeout: number,
    show: boolean,
    handleHide: () => void,
    children: React.ReactNode
}

interface State {
    _show: boolean
}

class TToast extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            _show: false
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if (this.props.show && !this.state._show) {
            this.setState({_show: true});
            this.startTimer();
            this.props.handleHide();
        }
    }

    componentDidMount() {
        this.startTimer();
    }

    startTimer = () => {
        setTimeout(() => {
            this.setState({_show: false});
        }, this.props.timeout);
    }

    render() {
        return (
            <Toast className={`fixed bottom-4 right-3 dark:bg-gray-700 transition-opacity duration-[500ms] ${this.state._show ? 'opacity-100' : 'opacity-0'}`}>
                {this.props.children}
                <Toast.Toggle className="dark:bg-gray-700 dark:hover:bg-gray-600"/>
            </Toast>
        );
    }
}

export default TToast