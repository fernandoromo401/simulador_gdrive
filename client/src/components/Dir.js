import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CloudArrowUpFill, FolderPlus } from 'react-bootstrap-icons';
import FormModal from './FormModal';
import FilesForm from './forms/FilesForm';
import MkDirForm from './forms/MkDirForm';
import Dirent from './Dirent';
import api from '../api/api';
import Loading from './Loading';

class Dir extends Component {

  contentGlobal;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dir: {},
      value: ""
    };
  }

  componentDidMount() {
    this.loadContent();
  }

  reload() {
    this.setState({ loading: true });
    this.loadContent();
  }

  async loadContent() {
    try {
      const dir = await api.getContent(this.props.match.params.path || '');
      this.setState({ loading: false, dir });
    } catch (e) {
      console.log(e);
    }
  }

  fillEntries() {
    if (this.state.loading) {
      return <Loading text="Cargando..." />;
    }

    const content = this.state.dir.content;
    const path = this.props.match.params.path;
    const directories = [
      <Dirent
        name="Hacia atras..."
        key="parent"
        isDirectory
        parentDirectory
        path={path}
      />,
    ];
    content.directories.forEach((dir) =>
      directories.push(<Dirent name={dir} isDirectory key={dir} path={path} />)
    );
    const files = content.files.map((file) => (
      <Dirent name={file} key={file} path={path} />
    ));

    return [...directories, ...files];
  }

  render() {
    const rowProps = { className: 'mx-auto mb-3' };
    const iconStyle = { color: '#FFF', size: 24, className: 'ml-2' };
    const path = this.props.match.params.path;
    const pathName = path === undefined ? "Carpeta raiz" : "Carpeta :  " + path;
    
    return (
      <Container>
        <section className="card p-2 mb-4 bg-light text-dark">
          <h1 className="text-center">MBCLOUD</h1>
        </section>
        
        <Row {...rowProps}>
          <Col>
            <FormModal
              btn="info"
              icon={<CloudArrowUpFill {...iconStyle} />}
            >
              <FilesForm uploadTo={path} reload={() => this.reload()} />
            </FormModal>
          </Col>
          <Col>
            <FormModal
              btn="warning"
              icon={<FolderPlus {...iconStyle} />}
            >
              <MkDirForm path={path} reload={() => this.reload()} />
            </FormModal>
          </Col>

        </Row>
        
        <Row {...rowProps}>
          
          <Col className="mt-3">
            <h4 className="text-center">{pathName.toUpperCase()}</h4>
          </Col>
        </Row>
        <Row {...rowProps}>{this.fillEntries()}</Row>

      </Container>
    );
  }
}

export default Dir;
