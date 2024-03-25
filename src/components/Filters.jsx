import React from 'react'
import { MRT_TableHeadCellFilterContainer } from 'material-react-table';

function Filters({ table, setColumnFilters }) {
    return (
        <div style={{ padding: "10px" }}>
            <p
                style={{
                    marginLeft: "10px",
                    fontSize: '20px',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                    color: '#333',
                }}
            >Filters</p>
            {
                table.getLeafHeaders().map((header) => (
                    header.id === 'id' ? '' :
                        <div style={{
                            marginTop: "10px",
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                        }}>
                            {(header.id === 'price'
                                || header.id === 'sale_price')
                                && <div>
                                    {header.id}
                                </div>
                            }
                            <MRT_TableHeadCellFilterContainer
                                key={header.id}
                                header={header}
                                table={table}
                                in
                                onChange={() => console.log("ch")}
                                
                                
                            />
                        </div>
                )
                )}
            <button
                style={{
                    marginTop: '10px',
                    width: '100%',
                    height: '50px',
                    border: '2px solid #4CAF50', // Add border style
                    borderRadius: '8px', // Add border radius for a modern look
                    fontSize: '1.2rem', // Increase font size
                    color: '#fff', // Text color
                    backgroundColor: '#4CAF50', // Background color
                    cursor: 'pointer', // Change cursor to pointer on hover
                    transition: 'background-color 0.3s, color 0.3s', // Smooth transition effect

                }}
                onClick={() => setColumnFilters([])}
            >Clear Filter</button>
        </div>
    )
}

export default Filters