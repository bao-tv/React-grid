import React, { useState, useRef } from 'react';
import GridLayout, { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Modal from './Modal.jsx';
import { debounce } from 'lodash';
import { usePDF } from 'react-to-pdf';
const ResponsiveGridLayout = WidthProvider(GridLayout);

const Test = () => {
    const gridRef = useRef(null);
    const [state, setState] = useState([]);
    console.log('bao state: ', state);
    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

    const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se", "ne"];
    const [show, setShow] = useState(false);
    
    const handleAdd = (dataForm) => {
        // console.log('dataForm: ', dataForm);
        if (dataForm.i === '') {
            setState(prevState => {
                // console.log('bao : ', prevState);
                const newItem = {
                    i: `${prevState.length + 1}`,
                    x: 0,
                    y: 0,
                    w: +dataForm.width || 15,
                    h: +dataForm.height || 1,
                    resizeHandles: availableHandles,
                    data: { i: prevState.length + 1, name: dataForm?.name, barcode: prevState.length + 1 }
                };
                return [...prevState, newItem];
            });
        } else {
            setState(prevState => {
                const updatedState = prevState.map(ele => {
                    if (ele.i === dataForm.i) {
                        return {
                            i: dataForm.i,
                            x: 0,
                            y: 0,
                            w: +dataForm.width || 15,
                            h: +dataForm.height || 1,
                            resizeHandles: availableHandles,
                            data: { i: dataForm.i, name: dataForm?.name, barcode: prevState.length + 1 }
                        };
                    } else {
                        return ele;
                    }
                });
                return updatedState;
            });
        }
        setShow(false);
    };

    const onLayoutChange = (layout, layouts) => {
        console.log('layout: ', layout);
        setState(layout);
        
      }
    const handeShowBale = (dataBale) => {
        // console.log('bao handeShowBale: ', dataBale)
        setShow({
            i: dataBale.i,
            name: dataBale.data.name,
            width: dataBale.w,
            height: dataBale.h,
        });
    }

    return (
        <>
            <div className='container m-auto'>
                <div className="row">
                    <header className='d-flex justify-content-center'>GTAS BALE LAYOUT</header>
                    <div>
                        <div className='d-flex justify-content-end'>
                            <button type="button" className="btn btn-primary" onClick={() => setShow(true)}>ADD BALE</button>
                        </div>
                        <div ref={targetRef}>
                            <p className='pt-5'></p>
                            {state.length ? (
                                <div className='container' style={{width : '420px', height: '640px'}}>
                                    <ResponsiveGridLayout
                                        className="layout border border-dark-subtle rounded overflow-hidden"
                                        layout={state}
                                        rowHeight={40}
                                        width={400}
                                        height={600}
                                        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
                                        cols={30}
                                        ref={gridRef}
                                        style={{maxHeight: '610px'}}
                                    >
                                        {state.map(item => (
                                            <div key={item?.i} style={{ border: '1px solid' }} onDoubleClick={() => handeShowBale(item)}>
                                                <div className='p-1'>
                                                    <p className='m-0' style={{fontSize: '12px'}}>ID: <span>{item?.data?.i}</span></p>
                                                    <p className='m-0' style={{fontSize: '12px'}}>Name: <span>{item?.data?.name}</span></p>
                                                </div>
                                            </div>
                                        ))}
                                    </ResponsiveGridLayout>
                                </div>
                            ): ''}
                        </div>
                    </div>
                    <footer className='d-flex justify-content-end'>
                        <button className='btn btn-info' onClick={() => toPDF()}>Download PDF</button>
                    </footer>
                </div>
            </div>
            <Modal show={show} setShow={setShow} handleAdd={handleAdd}/>
        </>
    )
}

export default Test;
