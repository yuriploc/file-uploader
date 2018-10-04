import React from 'react';
import insertCss from 'insert-css';
import css from 're-bulma/build/css';
import { Table, Thead, Tr, Th, Tbody, Td } from 're-bulma';
import { BASE_URL } from '../constants/api';

// CSS boilerplate
try {
  if (typeof document !== 'undefined' || document !== null)
    insertCss(css, { prepend: true });
} catch (e) {}

class UploadList extends React.Component {
  state = {
    listItems: ''
  };

  createLine = items => {
    let count = 0;
    return items.map(i => {
      const tds = [];
      for (const key in i) {
        if (i.hasOwnProperty(key)) {
          tds.push(<Td key={count++}>{i[key]}</Td>);
        }
      }
      return <Tr key={i.employeeCode + count++}>{tds}</Tr>;
    });
  };

  mapRows = rows => {
    return this.createLine(rows);
  };

  componentDidMount() {
    const uploadId = parseInt(this.props.match.params.uploadId);
    fetch(`${BASE_URL}/uploads/${uploadId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`${res.statusText}`);
        }
        return res.json();
      })
      .then(res => {
        this.setState({ listItems: this.mapRows(res) });
      })
      .catch(error => {
        // not found?
      });
  }

  render() {
    return (
      <Table isBordered>
        <Thead>
          <Tr>
            <Th>Upload ID</Th>
            <Th>File Name</Th>
            <Th>Yard Code</Th>
            <Th>Employee Code</Th>
            <Th>Clock In</Th>
            <Th>Clock Out</Th>
          </Tr>
        </Thead>
        <Tbody>{this.state.listItems}</Tbody>
      </Table>
    );
  }
}

export default UploadList;
