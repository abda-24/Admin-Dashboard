import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: 'Admin' | 'User';
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.scss']
})
export class UserManagementComponent {
  users: User[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@bank.com',
      phone: '+1234567890',
      role: 'Admin',
      status: 'Active'
    },
    {
      id: 2,
      username: 'user1',
      email: 'user1@bank.com',
      phone: '+1234567891',
      role: 'User',
      status: 'Active'
    },
    {
      id: 3,
      username: 'user2',
      email: 'user2@bank.com',
      phone: '+1234567892',
      role: 'User',
      status: 'Active'
    },
    {
      id: 4,
      username: 'user3',
      email: 'user3@bank.com',
      phone: '+1234567893',
      role: 'User',
      status: 'Inactive'
    }
  ];

  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  selectedUser: User | null = null;
  userForm: FormGroup;
  editForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      role: ['User', [Validators.required]]
    });

    this.editForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      role: ['User', [Validators.required]]
    });
  }

  openAddModal() {
    this.showAddModal = true;
    this.userForm.reset();
    this.userForm.patchValue({ role: 'User' });
  }

  closeAddModal() {
    this.showAddModal = false;
    this.userForm.reset();
  }

  openEditModal(user: User) {
    this.selectedUser = user;
    this.showEditModal = true;
    this.editForm.patchValue({
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      password: ''
    });
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedUser = null;
    this.editForm.reset();
  }

  openDeleteModal(user: User) {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedUser = null;
  }

  addUser() {
    if (this.userForm.valid) {
      const newUser: User = {
        id: Math.max(...this.users.map(u => u.id)) + 1,
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        phone: this.userForm.value.phone,
        role: this.userForm.value.role,
        status: 'Active'
      };
      this.users.push(newUser);
      this.closeAddModal();
    }
  }

  updateUser() {
    if (this.editForm.valid && this.selectedUser) {
      const index = this.users.findIndex(u => u.id === this.selectedUser!.id);
      if (index !== -1) {
        this.users[index] = {
          ...this.users[index],
          username: this.editForm.value.username,
          email: this.editForm.value.email,
          phone: this.editForm.value.phone,
          role: this.editForm.value.role
        };
      }
      this.closeEditModal();
    }
  }

  deleteUser() {
    if (this.selectedUser) {
      this.users = this.users.filter(u => u.id !== this.selectedUser!.id);
      this.closeDeleteModal();
    }
  }

  toggleUserStatus(user: User) {
    user.status = user.status === 'Active' ? 'Inactive' : 'Active';
  }

  getRoleClass(role: string): string {
    return role === 'Admin' ? 'role-admin' : 'role-user';
  }

  getStatusClass(status: string): string {
    return status === 'Active' ? 'status-active' : 'status-inactive';
  }
}
