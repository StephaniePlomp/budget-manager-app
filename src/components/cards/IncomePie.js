import React from 'react'
import { Label, PieChart, Pie, Tooltip, Cell } from 'recharts';

const IncomePie = ({ dataChange, colorChange, handleNoData, CustomTooltip, pieSize }) => {

    return (
        <PieChart width={pieSize} height={pieSize}>
            {handleNoData &&
                <Tooltip
                    coordinate={{ x: 100, y: 300 }}
                    content={<CustomTooltip />}
                    cursor={{ fill: "transparent" }}
                />
            }
            <Pie
                cx="50%"
                cy="50%"
                data={dataChange}
                nameKey="name"
                dataKey="value"
                paddingAngle={1}
                innerRadius={'70%'}
                outerRadius={'100%'}
                isAnimationActive={handleNoData}
            >
                <Label
                    position="center"
                    value="Income"
                    style={{
                        fontSize: '100%',
                        fontWeight: 'bold',
                        fill: 'black',
                        textAnchor: 'middle',
                        fontFamily: 'Inter',
                    }}
                />
                {colorChange?.map((entry, index) => (
                    <Cell
                        style={{outline: 'none'}}
                        key={index}
                        fill={colorChange[index % colorChange.length]}
                    />
                ))
                }
            </Pie>
        </PieChart>
    )
}

export default IncomePie