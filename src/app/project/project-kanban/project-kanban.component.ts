import { Component, OnInit } from '@angular/core';
import { DropEvent } from 'ng2-drag-drop';
import { ActivatedRoute } from '@angular/router';
import { FeathersService } from '../../feathers/feathers.service';
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-kanban',
  templateUrl: './project-kanban.component.html',
  styleUrls: ['./project-kanban.component.css']
})
export class ProjectKanbanComponent implements OnInit {

    private statuses = [];
    private tasks = []
    private projectId;
    private subProjectId;
    private selectedTask = {};
    private editTask = {};

    private _opened: boolean = false;

    constructor(
      private feathers: FeathersService,
      private route: ActivatedRoute,
      private toastr: ToastrService,
      private modalService: NgbModal
    ) { }

    ngOnInit() {
      this.subProjectId = this.route.params.subscribe(params => this.projectId = params['projectId']);

      this.feathers.service('kanban-status').find({query:{
        kanban: this.projectId,
        $sort: { sort: 1, createdAt: 1 }
      }})
      .then(res=>this.statuses = res.data)
      .then(res=>res.map((item) => item._id))
      .then(res=>this.feathers.service('kanban-task').find({
        query:{
          'kanban-status': res,
          $sort: { priority: -1, createdAt: 1 },
        }
      }))
      .then(res=>this.tasks = res.data)

      this.feathers.service('kanban-task').on('patched', patchedItem => {
        this.tasks[this.tasks.findIndex(item => item._id === patchedItem._id)] = patchedItem;
        this.toastr.success(`Patched ${patchedItem.title}`, 'Tasks Updated')
      });

      this.feathers.service('kanban-task').on('created', createdItem => {
        this.tasks.push(createdItem);
        this.toastr.success(`Created ${createdItem.title}`, 'Tasks Updated')
      })

    }

    onDrop(e: DropEvent, statusId: string) {
      if (e.dragData['kanban-status'] === statusId) return;
      let tasksIndex = this.tasks.map((e)=>e._id).indexOf(e.dragData._id);
      e.dragData['kanban-status'] = statusId;
      this.feathers.service('kanban-task').patch(e.dragData._id, e.dragData)
      .then(()=>this.statuses.map((item) => item._id))
      .then(res=>this.feathers.service('kanban-task').find({query:{ 'kanban-status': res }}))
      .then(res=>this.tasks = res.data)
      .catch(res=>this.toastr.error(``, 'Es ist uns ein Fehler unterlaufen'))
    }

    onDeleteDrop(e: any) {
      let tasksIndex = this.tasks.map((e)=>e._id).indexOf(e.dragData._id);
      this.feathers.service('kanban-task').remove(e.dragData._id)
      .then(()=>this.statuses.map((item) => item._id))
      .then(res=>this.feathers.service('kanban-task').find({query:{ 'kanban-status': res }}))
      .then(res=>this.tasks = res.data)
      .then(res=>this.toastr.success(``, 'Erfolgreich gelöscht'))
      .catch(res=>this.toastr.error(``, 'Es ist uns ein Fehler unterlaufen'))
    }

    removeItem(item: any, list: Array<any>) {
      let index = list.map(function (e) {
        return e.name
      }).indexOf(item.name);
      list.splice(index, 1);
    }

    onTaskClick(task: any) {
      console.log("CLICKED",task)
    }

    addNewTask(content, statusId: String) {
      this._opened = false;
      this.selectedTask = {};
      this.selectedTask['kanban-status'] = statusId;
      this.selectedTask['new'] = true;
      this.modalService.open(content).result.then(() => {
        delete this.selectedTask['new'];
        console.log("Final",this.selectedTask)
        this.feathers.service('kanban-task').create(this.selectedTask)
        .then(res => console.log(res))
        .catch(err => console.error(err))
      },() => { this.selectedTask = {} })
    }

    editSelectedTask(content) {
      this.selectedTask['new'] = false;
      this.modalService.open(content).result.then(() => {
        delete this.selectedTask['new'];
        console.log("Final",this.selectedTask)
        this.feathers.service('kanban-task').patch(this.selectedTask['_id'], this.selectedTask)
        .then(res => console.log(res))
        .catch(err => console.error(err))
      },() => {})
    }

    selectTask(task) {
      this._opened = true;
      this.selectedTask = task
    }

}
