import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Page A', uv: 4000, pv: 2400},
    { name: 'Page B', uv: 3000, pv: 1390},
    { name: 'Page C', uv: 2000, pv: 9800},
    { name: 'Page D', uv: 2780, pv: 3908},
    { name: 'Page E', uv: 1890, pv: 4800},
];

const CustomLineChart = (props) => {
    return (
        <div style={{ textAlign: 'center', width: '100%' }}>
            <h1>Ganancias</h1>
            <div style={{ width: '300px', height: '250px', margin: '0 auto' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={props.data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Ganancia" stroke="#b30000" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="Inversion" stroke="#b30000" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CustomLineChart;
