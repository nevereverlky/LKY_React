import React from 'react'
import {Card, Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

//柱状图路由
class Bar extends React.Component {

  state = {
    sales: [5, 20, 36, 10, 10, 20], //销量的数组
    inventorys: [15, 30, 46, 20, 20, 40] //库存的数组
  }

  //返回柱状图的对象配置
  getOption = () => {
    const {sales, inventorys} = this.state
    return {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存']
      },
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: sales
      }, {
        name: '库存',
        type: 'bar',
        data: inventorys
      }]
    }
  }

  update = () => {
    const sales = this.state.sales.map(sale => sale + 1)
    const inventorys = this.state.inventorys.map(inventory => inventory -1)
    this.setState({
      sales,
      inventorys
    })
  }
    
  render(){
    return (
      <div className="Bar">
        <Card>
          <Button type='primary' onClick={this.update}>更新</Button>
        </Card>

        <Card title='柱状图一'>
          <ReactEcharts option={this.getOption()} style={{height: 300}}/>
        </Card>
      </div>
    );
  }
}

export default Bar;