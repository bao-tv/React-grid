import React, { useState } from 'react';
import GridLayout, { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
const ResponsiveGridLayout = WidthProvider(Responsive);

const Test = () => {
    const [state, setState] = useState([
        { i: "1", x: 0, y: 0, w: 1, h: 1, static: true, data:{id: 1, name: 1, barcode: 1 } },
        { i: "2", x: 1, y: 0, w: 1, h: 1, data:{id: 2, name: 2, barcode: 2 } },
        { i: "3", x: 0, y: 1, w: 1, h: 1, data:{id: 3, name: 3, barcode: 3 } }
    ]);

    console.log('bao state: ', state);
    
    const handleAdd = () => {
        setState(prevState => {
            const newItem = { i: prevState.length + 1, x: prevState.length % 2 === 0 ? 0 : 1, y: 1, w: 1, h: 1, data:{id: prevState.length + 1, name: prevState.length + 1, barcode: prevState.length + 1 } };
            return [...prevState, newItem];
        });
    }

    const onLayoutChange = (layout, layouts) => {
        console.log(layouts)
      }

    return (
        <>
            <header>GTAS BALE LAYOUT</header>
            <div>
                <button type="button" className="btn btn-primary" onClick={handleAdd}>ADD</button>
                <div className='container w-25'>
                    <ResponsiveGridLayout
                        className="layout border border-dark-subtle rounded"
                        layout={state}
                        rowHeight={120}
                        width={300}
                        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
                        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    >
                        {state.map(item => (
                            <div key={item.i} style={{ border: '1px solid' }} data-grid={item}>
                                <p>ID: <span>{item.data.id}</span></p>
                                <p>Name: <span>{item.data.id}</span></p>
                                <p>Barcode: <span>{item.data.id}{item.data.id}{item.data.id}</span></p>
                            </div>
                        ))}
                    </ResponsiveGridLayout>
                </div>
            </div>
        </>
    )
}

export default Test;
