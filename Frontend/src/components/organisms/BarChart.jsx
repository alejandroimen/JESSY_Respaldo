import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'January', sales: 4000 },
    { name: 'February', sales: 3000 },
    { name: 'March', sales: 2000 },
];

const CustomBarChart = (props) => (
    <div style={{ textAlign: 'center', width: '100%' }}>
        <h1>Ventas Mensuales</h1>
        <div style={{ width: '300px', height: '170px', margin: '0 auto' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
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
                    <Bar dataKey="sales" fill="#b30000" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default CustomBarChart;
