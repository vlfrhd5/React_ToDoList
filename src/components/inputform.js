import React from 'react';
import { TextField, Paper } from '@material-ui/core'
import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
// import Alert from '@material-ui/lab/Alert';
// import Snackbar from '@material-ui/core/Snackbar';
import CAlert from './modal/customAlert';

class InputForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          title: "",
          content: "",
          startDate: null,
          startTime: null,
          endDate: null,
          endTime: null,
          modalOpen: false
        }
        this.titleChange = this.titleChange.bind(this);
        this.contentChange = this.contentChange.bind(this);
      }

    checkValidate(){
      const {
        title, content, startDate,
        startTime, endDate, endTime
      } = this.state;
    //   if(!title || !content || !startDate || !startTime || !endDate || !endTime){
    //     return false;
    //     }
    //     return true;
    //  }
    
      const data = {
       title, content, startDate, startTime, endDate, endTime
      };

      for (const [key, value] of Object.entries(data)) {
        console.log(key, value)
        if(!value) return {check: false, target: key}
      }
       return{ check: true } 
    }
      
    addInputdata(){
      const data = this.state;
        const check_result = this.checkValidate();
        if(check_result.check){
      this.props.addTodoList(data);
      this.setState({
        title:"",
        content:"",
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
      });
      } else {
        this.setState({
          modalOpen: true,
          message: check_result.check + "값을 체크해주세요."
        })
      }
    }

    modalClose(){
      this.setState({
        modalOpen: false
      })
    }
    
  titleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  }
  contentChange = (e) => {
    this.setState({
      content: e.target.value
    });
  }
  StartDateChange = (KeyboardDatePicker) => {
    this.setState({
      startDate: KeyboardDatePicker._d
    });
  }
  StartTimeChange = (KeyboardTimePicker) => {
    this.setState({
      startTime: KeyboardTimePicker._d
    });
  }

  EndDateChange = (KeyboardDatePicker) => {
    this.setState({
      endDate: KeyboardDatePicker._d
    });
  }

  EndTimeChange = (KeyboardTimePicker) => {
    this.setState({
      endTime: KeyboardTimePicker._d
  });
}

      render() {
        const {
          modalOpen
        } = this.state;

        console.log("제목: " + this.state.title);
        console.log("상세내용: " + this.state.content);
        console.log("시작예정일: " + this.state.startDate);
        console.log("시작시간: " + this.state.startTime);
        console.log("종료예정일: " + this.state.endDate);
        console.log("종료시간: " + this.state.endTime);

        return (
          <Paper className="input_area" variant="outlined" style={{ padding: '10px' }}>
          <TextField label="제목" placeholder="제목을 입력하세요." value={this.state.title} size="small"  margin="normal" onChange={this.titleChange} fullWidth required/>
          <TextField label="상세내용" size="small"value={this.state.content} margin="normal"  onChange={this.contentChange} fullWidth multiline/>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            margin="normal"
            format="yyyy/MM/DD"
            label="시작예정일"
            value={this.state.startDate}
            onChange={this.StartDateChange}
            style={{width:'50%'}}
            KeyboardButtonProps={{
              'aria-label':'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            label="시작시간"
            variant="inline"
            value={this.state.startTime}
            onChange={this.StartTimeChange}
            style={{width:'50%'}}
            KeyboardButtonProps={{
              'aria-label':'change time',
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            margin="normal"
            format="yyyy/MM/DD"
            label="종료예정일"
            value={this.state.endDate}
            onChange={this.EndDateChange}
            style={{width:'50%'}}
            KeyboardButtonProps={{
              'aria-label':'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            label="종료시간"
            variant="inline"
            size="medium"
            value={this.state.endTime}
            onChange={this.EndTimeChange}
            style={{width:'50%'}}
            KeyboardButtonProps={{
              'aria-label':'change time',
            }}
          />

          <Button
              variant="contained"
              color="default"
              size="large"
              startIcon={<SaveIcon />}
              style={{float:'right'}}
              //onClick={() => this.props.addTodoList(this.state)}
              onClick={this.addInputdata.bind(this)}
          >
              SAVE
          </Button>

          <CAlert modalClose={this.modalClose.bind(this)}
            modalOpen={modalOpen}
            message={"에러입니다."}
          />

        </Paper>
        )
      }
}

export default InputForm;