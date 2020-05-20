import React from 'react';
import './App.css';
import {TextField,Typography} from '@material-ui/core';
import {KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title:"",
      content:"",
      startDate:null,
      startTime:null,
      endDate:null,
      endTime:null,
    }
  }
  titleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  contentChange = (e) => {
    this.setState({
      content: e.target.value
    })
  }
  StartDateChange = (KeyboardDatePicker) => {
    this.setState({
      startDate:KeyboardDatePicker._d 
    })
  }
  StartTimeChange = (KeyboardTimePicker) => {
    this.setState({
      startTime: KeyboardTimePicker._d
    })
  }

  EndDateChange = (KeyboardDatePicker) => {
    this.setState({
      EndDate: KeyboardDatePicker._d
    })
  }

  EndTimeChange = (KeyboardTimePicker) => {
    this.setState({
      EndTime: KeyboardTimePicker._d
    })
  }
  
  render(){
    console.log("시작예정일: " + this.state.startDate);
    console.log("시작시간: " + this.state.startTime);
    console.log("종료예정일: " + this.state.EndDate);
    console.log("종료시간: " + this.state.EndTime);
  return (
    <div className="App">
      <div className="header">To Do List</div>
      <div className="input_area">
        <TextField label="제목" placeholder="제목을 입력하세요." value={this.state.title} size="normal"  margin="normal" onChange={this.titleChange} fullWidth required/>
        <TextField label="상세내용" size="normal"value={this.state.content} margin="normal"  onChange={this.contentChange} fullWidth multiline/>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          margin="nomarl"
          format="yyyy/MM/DD"
          label="시작예정일"
          onChange={this.StartDateChange}
          style={{width:'50%'}}
          KeyboardButtonProps={{
            'aria-label':'change date',
          }}
        />
        <KeyboardTimePicker
          margin="nomarl"
          label="시작시간"
          variant="inline"
          onChange={this.StartTimeChange}
          style={{width:'50%'}}
          KeyboardButtonProps={{
            'aria-label':'change time',
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          margin="nomarl"
          format="yyyy/MM/DD"
          label="종료예정일"
          onChange={this.EndDateChange}
          style={{width:'50%'}}
          KeyboardButtonProps={{
            'aria-label':'change date',
          }}
        />
        <KeyboardTimePicker
          margin="nomarl"
          label="종료시간"
          variant="inline"
          onChange={this.EndTimeChange}
          style={{width:'50%'}}
          KeyboardButtonProps={{
            'aria-label':'change time',
          }}
          
        />
      </div>

      <div className="list_area">리스트 영역</div>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright ⓒ 전필원.'+new Date().getFullYear()+'.'}
      </Typography>
    </div>
  );
}
}
export default App;