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
            valid: true,
            email: 'samueldesouza.dev@gmail.com',
            alertError: false,
            alert: false,

            headers: [
                {text: 'Nome', value: 'name'},
                {text: 'E-mail', value: 'email'},
                {text: 'CEP', value: 'cep'},
            ],
            desserts: [
                {
                    name: 'Samuel',
                    email: 'samuel@email.com',
                    cep: '07020-320',
                },
                {
                    name: 'Pedro',
                    email: 'pedro@email.com',
                    cep: '07020-320',
                },
            ],

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
                required: value => !!value || 'Obrigatório.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'E-mail inválido.'
                },
            },
        }
    },
    mounted: function () {
    },
    methods: {
        buscacep(address) {
            var self = this;
            let url = "https://viacep.com.br/ws/" + address.cep + "/json/";
            fetch(url).then((resp) => resp.json()).then(function (data) {
                address.bairro = data.bairro
                address.cep = data.cep
                address.complemento = data.complemento
                address.gia = data.gia
                address.ibge = data.ibge
                address.localidade = data.localidade
                address.logradouro = data.logradouro
                address.uf = data.uf
                address.unidade = data.unidade

            }).catch(function (error) {
                console.log(error)
            })
        },
        save(customer) {
            console.log(customer);
            var self = this;
            var url = window.location.href.replace("/welcome.html", "") + "/customer/save";
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(customer),
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(function (resp) {
                console.log(resp);
                if (resp.status == 200) {
                    self.alert = true;
                    setTimeout(function () {
                        self.alert = false;
                    }, 3000);
                } else {
                    self.alertError = true;
                    setTimeout(function () {
                        self.alertError = false;
                    }, 3000);

                }
            }).catch((err) => console.log(err))
        },
        addAddress(index) {
            console.log(index);
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
    }
});
