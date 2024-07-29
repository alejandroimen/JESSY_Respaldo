import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'January', value: 4000 },
    { name: 'February', value: 3000 },
    { name: 'March', value: 2000 },
    { name: 'April', value: 2780 },
];

const COLORS = ['#b30000', '#b30000', '#b30000', '#b30000', '#b30000', '#b30000', '#b30000'];

const CustomPieChart = (props) => (
    <div style={{ textAlign: 'center', width: '100%', height: '100%' }}>
        <h1>Productos Vendidos</h1>
        <div style={{ width: '350px', height: '240px', margin: '0 auto' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={40} // Ajusta este valor para que se acomode bien en el nuevo tamaño
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default CustomPieChart;
