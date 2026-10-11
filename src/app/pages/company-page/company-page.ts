import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-page.html',
  styleUrls: ['./company-page.css']
})
export class CompanyPage implements OnInit {
  companyForm!: FormGroup;
  companies: any[] = [
    { companyId: 'COM001', companyName: 'Tech Solutions Co., Ltd.', address: 'Chiang Mai, Thailand', email: 'contact@techsol.com' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      companyId: ['', Validators.required],
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.companyForm.controls;
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      const newCompany = this.companyForm.value;
     
      const index = this.companies.findIndex(c => c.companyId === newCompany.companyId);
      if (index > -1) {
        this.companies[index] = newCompany;
      } else {
        this.companies.push(newCompany);
      }
      this.resetForm();
    } else {
      this.companyForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.companyForm.reset();
  }

  selectCompany(company: any): void {
    this.companyForm.patchValue(company);
  }

  deleteCompany(company: any): void {
    this.companies = this.companies.filter(c => c.companyId !== company.companyId);
  }
}