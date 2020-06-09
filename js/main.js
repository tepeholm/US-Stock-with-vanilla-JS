
//to fix cors problem add this
//const fixProblem = 'https://cors-anywhere.herokuapp.com/';

const hisse_liste = 'https://financialmodelingprep.com/api/v3/company/stock/list';
const company_quote = 'https://financialmodelingprep.com/api/v3/profile/';
const API_KEY = '********************************'
const API_KEY2 = '*******************************'



const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const demo = document.getElementById("demo");  

//Search states.json and filter it
const searchStates = async searchText => {
    
    const res = await fetch(`${hisse_liste}${API_KEY}`);      //include this when API will work
    //const res = await fetch('data/list.json');                  //comment this after api being included

    const dictionary = await res.json();                       
    
    const states = dictionary.symbolsList;                   //include this when API will work   
    //const states = dictionary;                                 //comment this after api being included  
    

    //Get matches to current text input
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        //There was a problem with state.name.match(regex), since some names were 'undefined' types
        //so I converted them to string by String(value) 
        return state.symbol.match(regex) || String(state.name).match(regex);        
    });

    if(searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
        demo.innerHTML = '';
    }
    outputHtml(matches);
};


// Show results in HTML
const outputHtml = matches => {
    if (matches.length>0) {
        const html = matches.map(match => `
        <div class="card card-body mb-1" style="background-color: rgb(31, 27, 27)">
            <h6>
            <span class="text-primary">${match.symbol}</span>
            &nbsp;&nbsp;&nbsp;
            <span>${match.name}</span>
            </h6>
            <small class="text-muted">${match.exchange}</small>
        </div>
        `).join('');
        matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => searchStates(search.value));

//select from dropdown menu
const stockQuote = async() => {
    
    let selectedStock = document.getElementById("search").value;
    const api_call = await fetch(`${company_quote}${selectedStock}${API_KEY}`);
    //const api_call = await fetch('data/profile.json');                                     //comment this after api being included  

    
    const dictionary = await api_call.json();

    matchList.innerHTML = '';

    
    let yzat = String(dictionary['0']['description']);
    
    
    document.getElementById("demo").innerHTML = `   
    <h6>
    <img src=${String(dictionary['0']['image'])} style="width:40px;height:40px;"> &nbsp;&nbsp;&nbsp;&nbsp;
    ${String(dictionary['0']['companyName'])}
    </h6>
    <h6>${yzat}</h6>
    `;

    document.getElementById("outlook1").innerHTML = `
    <li class="list-group-item d-flex justify-content-between align-items-center"> Symbol
    <span class="badge badge-primary badge-pill"> ${String(dictionary['0']['symbol'])} </span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center"> Sector
    <span class="badge badge-primary badge-pill"> ${String(dictionary['0']['sector'])} </span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center"> Exchange
    <span class="badge badge-primary badge-pill"> ${String(dictionary['0']['exchangeShortName'])} </span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center"> Industry
    <span class="badge badge-primary badge-pill"> ${String(dictionary['0']['industry'])} </span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center"> CEO
    <span class="badge badge-primary badge-pill"> ${String(dictionary['0']['ceo'])} </span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center"> website
    <a href=${String(dictionary['0']['website'])} target="_blank">
    <span class="badge badge-success badge-pill"> ${String(dictionary['0']['website'])} </span>
    </a>
    </li>
    `;

    document.getElementById("outlook2").innerHTML = `
    <li class="list-group-item d-flex justify-content-between align-items-center"> Current Price
    <span class="badge badge-primary badge-pill"> ${String(dictionary['0']['price'])} </span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center"> Market Cap
    <span class="badge badge-primary badge-pill"> ${dictionary['0']['mktCap'].toLocaleString()} </span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center"> Avg. Volume
    <span class="badge badge-primary badge-pill"> ${dictionary['0']['volAvg'].toLocaleString()} </span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center"> 52 Week Range
    <span class="badge badge-primary badge-pill"> ${String(dictionary['0']['range'])} </span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center"> Beta
    <span class="badge badge-primary badge-pill"> ${String(dictionary['0']['beta'])} </span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center"> Last Dividend
    <span class="badge badge-primary badge-pill"> ${String(dictionary['0']['lastDiv'])} </span>
    </li>
    `;
}

//*******************************To unhide Tab******************************************** */
function myFunction() {
    document.getElementById("myhidden").style.visibility = 'visible';
  }
search.addEventListener('change', myFunction);


//***********************************Financials*************************************************

const stockFinancials = async() => {

    let selectedStock = document.getElementById("search").value;
    selectedStock = selectedStock.toUpperCase()
    const api_call = await fetch(`https://finnhub.io/api/v1/stock/financials-reported?symbol=${selectedStock}&freq=quarterly${API_KEY2}`);
    //const api_call = await fetch('data/financials.json');                                     //comment this after api being included  
    const dictionary = await api_call.json();

    let tarih = Object.values(dictionary.data.map(function(item) {
        return item.endDate }))

    //console.log(dictionary.data)

    
    let findate = '<br><th scope="col">'+ ' ' + '</th>'
    let currentassets = '<td>Current Assets</td>'
    let assets = '<td>Assets</td>'
    let liabilities = '<td>Liabilities</td>'
    let noncurrentassets = '<td>Noncurrent Assets</td>'
    let currentliablities = '<td>Current Liabilitiess</td>'
    let longtermcurrentliablities = '<td>Long Term Current Liabilitiess</td>'
    let noncurrentliabilities = '<td>Noncurrent Liabilities</td>'
    let longtermnoncurrentliablities = '<td>Noncurrent Liabilities</td>'
    let stockholdersequity = '<td>Stockholders Equity</td>'
    let LiabilitiesAndStockholdersEquity = '<td>Liabilities And Stockholders Equity</td>'
    let GrossProfit = '<td>Gross Profit</td>'
    let OperatingExpenses = '<td>Operating Expenses</td>'
    let NetIncomeLoss = '<td>Net Income/Loss</td>'

    let i = 0
    for (item in dictionary.data) {
        if (i === 4) { break; }
        findate += '<th scope="col">'+ dictionary.data[item].endDate.slice(0,10) + '</th>'
        currentassets += '<td>' + dictionary.data[item].report.bs['AssetsCurrent'] + '</td>'
        assets += '<td>' + dictionary.data[item].report.bs['Assets'] + '</td>'
        liabilities += '<td>' + dictionary.data[item].report.bs['Liabilities'] + '</td>'
        noncurrentassets += '<td>' + dictionary.data[item].report.bs['AssetsNoncurrent'] + '</td>'
        currentliablities += '<td>' + dictionary.data[item].report.bs['LiabilitiesCurrent'] + '</td>'
        longtermcurrentliablities += '<td>' + dictionary.data[item].report.bs['LongTermDebtCurrent'] + '</td>'
        noncurrentliabilities += '<td>' + dictionary.data[item].report.bs['LiabilitiesNoncurrent'] + '</td>'
        longtermnoncurrentliablities += '<td>' + dictionary.data[item].report.bs['LongTermDebtNoncurrent'] + '</td>'
        stockholdersequity += '<td>' + dictionary.data[item].report.bs['StockholdersEquity'] + '</td>'
        LiabilitiesAndStockholdersEquity += '<td>' + dictionary.data[item].report.bs['LiabilitiesAndStockholdersEquity'] + '</td>'
        GrossProfit += '<td>' + dictionary.data[item].report.ic['GrossProfit'] + '</td>'
        OperatingExpenses += '<td>' + dictionary.data[item].report.ic['OperatingExpenses'] + '</td>'
        NetIncomeLoss += '<td>' + dictionary.data[item].report.ic['NetIncomeLoss'] + '</td>'
        i += 1
    }

    let jq = '<table class="table table-hover"><thead><tr class="table-active text-right">' + findate + '</tr></thead>'+
    '<tbody class="text-right">'+
    '<tr>'+ currentassets+ '</tr>'+
    '<tr>'+ noncurrentassets+ '</tr>'+
    '<tr>'+ assets+ '</tr>' + 
    '<tr>'+ currentliablities+ '</tr>'+
    '<tr>'+ longtermcurrentliablities+ '</tr>'+
    '<tr>'+ noncurrentliabilities+ '</tr>'+
    '<tr>'+ longtermnoncurrentliablities+ '</tr>'+
    '<tr>'+ liabilities + '</tr>'+
    '<tr>'+ stockholdersequity + '</tr>'+
    '<tr>'+ LiabilitiesAndStockholdersEquity + '</tr>'+
    '<tr>'+ GrossProfit + '</tr>'+
    '<tr>'+ OperatingExpenses + '</tr>'+
    '<tr>'+ NetIncomeLoss + '</tr>'+
    '</tbody></table>'

    document.getElementById('financials').innerHTML = jq
}

search.addEventListener('change', stockFinancials);

// *********************************** Major developments ********************************************************
const majorDevelopments = async() => {

    let selectedStock = document.getElementById("search").value;
    selectedStock = selectedStock.toUpperCase()
    
    //const api_call = await fetch(`https://finnhub.io/api/v1/major-development?symbol=${selectedStock}${API_KEY2}`);
    const api_call = await fetch('data/major_developments.json');                                     //comment this after api being included  
    let dictionary = await api_call.json();
    dictionary = dictionary.majorDevelopment

    console.log(dictionary[0])

    let newsheadlines = '<br> <h6 >News Headlines</h6>'
    let newsdescription = ''
    let newsdatetime = ''

    for (item in dictionary) {
        newsheadlines += '<a  style="width: 500px;" data-toggle="popover" data-trigger="hover" data-content=" '+ 
        dictionary[item].description +' ">' + dictionary[item].headline + 
        '</a> <br> <p>' + dictionary[item].datetime +' </p> <hr>'
    }

    $(document).ready(function(){$('[data-toggle="popover"]').popover()}); // Bootstrap Popover function


    document.getElementById('majordevelopments').innerHTML = newsheadlines

}

search.addEventListener('change', majorDevelopments);

// *********************************** Chart ********************************************************

const dCanvas = async() => {

    let selectedStock = document.getElementById("search").value;
    selectedStock = selectedStock.toUpperCase()
    const api_call = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${selectedStock}${API_KEY}`);
    //const api_call = await fetch('data/chartdata.json');                                   
    const dictionary = await api_call.json();
    //console.log(dictionary)


    let chartDate = Object.values(dictionary['historical'].map(function(item) {
        return item.date }))                                                //  Date.parse() converts string to date
    
    
    let chartPrice = Object.values(dictionary['historical'].map(function(item) {
            return item.close }))

    // to get around less data around 500
    if (chartDate.length > 600) {
        chartDate = chartDate.slice(0,chartDate.length/2.5)
        chartPrice = chartPrice.slice(0,chartPrice.length/2.5)
        }

    //console.log(chartDate.length)
    //console.log(chartPrice.length)
    
    //console.log(chartPrice)

    var ctx = document.getElementById('myChart').getContext('2d');

    ctx.height = '100';
    ctx.width =  '400';

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartDate.reverse(),
            datasets: [{
                label: String(dictionary['symbol']),
                data: chartPrice.reverse(),
                barPercentage: 4,
                barThickness: 1,

                backgroundColor: 'green', 

                //borderColor: 'black',
                hoverBorderWidth: 4,
                //hoverBorderColor: 'white',

                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Closing Price'
            },
            legend: {
                display: false,
                labels: {
                    fontColor: 'rgb(99, 255, 133)'
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 10,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                    },
                    position: 'right',
                }],
                xAxes: [{
                    display: false,
           
                }]
            }
        }
    });
};

search.addEventListener('change', dCanvas);

//************************************************************************************* */




// This function can be executed page load to get json data 

let states2 = {};
getHisse = async () => {      
    const api_call = await fetch(`${hisse_liste}`);
    const dictionary = await api_call.json();
    states2 = dictionary.symbolsList;
}




//*********************************************************websocket ************************************************

function mysocket() { 
    let socket = new WebSocket('wss://ws.finnhub.io?token=br8pnfvrh5ral083is1g');


    // Connection opened -> Subscribe
    socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'OANDA:SPX500_USD'}))
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'OANDA:XAU_USD'}))
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'OANDA:EUR_USD'}))
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'OANDA:USD_JPY'}))
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'OANDA:USD_TRY'}))
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
    });


    // Listen for messages
    socket.addEventListener('message', function (event) {
        //console.log('Message from server ', event.data);

        yzat = JSON.parse(event.data)
        let sp500
        let gold 
        let eurusd
        let usdjpy 
        let usdtry 
        let btcusd 

        //console.log(yzat.data[0].p)
        
        if (yzat.data[0].s=='OANDA:SPX500_USD' ) {
            sp500 =  yzat.data[0].p.toFixed(2)
            document.getElementById("sp500").innerHTML = `${sp500}`
        } 

        if (yzat.data[0].s=='OANDA:XAU_USD' ) {
            gold =  yzat.data[0].p.toFixed(2) 
            document.getElementById("gold").innerHTML = `${gold}`
        }

        if (yzat.data[0].s=='OANDA:EUR_USD' ) {
            eurusd =  yzat.data[0].p.toFixed(2) 
            document.getElementById("eurusd").innerHTML = `${eurusd}`
        }  
        if (yzat.data[0].s=='OANDA:USD_JPY' ) {
            usdjpy =  yzat.data[0].p.toFixed(2) 
            document.getElementById("usdjpy").innerHTML = `${usdjpy}`
        }  

        if (yzat.data[0].s=='OANDA:USD_TRY' ) {
            usdtry =  yzat.data[0].p.toFixed(2) 
            document.getElementById("usdtry").innerHTML = `${usdtry}`
        }  
        if (yzat.data[0].s=='BINANCE:BTCUSDT' ) {
            btcusd =  yzat.data[0].p.toFixed(2) 
            document.getElementById("btcusd").innerHTML = `${btcusd}`
        } 

    });


    // Unsubscribe
    var unsubscribe = function(symbol) {
        socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
    }
}
//********************************************************************************* **************************************

window.onload = mysocket();

window.onload = function yzatmusic() {
    setTimeout(function () {
    var media = document.getElementById("my_audio")
    media.play()
    }, 8000);
}




