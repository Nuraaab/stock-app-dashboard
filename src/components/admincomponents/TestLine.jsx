import React from 'react'
import { ResponsiveLine } from '@nivo/line'
const TestLine = () => {
    const data = [
        {
            "id": "japan",
            "color": "hsl(290, 70%, 50%)",
            "data": [
              {
                "x": "plane",
                "y": 233
              },
              {
                "x": "helicopter",
                "y": 41
              },
              {
                "x": "boat",
                "y": 68
              },
              {
                "x": "train",
                "y": 184
              },
              {
                "x": "subway",
                "y": 278
              },
              {
                "x": "bus",
                "y": 92
              },
              {
                "x": "car",
                "y": 282
              },
              {
                "x": "moto",
                "y": 96
              },
              {
                "x": "bicycle",
                "y": 261
              },
              {
                "x": "horse",
                "y": 57
              },
              {
                "x": "skateboard",
                "y": 224
              },
              {
                "x": "others",
                "y": 287
              }
            ]
          },
          {
            "id": "france",
            "color": "hsl(337, 70%, 50%)",
            "data": [
              {
                "x": "plane",
                "y": 292
              },
              {
                "x": "helicopter",
                "y": 129
              },
              {
                "x": "boat",
                "y": 143
              },
              {
                "x": "train",
                "y": 81
              },
              {
                "x": "subway",
                "y": 289
              },
              {
                "x": "bus",
                "y": 68
              },
              {
                "x": "car",
                "y": 43
              },
              {
                "x": "moto",
                "y": 49
              },
              {
                "x": "bicycle",
                "y": 7
              },
              {
                "x": "horse",
                "y": 293
              },
              {
                "x": "skateboard",
                "y": 150
              },
              {
                "x": "others",
                "y": 199
              }
            ]
          },
    ];
  return (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ theme: 'grid.line.stroke' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
  )
}

export default TestLine