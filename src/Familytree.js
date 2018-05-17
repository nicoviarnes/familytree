import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import clone from 'clone';
import { Button } from 'reactstrap';
import './tree.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const myTreeData = [
  {
    name: 'Nancy',
    attributes: {
      gender: 'female',
      otherAttr: 'blahblah'
    },
    children: [
      {
        name: 'Alan',
        attributes: {
        },
        children: [

        ],
      },
      {
        name: 'Marty',
        attributes: {
          key: 'value',
          attributes: 'can be any key value pair'
        },
        children: [
          {
            name: 'Mary',
            attributes: {
              arbitrary: 'male',
              arbitrary2: 'blah',
              arbitrary3: 'I can take infinite attributes'
            },
            children: [
              {
                name: 'Bill',
                attributes: {
                },
                children: [
                ],
              },
              {
                name: 'Sara',
                attributes: {
                },
                children: [
                ],
              },
            ],
          },
          {
            name: 'Mitchell',
            attributes: {
            },
            children: [
              {
                name: 'Ryan',
                attributes: {
                },
                children: [
                ],
              },
              {
                name: 'Brian',
                attributes: {
                },
                children: [
                ],
              },            
            ],
          },
          {
            name: 'Maude',
            attributes: {
            },
            children: [
            ],
          },                              
        ],
      },      
    ],
  },
];

const containerStyles = {
  width: '100%',
  height: '75vh',
  float: 'left',
  bottom: '20%'
}

class Familytree extends Component {
  constructor() {
    super();

    this.addedNodesCount = 0;

    this.state = {
      data: myTreeData
    }
  }

  componentWillMount = props => {
    this.clickTimeout = null
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 8
      }
    });
  }

  addChildNode = (a) => {
    const data = clone(this.state.data)
    const target = data[0].children ? data[0].children : data[0]._children
    this.addedNodesCount++;
    target.push({ name: `Inserted Node ${this.addedNodesCount}`, id: `inserted-node-${this.addedNodesCount}` })
    this.setState({
      data
    })
  }

  removeChildNode = () => {
    const data = clone(this.state.data)
    const target = data[0].children ? data[0].children : data[0]._children
    target.pop()
    this.addedNodesCount--;
    this.setState({
      data
    })
  }  

  handleClick = (a) => {
    this.addChildNode(a)
  } 

  render() {
    return (
      <div>
      <div id="treeWrapper" style={containerStyles} ref={tc => (this.treeContainer = tc)}>
        <Tree 
          data={this.state.data}
          translate={this.state.translate}
          orientation={'vertical'} 
          pathFunc={'straight'}
          collapsible={false}
          onClick={this.handleClick.bind(this)}
        />

      </div>
              <div className="prop-container">
                <Button color="primary" onClick={() => this.addChildNode()} size="lg" active>Add Child</Button>
                <Button color="primary" onClick={() => this.removeChildNode()} size="lg" active>Remove Child</Button>
              </div>
        </div>            
    );
  }
}

export default Familytree;
