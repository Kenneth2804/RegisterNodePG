const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const app = express();

const port  = 3000;

app.use(express.static("."));

app.use((req,res,next) =>{

	res.setHeader("Acces-Control-Allow-Origin", "*");
	res.setHeader("Acces-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Acces-Control-Allow-Headers", "Content/Type");
	next();
});

app.use(bodyParser.json());

const pool = new Pool({
	user: "", //tu usuario de pgMyAdmin
	host: "localhost",
	database: "Autenticacion",//tu nombre de base de datos
	password: "", //tu contraseña de pgMyAdmin
	port: 5432,
});

app.post("/register", async(req,res) =>{
	const {username, password} = req.body;

	try{
		const hashedPassword = await bcrypt.hash(password, 10);
		const query = "INSERT INTO users (username, password) VALUES ($1, $2)";
		await pool.query(query, [username, hashedPassword]);
		res.json({success: true, message: "SE REGISTRÓ CORRECTAMENTE"});
	}catch(error){
		console.log("Erroreeees", error);
		res.status(500).json({success: false, message: "Internal server Error"})
	}

});

app.post("/login", async (req,res) =>{
	const {username, password} = req.body;

try{
const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
const user = result.rows[0];

if (!user) {
	return res.json({success: false, message: "No se encontró" });
}
const match = await bcrypt.compare(password, user.password);

if (match) {
	res.json({success: true});
}else{
	res.json({success: false, message: "Contraseña Invalida"});
}


}catch(error){
		console.log("Erroreeees", error);
		res.status(500).json({success: false, message: "Internal server Error"})
	
}

})


app.listen(port, () => {
	console.log(`Servidor corriendo en puerto ${port}`);
})