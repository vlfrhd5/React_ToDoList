import React from "react";
import "./App.css";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import InputForm from "./components/inputform";
import moment from "moment";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.localStorage = window.localStorage;
    const getItem = localStorage.getItem("todolist_state");
    if (getItem) {
      this.state = JSON.parse(getItem);
    } else {
      this.state = {
        todoList: [],
      };
    }
  }

  // saveTodoList() {
  //   const nowList = this.state.todoList;
  //   const {
  //     title, content, startDate, startTime, endDate, endTime,
  //   } = this.state;
  //   nowList.push({
  //     title, content, startDate, startTime, endDate, endTime,
  //   });

  //   this.setState(
  //     {
  //       todoList: nowList,
  //     });
  // }

  addTodoList(data) {
    const nowList = this.state.todoList;
    nowList.push(data);
    this.setState(
      {
        todoList: nowList,
      },
      () => {
        const stringState = JSON.stringify(this.state);
        localStorage.setItem("todolist_state", stringState);
      }
    );
  }

  render() {
    const { todoList } = this.state;
    return (
      <div className="App">
        <div className="header">TODO LIST</div>
        <InputForm addTodoList={this.addTodoList.bind(this)} />
        <div className="list_area">
          <List>
            {todoList.map((todoItem, idx) => {
              let { title, startDate, startTime, endDate, endTime } = todoItem;

              if (typeof startDate === "string") {
                startDate = moment(startDate);
                startTime = moment(startTime);
                endDate = moment(endDate);
                endTime = moment(endTime);
              }

              const checkToday = moment().isBetween(startDate, endDate);
              const checkF = moment().diff(startDate) < 0;
              const checkB = moment().diff(endDate) > 0;

              let fontColor = "black";
              if (checkToday) fontColor = "blue";
              if (checkF) fontColor = "grey";
              if (checkB) fontColor = "red";

              // const checkF = (moment().diff(startDate) < 0);
              // console.log(checkF, "true면 미래 아이템")

              // const checkB = (moment().diff(endDate) > 0);
              // console.log(checkB, "true면 과거 아이템")

              return (
                <ListItem key={idx} role={undefined} dense button>
                  <ListItemText
                    primary={title}
                    style={{ color: fontColor }}
                    secondary={
                      moment(startDate).format("yyyy-MM-DD") +
                      " " +
                      moment(startTime).format("HH:DD") +
                      " ~ " +
                      moment(endDate).format("yyyy-MM-DD") +
                      " " +
                      moment(endTime).format("HH:DD")
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright ⓒ 전필원 Jeon Pilwon " + new Date().getFullYear() + "."}
        </Typography>
      </div>
    );
  }
}

export default App;
