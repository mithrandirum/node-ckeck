//ex n 1

const http = require('http')
const bl = require('bl')
const fs = require('fs')
const map = require('through2-map')
const fill = require('./solution_filter.js')


http.get(process.argv[2],  (res) => {
  res.pipe(bl(function (err, data) {
    
    console.log(data.toString())
  }))
})

//ex n 2 

let result = 0

for (let i = 2; i < process.argv.length; i++) {
  result += Number(process.argv[i])
  console.log(result)
}

// ex n 3

http.get(process.argv[2],  (res) => {
  res.setEncoding('utf8')
  res.on('data', console.log(data))
  res.on('error', console.error)
}).on('error', console.error)



//ex n 4 http_file_server

const http = require('http')

const server = http.createServer( (req, res)=> {
  res.writeHead(200, { 'content-type': 'text/plain' })

  fs.createReadStream(process.argv[3]).pipe(res)
})

server.listen(3000)


//ex 5 toUpperCase

const server = http.createServer( (req, res) => {
  if (req.method !== 'POST') {
    return res.end(console.log('wrong method'))
  }

  req.pipe(map( (portion) => {
    return portion.toString().toUpperCase()
  })).pipe(res)
})

server.listen(3000)


// ex 6 jugling async

const http = require('http')
const bl = require('bl')
const results = []
let count = 0

function showResults () {
  for (let i = 0; i < 3; i++) {
    console.log(results[i])
  }
}

function getter(i) {
  http.get(process.argv[2 + i],  (res) => {
    res.pipe(bl( (err, data) => {
      if (err) {
        return console.log(err)
      }

      results[i] = data.toString()
      count++

      count === 3 ? showResults() : count
      
    }))
  })
}

for (let i = 0; i < 3; i++) {
 getter(i)
}


// ex 7 make it modular


const dir = process.argv[2]
const filterStr = process.argv[3]


fill(dir, filterStr,  (err, list) => {
  if (err) {
    return console.log( err)
  }

  list.forEach( file => console.log(file)
  )
})
