import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit, AfterViewInit {


  roles: any[];
  userList: any[];
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'mobileNo', 'email', 'roles'];
  dataSource: MatTableDataSource <User[]> ;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  userForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    mobileNo: [null, Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
    username: [null, Validators.required],
    password: [null, Validators.required],
    roleIds: [null, Validators.required]
  });
  constructor(private fb: FormBuilder, private userService: UserService) { }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.getAllRoles();
    this.getAllUsers();
  }



  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
  }

  onSubmit(): void{
    this.userService.saveUser(this.userForm.value).subscribe(userDto => {
      this.userList.push(userDto);
      this.userForm.reset();
      this.userForm.clearValidators();
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.log('Error While saving user!');
    });
  }

  getAllRoles(): void{
    this.userService.getAllRoles().subscribe(rolesData => {
      this.roles = rolesData;
    }, error => {
      console.log('Error while getting roles');
    });
  }

  getAllUsers(): void{
    this.userService.getAllUsers().subscribe(usersList => {
      this.userList = usersList;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.log('Error while getting users');
    });
  }

}

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  email: string;
  roles: string[];
}
