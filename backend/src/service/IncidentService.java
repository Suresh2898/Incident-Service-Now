
package com.devops.incident.service;

import com.devops.incident.entity.Incident;
import com.devops.incident.repository.IncidentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidentService {

    private final IncidentRepository repository;

    public IncidentService(IncidentRepository repository) {
        this.repository = repository;
    }

    public List<Incident> getAllIncidents() {
        return repository.findAll();
    }

    public Incident createIncident(Incident incident) {
        return repository.save(incident);
    }

    public Incident updateIncident(Long id, Incident updated) {
        Incident existing = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Incident not found"));

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setPriority(updated.getPriority());
        existing.setStatus(updated.getStatus());
        existing.setAssignedTo(updated.getAssignedTo());
        existing.setCategory(updated.getCategory());

        return repository.save(existing);
    }

    public void deleteIncident(Long id) {
        repository.deleteById(id);
    }
}
