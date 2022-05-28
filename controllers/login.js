const { default: axios } = require('axios');
const alert =require('alert');

module.exports = (req, reso) =>{
    axios.get('http://ip-api.com/json').then(res=>{
        
        var contry=res.data.country;
        var contrycode=res.data.countryCode;
        var ip=res.data.query;
        console.log(ip);
        
        if(contrycode=="KR"){
            reso.render('login',{cc: contrycode, ip:ip})
        }
        else{
            reso.redirect('/',{cc: contrycode,ip:ip})
        }
    })
}