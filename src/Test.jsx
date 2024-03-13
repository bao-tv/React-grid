import React, { useState } from 'react';
import GridLayout, { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
const ResponsiveGridLayout = WidthProvider(Responsive);

const Test = () => {
    const [state, setState] = useState([
        { i: "1", x: 0, y: 0, w: 1, h: 2, static: true },
        { i: "2", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        { i: "3", x: 4, y: 0, w: 1, h: 2 }
    ]);

    console.log('bao state: ', state);
    
    const handleAdd = () => {
        setState(prevState => {
            const newItem = { i: prevState.length.toString(), x: 0, y: 0, w: 2, h: 2 };
            return [...prevState, newItem];
        });
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
                        rowHeight={30}
                        width={300}
                        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    >
                        {state.map(item => (
                            <div key={item.i} style={{ border: '1px solid' }}>{item.i}</div>
                        ))}
                    </ResponsiveGridLayout>
                </div>
            </div>
        </>
    )
}

export default Test;
