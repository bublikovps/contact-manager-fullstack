import { Component, OnInit } from '@angular/core';
import { ContactService, Contact } from '../../service/contact.service';
import { ContactFormComponent } from '../contact-form/contact-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private service: ContactService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe(data => (this.contacts = data));
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(() => this.load());
  }

  trackById(index: number, contact: Contact): number | undefined {
    return contact.id;
  }
}
