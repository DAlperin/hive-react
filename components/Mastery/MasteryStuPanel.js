import React from 'react'

class MasteryStuPanel extends React.Component {
    render(){
        return <ul className="list-group">
                {/* <div id={"mastery-col-" + this.props.ratingData.courseStrLOIDsID } className="mastery-column" style={{left: (40 + this.props.colOffset*140) + 'px'}}>
                  <div className="panel panel-default">
                    <div id="" className="panel-body">
                      <span className="lo-text-span">{this.props.ratingData.mRating0}</span>
                      <br />
                      <span id="" className="badge badgeNY">{this.props.ratingData.mcountN}</span>
                      <span id="" className="badge badgeA">{this.props.ratingData.mcountA}</span>
                      <span id="" className="badge badgeM">{this.props.ratingData.mcountM}</span>
                      <span id="" className="badge badgeE">{this.props.ratingData.mcountE}</span>
                    </div>
                  </div> */}
                  {console.log(this.props.parsedMastery.rowsByStu[this.props.viewer.entryID])}
                {//Object.keys(this.props.parsedMastery.rowsByStu[this.props.viewer.entryID]).map(function(key,id,arr){
                  this.props.mArrS[1].map(function(LO,id,arr){
                    var key = this.props.mArrS[2] + '-' + LO.LOID
                  if(!!this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key]){
                  var mRating = this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key].mRating0
                  var aRsN = this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key].mcountN
                  var aRsA = this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key].mcountA
                  var aRsM = this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key].mcountM
                  var aRsE = this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key].mcountE
                  if(mRating == 0 && (aRsA + aRsM + aRsE > 0)) {mRating = 2}
                    else if (mRating == 0 && (aRsN > 0)){ mRating = 1}
                      else {mRating = mRating}
                  var assessN = this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key].assessN
                  var assessA = this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key].assessA
                  var assessM = this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key].assessM
                  var assessE = this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key].assessE
                  var nArr = (assessN != null) ? assessN.split(' mn ') : ['No \'Not Yet\'-level assessments.']
                  var aArr = (assessA != null) ? assessA.split(' mn ') : ['No \'Approaching\'-level assessments.']
                  var mArr = (assessM != null) ? assessM.split(' mn ') : ['No \'Meeting\'-level assessments.']
                  var eArr = (assessE != null) ? assessE.split(' mn ') : ['No \'Exceeding\'-level assessments.']
                  var LO = this.props.parsedMastery.masteryArrS[key]
                  var mRatings = ["Unassessed","Not Yet","Approaching","Meeting","Exceeding"]
                  var masteryString = mRatings[mRating]
                  return (<li className={"list-group-item light-mback" + mRating} key={key}>
                    <div className="row">
                      <div
                        className={"col-xs-9 mar-bot-0 light-mback" + mRating}>
                        <div className="panel panel-default">
                          <div className="panel-body">
                            {LO.LOCode + ': ' + LO.LOText}
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-xs-3">
                        <div
                          className={"panel mar-bot-0 stu-rating-badge mback" + mRating}>
                          <div
                            className="panel-body">
                            {masteryString}
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-xs-12">
                        <ul
                          className="col-xs-3 light-mback1">
                          {nArr.map((item,id)=>(<li className="list-group-item" key={LO.LOID + '-' + 'n' + '-' + id}>{item}</li>))}
                        </ul>
                        <ul
                          className="col-xs-3 light-mback2">
                          {aArr.map((item,id)=>(<li className="list-group-item" key={LO.LOID + '-' + 'a' + '-' + id}>{item}</li>))}
                        </ul>
                        <ul
                          className="col-xs-3 light-mback3">
                          {mArr.map((item,id)=>(<li className="list-group-item" key={LO.LOID + '-' + 'm' + '-' + id}>{item}</li>))}
                        </ul>
                        <ul
                          className="col-xs-3 light-mback4">
                          {eArr.map((item,id)=>(<li className="list-group-item" key={LO.LOID + '-' + 'e' + '-' + id}>{item}</li>))}
                        </ul>
                      </div>
                    </div>
                    </li>)} else {
                      var mRating = 0
                      return (<li className={"list-group-item light-mback" + mRating} key={key}>
                      <div className="row">
                        <div
                          className={"col-xs-9 mar-bot-0 light-mback" + mRating}>
                          <div className="panel panel-default">
                            <div className="panel-body">
                              {LO.LOCode + ': ' + LO.LOText}
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-xs-3">
                          <div
                            className={"panel mar-bot-0 stu-rating-badge mback" + mRating}>
                            <div
                              className="panel-body">
                              No Assessments Yet.
                            </div>
                          </div>
                        </div>
                      </div>
                      </li>)
                  }
                }.bind(this))}
               </ul>
    }
}

module.exports = MasteryStuPanel