import { makeAutoObservable } from "mobx";
import { sendPostRequest } from "../axios/hooks";

class Task {
    task = {project_id: 0, description:'', period:'', start_date:''};
    isCreatingTask = false

  constructor() {
    makeAutoObservable(this);
  }

  saveData(project_id, description, period, start_date) {
    this.task.project_id = project_id;
    this.task.description = description;
    this.task.period = period;
    this.task.start_date = start_date;

    this.isCreatingTask = true;
  }

  isCreatingStart() {
    return this.isCreatingTask
  } 

  async saveOnServer(teamId){
    this.isCreatingTask = false;
    await sendPostRequest(`app/project/task/${this.task.project_id}`, {
      teamId,
      description: this.task.description,
      state:'in_progress',
      period: this.task.period,
      start_date: this.task.start_date,
    });
  }
}

export default new Task();
