import React from "react";
import {Paper, Table, TableContainer, TableCell,
    TableRow, TableHead, TableBody} from '@material-ui/core/';
import {MessageStatus} from "@nodefactory/metamask-filecoin-types";

export interface TransactionTableProps {
    txs: MessageStatus[];
}

export const TransactionTable = (props: TransactionTableProps) => {
    return (
        <TableContainer className="transtaction-table" component={Paper}>
            <Table 
            aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Message id</TableCell>
                    <TableCell align="center">Sender</TableCell>
                    <TableCell align="center">Destination</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Gas Price</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.txs.map(tx => (
                    <TableRow key={tx.serialized}>
                    <TableCell  align="left" component="th" scope="row">
                        {tx.block.cid}
                    </TableCell>
                    <TableCell  align="center" component="th" scope="row">
                        {tx.message.from}
                    </TableCell>
                    <TableCell align="center">{tx.message.to}</TableCell>
                    <TableCell align="center">{tx.message.value}</TableCell>
                    <TableCell align="center">{tx.message.gasprice}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};