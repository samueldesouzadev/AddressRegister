function formatar(mascara, documento) {
    var i = documento.value.length;
    var saida = mascara.substring(0, 1);
    var texto = mascara.substring(i);
    if (texto.substring(0, 1) != saida) {
        documento.value += texto.substring(0, 1);
    }
}

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            desserts: [],
            restMethodSuccess: '',
            restMethodError: '',
            headers: [
                {text: 'Nome', value: 'name'},
                {text: 'E-mail', value: 'email'},
                {text: 'CEP ', value: 'addressList[0].cep'},
                {text: 'Localidade', value: 'addressList[0].localidade'},
                {text: 'UF', value: 'addressList[0].uf'},
                {text: 'Rua', value: 'addressList[0].logradouro'},
                {text: 'Número', value: 'addressList[0].numero'},
                {text: 'Cód.Ibge', value: 'addressList[0].ibge'},
                {text: 'Gia', value: 'addressList[0].gia'},
                {text: 'Ações', value: 'action', sortable: false},
            ],
            valid: true,
            email: 'samueldesouza.dev@gmail.com',
            alertError: false,
            alert: false,
            customer: {
                email: '',
                name: '',
                addressList: [{
                    bairro: '',
                    cep: '',
                    complemento: '',
                    gia: '',
                    ibge: '',
                    localidade: '',
                    logradouro: '',
                    numero: '',
                    uf: '',
                    unidade: ''
                }],
            },
            rules: {
                required: value => value != '' || 'Obrigatório.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'E-mail inválido.'
                },
            },
        }
    },
    mounted: function () {
        this.findall();
    },
    methods: {
        findall() {
            console.log("ENTROU NO BUSCAR");
            var self = this;
            let url = window.location.href.replace("/register.html", "") + "/customer";
            fetch(url).then((resp) => resp.json()).then(function (data) {
                self.desserts = data;
            }).catch(function (error) {
                console.log(error);
            })
        },
        findCep(address) {
            var self = this;
            let url = "https://viacep.com.br/ws/" + address.cep + "/json/";
            fetch(url).then((resp) => resp.json()).then(function (data) {

                if (data.erro == undefined) {
                    address.bairro = data.bairro
                    address.complemento = data.complemento
                    address.gia = data.gia
                    address.ibge = data.ibge
                    address.localidade = data.localidade
                    address.logradouro = data.logradouro
                    address.uf = data.uf
                    address.unidade = data.unidade
                } else {
                    address.bairro = ''
                    address.complemento = ''
                    address.gia = ''
                    address.ibge = ''
                    address.localidade = ''
                    address.logradouro = ''
                    address.uf = ''
                    address.unidade = ''
                }
            }).catch(function (error) {
                console.log(error)
            })
        },
        save(customer) {
            console.log("ENTROU SALVAR");
            var self = this;
            if (this.$refs.form.validate()) {
                this.snackbar = true
                var url = window.location.href.replace("/register.html", "") + "/customer/save";
                console.log(url);
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(customer),
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(function (resp) {

                    if (resp.status == 200) {
                        self.restMethodSuccess = "salvo";
                        self.alert = true;
                        self.findall();
                        self.cleanCustomer(self.customer);
                    } else {
                        self.alertError = true;
                        self.restMethodError = "salvar"
                    }
                }).catch((err) => console.log(err))
            }
        },
        edit(customer) {
            var self = this;
            this.snackbar = true

            var url = window.location.href.replace("/register.html", "") + "/customer/edit";
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(customer),
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(function (resp) {

                if (resp.status == 200) {
                    self.restMethodSuccess = "editado";
                    self.alert = true;
                    self.findall();
                    self.cleanCustomer(self.customer);
                } else {
                    self.alertError = true;
                    self.restMethodError = "editar"
                }
            }).catch((err) => console.log(err))
        },
        deleteCustomer(customer) {
            var self = this;
            this.snackbar = true
            var url = window.location.href.replace("/register.html", "") + "/customer/delete";
            fetch(url, {
                method: 'DELETE',
                body: JSON.stringify(customer),
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(function (resp) {

                if (resp.status == 200) {
                    self.restMethodSuccess = "deletado";
                    self.alert = true;
                    self.findall();
                } else {
                    self.alertError = true;
                    self.restMethodError = "deletar"
                }
            }).catch((err) => console.log(err))
        },
        addAddress(index) {
            var self = this;
            self.customer.addressList.splice(index, 0, {
                bairro: '',
                cep: '',
                complemento: '',
                gia: '',
                ibge: '',
                localidade: '',
                logradouro: '',
                numero: '',
                uf: '',
                unidade: ''
            })
        },
        removeAddress(index) {
            var self = this;
            self.customer.addressList.splice(index, 1);
        },
        showAlert() {
            const options = {title: 'Info', size: 'sm'}
            this.$dialogs.alert('Your message', options)
                .then(res => {
                    console.log(res);
                })
        },
        cleanCustomer(customer) {
            customer.id = '';
            customer.email = '';
            customer.name = '';
            customer.addressList = [{
                bairro: '',
                cep: '',
                complemento: '',
                gia: '',
                ibge: '',
                localidade: '',
                logradouro: '',
                numero: '',
                uf: '',
                unidade: ''
            }];
        },
        editItem(customer) {
            var self = this;
            this.snackbar = true
            self.customer = customer;
        },
        validateRest(customer) {
            console.log("ENTROU NO VALIDA")
            var self = this;
            if (customer.id != undefined) {
                console.log("ENTROU NO EDIT")
                self.edit(customer);
            } else {
                console.log("ENTROU NO SALVAR")
                self.save(customer);
            }
        },
    }
});

