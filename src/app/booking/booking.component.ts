import { Component , OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {NgFor} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {JsonPipe} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';

import { CommonModule } from '@angular/common';
import { FreeTime } from '../_models/freetime';
import { Service } from '../_models/service';
import { Appointment } from '../_models/appointment';
import { Logic } from '../Logic/Logic';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    NgFor,
    CommonModule,
    MatButtonToggleModule,
    JsonPipe,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
  ],
})
export class BookingComponent implements OnInit {

  freeDates: Array<FreeTime>
  logic:Logic
  selectedDate:FreeTime
  serviceGroups: { category: string; services: Service[] }[] = []
  selectedServices: Array<Service> = []
  selectedServicesByCategory: { [category: string]: Service[] } = {};

  appointment:Appointment
  constructor(logic:Logic) {
    this.logic=logic
    this.freeDates=new Array<FreeTime>()
    this.getFreeDates();
    this.serviceGroups=[]
    this.selectedDate=new FreeTime()
    this.appointment=new Appointment()
  }

  async ngOnInit() {
    this.logic.getUserId().subscribe(
      ownerId => {
        this.appointment.ownerId = ownerId;
      },
      error => {
        console.log(error);
      }
    );

    this.serviceGroups=await this.logic.getServices()
    this.selectedDate=this.freeDates[0]

  }

  async getFreeDates() {
    try {
      this.freeDates = await this.logic.getDates()
    } catch (error) {
      console.error('Hiba történt a FreeDates inicializálásakor:', error);
    }
  }

  getFreeHours(item: FreeTime) {
    this.selectedDate = item;
  }

  setAppointmentTime(date: Date) {
    this.appointment.time = date;

  }

  //Hozzátesi a kiválasztott service-hez ha nincs benne még vagy kiveszi belőle
  onServiceSelectionChange(service: Service) {
    if (this.isServiceSelected(service)) {
      this.selectedServices = this.selectedServices.filter(s => s.id !== service.id);
      this.appointment.cost -= service.cost;
      this.appointment.fullTime -= service.time;
      this.appointment.servicesAsJson = JSON.stringify(this.selectedServices);
  
      // Kategória szerinti eltávolítás
      const categoryServices = this.selectedServicesByCategory[service.category];
      if (categoryServices) {
        this.selectedServicesByCategory[service.category] = categoryServices.filter(s => s.id !== service.id);
      }
    } else {
      this.selectedServices.push(service);
      this.appointment.cost += service.cost;
      this.appointment.fullTime += service.time;
      this.appointment.servicesAsJson = JSON.stringify(this.selectedServices);
  
      // Kategória szerinti tárolás
      if (!this.selectedServicesByCategory[service.category]) {
        this.selectedServicesByCategory[service.category] = [];
      }
      this.selectedServicesByCategory[service.category].push(service);
    }
  }
  
  
  isServiceSelected(service: Service) {
    return this.selectedServices.some(s => s.id === service.id);
  }
  sendAppointment(){
    this.logic.addAppointment(this.appointment)
  }

  formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24 órás formátum
    };
    
    return date.toLocaleString('hu-HU', options);
  }
  

  formatHours(date: Date): string {
    let hours = date.getHours().toLocaleString('hu-HU', { minimumIntegerDigits: 2 });
    let minutes = date.getMinutes().toLocaleString('hu-HU', { minimumIntegerDigits: 2 });
    return `${hours}:${minutes}`;
  }
  hasService():boolean{
    return this.selectedServices.length > 0;
  }

  getSelectedServicesDescription(category: string): string {
    const selectedServiceNames = this.selectedServicesByCategory[category]?.map(service => service.name);
    return selectedServiceNames ? selectedServiceNames.join(', ') : '';
  }

}
