package com.example.contactmanager.controller;

import com.example.contactmanager.model.Contact;
import com.example.contactmanager.repository.ContactRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Contact API", description = "Verwaltung von Kontakten")
@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor //    public ContactController(
public class ContactController {

    private final ContactRepository repository;

//    public ContactController(ContactRepository repository) {
//        this.repository = repository;
//    }

    @GetMapping
    public List<Contact> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Contact create(@RequestBody Contact contact) {
        return repository.save(contact);
    }

    @PutMapping("/{id}")
    public Contact update(@PathVariable Long id, @RequestBody Contact contact) {
        return repository.findById(id)
                .map(c -> {
                    c.setName(contact.getName());
                    c.setEmail(contact.getEmail());
                    c.setPhone(contact.getPhone());
                    return repository.save(c);
                })
                .orElseThrow(() -> new RuntimeException("Contact not found"));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
