// import "@babel/polyfill";
import 'regenerator-runtime/runtime';

const arr = [
  new Promise(() => {

  }),
  new Promise(() => {

  })
]

arr.map(item => {
  console.log(item)
})