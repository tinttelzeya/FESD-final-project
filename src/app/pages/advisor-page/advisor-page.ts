import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advisor-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './advisor-page.html',
  styleUrls: ['./advisor-page.css']
})
export class AdvisorPageComponent {
  advisorForm: FormGroup;
  
  advisors: any[] = [
    { advisorId: 'ADV001', advisorName: 'Dr. Smith', department: 'Software Engineering', email: 'smith@ncu.ac.th', tel: '0812345678' },
    { advisorId: 'ADV002', advisorName: 'Assoc. Prof. Jane', department: 'Information Technology', email: 'jane@ncu.ac.th', tel: '0898765432' }
  ];

  
  isEditMode: boolean = false;
  editingId: string | null = null;

  constructor(private fb: FormBuilder) {
    this.advisorForm = this.fb.group({
      advisorId: ['', [Validators.required]],
      advisorName: ['', [Validators.required]],
      department: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required]]
    });
  }

  get f() {
    return this.advisorForm.controls;
  }

  onSubmit() {
    if (this.advisorForm.valid) {
      
      const formValue = this.advisorForm.getRawValue();

      if (this.isEditMode) {
        
        const index = this.advisors.findIndex(a => a.advisorId === this.editingId);
        if (index !== -1) {
          this.advisors[index] = formValue;
        }
      
        this.isEditMode = false;
        this.editingId = null;
        this.advisorForm.get('advisorId')?.enable();
      } else {
        
        this.advisors.push(formValue);
      }
      
      this.advisorForm.reset();
    }
  }

  selectAdvisor(advisor: any) {
    this.isEditMode = true;
    this.editingId = advisor.advisorId;
    this.advisorForm.patchValue(advisor);
    
    this.advisorForm.get('advisorId')?.disable();
  }

  deleteAdvisor(advisor: any) {
    this.advisors = this.advisors.filter(a => a.advisorId !== advisor.advisorId);
    
    if (this.editingId === advisor.advisorId) {
      this.resetForm();
    }
  }

  resetForm() {
    this.advisorForm.reset();
    this.isEditMode = false;
    this.editingId = null;
    this.advisorForm.get('advisorId')?.enable();
  }
}