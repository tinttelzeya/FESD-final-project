import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student-service';
import { Student } from '../../classes/student';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-page.html',
  styleUrl: './student-page.css',
})
export class StudentPage implements OnInit {
  studentForm!: FormGroup;

  students: Student[] = [];
  student: Student | undefined;
  isEdit: boolean = false;

  ngOnInit(): void {
    this.getData();
    this.initForm();
  }

  constructor(private studentService: StudentService, private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

  private initForm(): void {
    this.studentForm = this.fb.group({
      studentId: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      studentName: ['', Validators.required],
      department: ['', Validators.required],
      faculty: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      picture: ['', Validators.required]
    });
  }

  get f() {
    return this.studentForm.controls;
  }

  private getData(): void {
    this.studentService.getAll().subscribe({
      next: (data) => {
        this.students = data || []; 
        this.cdr.detectChanges();
        console.log('Students loaded:', this.students);
      },
      error: (err) => {
        console.error('Error loading students:', err);
      }
    });
  }

  onSubmit(): void {
    const studentData: Student = this.studentForm.value;
    console.log(studentData);

    if (this.isEdit) { // Update (Local Mock)
      const index = this.students.findIndex(s => s.studentId === this.student!.studentId);
      if (index !== -1) {
        this.students[index] = studentData;
      }
      this.resetForm();
      alert('OK');
    } else { // Add (Local Mock)
      this.students.push(studentData);
      this.resetForm();
    }
  }

  selectStudent(selectedStudent: Student): void {
    this.isEdit = true; // Change to edit mode
    this.student = selectedStudent;
    this.studentForm.patchValue({
      studentId: selectedStudent.studentId,
      studentName: selectedStudent.studentName,
      department: selectedStudent.department,
      faculty: selectedStudent.faculty,
      email: selectedStudent.email,
      tel: selectedStudent.tel,
      picture: selectedStudent.picture
    });
  }

  resetForm(): void {
    this.isEdit = false;
    this.studentForm.reset();
  }

  deleteStudent(deletedStudent: Student): void {
    if (confirm('Are you sure to delete ' + deletedStudent.studentId)) {
      // Delete (Local Mock)
      this.students = this.students.filter(s => s.studentId !== deletedStudent.studentId);
      this.resetForm();
      alert('DELETE OK.');
    }
  }
}