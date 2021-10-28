import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material"

function TokenOddsTable(){
  const tileScores =[ {score: 512, percentage:10}, {score: 1024, percentage: 15}, {score:2048, percentage:15}]
  const scores = [ {score: 5000, percentage: 10 }, {score: 10000, percentage:15 }, {score: 20000, percentage:15}]
  return (
    <>
    <Typography variant="h5">
      Token Odds
    </Typography>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:"bold"}}>
             Tile
            </TableCell>
            <TableCell align="right" sx={{fontWeight:"bold"}}>
              Odds Increased
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tileScores.map((odds, idx)=>{
            return (
              <TableRow key={idx}>
                <TableCell>
                  {odds.score}
                </TableCell>
                <TableCell align="right">
                  {`+${odds.percentage}%`}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:"bold"}}>
             Score
            </TableCell>
            <TableCell align="right" sx={{fontWeight:"bold"}}>
              Odds Increased
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores.map((odds, idx)=>{
            return (
              <TableRow key={idx}>
                <TableCell>
                  {odds.score}
                </TableCell>
                <TableCell align="right">
                  {`+${odds.percentage}%`}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </>

  // <table>
  //   <th>
  //    Token Odds
  //   </th>
  //    <tr>
  //      <th>Milestone</th>
  //      <th>Odds increased</th>
  //    </tr>
  //    <tr>
  //      <td>512 Tile Score </td>
  //      <td>+10%</td>
  //    </tr>
  //    <tr>
  //      <td>5000 Total Score </td>
  //      <td>+10%</td>
  //    </tr>
  //    <tr>
  //      <td>1024 Tile Score </td>
  //      <td>+15%</td>
  //    </tr>
  //    <tr>
  //      <td>10000 Total Score </td>
  //      <td>+15%</td>
  //    </tr>
  //    <tr>
  //      <td>2048 Tile Score </td>
  //      <td>+15%</td>
  //    </tr>
  //    <tr>
  //      <td>20000 Total Score </td>
  //      <td>+15% + Can earn multiple tokens</td>
  //    </tr>
  //  </table>
   )
}
export default TokenOddsTable
