import React from 'react';
import ReactDOM from 'react-dom';
var MentoringContainer = require('./MentoringContainer.js')
var getRequestToArr = require('../../utilities/getRequestToArr.js')

class MentoringJumbo extends React.Component {
  constructor(props){
  	super(props)
  	this.state = {activeMentoring: '',activeGoals:[]}
  	this.getMentee = this.getMentee.bind(this)
  	this.setActiveMentee = this.setActiveMentee.bind(this)
  	this.getGoals = this.getGoals.bind(this)
  	this.setGoalsState = this.setGoalsState.bind(this)
  	this.getRequestToArr = getRequestToArr.bind(this)
  	this.mergeGoalsToComments = this.mergeGoalsToComments.bind(this)
  	this.updateGoalComments = this.updateGoalComments.bind(this)
    this.appendGoal = this.appendGoal.bind(this)
  }
  render(){
      //let name = this.props.user.title;
    
    return( <div id="" className="jumbotron">
              <h1 className="jumbo-head-reset"><img height="100" src="./public/img/MentoringGraph.png"/> {<span onClick={this.getMentee('')}>Mentoring</span>}{(this.state.activeMentoring.hasOwnProperty('title') ? ': ' + this.state.activeMentoring.title : '' )}</h1>
              {(this.props.viewer.courseStr.substring(0,1) != 's' && this.state.activeMentoring == '') ? (<ul className="nav nav-pills">
            {this.props.mentees.map((mentee,id)=> (<li className={(this.state.activeMentoring.entryID == mentee.entryID) ? 'active' : ''} key={"mentoringnav" + mentee.entryID} onClick={this.getMentee(mentee)}><a href="#" onClick={function(event){event.preventDefault();}}>{mentee.title + ' ' + mentee.lastName}</a></li>))}
        </ul>) : null}
        {(this.state.activeMentoring != '') ? (<MentoringContainer appendGoal={this.appendGoal} goals={this.state.activeGoals} mentee={this.state.activeMentoring} updateGoalComments={this.updateGoalComments} viewer={this.props.viewer}/>) : null}
	    </div> );
  }

  componentDidMount(){
    if(this.props.viewer.courseStr.substring(0,1) == 's'){
    this.getMentee(this.props.viewer)()
  } else { console.log('done')}
  }

  getMentee(mentee){
  	var setActiveMentee = this.setActiveMentee
  	var getGoals = this.getGoals
  	var setGoalsState = this.setGoalsState
  	return ()=>{
  		console.log(mentee)
  		setActiveMentee(mentee)
  		//{!!mentee.entryID ? getGoals(mentee.entryID)() : setGoalsState([[],[]])}
  		{!!mentee.entryID ? getGoals(mentee.entryID)() : setGoalsState([])}
  	}
  }

  setActiveMentee(mentee){
  	this.setState({activeMentoring: mentee})
  }
  setGoalsState(goalsArr){
  	//this.setState({activeGoals:goalsArr[0]})
  	console.log(goalsArr)
  	this.setState({activeGoals:goalsArr})
  }
  getGoals(menteeUDID){
  	var getRequestToArr = this.getRequestToArr
  	var setGoalsState = this.setGoalsState
  	var mergeGoalsToComments = this.mergeGoalsToComments
	//return () => {getRequestToArr('/goalsplusc/' + menteeUDID,setGoalsState)}
	return () => {getRequestToArr('/goalsplusc/' + menteeUDID,mergeGoalsToComments)}
  }

  mergeGoalsToComments(goalArr){
    var mergedObj = {}
    goalArr[0].forEach((item)=>{
      mergedObj[item.entryID] = item
      mergedObj[item.entryID].comments = []}
      )
    goalArr[1].forEach((comment)=>{mergedObj[comment.goalID].comments.push(comment)})
    var mergedArr = Object.keys(mergedObj).map((item)=>mergedObj[item])
    //console.log(mergedArr)
    this.setGoalsState.bind(this)(mergedArr)
  }

  updateGoalComments(goalArrID,comment){
  	var goalState = this.state.activeGoals.slice()
  	goalState[goalArrID].comments.push(comment)
  	this.setGoalsState.bind(this)(goalState)
  }

  appendGoal(goal){
    var goalState = this.state.activeGoals.slice()
    var goalPlusC = Object.assign({comments:[]},goal)
    goalState.push(goalPlusC)
    this.setGoalsState.bind(this)(goalState)
  }
}

module.exports = MentoringJumbo;