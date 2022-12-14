import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { MainService } from "src/app/services/main.service";
import { Patient } from "src/app/interfaces/patient";

@Component({
  selector: "app-patient-registration",
  templateUrl: "./patient-registration.component.html",
  styleUrls: ["./patient-registration.component.css"],
})
export class PatientRegistrationComponent implements OnInit {
  options = "As patient";

  patients: Patient[];
  insertForm: FormGroup;
  showModal: boolean = false;
  nextClicked = false;
  consent: boolean = false;
  states: any = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  relationA: any = [
    "Spouse",
    "Partner",
    "Sibling",
    "Friend",
    "Parent",
    "Guardian",
    "Child",
  ];
  constructor(
    private mainService: MainService,
    private formBuilder: FormBuilder,
    public firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.insertForm = this.formBuilder.group({
      projectName: ["", Validators.required],
      projectReferenceNumber: ["", Validators.required],
      //sex: ['', Validators.required],
      //organizationName: ["", Validators.required],
      //state: ['', Validators.required],
      fundingAuthority: ["", Validators.required],
      fundingAmount: "",
      projectDomain: "",
      projectCriticality: "",
      projectStartDate: "",
      projectEndDate: "",
      projectNextReviewDate: "",
      projectLead: "",
      roleTrlAssessment: ["", Validators.required],
      //zipCode: ['', Validators.required],
      //mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      emailId: "",
      trlAssessmentDate: "",
      //password: ['', Validators.required],
      fullName: "",
      relation: "",
      familyMobileNumber: ["", Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      // familyMemberAge:'',
      userType: ["patient"],
      category: ["Pending"],
    });
  }

  get formControls() {
    return this.insertForm.controls;
  }

  public onNextClick(): void {
    this.nextClicked = true;
  }

  public onPreviousClick(): void {
    this.nextClicked = false;
  }

  onSubmit() {
    this.mainService.createPatient(this.insertForm.value).then((data) => {
      if (this.insertForm.invalid) {
        return;
      } else this.showModal = true;
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(["/assessment-submit"]);
  }

  changeConsent() {
    this.consent = !this.consent;
  }
}
