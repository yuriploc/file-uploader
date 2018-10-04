import React from 'react';
import { BASE_URL } from '../constants/api';

class UploadList extends React.Component {
  state = {
    listItems: ''
  };

  // createLine = items => {
  //   let count = 0;
  //   return items.map(i => {
  //     const tds = [];
  //     for (const key in i) {
  //       if (i.hasOwnProperty(key)) {
  //         tds.push(<Td key={count++}>{i[key]}</Td>);
  //       }
  //     }
  //     return <Tr key={i.employeeCode + count++}>{tds}</Tr>;
  //   });
  // };

  // mapRows = rows => {
  //   return this.createLine(rows);
  // };

  // componentDidMount() {
  //   const uploadId = parseInt(this.props.match.params.uploadId);
  //   fetch(`${BASE_URL}/uploads/${uploadId}`)
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error(`${res.statusText}`);
  //       }
  //       return res.json();
  //     })
  //     .then(res => {
  //       this.setState({ listItems: this.mapRows(res) });
  //     })
  //     .catch(error => {
  //       // not found?
  //     });
  // }

  render() {
    return <p>move on</p>;
  }
}

export default UploadList;
