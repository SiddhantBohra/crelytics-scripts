const csv = require('csvtojson')
var request = require('request-promise');
const csvPath = 'processes.csv'
let ps = []
csv().fromFile(csvPath).then(data => {
    data.forEach(element => {
        var options = {
            method: 'POST',
            url: 'https://crelytics.herokuapp.com/process/add',
            headers:
            {
                'Postman-Token': '049d4510-6e35-49b1-8012-d4b1f388f6e2',
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body:
            {
                process_id: element.process_id.toString(),
                process_name: element.process_name.toString(),
                originNode: element.originNode.toString(),
                destinationNode: element.destinationNode.toString(),
                workflow: element.workflow.toString()
            },
            json: true
        };
        ps.push(request(options))
    })
    Promise.all(ps).then(res => {
        console.log(res)
    }).catch(error => {
        console.log(error)
    })
})

