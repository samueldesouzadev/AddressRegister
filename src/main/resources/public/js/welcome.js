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
        buscacep(cep) {
            var self = this;
            let url = "https://viacep.com.br/ws/" + cep + "/json/";
            axios.get(url).then(function (res) {
                console.log(res.data);
                self.customer.addressList[0].bairro = res.data.bairro
                self.customer.addressList[0].cep = res.data.cep
                self.customer.addressList[0].complemento = res.data.complemento
                self.customer.addressList[0].gia = res.data.gia
                self.customer.addressList[0].ibge = res.data.ibge
                self.customer.addressList[0].localidade = res.data.localidade
                self.customer.addressList[0].logradouro = res.data.logradouro
                self.customer.addressList[0].uf = res.data.uf
                self.customer.addressList[0].unidade = res.data.unidade
            })
                .catch(function (error) {
                    console.log(error)
                })
        },
        save(customer) {
            var self = this;
            var url = window.location.href.replace("/welcome.html", "") + "/customer/save";
            console.log(JSON.stringify(customer));
            console.log(url);
            const headers = {
                'Content-Type': 'application/json'
            }

            axios.post(url, customer, {
                headers: headers
            }).then(function (res) {
                console.log(res);
            })
                .catch(function (error) {
                    console.log(error)
                })

        },
        savefetch(customer) {
            console.log("ENTROU");
            var self = this;
            var url = window.location.href.replace("/welcome.html", "") + "/customer/save";
            console.log(JSON.stringify(customer));
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(customer),
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.log(err))
        },

    }
});
