var connection = require('../hive-sql.js')
var fs = require('fs')

var query = "select concat(firstName,' ',lastName) as name, " +
	"entryID, " +
	"classNo " +
	"from hive1718.userDirectory " +
	"where courseStr regexp 's' " +
	"order by classNo, lastName"

connection.query(query,
	function(err,res,fds){
		if(err) throw err
		fs.writeFile('../devutil/allstudents.js',
			'module.exports = ' + 
			JSON.stringify(
				res.map(
					(item) => (
						{name:item.name,entryID:item.entryID,classNo:item.classNo}
					)
				)
			),
			(errw)=> {
				if(errw) throw errw
				console.log('the file saved')
			}
		)
	}
)

