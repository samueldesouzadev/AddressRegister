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
            headers: [
                { text: 'Nome', value: 'name' },
                { text: 'E-mail', value: 'email' },
                { text: 'CEP', value: 'cep' },
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
                email: '',
                name: ''
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
    methods: {
        buscacep(cep) {
            var self = this
            let url = "https://viacep.com.br/ws/" + cep + "/json/";
            axios.get(url).then(function (res) {
                console.log(res.data);
                console.log(self.customer.addressList);
                self.customer.addressList = res.data;
            })
                .catch(function (error) {
                    console.log(error)
                })
        },
        save(customer) {
            var self = this
            var url = window.location.href.replace("/welcome.html", "") + "/customer/save";
            console.log(customer);
            console.log(url);
            axios.post(url, customer).then(function (res) {
                console.log(res);
            })
                .catch(function (error) {
                    console.log(error)
                })

        },
    }

})
