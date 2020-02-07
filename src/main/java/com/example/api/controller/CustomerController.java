package com.example.api.controller;

import com.example.api.models.Customer;
import com.example.api.mapping.MessageMappingConstants;
import com.example.api.mapping.UriMappingConstants;
import com.example.api.service.CustomerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(UriMappingConstants.Controller.CUSTOMERS)
@Api(value = "API REST Customer")
@CrossOrigin(origins = "*")
public class CustomerController {

    private CustomerService service;

    @Autowired
    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @GetMapping
    @ApiOperation(value = "Returns all customers")
    public List<Customer> findAll() {
        return service.findAll();
    }

    @GetMapping(UriMappingConstants.Standard.FINDALL)
    @ApiOperation(value = "Returns all customers")
    public List<Customer> findAll(@RequestParam int page, int pageSize) {
        return service.findAll(page, pageSize);
    }

    @GetMapping(UriMappingConstants.Standard.FINDBYID)
    @ApiOperation(value = "Returns a unique customer")
    public Customer findById(@PathVariable Long id) {
        return service.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        MessageMappingConstants.Customer.CUSTOMER_NOT_FOUND));
    }

    @RequestMapping(value = UriMappingConstants.Standard.SAVE, method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @ApiOperation(value = "Save a customer")
    public ResponseEntity save(@RequestBody Customer customer) {
        try {
            service.save(customer);
            return new ResponseEntity("Cliente salvo com sucesso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Erro ao salvar cliente.", HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping(UriMappingConstants.Standard.EDIT)
    @ApiOperation(value = "Edit a customer")
    public ResponseEntity edit(@RequestBody Customer customer) {
        try {
            service.save(customer);
            return new ResponseEntity("Cliente foi editado com sucesso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Erro ao editar cliente.", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(UriMappingConstants.Standard.DELETE)
    @ApiOperation(value = "Delete a customer")
    public ResponseEntity delete(@RequestBody Customer customer) {
        try {
            service.delete(customer);
            return new ResponseEntity("Cliente deletado com sucesso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Erro ao deletado cliente.", HttpStatus.BAD_REQUEST);
        }

    }


}
