package com.example.appointment.service;

import com.example.appointment.model.Appointment;
import java.util.List;

public interface AppointmentService {

    Appointment saveAppointment(Appointment appointment);

    List<Appointment> getAllAppointments();

    Appointment updateAppointment(Long id, Appointment appointment);

    void deleteAppointment(Long id);
}

