import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { BASE_URL } from '../constants/api';
import AlertBox from './AlertBox';

class UploadFile extends React.Component {
  // fileName = React.createRef();
  // file = React.createRef();

  state = {
    isSent: false,
    boxStyle: '',
    boxMsg: '',
    fileNameChange: '',
    fileChange: '',
    fileName: '',
    file: ''
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleUpload = event => {
    event.preventDefault();
    const { fileNameChange, fileChange } = this.state;
    this.setState({ file: fileChange, fileName: fileNameChange });
    // console.log(fileName);
    // // console.log(file);
    console.log(fileNameChange);
    console.log(fileChange);
    const formData = new FormData();
    formData.append('filename', this.state.fileName.current.value);
    formData.append('file', this.state.file.current.files[0]);
    fetch(`${BASE_URL}/uploads`, {
      method: 'POST',
      body: formData
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`${res.statusText}`);
        }
        return res.json();
      })
      .then(res => {
        this.setState({
          isSent: true,
          boxMsg: `File uploaded. Id: ${res.uploadId}`,
          boxStyle: 'success'
        });
        this.props.history.push(`/uploads/${res.uploadId}`);
      })
      .catch(error => {
        this.setState({
          isSent: true,
          boxMsg: `Upload error: ${error.message}`,
          boxStyle: 'error'
        });
      });
  };

  // TODO: CSS!
  render() {
    const { fileNameChange, fileChange } = this.state;
    return (
      <React.Fragment>
        <Form encType="multipart/form-data" onSubmit={this.handleUpload}>
          <Form.Field>
            <input
              type="text"
              defaultValue={fileNameChange}
              name="filename"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="file"
              defaultValue={fileChange}
              name="file"
              accept="text"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit" onClick={this.handleUpload}>
            Submit
          </Button>
        </Form>
      </React.Fragment>
      // <React.Fragment>
      //   <form encType="multipart/form-data" onSubmit={this.handleUpload}>
      //     <input type="text" ref={this.fileName} name="filename" />
      //     <br />
      //     <input type="file" ref={this.file} name="file" accept="text" />
      //     <br />
      //     <button type="submit">Upload File</button>
      //   </form>
      //   {this.state.isSent && (
      //     <AlertBox boxStyle={this.state.boxStyle} boxMsg={this.state.boxMsg} />
      //   )}
      // </React.Fragment>
    );
  }
}

export default UploadFile;
