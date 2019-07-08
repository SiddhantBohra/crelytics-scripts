const csv = require('csvtojson')
var request = require('request-promise');
const csvPath = 'workflows.csv'
let ps =[]
csv().fromFile(csvPath).then(data => {
    data.forEach( element => {
        element.rule_set = element.rule_set.split(",")
        var options = {
            method: 'POST',
            url: 'https://crelytics.herokuapp.com/workflow/add',
            headers:
            {
                'Postman-Token': '2640da4c-8999-41ef-b17b-9ad0323b917f',
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body:
            {
                workflow_id: element.workflow_id,
                workflow_name: element.workflow_name,
                rule_set: element.rule_set,
                workflows_AND_or_OR_condition: element.workflows_AND_or_OR_condition
            },
            json: true
        };
        console.log(options.body)
       ps.push(request(options))
       options.body.rule_set.length.length = 0
    })
    Promise.all(ps).then(results =>{
        console.log(results)
    }).catch(err =>{
        console.log(err)
    })
})