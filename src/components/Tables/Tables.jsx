// Import `connect` from the Tableland library
import { connect } from "@tableland/sdk";

// Connect to the Tableland testnet (defaults to Goerli testnet)
// @return {Connection} Interface to access the Tableland network and target chain
const tableland = await connect({ network: "testnet" });

// Create a new table with a supplied SQL schema and optional `prefix`
// @return {Connection} Connection object, including the table's `name`
const { name } = await tableland.create(
  `name text, id int, primary key (id)`, // Table schema definition
  `myVada` // Optional `prefix` used to define a human-readable string
);

// The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
console.log(name); // e.g., mytable_5_30
// Without the supplied `prefix`, `name` would be be `_5_30`

// Insert a row into the table
// @return {WriteQueryResult} On-chain transaction hash of the write query
const writeRes = await tableland.write(
  `INSERT INTO ${name} (id, name) VALUES (0, 'Bobby Tables');`
);

// Perform a read query, requesting all rows from the table
const readRes = await tableland.read(`SELECT * FROM ${name};`);
// Note: a table *must first exist* in Tableland before performing `read`
// Use retry logic with the `receipt` method to verify `txnHash` != undefined
// See the `read` documentation below for more details
