import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const UsersTable =({rows,selectedUser,deleteUser})  =>{
    return(
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            
                {
                    rows.length > 0?( rows.map(row =>(
                        <TableRow key={row.id} sx={{'&:last-child td, &:last-child th':{border:0}}}> {/*border is 0 final row */}
                            <TableCell component={'td'}>{row.id}</TableCell>
                            <TableCell component={'td'}>{row.name}</TableCell>
                            <TableCell >
                                <Button 
                                sx={{margin:'0px 10px' }}
                                onClick={()=>selectedUser({id:row.id, name: row.name})}>
                                    Update
                                </Button>

                                <Button 
                                sx={{margin:'0px 10px' }}
                                onClick={()=>deleteUser({id:row.id})}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ):(
                        <TableRow  sx={{'&:last-child td, &:last-child th':{border:0}}}>
                            <TableCell component={'th'} sx={{color:'black', fontSize:'20px'}}>No Data </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    </TableContainer>
    );
    
}

export default UsersTable;