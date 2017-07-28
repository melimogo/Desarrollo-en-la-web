var http = require('http');
var fs = require('fs');

	  
// Lista de content-types segun la extension del archivo
	var types = {
    	".png": "image/png",
    	".jpg": "image/jpeg",
    	".js": "application/x-javascript",
    	".html": "text/html",
    	".JSON": "text/JSON"
	};

// Crea el servidor Web, que será atendido por la funcion serverCallback
var server = http.createServer( serverCallback );


	var contacto;
	try{
		var archivo = fs.readFileSync('contacto.JSON','utf8');
		contacto = JSON.parse( archivo );

	} catch( error ) { 
		console.log( error );
		contacto = [];
	}

function GuardarContacto(req, res){
		// function que se ejecuta en el evento data del request
		function Recibir( data ){	
			console.log( data.toString() );
			// Almacena en una variable objeto los datos recibidos
			var p = JSON.parse( data.toString() );
			contacto.push( p );
			console.log( contacto );
			fs.writeFile('contacto.json', 
						JSON.stringify( contacto, null, '\t' ),
						null );

		}
		
		console.log( req.method );
		req.on( "data", Recibir );
		console.log( "Ya Comunique");
}

	//AGENDAR CITA
	var cita;
	try{
		var archivo = fs.readFileSync('cita.JSON','utf8');
		cita = JSON.parse( archivo );

	} catch( error ) { 
		console.log( error );
		cita = [];
	}

function GuardarCita(req, res){
		// function que se ejecuta en el evento data del request
		function Recibir( data ){	
			console.log( data.toString() );
			// Almacena en una variable objeto los datos recibidos
			var p = JSON.parse( data.toString() );
			cita.push( p );
			console.log( cita );
			fs.writeFile('cita.json', 
						JSON.stringify( cita, null, '\t' ),
						null );

		}
		
		console.log( req.method );
		req.on( "data", Recibir );
		console.log( "Ya Agende");
}

// funcion que atiende las peticiones
function serverCallback(req, res){
	console.log("Peticion recibida: " + req.url);
	
	var partes = req.url.split( '/' );
	
	if ( req.url == "/"){
		fs.readFile( "./project/index.html", returnFile);
	
	}else if(req.url=="/mensaje"){
		GuardarContacto(req,res);

	}else if(req.url=="/cita"){
		GuardarCita(req,res);

	}else{
		
		fs.readFile("./project"+req.url, returnFile);	
	}
	
	function returnFile( error, data){
		if( error != null ){
			console.log( "Function returnFile: " + error );
			res.writeHead( 404, {} );
			res.end( error.toString() );
			return;
		}
		res.end( data );
		}
	
}


console.log( "Servidor HTTP corriendo. Ctrl-c para terminar")
// Ejecuta el servidor
server.listen(process.argv[2] || 8080 );


