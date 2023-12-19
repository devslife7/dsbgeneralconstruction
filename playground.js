console.log("Hello from the playground!")

const arr = ["james", "joe", "jane", "jill", "jack"]

const newArr = arr.map(name => {
  return name.toUpperCase()
})

console.log("newArr: ", newArr)
