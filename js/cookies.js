
function cookie(c_name,c_val,e_day){
	if(c_name&&c_val!==undefined){
		var end = new Date();
		end.setDate(end.getDate()+e_day);
		document.cookie = c_name + '=' + c_val + (e_day?';expires='+end.toString():'')+';path=/';
	}else{
		var coo = document.cookie;
		if(coo){
			var arr1 = coo.split('; ');
			var arr2 = [];
			var obj = {};
			for(var i = 0;i < arr1.length;i++){
				arr2.push(arr1[i].split('='));
				if(c_name){
					if(arr2[i][0]==c_name){
						return arr2[i][1];
					}
				}else{
					obj[arr2[i][0]] = arr2[i][1];
				}
			}

			if(!c_name){
				return obj;
			}
		}else{
			return;
		}
	}
}