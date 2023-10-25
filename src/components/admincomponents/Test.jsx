// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from '@nivo/pie'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsivePie = () => {
    const data = [
        {
          "id": "ruby",
          "label": "ruby",
          "value": 365,
          "color": "hsl(297, 70%, 50%)"
        },
        {
          "id": "erlang",
          "label": "erlang",
          "value": 30,
          "color": "hsl(239, 70%, 50%)"
        },
        {
          "id": "hack",
          "label": "hack",
          "value": 402,
          "color": "hsl(318, 70%, 50%)"
        },
        {
          "id": "sass",
          "label": "sass",
          "value": 220,
          "color": "hsl(242, 70%, 50%)"
        },
        {
          "id": "stylus",
          "label": "stylus",
          "value": 498,
          "color": "hsl(86, 70%, 50%)"
        }
      ]
   return(
    <ResponsivePie
    data={data}
    tooltip={({ datum }) => (
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          <div style={{ marginBottom: '6px' }}>
            <strong>{datum.label}</strong>
          </div>
          <div>
            Value: <strong>{datum.value}</strong>
          </div>
        </div>
      )}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    startAngle={-3}
    sortByValue={true}
    innerRadius={0.35}
    activeOuterRadiusOffset={8}
    colors={{ scheme: 'nivo' }}
    borderColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                0.2
            ]
        ]
    }}
    arcLinkLabel={e=>e.id+" ("+e.value+")"}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
    arcLinkLabelsOffset={1}
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
    arcLabelsRadiusOffset={0.35}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                2
            ]
        ]
    }}
    defs={[
        {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true
        },
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        }
    ]}
    fill={[
        {
            match: {
                id: 'ruby'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'c'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'go'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'python'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'scala'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'lisp'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'elixir'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'javascript'
            },
            id: 'lines'
        }
    ]}
    legends={[
        {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000'
                    }
                }
            ]
        }
    ]}
/>
   );
   
};
export default MyResponsivePie;