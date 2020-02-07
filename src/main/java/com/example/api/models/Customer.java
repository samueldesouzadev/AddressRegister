package com.example.api.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(nullable = false)
	@NotEmpty
	private String name;

	@Column(nullable = false)
	@NotEmpty
	@Email
	private String email;


	@OneToMany(cascade=CascadeType.ALL)
	@JoinTable(name="customer_address",
			joinColumns={@JoinColumn(name="address_id",
					referencedColumnName="id")},
			inverseJoinColumns={@JoinColumn(name="customer_id",
					referencedColumnName="id")})
	private List<Address> addressList;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Address> getAddressList() {
		return addressList;
	}

	public void setAddressList(List<Address> addressList) {
		this.addressList = addressList;
	}
}
