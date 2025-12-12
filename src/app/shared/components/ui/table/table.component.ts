import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {}

@Component({
  selector: 'table-header',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>'
})
export class TableHeaderComponent {}

@Component({
  selector: 'table-body',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>'
})
export class TableBodyComponent {}

@Component({
  selector: 'table-row',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>'
})
export class TableRowComponent {}

@Component({
  selector: 'table-head',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>'
})
export class TableHeadComponent {}

@Component({
  selector: 'table-cell',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>'
})
export class TableCellComponent {}

