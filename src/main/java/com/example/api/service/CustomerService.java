package com.example.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.api.domain.Customer;
import com.example.api.repository.CustomerRepository;

@Service
public class CustomerService {

    private CustomerRepository repository;

    @Autowired
    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public List<Customer> findAll() {
        return repository.findAllByOrderByNameAsc();
    }

    public List<Customer> findAll(int page, int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return repository.findAll(pageRequest);
    }

    public Optional<Customer> findById(Long id) {
        return repository.findById(id);
    }

    public void save(Customer customer) {
        repository.save(customer);
    }

    public void delete(Customer customer){
        repository.delete(customer);
    }

}
