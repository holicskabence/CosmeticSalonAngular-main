import { Component } from '@angular/core';
import { Logic } from '../Logic/Logic';
import { Appointment } from '../_models/appointment';
import { Service } from '../_models/service';
import { MatDialog } from '@angular/material/dialog';
import { deleteDialogComponent } from './deleteDialog';


@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.scss']
})
export class ListAppointmentsComponent {
  logic: Logic
  appointments: Array<Appointment>
  selectedAppointment: Appointment
  selectedServices: Array<Service>
  sumAppointment: number


  constructor(logic: Logic,public dialog:MatDialog) {
    this.logic = logic
    this.appointments = new Array<Appointment>()
    this.selectedAppointment = new Appointment()
    this.selectedServices = new Array<Service>()
    this.sumAppointment = 0

  }

  openDialog(){
    const dialogRef = this.dialog.open(deleteDialogComponent, {
      width: '400px',
      data:{ title:'Időpont törlés',content:'Biztosan törölni szeretnéd az időpontod?'}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteAppointment()
      }
    })
  }

  async ngOnInit() {
    try {
      const appointments = await this.logic.getAppointments()
      this.appointments = appointments
      this.getAppointment(appointments[0])
      this.sumAppointment = appointments.length
    } catch (error) {
      console.log(error);
    }
  }

  getAppointment(appointment: Appointment) {
    this.selectedAppointment = appointment
    this.selectedServices = JSON.parse(appointment.servicesAsJson)
  }

  getServices(appointment: Appointment) {
    let services = JSON.parse(appointment.servicesAsJson)
    let result = ""

    services.map((t: Service, index: number) => {
      result += t.name;
      if (index !== services.length - 1) {
        result += "; ";
      }
    });

    return result
  }

  formatDate(date: any) {
    return date.replace('T', ' ').slice(0, -3)

  }

  isAvailable(): boolean {
    let dateNow= new Date()
    let appointmentTime=new Date(this.selectedAppointment.time)
    if(dateNow<appointmentTime){
      return true
    }
    else{
      return false
    }

    
  }
  deleteAppointment(){
    this.logic.deleteAppointment(this.selectedAppointment.id)
    this.appointments = this.appointments.filter(t => t.id !== this.selectedAppointment.id);
    this.selectedAppointment=this.appointments[0]
  }

  getBadgeContent(appointment: any) {
    if (!(appointment.id === this.selectedAppointment.id)) {
      return null;
    } else {
      return '✓';
    }
  }
}
