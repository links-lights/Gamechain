import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material"
function NFTOddsTable(){
  const odds =[20000, 40000, 60000, 80000, 100000]
  return (
    <>
    <Typography variant="h5">
      NFT Odds
    </Typography>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:"bold"}}>
              Milestone(Total Score)
            </TableCell>
            <TableCell align="right" sx={{fontWeight:"bold"}}>
              Odds Increased
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {odds.map((score, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell>
                  {score}
                </TableCell>
                <TableCell align="right">
                  {`+0.1%`}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  //   <table>
  //   <th>
  //    NFT Odds
  //   </th>
  //    <tr>
  //      <th>Milestone</th>
  //      <th>Odds increased</th>
  //    </tr>
  //    <tr>
  //      <td>20000 Total Score </td>
  //      <td>+0.1%</td>
  //    </tr>
  //    <tr>
  //      <td>40000 Total Score </td>
  //      <td>+0.1%</td>
  //    </tr>
  //     <tr>
  //      <td>60000 Total Score </td>
  //      <td>+0.1%</td>
  //     </tr>
  //    <tr>
  //      <td>80000 Total Score </td>
  //      <td>+0.1%</td>
  //    </tr>
  //    <tr>
  //      <td>100000 Total Score </td>
  //      <td>+0.1%</td>
  //    </tr>
  //  </table>

  )
}

export default NFTOddsTable
