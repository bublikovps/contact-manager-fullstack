import { Component, EventEmitter, Output } from '@angular/core';
import { ContactService, Contact } from '../../service/contact.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactFormComponent {
  @Output() contactAdded = new EventEmitter<void>();

  contact: Contact = { name: '', email: '', phone: '' };

  constructor(private service: ContactService) {}

  save(): void {
    this.service.create(this.contact).subscribe(() => {
      this.contact = { name: '', email: '', phone: '' };
      this.contactAdded.emit();
    });
  }
}
