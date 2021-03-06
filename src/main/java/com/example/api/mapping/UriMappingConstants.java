package com.example.api.mapping;

public class UriMappingConstants {

    public static final class Controller{
        public static final String CUSTOMERS = "customer";
    }

    public static final class Standard{
        public static final String SAVE = "/save";
        public static final String FINDBYID = "/{id}";
        public static final String FINDALL = "/findAll";
        public static final String EDIT = "/edit";
        public static final String DELETE = "/delete";
    }
}
