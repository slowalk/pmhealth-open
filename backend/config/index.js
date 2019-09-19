const config = {
  // home_url: process.env.NODE_ENV == "production" ? "http://pmhealth.slowalk.net" : "http://localhost:3001",
  
  
  // home_url: process.env.NODE_ENV == "production" ? "http://pmhealth.slowalk.net" : "http://localhost:8080",
  
  //// production
  // home_url: "http://pmhealth.slowalk.net",
  //// development
  home_url: process.env.NODE_ENV == "production" ? "http://pmhealth.slowalk.net" : "http://localhost:3000",

  
  // home_url: process.env.NODE_ENV == "development" ? "http://pmhealth.slowalk.net" : "http://localhost:3001",
  // home_url: "http://localhost:3001",
  
  //// production
  // db_path: "mongodb://mongo/pmhealth",
  //// development
  db_path: process.env.NODE_ENV == "production" ? 'mongodb://mongo/pmhealth' : 'mongodb://localhost/pmhealth',
  
  // domain: "gmail.com"
  domain: "snu.ac.kr"
  // domain: "dankook.ac.kr"
}

module.exports = config;