var axios = require('axios');
let data = ["27AAACP2319J2ZH","29AABCA6814E1ZV","29AABCT9452F1Z2","29AADCT5683N1ZI","29AANHP0523J2ZW","29AAQCS6791M2Z4","29AASFV2970N1Z3","29ABUPC7485N1ZL","29ABYFA0747M1ZN","29AHWPS6075J1Z7","29AKRPA4146Q1ZH","29ALDPT7512Q1ZA","29AMCPR4790E1ZQ","29AMCPR4790E1ZQ","29AMRPK5960C1ZO","29AOBPA9187K2ZH","29AOWPT7626R1ZC","29APDPH9013A1ZB","29APMPS7796C1Z1","29ATSPL4473D2Z7","29AUXPM2075J2ZS","29AUXPM2075J2ZS","29AZXPC2931Q1ZI","29BDCPN5588C1ZA","29BLJPM5645Q1Z4","29BMNPN2725D1ZX","29BPBPP1482G2ZQ","29BTIPN7670P1ZL","29CHVPK4271R2Z3","29CNYPP4497F1ZW","29CODPK2542G1Z0","29CPTPS9004Q1ZM","29CUQPD0909K1ZA","29ECKPS8613B1ZA","29EHDPR1410P1ZY","29EMFPK9826K1ZA","29ENUPS3805J1Z4","29GFDPS3007H2ZA","33AAACV7247H1ZB","33AAAFT9053C1ZH","33AABCV0100C4ZB","33AABCV2786J1Z3","33AABPV9755A1ZO","33AAFFS8404B1ZM","33AAFPB8646L1ZL","33AAKPK5550D1ZZ","33AAKPO3488N1Z1","33AANFG9599H1ZO","33AAOFC2724K1ZF","33AAPCM4570M1ZY","33AASFT2303H1ZA","33AATFP1195L1ZO","33AAVFK0049A1ZN","33AAVFV3971C1ZV","33AAVPE6426B1ZX","33AAWFP1792J1ZM","33AAZCS6042C1Z8","33ABFFS4927G1Z6","33ABFPE2407F1ZE","33ABKPT4465F2ZF","33ABLPO2733J1ZK","33ABLPZ2605C1ZT","33ABQFM2537D1ZD","33ABUPV1652L1Z0","33ACNPV1815F1ZL","33ACUPU9518P1ZE","33ADIPU4115F1ZQ","33ADKPK5733B1ZW","33ADXFS3558H1ZH","33ADYPC8707B1ZM","33ADYPN7750M1ZN","33ADYPU0219L1Z0","33AECPH5837A1Z2","33AEEFS6640C1ZB","33AEHFS0795P1ZD","33AEQPB5987F1Z9","33AERPV0238C1ZK","33AEYPN9970J1ZH","33AEYPV0348C1ZA","33AFEPV3217P1Z3","33AFLPV9906J1ZS","33AFNPI3250C1ZX","33AFSPC7407G1ZJ","33AGCPV5236B1ZP","33AGKPR8277N1ZH","33AHEPB4777A1ZV","33AHGPV3311C1ZT","33AHGPV3314H1ZG","33AHJPA6995N1ZS","33AHZPM6389C1ZR","33AILPN0158K1Z5","33AINPH8188D1Z2","33AIPPT5935Q1Z8","33AIQPC7787A1Z7","33AIRPT1517G1Z5","33AITPN3693F1ZU","33AJCPV5024E1ZI","33AJGPM6388L1ZN","33AJHPB7340J2ZE","33AJKPR1733J1Z3","33AJLPV6419J1ZP","33AJRPB0537F1ZL","33AJRPG3586D1Z5","33AJRPS9055K2ZD","33AJSPR2389E1ZS","33AJVPD1620M1Z6","33AJZPA2530M1Z2","33AKJPG5135B1ZQ","33AKLPP9026C1Z7","33AKYPP7211Q1ZA","33ALDPP0236D2ZO","33ALIPA0516E2ZX","33ALRPD0590N1ZT","33ALTPS3843D1ZV","33ALVPV3775B2ZM","33ALYPR7631M1Z6","33AMDPR5818G1Z1","33AMFPR8285B1ZY","33AMKPG0523A1ZX","33AMOPR5076M3Z9","33AMYPN6224B1Z0","33AODPM2153F1ZE","33APBPJ8832R2ZD","33APDPY2492L1ZD","33APLPC3575J1ZT","33APMPR1922B1Z7","33APOPC9834P1Z8","33APTPP9467N2ZO","33AQDPB6297K1ZP","33AQEPK3189J1ZO","33AQFPT2634L1ZM","33AQGPK3341L1ZW","33AQIPY7231P1Z3","33AQPPB3692L2ZH","33AQTPC3689E1ZN","33ARHPA5455H1Z1","33ARMPN2363A1Z4","33ASGPY6008C1ZV","33ASJPR0574P1Z5","33ASWPB3563D1ZU","33ATBPB6298H2ZQ","33ATDPK7907N1ZD","33ATFPJ1878H1ZN","33ATGPB9126R1ZC","33AUBPB9315L1ZS","33AWOPK9660N1ZQ","33AWOPV4652R1ZH","33AWPPB8995E1Z5","33AXBPJ5363P1Z6","33AXNPN7602B1ZP","33AXOPG3472H1ZF","33AXOPR9380H1ZT","33AYDPR5358P1ZR","33AYLPR1227R1ZV","33AYLPR7958K1ZJ","33AYRPM9783D1ZU","33AZQPD8946F2Z2","33AZRPG8034E2ZD","33AZSPM8278K1ZG","33AZTPK2436L1ZZ","33AZZPN8816H1ZN","33BAAPM6392N1ZB","33BBKPS5342D1ZQ","33BBTPP8503L1Z2","33BCBPP0047E1Z6","33BCLPK5526M1ZA","33BCRPS0362K1Z8","33BCZPR8606R1ZC","33BFCPG0302R2ZQ","33BFVPJ9799E1ZL","33BGWPV7365Q1ZZ","33BGXPM9705J1ZP","33BHHPV5542D1ZC","33BHOPM7401B1ZO","33BHWPP8125P1ZD","33BHXPJ1765L1ZQ","33BIBPB5789F1ZE","33BIBPB5789F1ZE","33BIKPR6035B1ZG","33BJJPR4557C2Z5","33BKIPP3102R1ZX","33BKPPD9793M1ZB","33BKPPP1870B1Z8","33BLEPR2635G1Z8","33BLRPP9149J1ZB","33BMCPR5501A1ZP","33BMKPG7624P1ZL","33BMNPS2957Q1Z2","33BNKPM1085R1ZE","33BNPPN3157C1Z2","33BNXPA3249L1ZN","33BOEPK6628B1ZA","33BOEPM0885E1Z3","33BOSPB1434A1ZL","33BOWPA7347P1Z7","33BPTPK5766A1ZQ","33BPTPR8608Q1ZR","33BQZPM7991J1ZQ","33BRMPP4216K1ZK","33BRQPS7457D1ZB","33BSEPS9673L2ZX","33BSVPJ4744C1ZN","33BTDPC5289A1Z4","33BTFPR3526K1ZI","33BTNPK2928J1ZF","33BTVPP6602A1ZQ","33BUXPD1462R1ZZ","33BUYPM2904C1ZN","33BUYPP5358P1ZF","33BUZPR3862H1ZW","33BVLPN3727L1Z7","33BVUPM6251K1Z0","33BVVPM1351B1ZR","33BWIPK5729F1ZI","33BWNPR9375K1ZL","33BYKPK1258F1ZK","33BYOPR4234A1ZL","33BYRPR4300L1Z4","33BYZPR2164L1ZM","33BZDPN2907G1ZM","33BZMPD1606H1ZR","33BZMPM1671D1ZH","33BZMPT0329P1ZS","33BZPPA7420M1Z8","33CAHPK8816K1ZE","33CAOPS7729A1ZI","33CAWPM9903Q1ZN","33CAZPP1328R1ZS","33CBIPA4366A2Z8","33CBUPP1311A1Z3","33CCDPP4041H1ZV","33CCNPS9720E2ZB","33CFUPM3140Q1ZU","33CGMPK8443B1ZH","33CGSPM8299K1ZC","33CHMPM9708G1Z1","33CHTPR5826D1Z0","33CKGPP5929R1ZB","33CMQPK4767C1ZV","33CNIPP8644J1ZH","33CNXPM3962K1Z8","33COHPN5272C1Z3","33CPKPK4573B1Z1","33CQTPM7171B1ZO","33CTBPD9385B1ZX","33CTLPD2382J1ZN","33CUFPS7617Q1ZU","33CUZPM9507R1ZD","33CVRPM3744H1Z9","33CVRPM3987N1ZJ","33CVZPM8581L1ZF","33CWQPM0408J1ZG","33CYHPP5032Q1ZY","33DBVPB2357C1ZV","33DCYPS6280P1ZC","33DEBPM1041F1Z5","33DEEPS1766A2ZP","33DFRPG7801E1ZJ","33DGJPP8020F1ZH","33DGXPD7950L1ZP","33DIDPP2498R1ZF","33DKPPR2514J1ZW","33DLWPS5388K1ZY","33DMZPS9345J1ZY","33DNLPS2862B1ZZ","33DRJPK4161D1Z1","33DWLPS6246A1ZH","33DWTPS9855P1Z1","33EANPS0061Q1Z5","33EBFPR8456F1ZC","33EBJPS2266C1ZP","33EBRPA8056G1ZJ","33EDCPM1513H1Z0","33EEBPS7986N2ZI","33EGVPR2711A1ZI","33ELRPS3040A1ZA","33EMSPS8646N1ZU","33ENHPS4921N1ZH","33EQLPD4434A1ZD","33EWLPS2298D1Z6","33EXSPP5121G1ZA","33EZWPS8635A1ZU","33FDIPD0391H1ZS","33FEHPR4057E1ZG","33FGBPS1683B1ZL","33FLMPK7497B1ZR","33FLRPS0928C1ZY","33FMJPK2410J1Z8","33FPWPD2815G1ZU","33FUJPM1782B1ZQ","33FVUPK3547L2ZU","33FVZPS8100L1ZR","33FZRPS7466B1ZT","33GANPP4518K1Z8","33GFHPS3271F1ZC","33GGDPP7588H1ZT","33GIMPS0023P1ZV","33GLGPK3813Q1ZP","33GLGPS4480D2ZY","33GLPPS8627K1Z6","33GMIPB2986Q1ZE","33GWWPS3987L1Z6","33GYGPS1285H1Z4","33HDMPS4272Q1ZK","33HIZPM2407P1ZF","33HSPPK5815M1Z3","33HXSPS8770P1Z0","33HYNPS6224N1ZM","33HZEPD8241Q1ZX","33JTEPS4615F1ZL","33LMLPS9483F1Z6","33LXEPK5217M1Z4","33MBIPK9024P1ZX","36AFOPR0880E1Z7","37AAMFJ0877G1Z1","37CBPPM5895K1ZL"];
let temp = ["33LXEPK5217M1Z4","33MBIPK9024P1ZX","36AFOPR0880E1Z7","37AAMFJ0877G1Z1","37CBPPM5895K1ZL"];
let fs = require('fs');

const api_caller = async (gstin) => {
var data = JSON.stringify({
  "task": "detailedGstinSearch",
  "essentials": {
    "gstin": gstin
  }
});


var config = {
  method: 'post',
  url: 'https://signzy.tech/api/v2/patrons/62ad57b09ed68e0028f07054/gstns',
  headers: { 
    'Authorization': 'ToiWNb0K6qPI5VVm60GSWWMwCn0Sm9KpbxCWUtclIM8R7KaW6hZzVDEsBhuXBalp', 
    'Content-Type': 'application/json'
  },
  data : data
};

return await axios(config)
.then(function (response) {
//   console.log(JSON.stringify(response.data));
  return response.data
})
.catch(function (error) {
  console.log(error);
});
}
let collected_data = [];

async function as(){
  console.log(data.length);
    for await(let i of data ){
        // console.log(i,'\n');
        api_caller(i).then(r=>collected_data.push(r)).then(o=>fs.writeFileSync('new_data_23.json',JSON.stringify(collected_data))).catch(e=>console.log(e));
    }
}

as()
// api_caller("33LXEPK5217M1Z4").then(r=>console.log(r))