import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.services';
import { Department } from 'src/app/product/models/department';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})

export class ListComponent implements OnInit {

  departments: Department[] = [];
  errorMessage: string = '';

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getAll().subscribe({
      next: (departments: Department[]) => {
        this.departments = departments;
      },
      error: (error: any) => this.errorMessage = 'Falha ao carregar departamentos'
    });
  }
}
