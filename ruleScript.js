const csv = require('csvtojson')
var request = require("request");
const csvPath = 'rules.csv'
csv().fromFile(csvPath).then(data => {
    data.forEach(element => {
        var options = {
            method: 'POST',
            url: 'https://crelytics.herokuapp.com/rule/add',
            headers:
            {
                'Postman-Token': 'a215a1c3-045c-4193-8c4e-e76eb4978600',
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body:
            {
                rule_id: element.rule_id,
                rule_name: element.rule_name,
                field_name: element.field_name,
                operator: element.operator,
                value: element.value
            },
            json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    })
})        
})
