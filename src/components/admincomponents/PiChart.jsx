
import { ResponsivePie } from '@nivo/pie'
const MyResponsivePie = ({data}) => {
     console.log('fafffffffff' + data);
   
    
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
            Total Item: <strong>{datum.value}</strong>
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
            itemWidth: 50,
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