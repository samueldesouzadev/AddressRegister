package com.example.api.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.example.api.models.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

	List<Customer> findAllByOrderByNameAsc();

	List<Customer> findAll(Pageable pageable);

}
