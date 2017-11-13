function siftUser(obj){
	return function(req,res){
		var requser = req.user
		if(!!requser){
			switch(requser.courseStr.toString().substring(0,1)){
				case 's':
					obj.studentResponse(req,res)
					break
				case 't':
					obj.teacherResponse(req,res)
					break
				case 'a':
					obj.adminResponse(req,res)
					break
				default:
					return obj.empty
			}
		}
		else {
			return obj.empty
		}
	}
}

module.exports = siftUser