module.exports = function(courseStr,stuUDID){

    var studentRatingQuery = '' + 
    	'select * from hive1718.userDirectory u ' +
    	'LEFT JOIN ' + 
    	'(select concat(courseStr,\'-\',LOID,\'-\',stuUDID) as courseStrLOIDsID, ' + 
    		'group_concat(distinct stuUDID) as stuUDID, ' +
    		'group_concat(distinct LOID) as LOID, ' +
    		'group_concat(if((MRatings = \'y\'), maxID, null) separator \', \') as maxID, ' +
    		'sum((MRatings = \'y\')*(1*(recentrating REGEXP concat(\'m\', LOID, \':1n\')) ' +
    			'+ 2*(recentrating REGEXP concat(\'m\', LOID, \':2n\')) ' + 
    			'+ 3*(recentrating REGEXP concat(\'m\', LOID, \':3n\')) ' + 
    			'+ 4*(recentrating REGEXP concat(\'m\', LOID, \':4n\')))) as mRating0, ' + 
    		'sum(MRatings!=\'y\' AND recentrating REGEXP concat(\'m\', LOID, \':1n\')) as mcountN, ' + 
    		'sum(MRatings!=\'y\' AND recentrating REGEXP concat(\'m\', LOID, \':2n\')) as mcountA, ' +
    		'sum(MRatings!=\'y\' AND recentrating REGEXP concat(\'m\', LOID, \':3n\')) as mcountM, ' +
    		'sum(MRatings!=\'y\' AND recentrating REGEXP concat(\'m\', LOID, \':4n\')) as mcountE, ' +
    		'group_concat(' +
    			'if(' +
    				'MRatings!=\'y\' AND recentrating REGEXP concat(\'m\', LOID, \':1n\'),' +
    				'concat(' +
    					'AssessTitle,\' (\',substring(AssessDate,6,5),\'-\',substring(AssessDate,1,4),\')\'),' +
    				'null' +
    			') ' +
    		'separator \' mn \') as assessN, ' +
    		'group_concat(' +
    			'if(' +
    				'MRatings!=\'y\' AND recentrating REGEXP concat(\'m\', LOID, \':2n\'),' +
    				'concat(' +
    					'AssessTitle,\' (\',substring(AssessDate,6,5),\'-\',substring(AssessDate,1,4),\')\'),' +
    				'null' +
    			') ' +
    		'separator \' mn \') as assessA, ' +
    		'group_concat(' +
    			'if(' +
    				'MRatings!=\'y\' AND recentrating REGEXP concat(\'m\', LOID, \':3n\'),' +
    				'concat(' +
    					'AssessTitle,\' (\',substring(AssessDate,6,5),\'-\',substring(AssessDate,1,4),\')\'),' +
    				'null' +
    			') ' +
    		'separator \' mn \') as assessM, ' +
    		'group_concat(' +
    			'if(' +
    				'MRatings!=\'y\' AND recentrating REGEXP concat(\'m\', LOID, \':4n\'),' +
    				'concat(' +
    					'AssessTitle,\' (\',substring(AssessDate,6,5),\'-\',substring(AssessDate,1,4),\')\'),' +
    				'null' +
    			') ' +
    		'separator \' mn \') as assessE ' + 
    		'from ' +
    			'(select * from ' +
    				'(select entryID as LOID from hive1718.LOs where courseStr REGEXP ' + courseStr +') L ' +
    				'left join ' +
    				'(select courseStr, recentrating, stuUDID, assessID, MRatings, maxID, AssessTitle, AssessDate ' +
		    			'from ' +
		    				'(select * from ' +
		    					'(select * from ' +
		    						'(select * from hive1718.assessments where courseStr REGEXP ' + courseStr +') a ' +
		    						'RIGHT JOIN ' +
		    						'(select max(entryID) as maxID, ' +
		   								'group_concat(distinct studentUDID) as stuUDID, ' +
		   								'group_concat(distinct assessmentID) as assessID, ' +
		   								'substring_index(' +
		   									'group_concat(ratings order by entryID desc SEPARATOR \'|\'), ' +
	    									'\'|\', 1) as recentrating ' +
	    								'from hive1718.assessmentRatings ' + 
	    								(!!stuUDID ? 'where studentUDID = ' + stuUDID + ' ' : '') + 
	    								'group by ' +
	    									'concat(studentUDID, \':\', assessmentID) ' +
	    								'order by ' +
	    									'group_concat(entryID separator \' \')' +
		    						') aR ' +
		    						'on a.entryID=aR.assessID' +
		    					') aRJ' +
		    				') aRC ' +
		   					'where courseStr REGEXP ' + courseStr +
		    			') aRC2 ' +
		    		'on aRC2.recentrating REGEXP concat(\'m\', L.LOID, \':.n\')' +
    			') aRC3 ' +
    		'group by concat(courseStr,\'-\',LOID,\'-\',stuUDID) ' +
    		'order by stuUDID) r ' +
    	'on u.entryID=r.stuUDID ' +
    	'where u.courseStr regexp ' + courseStr

    var studentBulkQuery = '' +
    	'select ' +
    		'concat(courseStr,\'-\',LOID) as courseStrLOID, ' +
    		'group_concat(distinct LOID) as LOID, ' +
    		'group_concat(distinct LOText) as LOText, ' +
    		'group_concat(' +
    			'if(recentrating REGEXP concat(\'m\', LOID, \':1n\'), stuUDID, null) ' +
    			'separator \', \') ' +
    		'as mstudentsN, ' +
    		'group_concat(' +
    			'if(recentrating REGEXP concat(\'m\', LOID, \':2n\'), stuUDID, null) ' +
    			'separator \', \') ' +
    		'as mstudentsA, ' +
    		'group_concat(' +
    			'if(recentrating REGEXP concat(\'m\', LOID, \':3n\'), stuUDID, null) ' +
    			'separator \', \') ' +
    		'as mstudentsM, ' +
    		'group_concat(' +
    			'if(recentrating REGEXP concat(\'m\', LOID, \':4n\'), stuUDID, null) ' +
    			'separator \', \') ' +
    		'as mstudentsE, ' +
    		'sum(recentrating REGEXP concat(\'m\', LOID, \':1n\')) as mcountN, ' +
    		'sum(recentrating REGEXP concat(\'m\', LOID, \':2n\')) as mcountA, ' +
    		'sum(recentrating REGEXP concat(\'m\', LOID, \':3n\')) as mcountM, ' +
    		'sum(recentrating REGEXP concat(\'m\', LOID, \':4n\')) as mcountE ' +
    	'from ' +
    		'(select * from ' +
    			'(select ' +
    				'entryID as LOID, ' +
    				'LOText ' +
    			'from hive1718.LOs ' +
    			'where ' +
    				'courseStr REGEXP ' + courseStr +'' +
    			') L ' +
    			'left join ' +
    			'(select ' +
    				'courseStr, ' +
    				'recentrating, ' +
    				'stuUDID, ' +
    				'assessID ' +
    			'from ' +
    				'(select * from ' +
    					'(select * from ' +
    						'(select * from hive1718.assessments where courseStr REGEXP ' + courseStr +') a ' +
    						'RIGHT JOIN ' +
    						'(select ' +
    							'max(entryID) as maxID, ' +
    							'group_concat(distinct studentUDID) as stuUDID, ' +
    							'group_concat(distinct assessmentID) as assessID, ' +
    							'substring_index(' +
    								'group_concat(ratings order by entryID desc SEPARATOR \'|\'), \'|\', 1) as recentrating ' +
    						'from hive1718.assessmentRatings ' + 
    						(!!stuUDID ? 'where studentUDID = ' + stuUDID + ' ' : '') + 
    						'group by concat(studentUDID, \':\', assessmentID) ' +
    						'order by group_concat(entryID separator \' \')' +
    						') aR ' +
    						'on a.entryID=aR.assessID' +
    					') aRJ ' +
    				'where MRatings=\'y\'' +
    				') aRC' +
    			') aRC2 ' +
    			'on aRC2.recentrating REGEXP concat(\'m\', L.LOID, \':.n\')' +
    		') aRC3 ' +
    		'group by concat(courseStr,\'-\',LOID)'

    var LOQuery = '' +
    	'select entryID as LOID, ' +
    		'LOText, LOCode, ' +
    		'concat(courseStr,\'-\',entryID) as courseStrLOID ' +
    	'from hive1718.LOs ' +
    	'where courseStr REGEXP ' + courseStr

    return {studentRatingQuery: studentRatingQuery, studentBulkQuery: LOQuery }
}