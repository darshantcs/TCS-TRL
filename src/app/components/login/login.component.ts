import { Clinician } from "src/app/interfaces/clinician";
import { Patient } from "src/app/interfaces/patient";
import { MainService } from "src/app/services/main.service";
import { User } from "src/app/interfaces/user";

import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { forkJoin , zip } from "rxjs";
import { faUnlockAlt, faEye, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  patients: Patient[];
  users: User[];
  faUser = faUserCircle;
  faUnlock =faUnlockAlt;
  faEye =faEye;
  constructor(private router: Router, private mainService: MainService) {}

  ngOnInit(): void {

    this.mainService.getAllClinicians().subscribe(data =>{
      data.map(data=>{
        console.log(data.payload.doc.data())
      });
    })
  }

  submitCredentials() {
    
    //this.mainService.getPatients().subscribe(patientsData =>{
      /*let patients = patientsData.map((data) => {
        return {
          id: data.payload.doc.id,
          ...(data.payload.doc.data() as Patient),
        } as Patient;
      });*/
      this.mainService.getAllUsers().subscribe(usersData =>{
        let users = usersData.map((data) => {
          return {
            id: data.payload.doc.id,
            ...(data.payload.doc.data() as User),
          } as User;
        }).filter((item: User) => item.userType === 'User');

        let reviewers = usersData.map((data) => {
          return {
            id: data.payload.doc.id,
            ...(data.payload.doc.data() as User),
          } as User;
        }).filter((item: User) => item.userType === 'Reviewer');

        this.mainService.storeAllUsers(users);
        this.mainService.storeAllReviewers(reviewers);
        let person;
        let allUsers = [...users, ...reviewers];
  
        person = allUsers.find((existingUser) => {
          return ((existingUser.emailId === this.userName && existingUser.password === this.password) ||
                  (existingUser.mobileNumber === this.userName && existingUser.password === this.password));
        });        
        
        if (person) {
          this.mainService.setLoggedInUser(person);
        } else {
          return;
        }
        this.routeToHome(person);        
      })
    //})

    // zip([
    //   this.mainService.getAllClinicians(),
    //   this.mainService.getPatients()]
    //   ).subscribe((data) => {
    //   let patients = data[0].map((data) => {
    //     return {
    //       id: data.payload.doc.id,
    //       ...(data.payload.doc.data() as Patient),
    //     } as Patient;
    //   });

    //   let clinicians = data[1].map((data) => {
    //     return {
    //       id: data.payload.doc.id,
    //       ...(data.payload.doc.data() as Clinician),
    //     } as Clinician;
    //   });

    //   let person;
    //   let users = [...patients, ...clinicians];

    //   person = users.find((existingUser) => {
    //     (existingUser.emailId === this.userName ||
    //       existingUser.mobileNumber === this.userName) &&
    //       existingUser.password === this.password;
    //   });

    //   if (person) {
    //     this.mainService.setLoggedInPatient(person);
    //   } else {
    //     return;
    //   }
    //   this.routeToHome(person);
    // },
    // (error)=>{console.log(error)},
    // ()=>{console.log("completed !")}
    
    // );
  }

  routeToHome(person) {
    if (person.userType === "User") {
      this.router.navigate(["/user-home"]);
      return;
    }
    if (person.userType === "Reviewer") {
      this.router.navigate(["/reviewer-home"]);
      return;
    }
  }

  // checkIfPatient(): Patient {
  //   this.mainService.getPatients().subscribe((data) => {
  //     this.patients = data.map((e) => {
  //       return {
  //         id: e.payload.doc.id,
  //         ...(e.payload.doc.data() as Patient),
  //       } as Patient;
  //     });
  //     console.log("Login patients : ", this.patients);
  //     let loggedInPatient: Patient = this.patients.find(
  //       (patient) =>
  //         (patient.emailId == this.userName ||
  //           patient.mobileNumber == this.userName) &&
  //         patient.password == this.password
  //     );
  //     this.mainService.setLoggedInPatient(loggedInPatient);
  //     return loggedInPatient;
  //   });
  // }

  routeToRegistration() {
    this.router.navigate(["/user-registration"]);
  }
}
