import React from 'react';
import ReactDOM from 'react-dom';
var MasteryPanel = require('./MasteryPanel.js')
var MasteryStuRow = require('./MasteryStuRow.js')
var MasteryStuPanel = require('./MasteryStuPanel.js')
var MasteryTD = require('./MasteryTD.js')
var MasteryStuTR = require('./MasteryStuTR.js')
var MasteryStuTD = require('./MasteryStuTD.js')
var parseMastery = require('./utilities/parseMastery.js')

class GradeJumbo extends React.Component {
  constructor(props){
    super(props);
    this.state = {parsedMastery: parseMastery(this.props.mArr),
      page:0
    }
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    
  }
  
  
  render(){
      let list = this._getMastery(this.state.parsedMastery);
    
    return( <div className="jumbotron">
      {list.pagination}
      <table id="" className="table table-bordered">
              <tbody>
              {list.header}
              {list.body}
              </tbody>
	    </table>
	    </div> );
  }
  
  prevPage(){
    this.setState({page:this.state.page - 1})
  }
  nextPage(){
    this.setState({page:this.state.page + 1})
  }
  
  getStudentRows(rowsByStu){
    
  }
  
  
  _getMastery(mObj){
    var sMasteryArr = mObj.sMasteryArr, 
    masteryArr = mObj.masteryArr, 
    courseStrArr = mObj.courseStrArr, 
    rowsByStu = mObj.rowsByStu,
    LOs = mObj.LOs

    var studentRows = Object.keys(rowsByStu).map((key1,id1) => (<MasteryStuTR key={key1} stuData={rowsByStu[key1]} colOffset={id1} >
      {Object.keys(rowsByStu[key1]).slice(5*this.state.page,5*this.state.page+5).map((key2,id2) => {
            return (<MasteryStuTD key={key2 + '-' + key1} ratingData={(!!rowsByStu[key1][key2]) ? rowsByStu[key1][key2] : {mcountN:0, mcountA:0, mcountM:0, mcountE:0, mRating0:1}} colOffset={id2}/>)
      }
          )}
          </MasteryStuTR>))
    var headerRow = (<MasteryStuTR key={3813} stuData={{}} colOffset={0} >
        {masteryArr.slice(5*this.state.page,5*this.state.page+5).map((mRecord,id) => 
        (<MasteryTD key={mRecord.courseStrLOID} mRecord={mRecord} colOffset={id} />))
        }
      </MasteryStuTR>)
    var pagination = (<ul className="pager">
        <li className={"previous" + ((this.state.page == 0) ? " disabled" : "") } onClick={this.prevPage}><a href="#">Previous</a></li>
        <li className="next" onClick={this.nextPage}><a href="#">Next</a></li>
      </ul>)
    return {header: headerRow, body: studentRows, pagination: pagination};
  }

}

module.exports = GradeJumbo;
