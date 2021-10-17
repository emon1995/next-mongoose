export default function handler(req, res){
    res.status(200)
    res.send(`<h1>This is Home Page</h1>`)
    res.end();
}