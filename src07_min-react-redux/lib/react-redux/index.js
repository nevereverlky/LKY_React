/**
 * react-redux库的主模块
 *  1) react-redux 向外暴露了 2 个 API
        a. Provider 组件类
        b. connect 函数
    2) Provider 组件
        接收 store 属性
        让所有容器组件都可以看到 store, 从而通过 store 读取/更新状态
    3) connect 函数
        接收 2 个参数: mapStateToProps 和 mapDispatchToProps
        mapStateToProps: 为一个函数, 用来指定向 UI 组件传递哪些一般属性
        mapDispatchToProps: 为一个函数或对象, 用来指定向 UI 组件传递哪些函数属性
        connect()执行的返回值为一个高阶组件: 包装 UI 组件, 返回一个新的容器组件
        容器组件会向 UI 传入前面指定的一般/函数类型属性
 */
import React from "react";
import PropTypes from 'prop-types'

//用来向所有容器组件提供store的组件类
//通过context向所有的容器组件提供store
export class Provider extends React.Component {

    static propTypes = {
        store: PropTypes.object.isRequired //声明接收store
    }

    //声明提供的context的数据名称和类型
    static childContextTypes = {
        store: PropTypes.object
    }

    //向所有有声明子组件提供包含要传递数据的context对象
    getChildContext() {
        return {
            store: this.props.store
        }
    }

    render() {
        //返回渲染<Provider>的所有子节点
        return this.props.children
    }
}

//connect高阶函数：接收mapStateToProps和 mapDispatchToProps两个参数，返回一个高阶组件函数
//高阶组件：接收一个UI组件，返回一个容器组件
export function connect(mapStateToProps = () => {}, mapDispatchToProps = {}) {
    //返回高阶组件函数
    return (UIComponent) => {
        //返回容器组件
        return class ContainerComponent extends React.PureComponent {
            //声明接收的context数据的名称和类型
            static contextTypes = {
                store: PropTypes.object.isRequired
            }

            constructor(props, context) {
                super(props);
                console.log('ContainerComponent constructor()', context.store)

                //得到store
                const {store} = context
                //得到包含所有一般属性的对象
                const stateProps = mapStateToProps(store.getState()) //{count: 1}

                //得到包含所有函数属性的对象
                let dispatchProps
                if(typeof mapDispatchToProps === 'function') { // 如果第二个参数是函数, 调用它得到包含所有需要传递的函数属性的对象
                    dispatchProps = mapDispatchToProps(store.dispatch)
                } else { // 第二个参数是对象
                    // 遍历对象中所有方法, 生成包含所有需要传递的函数属性的对象
                    dispatchProps = Object.keys(mapDispatchToProps).reduce((pre,key) => {
                        const actionCreator = mapDispatchToProps[key]
                        pre[key] = (...args) => store.dispatch(actionCreator(...args)) //参数透传
                        return pre
                    }, {})
                }
                //将所有一般属性作为容器的状态数据
                this.state = {...stateProps}

                // 将包含函数属性的对象保存到容器组件上
                this.dispatchProps = dispatchProps
                // 订阅 store 状态变化的监听
                store.subscribe(() => {
                    // 一旦 store 中的 state 有变化, 更新容器组件状态, 从而导致 UI 组件重新
                    this.setState(mapStateToProps(store.getState()))
                })
            }

            render () {
                //返回UI组件的标签
                return <UIComponent {...this.state}{...this.dispatchProps}/>
            }
        }
    }
}