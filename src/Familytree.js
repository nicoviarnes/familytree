import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import clone from 'clone'
 
const myTreeData = [
  {
    name: 'Nancy',
    attributes: {
      add_a_child: 'left click a node to add a child to it',
      remove_a_child: 'double click a node to remove it and all of its children',
      console: 'check the console to see the value of the node being clicked'
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
  height: '95vh',
  float: 'left',
  bottom: '10%'
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
    console.log(a)
    const target = a.children ? a.children : a._children
    console.log(target)
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
                <button
                  type="button"
                  className="btn btn-controls btn-block"
                  onClick={() => this.addChildNode()}
                >
                  Insert Node
                  </button>
                <button
                  type="button"
                  className="btn btn-controls btn-block"
                  onClick={() => this.removeChildNode()}
                >
                  Remove Node
                  </button>
              </div>
        </div>            
    );
  }
}

export default Familytree;
