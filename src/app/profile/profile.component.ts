import { Component, OnInit } from '@angular/core';
import { Logic } from '../Logic/Logic';
import { UserInfo } from '../_models/userinfo';
import { MatDialog } from '@angular/material/dialog';
import { deleteDialogComponent } from '../list-appointments/deleteDialog';
import { Router } from '@angular/router';
import { EditUserDialogComponent } from './editUserDialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  logic:Logic
  user:UserInfo
  isShown: boolean = false

  constructor(logic:Logic,public dialog:MatDialog, private router: Router) {
    this.logic=logic
    this.user=new UserInfo()
  }

  openDeleteDialog(){
    const dialogRef = this.dialog.open(deleteDialogComponent, {
      width: '400px',
      data:{ title:'Felhasználó törlés',content:'Biztosan törölni szeretnéd a fiókod?'}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.logic.deleteUser()
        this.router.navigateByUrl('/logout')
      }
    })
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '500px',
      data: {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        mobil: this.user.mobil,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.user.firstName=result.firstName
        this.user.lastName=result.lastName
        this.user.mobil=result.mobil
        //Logicban meghívni az editUser metódust
        console.log(this.user);
        
        this.logic.editUser(this.user)
      }
    })
  }

  ngOnInit(){
    this.logic.getUserInfo().subscribe(
      (userInfo: UserInfo) => {
        this.user = userInfo;
        console.log(this.user);
        this.isShown = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
