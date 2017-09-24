import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { ProjectLayoutComponent } from './project-layout/project-layout.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectKanbanComponent } from './project-kanban/project-kanban.component';
import { ProjectStatsComponent } from './project-stats/project-stats.component';

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  {
    path: ':projectId',
    component: ProjectLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: ProjectDashboardComponent },
      { path: 'kanban', component: ProjectKanbanComponent },
      { path: 'kanban/:taskId', component: ProjectKanbanComponent },
      { path: 'stats', component: ProjectStatsComponent },
    ]
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProjectLayoutComponent, ProjectDashboardComponent, ProjectListComponent, ProjectKanbanComponent, ProjectStatsComponent]
})
export class ProjectModule { }
