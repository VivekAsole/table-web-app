import React, { useState } from 'react'
import {
    Typography, Button, Box, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';


export default function ColumnGroups({ setGroupedColumn }) {

    const [selectedColumn, setSelectedColumn] = useState([])
    
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4
            }}
        >
            <Typography variant="h4">Create Groups</Typography>
            <FormControl sx={{ minWidth: 350 }}>
                <InputLabel >Select a Column</InputLabel>
                <Select
                    value={selectedColumn}
                    label="Select a Column"
                    onChange={(e) => setSelectedColumn(e.target.value)}
                >
                    <MenuItem value="category">category</MenuItem>
                    <MenuItem value="subcategory">subcategory</MenuItem>
                </Select>
            </FormControl>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4
                }}
            >
                <Button
                    sx={{ width: 350, height: 50 }}
                    variant="outlined"
                    onClick={() => {
                        if (selectedColumn) {
                            setGroupedColumn([])
                            setSelectedColumn([])
                        }
                    }}
                >Clear Grouping
                </Button>
                <Button
                    sx={{ width: 350, height: 50 }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        if (selectedColumn.length) setGroupedColumn([selectedColumn])
                    }}
                >Apply Grouping
                </Button>
            </Box>
        </Box>
    );
};

