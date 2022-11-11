import React from "react"
import { Chart, Geom, Axis, Tooltip } from "bizcharts"

export default class Bar extends React.Component {

    render() {
        const data = [
            {
                year: "1 月",
                sales: 38
            },
            {
                year: "2 月",
                sales: 52
            },
            {
                year: "3 月",
                sales: 61
            },
            {
                year: "4 月",
                sales: 145
            },
            {
                year: "5 月",
                sales: 48
            },
            {
                year: "6 月",
                sales: 38
            },
            {
                year: "7 月",
                sales: 28
            },
            {
                year: "8 月",
                sales: 38
            },
            {
                year: "59 月",
                sales: 68
            },
            {
                year: "10 月",
                sales: 38
            },
            {
                year: "11 月",
                sales: 58
            },
            {
                year: "12 月",
                sales: 38
            }
        ]

        const cols = {
            sales: {
                tickInterval: 20
            }
        }

        return (
            <div style={{width: '100%', marginLeft: -30}}>
                <Chart height={338} data={data} scale={cols} forceFit>
                    <Axis name="year"/>
                    <Axis name="sales"/>
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom type="interval" position="year*sales"/>
                </Chart>
            </div>
        )
    }
}