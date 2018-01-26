console.log("\n\n//////////////////////////////////////////////////////////\n\n========== Garfield comic grabber by LiquidZulu ==========\n\nUsage: 'grab YEAR FOLDER_NAME' with no quotes.\n\nI made this program as part of a project to make a neural\nnetwork to generate new Garfield comics.\n\n\n\nFind me here:\n\nMy website = http://LiquidZulu.000webhostapp.com/ \n(sleeps between 21:00 & 22:00 UTC unless I get more money)\n\nDiscord = https://discord.gg/k43XDQ2 \n\nI also mod for r/LasagnaCat on reddit\n\ntwitter = @LiquidZulu\n\nYouTube (if I ever make anything) = https://goo.gl/fkgfiu \n\n//////////////////////////////////////////////////////////\n");

var listen = process.openStdin();

listen.addListener("data", function(input) {
	
	var input = input.toString().trim();
    console.log("Case: [" + input + "]");	
	var cmsg = input.split(' ');
	
	switch(cmsg[0]){
	
		case 'grab':
			  
			console.log('case: ' + cmsg[0]);
				  
				try {
					
					function genURL(time){

					  var day = time.getDate();
					  var month = time.getMonth() + 1;
					  var year = time.getFullYear();
					  
					  if(day < 10){day = '0' + day}
					  if(month < 10){month = '0' + month}

					  var url = ("https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/" + year + "/" + year + "-" + month + "-" + day + ".gif");

					  return url;
					}


					var d = new Date;
					var imageDir = '/' + cmsg[2] + '/' + cmsg[1] + '___GarfImages';

					var mkdirp = require('mkdirp');
					mkdirp(imageDir, function(err) {

						// path exists unless there was an error

					});

					var fs = require('fs'),
					request = require('request');

					var download = function(uri, filename, callback){
					  request.head(uri, function(err, res, body){
						//console.log('content-type:', res.headers['content-type']);
						//console.log('content-length:', res.headers['content-length']);

						request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
					  });
					};

					var jan1 = new Date(cmsg[1],0,1,0,0,0,0);
					var ms = jan1.getTime();
					var NEWms = null;

					for(var i=0; i<365; i++){
						
						
						NEWms = ms + (i*(86400000));
						var date = new Date(NEWms);
						
						var time = date;
						var day = time.getDate();
						var month = time.getMonth() + 1;
						var year = time.getFullYear();
						
						if(day < 10){day = '0' + day}
						if(month < 10){month = '0' + month}
						
						var url = genURL(date);
						
						download(url, imageDir + '/' + year + "-" + month + "-" + day + '.gif', function(){
						  //console.log('done');
						  //console.log(imageDir);
						});
					}
					
					console.log('\nDone\n');

				}
				
				catch (e) {
					console.error(e);
				}
			  
		break;
		
	}
	
});