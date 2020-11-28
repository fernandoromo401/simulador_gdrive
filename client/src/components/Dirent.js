import React from 'react';
import { baseURL } from '../config'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { saveAs } from 'file-saver';
import {
  FolderFill,
  FileEarmarkTextFill,
  Arrow90degUp,
  FileArrowDownFill,
  // TrashFill,
  // Pencil
} from 'react-bootstrap-icons';

const DirCard = (props) => {
  const iconStyle = { color: '#FFF', size: 16 };
  let icon = <FileEarmarkTextFill {...iconStyle} />;

  if (props.isDirectory) {
    icon = <FolderFill {...iconStyle} />;
  }
  if (props.parentDirectory) {
    icon = <Arrow90degUp {...iconStyle} />;
  }

  const path = props.path ? `${props.path}-${props.name}` : props.name;
  const downloadLink = `${baseURL}/download/${path}`;

  // TODO: Edit and delete files
  return (
    <Card>
      <Card.Body>
        <Container>
          <Row>
            <Col xs={props.isDirectory ? '' : 8} style={{ padding: 0 }}>
              <Card.Text title={props.name}
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {icon} &nbsp;&nbsp;&nbsp; {props.name.toUpperCase()}
              </Card.Text>
            </Col>
            {props.isDirectory ? (<></>) : (
              <Col
                style={{ padding: 0, cursor: 'pointer' }}
                className="d-flex flex-row-reverse mt-1"
                onClick={() => saveAs(downloadLink, props.name)}
              >
                <FileArrowDownFill {...iconStyle} />
                {/* <TrashFill size={30} color="#E06C75" /> */}
                {/* <Pencil {...iconStyle} /> */}
              </Col>
            )}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

const DirLink = (props) => {
  if (!props.isDirectory) {
    return <>{props.children}</>;
  }

  let link = `/content/${props.name}`;
  if (props.path) {
    link = `${props.path}-${props.name}`;
  }
  if (props.parentDirectory) {
    link = link.split('-').slice(0, -2).join('-') || '/content/';
  }

  return (
    <Link to={link} style={{ textDecoration: 'none' }} className="text-light">
      {props.children}
    </Link>
  );
};

const Dirent = (props) => {
  if (!props.path && props.parentDirectory) {
    return <></>;
  }

  return (
    <Col lg={3} xl={3} className="mt-2">
      <DirLink {...props}>
        <DirCard {...props} />
      </DirLink>
    </Col>
  );
};

export default Dirent;
