package com.example.appointment.service;

import com.example.appointment.model.Appointment;
import com.example.appointment.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository repository;

    public AppointmentServiceImpl(AppointmentRepository repository) {
        this.repository = repository;
    }

    @Override
    public Appointment saveAppointment(Appointment appointment) {
        appointment.setStatus("BOOKED");
        return repository.save(appointment);
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return repository.findAll();
    }

    @Override
    public Appointment updateAppointment(Long id, Appointment appointment) {
        Appointment existing = repository.findById(id).orElseThrow();
        existing.setName(appointment.getName());
        existing.setEmail(appointment.getEmail());
        existing.setAppointmentDate(appointment.getAppointmentDate());
        existing.setAppointmentTime(appointment.getAppointmentTime());
        existing.setPurpose(appointment.getPurpose());
        existing.setStatus(appointment.getStatus());
        return repository.save(existing);
    }

    @Override
    public void deleteAppointment(Long id) {
        repository.deleteById(id);
    }
}
